import { WebsiteConfig, Program, Teacher, Resource } from '../types';
// @ts-ignore
import teacherProfileImage from '../assets/images/teacher_profile_1782745261371.jpg';

export const defaultWebsiteConfig: WebsiteConfig = {
  whatsappNumber: '966501234567', // From advertisement: +966 50 123 4567
  email: 'info@zad-institute.com', // From advertisement: zad.institute
  phone: '+966 50 123 4567', // From advertisement: +966 50 123 4567
  heroTitleAr: 'سجّل الآن في معهد زاد الإلكتروني العلمي',
  heroTitleEn: 'Register Now at Zad Online Scientific Institute',
  heroSubtitleAr: 'دراسة عن بعد... بعلم راسخ لمستقبل واعد',
  heroSubtitleEn: 'Distance learning... with solid knowledge for a promising future',
  aboutTextAr: 'معهد زاد الإلكتروني العلمي هو منارة تعليمية رائدة تسعى لتقريب العلوم الشرعية وتيسير تعلم القرآن الكريم وتلاوته وتجويده وفق منهج علمي رصين وأصيل. نعتمد على التقنيات الحديثة لنربط طالب العلم بنخبة من المعلمين المتميزين أينما كان، مع توفير بيئة تعليمية هادئة ومحفزة تتناسب مع جميع الفئات والأعمار وبإشراف علمي متميز ونخبة من الأكاديميين ذوي الخبرة والشهادات المعتمدة.',
  aboutTextEn: 'Zad Online Scientific Institute is a leading educational beacon that seeks to bring Sharia sciences closer and facilitate the learning of the Holy Qur’an, its recitation, and its Tajweed according to a solid and authentic scientific curriculum. We rely on modern technologies to connect students of knowledge with a selection of distinguished teachers wherever they are, while providing a calm and stimulating learning environment suitable for all groups and ages.',
  visionAr: 'أن نكون المرجع الأبرز عالمياً في تقديم التعليم الشرعي الميسر والمنهجي عبر الإنترنت، لنشر قيم الوسطية والاعتدال وبناء جيل متسلح بالوعي والمعرفة الشرعية الأصيلة.',
  visionEn: 'To be the most prominent reference globally in providing accessible and systematic Islamic education online, to spread the values of moderation and balance, and to build a generation armed with awareness and authentic Sharia knowledge.',
  missionAr: 'تيسير الوصول للعلوم الشرعية النافعة وحفظ كتاب الله وتلاوته بالشكل الصحيح، عبر برامج تعليمية تفاعلية ومصادر معرفية مفتوحة، بالاستعانة بكفاءات علمية متميزة وتقنيات اتصال متطورة.',
  missionEn: 'To facilitate access to beneficial Sharia sciences and the preservation and correct recitation of the Book of Allah, through interactive educational programs and open knowledge resources, with the help of distinguished scientific expertise and advanced communication technologies.',
  goalsAr: [
    'تمكين الدارسين من حفظ القرآن الكريم وتجويده وإتقان تلاوته.',
    'تقديم برامج علمية متدرجة في العقيدة، الفقه الإسلامي، الحديث والسيرة النبوية واللغة العربية.',
    'توفير مكتبة رقمية غنية بالكتب والمواد التوضيحية لخدمة طلاب العلم مجاناً.',
    'تيسير التعليم الشرعي وتنشئة الأجيال على الأخلاق والقيم الإسلامية والبحث العلمي.',
    'تذليل العقبات الجغرافية والزمنية أمام المتعلمين حول العالم عبر مرونة الفصول الإلكترونية.'
  ],
  goalsEn: [
    'Enabling learners to memorise, perform Tajweed, and master the recitation of the Holy Qur’an.',
    'Providing progressive scientific programs in Aqeedah, Islamic Fiqh, Hadith, Seerah, and Arabic language.',
    'Providing a rich digital library of books and illustrative materials to serve students of knowledge for free.',
    'Facilitating Sharia education and raising generations on Islamic ethics, values, and academic research.',
    'Overcoming geographic and time barriers for learners worldwide through the flexibility of electronic classrooms.'
  ],
  valuesAr: [
    'الأصالة والمنهجية: الالتزام بالمنهج العلمي الأصيل المستمد من الكتاب والسنة وفهم سلف الأمة.',
    'الوسطية والاعتدال: نشر قيم التسامح والاعتدال بعيداً عن الغلو والتقصير.',
    'الإتقان والتميز: الحرص على جودة العملية التعليمية وكفاءة المعلمين والمعلمات.',
    'التيسير والمرونة: مراعاة ظروف الطلاب وتقديم حلول تعليمية مرنة تناسب الجميع.'
  ],
  valuesEn: [
    'Authenticity & Methodology: Commitment to the authentic scientific curriculum derived from the Book and Sunnah.',
    'Moderation: Spreading the values of tolerance and balance, away from extremism and negligence.',
    'Mastery & Excellence: Ensuring the quality of the educational process and the competence of teachers.',
    'Ease & Flexibility: Taking into account students’ circumstances and providing flexible learning solutions.'
  ],
  regionsServedAr: 'نخدم الطلاب في جميع قارات العالم، مع تركيز خاص على الجاليات المسلمة في أوروبا، أمريكا الشمالية، وآسيا، بالإضافة إلى الطلاب في العالم العربي والإسلامي.',
  regionsServedEn: 'We serve students across all continents, with a special focus on Muslim communities in Europe, North America, and Asia, in addition to students in the Arab and Islamic world.'
};

