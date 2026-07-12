import { WebsiteConfig, Program, Teacher, Resource } from '../types';

export const defaultWebsiteConfig: WebsiteConfig = {
  whatsappNumber: '249912566482',
  email: 'info@zad-institute.com',
  phone: '+249 91 256 6482',
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
    'الأصالة والمنهجية: الالتزام بالمنهج العلمي الأصيل المستمد من الكتاب والسنة وفهم الأئمة الأعلام.',
    'الوسطية والاعتدال: نشر قيم التسامح والاعتدال بعيداً عن الغلو والتقصير.',
    'الإتقان والتميز: الحرص على جودة العملية التعليمية وكفاءة المعلمين والمعلمات.',
    'التيسير والمرونة: مراعاة ظروف الطلاب وتقديم حلول تعليمية مرنة تناسب الجميع.'
  ],
  valuesEn: [
    'Authenticity & Methodology: Commitment to the authentic scientific curriculum derived from the Book, the Sunnah, and the understanding of recognised leading scholars.',
    'Moderation: Spreading the values of tolerance and balance, away from extremism and negligence.',
    'Mastery & Excellence: Ensuring the quality of the educational process and the competence of teachers.',
    'Ease & Flexibility: Taking into account students’ circumstances and providing flexible learning solutions.'
  ],
  regionsServedAr: 'يخدم المعهد طلاب وطالبات العلم الشرعي في جميع أنحاء العالم من خلال نظام التعليم الإلكتروني عن بُعد، مع تركيز خاص على حفظة القرآن الكريم في السودان وخارجه، إيمانًا بأهمية تأهيلهم علميًا وتمكينهم من مواصلة طلب العلم الشرعي وفق منهجية راسخة تجمع بين الأصالة والتيسير.',
  regionsServedEn: 'The institute serves male and female seekers of Islamic knowledge worldwide through remote online education, with a special focus on Qur’an memorisers in Sudan and abroad, supporting their scholarly qualification and continued Islamic learning through a rooted methodology that combines authenticity and facilitation.'
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
      'حفظ القرآن الكريم برواية حفص عن عاصم أو رواية الدوري عن أبي عمرو.',
      'تصحيح التلاوة وتعديل النطق للوصول إلى القراءة الصحيحة.',
      'دراسة أحكام التجويد النظرية والتطبيق العملي المباشر.',
      'مراجعة دورية مكثفة لضمان ثبات المحفوظ وعدم نسيانه.'
    ],
    detailsEn: [
      'Memorising the Holy Qur’an according to the Hafs narration from Asim or the Al-Duri narration from Abu Amr.',
      'Correcting recitation and adjusting pronunciation to achieve proper reading.',
      'Studying theoretical Tajweed rules with direct practical application.',
      'Intensive periodic revision to ensure the memorisation remains solid.'
    ],
    imageUrl: '/images/program-quran.jpg'
  },
  {
    id: 'p2',
    titleAr: 'العلوم الشرعية',
    titleEn: 'Sharia Sciences',
    descriptionAr: 'العلوم الشرعية هي العلوم التي تُعنى بفهم الدين الإسلامي من مصادره الأصلية، القرآن الكريم والسنة النبوية، لبناء طالب علم متكامل يجمع بين التأصيل العلمي والعمل التربوي والدعوي.',
    descriptionEn: 'Sharia sciences are the disciplines concerned with understanding Islam from its original sources, the Holy Qur’an and the Prophetic Sunnah, to build a well-rounded seeker of knowledge.',
    category: 'sharia',
    detailsAr: [
      'العقيدة: دراسة الإيمان بالله وأركان الإيمان وما يتعلق بالتوحيد.',
      'الفقه: معرفة الأحكام الشرعية العملية المتعلقة بالعبادات والمعاملات.',
      'أصول الفقه: القواعد والمناهج التي يُستنبط بها الحكم الشرعي.',
      'التفسير: شرح معاني القرآن الكريم وبيان مقاصده.',
      'علوم القرآن: دراسة جمع القرآن وقراءاته وأسباب النزول وغيرها.',
      'الحديث وعلومه: دراسة السنة النبوية وروايتها وتمييز الصحيح من الضعيف.',
      'السيرة النبوية: دراسة حياة النبي ﷺ وأحداث دعوته.',
      'اللغة العربية: النحو والصرف والبلاغة؛ لأنها أداة لفهم النصوص الشرعية.',
      'الدعوة وأصولها: دراسة أساليب تبليغ الإسلام وتعليمه.'
    ],
    detailsEn: [
      'Aqeedah: Studying belief in Allah, the pillars of faith, and matters related to Tawheed.',
      'Fiqh: Understanding practical rulings related to worship and transactions.',
      'Usul al-Fiqh: Learning the principles and methods used to derive Islamic rulings.',
      'Tafsir: Explaining the meanings of the Holy Qur’an and clarifying its objectives.',
      'Qur’anic Sciences: Studying the compilation of the Qur’an, its recitations, reasons of revelation, and related topics.',
      'Hadith and its Sciences: Studying the Prophetic Sunnah, narration, and distinguishing authentic reports from weak ones.',
      'Seerah: Studying the life of the Prophet ﷺ and the events of his mission.',
      'Arabic Language: Grammar, morphology, and rhetoric as tools for understanding Islamic texts.',
      'Da’wah and its Principles: Studying methods of conveying and teaching Islam.'
    ],
    imageUrl: '/images/program-fiqh.jpg'
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
    imageUrl: '/images/program-tajweed.jpg'
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
    imageUrl: '/images/program-seerah.jpg'
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
    imageUrl: '/images/about-institute.jpg'
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
    imageUrl: '/images/program-tajweed.jpg'
  }
];

