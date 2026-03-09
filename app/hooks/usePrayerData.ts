import { useState, useEffect } from 'react';

export interface PrayerData {
  timings: Record<string, string>;
  tomorrowFajr: string;
  hijri: {
    day: string;
    month: { en: string; ar: string };
    year: string;
    designation: { abbreviated: string };
  };
  gregorian: {
    date: string;
    weekday: { en: string };
    month: { en: string };
    day: string;
    year: string;
  };
}

export function usePrayerData() {
  const [district, setDistrict] = useState(() => localStorage.getItem('noor_district') || 'Dhaka');
  const [data, setData] = useState<PrayerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const date = new Date();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const day = date.getDate();

        const res = await fetch(`https://api.aladhan.com/v1/calendarByCity?city=${district}&country=Bangladesh&method=1&month=${month}&year=${year}`);
        if (!res.ok) throw new Error('Failed to fetch prayer times');
        const json = await res.json();

        if (!json.data || !json.data[day - 1]) {
          throw new Error('Prayer data not available for today');
        }

        const todayData = json.data[day - 1];
        
        let tomorrowFajr = todayData.timings.Fajr;
        if (day < json.data.length) {
          tomorrowFajr = json.data[day].timings.Fajr;
        } else {
          try {
            const nextMonth = month === 12 ? 1 : month + 1;
            const nextYear = month === 12 ? year + 1 : year;
            const nextRes = await fetch(`https://api.aladhan.com/v1/calendarByCity?city=${district}&country=Bangladesh&method=1&month=${nextMonth}&year=${nextYear}`);
            const nextJson = await nextRes.json();
            if (nextJson.data && nextJson.data[0]) {
              tomorrowFajr = nextJson.data[0].timings.Fajr;
            }
          } catch (e) {
            console.error('Failed to fetch next month data', e);
          }
        }

        setData({
          timings: todayData.timings,
          tomorrowFajr,
          hijri: todayData.date.hijri,
          gregorian: todayData.date.gregorian
        });
        
        localStorage.setItem('noor_district', district);

      } catch (err) {
        setError('Could not load prayer times. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [district]);

  return { data, loading, error, district, setDistrict };
}
