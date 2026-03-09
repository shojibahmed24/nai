import { PrayerData } from '../hooks/usePrayerData';

export interface NotificationSettings {
  enabled: boolean;
  prayerReminders: boolean;
  sehriReminders: boolean;
  iftarReminders: boolean;
  dailyAyah: boolean;
}

const STORAGE_KEY = 'noor_notification_settings';
const TRIGGER_LOG_KEY = 'noor_notification_log';

const defaultSettings: NotificationSettings = {
  enabled: false,
  prayerReminders: true,
  sehriReminders: true,
  iftarReminders: true,
  dailyAyah: true,
};

class NotificationService {
  private settings: NotificationSettings;
  private lastTriggered: Record<string, string> = {}; // key: date_type, value: time

  constructor() {
    const saved = localStorage.getItem(STORAGE_KEY);
    this.settings = saved ? JSON.parse(saved) : defaultSettings;
    
    const log = localStorage.getItem(TRIGGER_LOG_KEY);
    this.lastTriggered = log ? JSON.parse(log) : {};
  }

  getSettings(): NotificationSettings {
    return this.settings;
  }

  async updateSettings(newSettings: Partial<NotificationSettings>) {
    this.settings = { ...this.settings, ...newSettings };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings));

    if (this.settings.enabled && 'Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        this.settings.enabled = false;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings));
      }
    }
  }

  private canSend(type: string): boolean {
    const today = new Date().toDateString();
    const key = `${today}_${type}`;
    if (this.lastTriggered[key]) return false;
    
    this.lastTriggered[key] = new Date().toISOString();
    localStorage.setItem(TRIGGER_LOG_KEY, JSON.stringify(this.lastTriggered));
    return true;
  }

  sendNotification(title: string, body: string, type: string) {
    if (!this.settings.enabled || !('Notification' in window) || Notification.permission !== 'granted') {
      return;
    }

    if (this.canSend(type)) {
      new Notification(title, {
        body,
        icon: '/favicon.ico',
      });
    }
  }

  checkAndTrigger(prayerData: PrayerData | null) {
    if (!prayerData || !this.settings.enabled) return;

    const now = new Date();
    const currentH = now.getHours();
    const currentM = now.getMinutes();
    const currentTimeInMinutes = currentH * 60 + currentM;

    // 1. Prayer Reminders (10 mins before)
    if (this.settings.prayerReminders) {
      Object.entries(prayerData.timings).forEach(([name, timeStr]) => {
        const [time] = timeStr.split(' ');
        const [h, m] = time.split(':').map(Number);
        const prayerMinutes = h * 60 + m;
        
        if (currentTimeInMinutes === prayerMinutes - 10) {
          this.sendNotification('Prayer Reminder', `${name} prayer is in 10 minutes.`, `prayer_${name}`);
        }
      });
    }

    // 2. Sehri Reminder (30 mins before Fajr)
    if (this.settings.sehriReminders) {
      const [fajrTime] = prayerData.timings.Fajr.split(' ');
      const [h, m] = fajrTime.split(':').map(Number);
      const fajrMinutes = h * 60 + m;
      if (currentTimeInMinutes === fajrMinutes - 30) {
        this.sendNotification('Sehri Reminder', 'Sehri ends in 30 minutes. Prepare for your fast.', 'sehri');
      }
    }

    // 3. Iftar Reminder (At Maghrib)
    if (this.settings.iftarReminders) {
      const [maghribTime] = prayerData.timings.Maghrib.split(' ');
      const [h, m] = maghribTime.split(':').map(Number);
      const maghribMinutes = h * 60 + m;
      if (currentTimeInMinutes === maghribMinutes) {
        this.sendNotification('Iftar Time', "It's time for Iftar. May Allah accept your fast.", 'iftar');
      }
    }

    // 4. Daily Ayah (Scheduled for 9:00 AM)
    if (this.settings.dailyAyah) {
      if (currentH === 9 && currentM === 0) {
        this.sendNotification('Daily Ayah', 'Start your day with a verse from the Holy Quran.', 'daily_ayah');
      }
    }
  }
}

export const notificationService = new NotificationService();