export const defaultTeachers: Teacher[] = [
  {
    id: 't1',
    nameAr: 'سماحة الشيخ الشريف بدر البدور الشريف مصطفى المكاشفي',
    nameEn: 'Sheikh Al-Sharif Badr Al-Budur Mustafa Al-Makashfi',
    bioAr: 'سماحة الشيخ الشريف بدر البدور الشريف مصطفى المكاشفي، سليل الدوحة المكاشفية وفخر السادة الصوفية، هو واحد من أبرز الوجوه الدعوية والعلمية الشابة في السودان، ومن الشخصيات التي برزت في ميدان التعليم الشرعي والدعوة إلى الله، حيث جمع بين التأصيل العلمي والخطابة المؤثرة والرؤية التجديدية في خدمة العلم الشرعي ونشره. نال درجة بكالوريوس الدراسات الإسلامية من جامعة أم درمان الإسلامية، ثم حصل على الدبلوم العالي في الحديث النبوي من جامعة القرآن الكريم والعلوم الإسلامية، فجمع بين الدراسة الأكاديمية والتكوين الشرعي، وانطلق في ميادين الدعوة والتعليم والتأليف حتى أصبح من الأسماء المعروفة بين الدعاة الشباب. ويُعد الشيخ مؤسس معهد زاد الإلكتروني العلمي ومدرسة زاد الإلكترونية للعلوم الشرعية، وهما من المبادرات التعليمية الرائدة التي أسهمت في توسيع دائرة التعليم الشرعي عن بُعد، وإتاحة الفرصة لطلاب العلم داخل السودان وخارجه لتلقي العلوم الإسلامية بمنهجية علمية رصينة. وقد عُرف باهتمامه الكبير بتطوير التعليم الديني، وتيسير الوصول إليه عبر الوسائل الحديثة، إيمانًا منه بأن نشر العلم رسالة تتجاوز الحدود الجغرافية. كما تولى الإمامة والخطابة في عدد من المساجد، واشتهر بمنبره المؤثر وأسلوبه البليغ، وألقى عشرات الخطب والمحاضرات والدروس العلمية في مختلف أنحاء السودان، إضافة إلى مشاركات دعوية خارج البلاد عُرف خلالها بالحكمة وحسن البيان وقوة الطرح. وله حضور علمي بارز في تدريس العلوم الشرعية، إلى جانب عدد من المؤلفات، من أشهرها: حدائق الأنوار في حسن وإحسان النبي المختار ﷺ، والفيض النبوي في مدح النبي ﷺ، ورحيق المسيد. كما كانت له مشاركات إعلامية متعددة، وأُجريت معه لقاءات تلفزيونية، وقدم فقرة علمية ثابتة بعنوان «من الأثر» على قناة سودانية 24، أسهمت في نشر الثقافة الإسلامية وتعزيز الوعي الشرعي. ويتميز الشيخ بدر البدور المكاشفي بشخصية دعوية مؤثرة وقربه من الشباب وفصاحته وسعة اطلاعه وقدرته على تبسيط العلوم الشرعية وربطها بواقع الناس، مما جعله يحظى بقبول واسع بين مختلف شرائح المجتمع. وقد زار عددًا من الدول مشاركًا في أنشطة دعوية وعلمية، مواصلًا رسالته في نشر العلم وخدمة الإسلام، واضعًا نصب عينيه خدمة القرآن الكريم وإحياء العلوم الشرعية والمساهمة في بناء جيل يحمل العلم والأخلاق.',
    bioEn: 'Sheikh Al-Sharif Badr Al-Budur Mustafa Al-Makashfi is a Sudanese Islamic educator, preacher, author, and founder of Zad Online Scientific Institute and Zad Online School for Sharia Sciences. He holds a Bachelor’s degree in Islamic Studies from Omdurman Islamic University and a Higher Diploma in Prophetic Hadith from the University of the Holy Qur’an and Islamic Sciences. His work combines academic grounding, Islamic teaching, public speaking, authorship, and modern distance-learning initiatives designed to make Islamic knowledge accessible to students in Sudan and abroad.',
    specialtyAr: 'العلوم الشرعية، الحديث النبوي، الدعوة، الخطابة، وتطوير التعليم الشرعي الإلكتروني',
    specialtyEn: 'Sharia Sciences, Prophetic Hadith, Da’wah, Public Speaking & Online Islamic Education',
    coursesAr: ['العلوم الشرعية', 'حفظ القرآن الكريم وتجويده', 'الحديث النبوي وعلومه', 'السيرة النبوية', 'الدعوة وأصولها'],
    coursesEn: ['Sharia Sciences', 'Qur’an Memorisation & Tajweed', 'Hadith and its Sciences', 'Prophetic Seerah', 'Da’wah and its Principles'],
    languagesAr: ['العربية'],
    languagesEn: ['Arabic'],
    imageUrl: '/images/teacher-01.jpg'
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
    coverUrl: '/images/resource-fiqh.jpg',
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
    coverUrl: '/images/resource-tajweed.jpg',
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
    coverUrl: '/images/resource-fiqh.jpg',
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
    coverUrl: '/images/resource-fiqh.jpg',
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
    coverUrl: '/images/resource-tajweed.jpg',
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
    coverUrl: '/images/resource-tajweed.jpg',
    isFeatured: false,
    createdAt: '2026-06-28T12:00:00Z',
    authorAr: 'جامعة الملك سعود',
    authorEn: 'King Saud University'
  }
];