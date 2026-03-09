import { dailyDuas } from '../data/duas';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const KNOWLEDGE_BASE: Record<string, string> = {
  // English Knowledge
  'surah ikhlas': "Surah Al-Ikhlas (The Sincerity) is the 112th chapter of the Quran. It declares the absolute oneness of Allah (Tawhid). Its meaning is: 'Say, He is Allah, [who is] One, Allah, the Eternal Refuge. He neither begets nor is born, Nor is there to Him any equivalent.' (Quran 112:1-4)",
  'anxiety': "For anxiety, the Prophet (ﷺ) taught us many Duas. One powerful one is: 'Allahumma inni a'udhu bika minal-hammi wal-hazan...' (O Allah, I seek refuge in You from anxiety and sorrow). You can find this in the 'Protection' category of our Duas section.",
  'isha': "The Isha prayer consists of 4 Rakats of Fard (obligatory). Additionally, it is Sunnah to pray 2 Rakats after the Fard, followed by 3 Rakats of Witr.",
  'salah': "Salah is the second pillar of Islam. It is a direct connection between the believer and Allah. The five daily prayers are Fajr, Dhuhr, Asr, Maghrib, and Isha.",
  'quran': "The Quran is the final revelation from Allah to Prophet Muhammad (ﷺ). It consists of 114 Surahs and serves as a complete guide for humanity.",
  'zakat': "Zakat is the third pillar of Islam. It is an obligatory charity of 2.5% of one's qualifying wealth (Nisab) held for one lunar year, distributed to the poor and needy.",
  'hadith': "The Prophet (ﷺ) said: 'The best among you are those who learn the Quran and teach it.' (Sahih Bukhari).",
  'tahajjud': "Tahajjud is a voluntary prayer performed at night after waking up from sleep. It is highly recommended and is a time when Duas are readily accepted. It is usually prayed in units of 2 Rakats.",

  // Bengali Knowledge
  'নামাজ': "নামাজ ইসলামের দ্বিতীয় স্তম্ভ। প্রতিদিন ৫ ওয়াক্ত নামাজ পড়া প্রত্যেক মুসলিমের ওপর ফরজ। এগুলো হলো: ফজর, যোহর, আসর, মাগরিব ও এশা।",
  'ওজু': "ওজুর ফরজ ৪টি: ১. সমস্ত মুখমন্ডল ধোয়া, ২. দুই হাতের কনুইসহ ধোয়া, ৩. মাথার চারভাগের একভাগ মাসেহ করা, ৪. দুই পায়ের টাখনুসহ ধোয়া।",
  '৪ রাকাত': "৪ রাকাত বিশিষ্ট নামাজের (যোহর, আসর, এশা) দ্বিতীয় রাকাতে আত্তাহিয়্যাতু পড়ে তৃতীয় রাকাতের জন্য দাঁড়াতে হয়। শেষ রাকাতে আত্তাহিয়্যাতু, দরুদ ও দোয়া মাসুরা পড়ে সালাম ফিরাতে হয়।",
  'জাকাত': "জাকাত ইসলামের ৫টি স্তম্ভের একটি। নিসাব পরিমাণ সম্পদ (সাড়ে ৭ তোলা সোনা বা সাড়ে ৫২ তোলা রুপা বা সমমূল্যের অর্থ) এক বছর জমা থাকলে তার ২.৫% গরিবদের দান করা ফরজ।",
  'হাদিস': "রাসূলুল্লাহ (সা.) বলেছেন: 'তোমাদের মধ্যে সেই ব্যক্তিই সর্বোত্তম যে কুরআন শিখে এবং অন্যকে শেখায়।' (সহীহ বুখারী)",
  'তাহাজ্জুদ': "তাহাজ্জুদ নামাজ রাতের শেষ তৃতীয়াংশে পড়া হয়। এটি একটি অত্যন্ত ফজিলতপূর্ণ নফল ইবাদত। সাধারণত ২ রাকাত করে এই নামাজ পড়তে হয়।",
  'দোয়া': "বিপদের সময় পড়ার একটি শক্তিশালী দোয়া হলো: 'লা ইলাহা ইল্লা আনতা সুবহানাকা ইন্নি কুনতু মিনাজ জোয়ালিমিন।'"
};

export const getAIResponse = async (input: string): Promise<string> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const query = input.toLowerCase();

  // Check for exact or partial matches in knowledge base
  for (const [key, value] of Object.entries(KNOWLEDGE_BASE)) {
    if (query.includes(key)) {
      return value;
    }
  }

  // Special handling for specific UI questions
  if (query.includes('বৈঠকে') || query.includes('আত্তাহিয়্যাতু')) {
    return "৪ রাকাত নামাজের দ্বিতীয় ও চতুর্থ রাকাতে বৈঠকে বসতে হয়। বৈঠকে 'আত্তাহিয়্যাতু' পড়তে হয়। শেষ বৈঠকে আত্তাহিয়্যাতুর পর দরুদ শরীফ ও দোয়া মাসুরা পড়ে সালাম ফিরাতে হয়।";
  }

  if (query.includes('ওজুর ফরজ')) {
    return "ওজুর ফরজ ৪টি: ১. মুখমন্ডল ধোয়া, ২. দুই হাতের কনুইসহ ধোয়া, ৩. মাথার চারভাগের একভাগ মাসেহ করা, ৪. দুই পায়ের টাখনুসহ ধোয়া।";
  }

  // Default responses
  if (query.includes('hello') || query.includes('hi') || query.includes('assalamu')) {
    return "Walaikum Assalam! I am your Noor Islamic Assistant. I can help you with questions about Salah, Quran, Duas, and general Islamic knowledge. How can I assist you today?";
  }

  return "I'm sorry, I don't have specific information on that topic yet. You can ask me about Prayer times, how to perform Wudu, the meaning of Zakat, or specific Duas for protection and anxiety.";
};