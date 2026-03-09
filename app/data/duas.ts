export interface Dua {
  id: string;
  title: string;
  preview: string;
  arabic: string;
  pronunciation: string;
  translation: string;
  category: 'Daily' | 'Protection' | 'Prayer' | 'Travel' | 'Success' | 'Health' | 'Family' | 'Gratitude';
}

export const dailyDuas: Dua[] = [
  {
    id: 'morning',
    title: 'Morning Dua',
    category: 'Daily',
    preview: 'Supplication for the beginning of the day',
    arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',
    pronunciation: 'আল্লাহুম্মা বিকা আসবাহনা, ওয়া বিকা আমসাইনা, ওয়া বিকা নাহইয়া, ওয়া বিকা নামুতু, ওয়া ইলাইকান নুশূর।',
    translation: 'হে আল্লাহ! আপনার রহমতেই আমরা সকালে উপনীত হয়েছি, আপনার রহমতেই আমরা সন্ধ্যায় উপনীত হই, আপনার হুকুমেই আমরা জীবিত থাকি, আপনার হুকুমেই আমরা মৃত্যুবরণ করি এবং আপনার কাছেই আমাদের ফিরে যেতে হবে।'
  },
  {
    id: 'evening',
    title: 'Evening Dua',
    category: 'Daily',
    preview: 'Supplication for the evening',
    arabic: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ',
    pronunciation: 'আল্লাহুম্মা বিকা আমসাইনা, ওয়া বিকা আসবাহনা, ওয়া বিকা নাহইয়া, ওয়া বিকা নামুতু, ওয়া ইলাইকাল মাছীর।',
    translation: 'হে আল্লাহ! আপনার রহমতেই আমরা সন্ধ্যায় উপনীত হয়েছি, আপনার রহমতেই আমরা সকালে উপনীত হই, আপনার হুকুমেই আমরা জীবিত থাকি, আপনার হুকুমেই আমরা মৃত্যুবরণ করি এবং আপনার কাছেই আমাদের ফিরে যেতে হবে।'
  },
  {
    id: 'sleeping',
    title: 'Before Sleeping',
    category: 'Daily',
    preview: 'Dua to recite before going to bed',
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    pronunciation: 'বিসমিকাল্লাহুম্মা আমুতু ওয়া আহইয়া।',
    translation: 'হে আল্লাহ! আপনারই নামে আমি মৃত্যুবরণ করি (ঘুমাই) এবং আপনারই নামে জীবিত হই (জাগি)।'
  },
  {
    id: 'waking-up',
    title: 'Waking Up',
    category: 'Daily',
    preview: 'Dua to recite upon waking up',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    pronunciation: 'আলহামদু লিল্লাহিল্লাযী আহইয়ানা বা’দা মা আমাতানা ওয়া ইলাইহিন নুশূর।',
    translation: 'সমস্ত প্রশংসা আল্লাহর জন্য, যিনি আমাদের মৃত্যুর (ঘুমের) পর পুনরায় জীবিত করলেন এবং তাঁর দিকেই আমাদের ফিরে যেতে হবে।'
  },
  {
    id: 'anxiety-protection',
    title: 'Protection from Anxiety',
    category: 'Protection',
    preview: 'Dua for relief from worry and grief',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ، وَغَلَبَةِ الرِّجَالِ',
    pronunciation: 'আল্লাহুম্মা ইন্নী আউযুবিকা মিনাল হাম্মি ওয়াল হাযানি, ওয়াল আজযি ওয়াল কাসালি, ওয়াল বুখলি ওয়াল জুবনি, ওয়া দ্বালা’ইদ দাইনি ওয়া গালাবাতির রিজাল।',
    translation: 'হে আল্লাহ! আমি আপনার কাছে আশ্রয় চাই দুশ্চিন্তা ও দুঃখ থেকে, অক্ষমতা ও অলসতা থেকে, কৃপণতা ও ভীরুতা থেকে এবং ঋণের বোঝা ও মানুষের প্রাধান্য (জবরদস্তি) থেকে।'
  },
  {
    id: 'evil-eye',
    title: 'Protection from Evil Eye',
    category: 'Protection',
    preview: 'Seeking refuge from harm and envy',
    arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ',
    pronunciation: 'আউযু বিকালিমা তিল্লাহিত তাম্মাতি মিন কুল্লি শাইতানিওঁ ওয়া হাম্মাতিওঁ ওয়া মিন কুল্লি আইনিল লাম্মাহ।',
    translation: 'আমি আল্লাহর পরিপূর্ণ কালেমাসমূহের মাধ্যমে আশ্রয় চাই প্রত্যেক শয়তান ও বিষাক্ত প্রাণী থেকে এবং প্রত্যেক ক্ষতিকর নজর (দৃষ্টি) থেকে।'
  },
  {
    id: 'after-wudu',
    title: 'After Wudu',
    category: 'Prayer',
    preview: 'Supplication after completing ablution',
    arabic: 'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
    pronunciation: 'আশহাদু আল্লা ইলাহা ইল্লাল্লাহু ওয়াহদাহু লা শারীকা লাহু ওয়া আশহাদু আন্না মুহাম্মাদান আবদুহু ওয়া রাসূলুহু।',
    translation: 'আমি সাক্ষ্য দিচ্ছি যে, আল্লাহ ছাড়া কোনো উপাস্য নেই, তিনি একক, তাঁর কোনো শরিক নেই। আমি আরও সাক্ষ্য দিচ্ছি যে, মুহাম্মদ (সা.) আল্লাহর বান্দা ও রাসূল।'
  },
  {
    id: 'travel-start',
    title: 'Starting a Journey',
    category: 'Travel',
    preview: 'Dua for safety during travel',
    arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ',
    pronunciation: 'সুবহানাল্লাযী সাখখারা লানা হাযা ওয়ামা কুন্না লাহু মুকরিনীন, ওয়া ইন্না ইলা রাব্বিনা লামুনকালিবুন।',
    translation: 'পবিত্র সেই সত্তা যিনি একে আমাদের বশীভূত করে দিয়েছেন, অথচ আমরা একে বশীভূত করতে সক্ষম ছিলাম না। আর আমরা অবশ্যই আমাদের রবের কাছে ফিরে যাব।'
  },
  {
    id: 'success-knowledge',
    title: 'Seeking Knowledge',
    category: 'Success',
    preview: 'Dua for increasing wisdom and knowledge',
    arabic: 'رَّبِّ زِدْنِي عِلْمًا',
    pronunciation: 'রাব্বি যিদনী ইলমা।',
    translation: 'হে আমার রব! আমার জ্ঞান বৃদ্ধি করে দিন।'
  },
  {
    id: 'health-healing',
    title: 'Dua for Healing',
    category: 'Health',
    preview: 'Supplication for the sick',
    arabic: 'اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَاسَ، اشْفِهِ وَأَنْتَ الشَّافِي، لاَ شِفَاءَ إِلاَّ شِفَاؤُكَ، شِفَاءً لاَ يُغَادِرُ سَقَمًا',
    pronunciation: 'আল্লাহুম্মা রাব্বান নাসি আযহিবিল বা’সা, ইশফিহি ওয়া আনতাশ শাফী, লা শিফাআ ইল্লা শিফাউকা, শিফাআন লা ইউগাদিরু সাকামা।',
    translation: 'হে আল্লাহ, মানুষের প্রতিপালক! আপনি কষ্ট দূর করে দিন। আপনি আরোগ্য দান করুন, আপনিই আরোগ্যদানকারী। আপনার আরোগ্য ছাড়া কোনো আরোগ্য নেই। এমন আরোগ্য দান করুন যা কোনো রোগ অবশিষ্ট রাখে না।'
  },
  {
    id: 'parents-mercy',
    title: 'Mercy for Parents',
    category: 'Family',
    preview: 'Dua for parents as taught in the Quran',
    arabic: 'رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    pronunciation: 'রাব্বির হামহুমা কামা রাব্বাইয়ানী সাগীরা।',
    translation: 'হে আমার প্রতিপালক! তাদের উভয়ের প্রতি দয়া করুন, যেভাবে তারা আমাকে শৈশবে লালন-পালন করেছেন।'
  },
  {
    id: 'gratitude-general',
    title: 'General Gratitude',
    category: 'Gratitude',
    preview: 'Expressing thanks to Allah',
    arabic: 'الْحَمْدُ لِلَّهِ حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ',
    pronunciation: 'আলহামদু লিল্লাহি হামদান কাসীরান তায়্যিবাম মুবারাকান ফীহি।',
    translation: 'সমস্ত প্রশংসা আল্লাহর জন্য, অনেক প্রশংসা, যা পবিত্র ও বরকতময়।'
  }
];