export const defaultPrograms: Program[] = [
  {
    id: 'p1',
    titleAr: 'حفظ القرآن الكريم وتجويده',
    titleEn: 'Memorisation & Tajweed of the Holy Qur’an',
    descriptionAr: 'برنامج متكامل يهدف إلى مرافقة الطالب في رحلة حفظ كتاب الله كاملاً أو أجزاء منه، مع ضبط مخارج الحروف وتطبيق أحكام التجويد علمياً وعملياً.',
    descriptionEn: 'An integrated program aiming to accompany the student in memorising the Book of Allah entirely or partially, adjusting letter exits, and applying Tajweed rules.',
    category: 'quran',
    detailsAr: [
      'حفظ القرآن الكريم برواية ورش عن نافع أو رواية حفص عن عاصم.',
      'تصحيح التلاوة وتعديل النطق للوصول إلى القراءة الصحيحة.',
      'دراسة أحكام التجويد النظرية والتطبيق العملي المباشر.',
      'مراجعة دورية مكثفة لضمان ثبات المحفوظ وعدم نسيانه.'
    ],
    detailsEn: [
      'Memorising the Holy Qur’an according to Warsh or Hafs narrations.',
      'Correcting recitation and adjusting pronunciation to achieve proper reading.',
      'Studying theoretical Tajweed rules with direct practical application.',
      'Intensive periodic revision to ensure the memorisation remains solid.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p2',
    titleAr: 'العلوم الشرعية',
    titleEn: 'Sharia Sciences',
    descriptionAr: 'دراسة شاملة ومؤصلة للمتون والمسائل الأساسية في الفقه والعقيدة والحديث وتفسير القرآن الكريم لبناء طالب علم متكامل.',
    descriptionEn: 'A comprehensive and foundational study of classical texts and fundamental issues in Fiqh, Creed, Hadith, and Quranic Tafsir.',
    category: 'sharia',
    detailsAr: [
      'العقيدة الإسلامية: دراسة مبسطة لأركان الإيمان والتوحيد على منهج أهل السنة.',
      'الفقه الإسلامي: فقه العبادات (طهارة، صلاة، زكاة، صيام) والمعاملات الأساسية.',
      'شرح الأحاديث النبوية الشريفة وتطبيقاتها التربوية والعملية في الحياة اليومية.',
      'أصول تفسير القرآن الكريم وتوضيح مقاصد الشريعة الإسلامية السامية.'
    ],
    detailsEn: [
      'Islamic Creed: Simplified study of the pillars of faith and Tawheed.',
      'Islamic Jurisprudence (Fiqh): Worship acts (purification, prayer, charity, fasting) and basic transactions.',
      'Hadith Explanation: Understanding the Prophetic traditions and their moral lessons.',
      'Quranic Exegesis: Introduction to Tafsir and the high objectives of Islamic Sharia.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p3',
    titleAr: 'اللغة العربية',
    titleEn: 'Arabic Language',
    descriptionAr: 'تأسيس متين في النحو والصرف والبلاغة والأدب لتمكين الطالب من فهم الخطاب الشرعي والقرآن الكريم فهمًا صحيحًا ودقيقًا.',
    descriptionEn: 'A solid foundation in grammar, morphology, rhetoric, and literature to enable the student to correctly understand Islamic text and the Holy Qur’an.',
    category: 'sharia',
    detailsAr: [
      'تعليم قواعد النحو والصرف من البدايات والمبادئ الأساسية حتى مستويات متقدمة.',
      'دراسة البلاغة والبيان لتذوق مواطن الجمال والإعجاز في بلاغة القرآن الكريم.',
      'تنمية مهارات التحدث بطلاقة، الكتابة الإبداعية، والاستماع الجيد بالفصحى.',
      'قراءة وتحليل عيون الأدب العربي القديم والمعاصر والنصوص اللغوية والأثرية.'
    ],
    detailsEn: [
      'Arabic Grammar & Morphology: Mastering rules from basic principles to advanced lessons.',
      'Arabic Rhetoric (Balaqah): Appreciating the eloquence and miracles of the Holy Qur’an.',
      'Linguistic Skills: Developing fluent speech, composition, and comprehension in standard Arabic.',
      'Classical Literature: Reading and analyzing profound classical Arabic poetry and prose.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p4',
    titleAr: 'الدراسات الإسلامية',
    titleEn: 'Islamic Studies',
    descriptionAr: 'دراسات متنوعة تشمل السيرة النبوية المطهرة، التاريخ الإسلامي العريق، والتوعية الأخلاقية والقيم الإسلامية الفاضلة.',
    descriptionEn: 'Diverse studies covering the purified Prophetic biography, rich Islamic history, and moral awareness of noble Islamic values.',
    category: 'sharia',
    detailsAr: [
      'السيرة النبوية المطهرة: دراسة حياة الرسول ﷺ واستنباط الدروس والعبر التربوية.',
      'استعراض التاريخ الإسلامي العريق وأثر الحضارة الإسلامية في نهضة الأمم.',
      'التوعية الفكرية المعاصرة وتوضيح قيم التسامح والعدالة والوسطية الحقة.',
      'غرس الأخلاق والآداب الرفيعة والفضائل الفردية والمجتمعية التي دعا لها الإسلام.'
    ],
    detailsEn: [
      'Prophetic Biography (Seerah): Chronological study of the life of Prophet Muhammad ﷺ.',
      'Islamic History: A journey through Islamic civilizations and their contribution to humanity.',
      'Contemporary Islamic Thoughts: Clarifying values of tolerance, justice, and moderation.',
      'Islamic Character Building: Nurturing high ethics, family values, and community responsibilities.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p5',
    titleAr: 'مهارات البحث والعلوم العامة',
    titleEn: 'Research Skills & General Sciences',
    descriptionAr: 'تطوير مهارات طلاب العلم في كتابة البحوث العلمية، تصنيف المصادر والمراجع الأصيلة، وتنمية التفكير النقدي.',
    descriptionEn: 'Developing students’ skills in academic research writing, source and reference classification, and critical thinking in general sciences.',
    category: 'sharia',
    detailsAr: [
      'أدوات البحث العلمي الأكاديمي ومهارات تصنيف وتوثيق المصادر والمراجع الأصيلة.',
      'منهجية إعداد وكتابة المقالات والبحوث والرسائل العلمية بطرق معيارية صحيحة.',
      'تطوير التفكير النقدي والتحليلي وحل المشكلات لدى الباحثين وطلاب العلم.',
      'مقدمة ميسرة في تاريخ العلوم الإنسانية والاجتماعية من منظور إسلامي أصيل.'
    ],
    detailsEn: [
      'Academic Research Tools: Learning methods of indexing, citation, and reference organization.',
      'Scientific Writing: Writing standardized scholarly articles, studies, and research papers.',
      'Critical Thinking: Training students in analytical evaluation and Islamic logical discourse.',
      'Humanities & Social Sciences: Broadening horizons with general knowledge integrated with faith.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p6',
    titleAr: 'برامج تطويرية وتأهيلية',
    titleEn: 'Developmental & Qualifying Programs',
    descriptionAr: 'دورات متخصصة تستهدف تأهيل المعلمين والمعلمات وتدريب الكفاءات العلمية وتطوير المهارات الشخصية والتربوية.',
    descriptionEn: 'Specialized courses aiming to train and qualify male and female teachers, refine educational competencies, and develop personal and pedagogical skills.',
    category: 'sharia',
    detailsAr: [
      'تأهيل وتدريب معلمي ومعلمات القرآن الكريم وحلقات التحفيظ والعلوم الشرعية.',
      'استراتيجيات التعليم النشط وأدوات التعليم الرقمي والافتراضي الفعال عن بُعد.',
      'تطوير المهارات الشخصية كمهارات الإلقاء والخطابة والقيادة والتواصل الفعال.',
      'برامج تربوية ونفسية متخصصة للتعامل التربوي السليم مع الفئات العمرية المتنوعة.'
    ],
    detailsEn: [
      'Teacher Training: Preparing qualified educators for Quran memorization and Islamic classes.',
      'Modern Pedagogy: Implementing active learning methods and digital classroom technologies.',
      'Personal Development: Cultivating public speaking, leadership, and instructional skills.',
      'Educational Psychology: Understanding child developmental psychology for effective mentoring.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80'
  }
];

export const defaultTeachers: Teacher[] = [
  {
    id: 't1',
    nameAr: 'الشيخ الأكاديمي المشرف',
    nameEn: 'Sheikh Dr. Academic Supervisor',
    bioAr: 'المشرف العلمي والمدرس العام بمعهد زاد الإلكتروني العلمي، حاصل على شهادة الدكتوراه في العلوم الشرعية واللغة العربية، ذو خبرة تربوية وأكاديمية واسعة تمتد لأكثر من 15 عاماً في تدريس القرآن وتطوير المناهج وإلقاء المحاضرات التفاعلية والدروس المباشرة.',
    bioEn: 'Scientific Supervisor and Main Lecturer at Zad Online Scientific Institute, holding a PhD in Sharia Sciences and Arabic Language, with over 15 years of rich educational and academic experience in Quranic teaching, curriculum development, interactive lectures, and live mentoring.',
    specialtyAr: 'العلوم الشرعية، اللغة العربية، وتأهيل وتدريب المعلمين والبحث العلمي',
    specialtyEn: 'Sharia Sciences, Arabic Language, Teacher Training & Academic Research',
    coursesAr: ['برامج العلوم الشرعية المعتمدة', 'مناهج اللغة العربية وقواعدها', 'مهارات البحث العلمي والتطوير الأكاديمي'],
    coursesEn: ['Approved Sharia Programs', 'Arabic Language & Grammar Curricula', 'Academic Research & Personal Development Skills'],
    languagesAr: ['العربية'],
    languagesEn: ['Arabic'],
    imageUrl: teacherProfileImage
  }
];

export const defaultResources: Resource[] = [
  {
    id: 'r1',
    titleAr: 'متن المرشد المعين على الضروري من علوم الدين',
    titleEn: 'Al-Murshid Al-Mu’een (Ibn Ashir Text)',
    descriptionAr: 'كتاب ابن عاشر الشهير وهو العمدة في الفقه المالكي والعقيدة الأشعرية والتصوف السلوكي، يُعد تذكرة هامة لكل طالب علم.',
    descriptionEn: 'The famous book of Ibn Ashir, a cornerstone in Maliki Fiqh and Islamic foundations. A crucial reference for every student of knowledge.',
    category: 'الفقه',
    type: 'pdf',
    url: 'https://archive.org/download/ibn_ashir_pdf/ibn_ashir_pdf.pdf', // Example archive URL
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80',
    isFeatured: true,
    createdAt: '2026-06-20T10:00:00Z',
    authorAr: 'الشيخ عبد الواحد بن عاشر',
    authorEn: 'Sheikh Abdul Wahid Ibn Ashir',
    pages: 42,
    fileSize: '2.4 MB'
  },
  {
    id: 'r2',
    titleAr: 'شرح منظومة تحفة الأطفال في تجويد القرآن',
    titleEn: 'Explanation of Tuhfat Al-Atfal (Tajweed Poem)',
    descriptionAr: 'منظومة شعرية مبسطة وسهلة الفهم في أحكام تجويد القرآن الكريم، تشمل أحكام النون الساكنة والتنوين والمدود.',
    descriptionEn: 'A simplified and easy-to-understand poem on the rules of Tajweed, including Noon Sakinah, Tanween, and Mudood.',
    category: 'التجويد',
    type: 'pdf',
    url: 'https://archive.org/download/tuhfat_al_atfal/tuhfat_al_atfal.pdf',
    coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=400&q=80',
    isFeatured: true,
    createdAt: '2026-06-22T11:30:00Z',
    authorAr: 'الشيخ سليمان الجمزوري',
    authorEn: 'Sheikh Sulayman Al-Jamzouri',
    pages: 35,
    fileSize: '1.8 MB'
  },
  {
    id: 'r3',
    titleAr: 'الأربعون النووية مع الشرح المبسط',
    titleEn: 'The Forty Hadith of Al-Nawawi with Simplified Explanation',
    descriptionAr: 'مجموعة الأحاديث النبوية الصحيحة التي جمعها الإمام النووي والتي تشتمل على جوامع كلم النبي ﷺ وقواعد الدين الإسلامي العظيم.',
    descriptionEn: 'The collection of authentic Prophetic Hadiths compiled by Imam Al-Nawawi containing the core principles and foundations of Islam.',
    category: 'الحديث',
    type: 'pdf',
    url: 'https://archive.org/download/40_hadith_nawawi/40_hadith_nawawi.pdf',
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80',
    isFeatured: true,
    createdAt: '2026-06-25T09:15:00Z',
    authorAr: 'الإمام يحيى بن شرف النووي',
    authorEn: 'Imam Yahya Al-Nawawi',
    pages: 120,
    fileSize: '4.1 MB'
  },
  {
    id: 'r4',
    titleAr: 'شرح متن العقيدة الطحاوية',
    titleEn: 'Explanation of Al-Aqeedah Al-Tahawiyyah',
    descriptionAr: 'بيان لعقيدة أهل السنة والجماعة بعبارة رصينة وجامعة للأصول العقدية الكبرى المتفق عليها بين علماء المسلمين.',
    descriptionEn: 'A clear exposition of the Creed of Ahlus-Sunnah wal-Jama’ah, outlining the main tenets of faith agreed upon by scholars.',
    category: 'العقيدة',
    type: 'pdf',
    url: 'https://archive.org/download/tahawiyyah/tahawiyyah.pdf',
    coverUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=400&q=80',
    isFeatured: false,
    createdAt: '2026-06-26T14:00:00Z',
    authorAr: 'الإمام أبو جعفر الطحاوي',
    authorEn: 'Imam Abu Ja’far Al-Tahawi',
    pages: 95,
    fileSize: '3.2 MB'
  },
  {
    id: 'r5',
    titleAr: 'فيديو توضيحي: مخارج الحروف العربية بالتفصيل',
    titleEn: 'Video Guide: Exit Points of Arabic Letters',
    descriptionAr: 'شرح مرئي ممتاز يوضح مخارج الحروف السبعة عشر بالاستعانة بالرسوم ثلاثية الأبعاد والصوت لتسهيل الفهم والتطبيق على المبتدئين.',
    descriptionEn: 'An excellent video guide explaining the seventeen letter exits using 3D illustrations and audio feedback for beginners.',
    category: 'التجويد',
    type: 'video',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder video
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
    isFeatured: false,
    createdAt: '2026-06-27T16:00:00Z',
    authorAr: 'قسم التجويد بالمعهد',
    authorEn: 'Zad Tajweed Department'
  },
  {
    id: 'r6',
    titleAr: 'موقع المصحف الإلكتروني بجامعة الملك سعود',
    titleEn: 'KSU Electronic Qur’an Portal',
    descriptionAr: 'رابط خارجي للمصحف الإلكتروني التفاعلي المميز المشتمل على تلاوات شتى القراء، التفاسير المتعددة، وأسباب النزول الموثوقة.',
    descriptionEn: 'An excellent interactive Qur’an portal featuring various reciters, multiple exegeses (Tafsir), and trusted contexts of revelation.',
    category: 'روابط مفيدة',
    type: 'link',
    url: 'http://quran.ksu.edu.sa',
    coverUrl: 'https://images.unsplash.com/photo-1609599006353-e629f1d00f18?auto=format&fit=crop&w=400&q=80',
    isFeatured: false,
    createdAt: '2026-06-28T12:00:00Z',
    authorAr: 'جامعة الملك سعود',
    authorEn: 'King Saud University'
  }
];
