import { Compass, Eye, Award, Target, MapPin, Globe, Users, Monitor, Clock, BookOpen, HeartHandshake, Sparkles, CheckCircle } from 'lucide-react';
import { WebsiteConfig, Language } from '../types';

interface AboutSectionProps {
  lang: Language;
  config: WebsiteConfig;
}

export default function AboutSection({ lang, config }: AboutSectionProps) {
  const isRtl = lang === 'ar';

  const advantages = [
    {
      icon: Sparkles,
      titleAr: 'إشراف علمي متميز',
      titleEn: 'Scientific Supervision',
      descAr: 'إشراف علمي من نخبة من العلماء والدكاترة المتخصصين لضمان دقة وجودة المادة المعرفية والعملية التعليمية.',
      descEn: 'Scientific supervision by an elite group of scholars and PhD doctors to guarantee the accuracy and quality of knowledge.',
    },
    {
      icon: Award,
      titleAr: 'شهادات معتمدة',
      titleEn: 'Certified Certificates',
      descAr: 'شهادات معتمدة وموثقة تُمنح للطلاب الملتزمين بعد اجتياز البرامج والمساقات العلمية بنجاح.',
      descEn: 'Approved certificates awarded to committed students after successfully passing programs and examinations.',
    },
    {
      icon: Monitor,
      titleAr: 'محاضرات تفاعلية ودروس مباشرة',
      titleEn: 'Interactive Lectures & Live Classes',
      descAr: 'محاضرات تفاعلية مسجلة بجودة عالية جداً، بالإضافة لدروس حية تتيح تواصل الطلاب مباشرة مع المدرسين.',
      descEn: 'High-quality recorded interactive lectures, coupled with live classes enabling direct student-teacher communication.',
    },
    {
      icon: Clock,
      titleAr: 'دراسة مرنة في أي وقت ومن أي مكان',
      titleEn: 'Flexible Distance Learning',
      descAr: 'فصول ذكية تتيح للدارس اختيار الأوقات المناسبة والتعلم من أي مكان دون عوائق جغرافية.',
      descEn: 'Smart virtual classrooms allowing students to choose convenient times and learn anywhere without barriers.',
    },
    {
      icon: BookOpen,
      titleAr: 'مناهج علمية معتمدة ورصينة',
      titleEn: 'Approved & Robust Curricula',
      descAr: 'مناهج ومقررات علمية مبسطة ومتدرجة ومبنية على أسس أكاديمية موثوقة تلائم كافة المستويات.',
      descEn: 'Simplified, progressive, and authentic curricula built on trusted academic foundations suitable for all levels.',
    },
    {
      icon: Users,
      titleAr: 'مدرسون مؤهلون',
      titleEn: 'Qualified & Experienced Teachers',
      descAr: 'نخبة من الأساتذة والمعلمين المجازين ذوي الخبرة الواسعة في تدريس العلوم الشرعية والقرآن الكريم.',
      descEn: 'An elite group of certified and highly experienced male and female teachers specializing in Islamic and Quranic studies.',
    },
    {
      icon: HeartHandshake,
      titleAr: 'متابعة فردية لكل طالب',
      titleEn: 'Individual Student Follow-up',
      descAr: 'متابعة مستمرة وتقييم مستمر لكل طالب للتأكد من استيعابه وتفوقه طوال مسيرته الدراسية معنا.',
      descEn: 'Continuous individual follow-up and evaluation to ensure every student’s comprehension and academic success.',
    }
  ];

  return (
    <section id="about" className="py-24 bg-brand-parchment relative overflow-hidden">
      {/* Background Subtle Highlights */}
      <div className="absolute -left-36 top-1/4 w-96 h-96 rounded-full bg-brand-cream/40 filter blur-3xl opacity-60" />
      <div className="absolute -right-36 bottom-1/4 w-96 h-96 rounded-full bg-brand-cream/30 filter blur-3xl opacity-60" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 space-x-reverse px-3 py-1 rounded-full bg-brand-bronze/10 text-brand-bronze text-xs font-bold tracking-wider">
            <span>{isRtl ? 'من نحن' : 'WHO WE ARE'}</span>
          </div>
          <h2 className={`text-3xl md:text-4xl font-extrabold text-brand-charcoal ${isRtl ? 'font-serif-ar' : 'font-serif-en'}`}>
            {isRtl ? 'تأسيس منهجي وعطاء معرفي مستمر' : 'About Zad Institute'}
          </h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto rounded-full" />
        </div>

        {/* Introduction Section with Large Image & Text */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 ${isRtl ? 'lg:grid-cols-reverse' : ''}`}>
          {/* Main Info */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className={`text-2xl font-bold text-brand-charcoal ${isRtl ? 'font-serif-ar' : 'font-serif-en'}`}>
              {isRtl ? 'نبذة عن المعهد' : 'Our Academy at a Glance'}
            </h3>
            <p className={`text-brand-charcoal/85 leading-relaxed text-base ${isRtl ? 'font-serif-ar text-lg' : ''}`}>
              {isRtl ? config.aboutTextAr : config.aboutTextEn}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {/* Vision Card */}
              <div className="p-6 rounded-2xl bg-white border border-brand-cream shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-10 h-10 rounded-xl bg-brand-bronze/10 flex items-center justify-center text-brand-bronze mb-4">
                  <Eye className="w-5 h-5" />
                </div>
                <h4 className={`text-lg font-bold text-brand-charcoal mb-2 ${isRtl ? 'font-serif-ar' : 'font-serif-en'}`}>
                  {isRtl ? 'رؤيتنا' : 'Our Vision'}
                </h4>
                <p className={`text-xs text-brand-charcoal/80 leading-relaxed ${isRtl ? 'font-serif-ar text-sm' : ''}`}>
                  {isRtl ? config.visionAr : config.visionEn}
                </p>
              </div>

              {/* Mission Card */}
              <div className="p-6 rounded-2xl bg-white border border-brand-cream shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-10 h-10 rounded-xl bg-brand-bronze/10 flex items-center justify-center text-brand-bronze mb-4">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className={`text-lg font-bold text-brand-charcoal mb-2 ${isRtl ? 'font-serif-ar' : 'font-serif-en'}`}>
                  {isRtl ? 'رسالتنا' : 'Our Mission'}
                </h4>
                <p className={`text-xs text-brand-charcoal/80 leading-relaxed ${isRtl ? 'font-serif-ar text-sm' : ''}`}>
                  {isRtl ? config.missionAr : config.missionEn}
                </p>
              </div>
            </div>
          </div>

          {/* Large Premium Image with custom gold frame */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 border-2 border-brand-gold rounded-3xl translate-x-3 translate-y-3 z-0" />
            <img
              src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80"
              alt="Islamic Manuscripts and books"
              className="relative w-full h-[380px] object-cover rounded-3xl shadow-xl z-10 border border-brand-cream"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Zad Advantages Grid from Advertisements */}
        <div className="my-24 pt-12 border-t border-brand-cream/80">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h3 className={`text-2xl md:text-3xl font-extrabold text-brand-charcoal ${isRtl ? 'font-serif-ar' : 'font-serif-en'}`}>
              {isRtl ? 'مزايا ومكتسبات معهد زاد الإلكتروني العلمي' : 'Zad Institute Key Advantages'}
            </h3>
            <p className={`text-brand-charcoal/70 text-sm ${isRtl ? 'font-serif-ar text-base' : ''}`}>
              {isRtl ? 'مجموعة من الركائز والضمانات التعليمية التي نقدمها لتأهيل وتمكين طلبة العلم' : 'A set of core educational pillars we provide to qualify and empower seekers of knowledge'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((adv, idx) => {
              const Icon = adv.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white/70 border border-brand-cream shadow-sm hover:shadow-xl hover:border-brand-gold/40 transition-all duration-300 group flex flex-col space-y-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h4 className={`text-lg font-bold text-brand-charcoal group-hover:text-brand-bronze transition-colors duration-300 ${isRtl ? 'font-serif-ar text-xl' : 'font-serif-en'}`}>
                      {isRtl ? adv.titleAr : adv.titleEn}
                    </h4>
                    <p className={`text-brand-charcoal/80 text-xs leading-relaxed ${isRtl ? 'font-serif-ar text-[14px] leading-relaxed text-brand-charcoal/90' : 'text-[13px] text-brand-charcoal/90'}`}>
                      {isRtl ? adv.descAr : adv.descEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Inspirational Banner with Quote from Ad 2 */}
          <div className="mt-16 bg-gradient-to-br from-brand-charcoal to-[#1C1A14] text-white rounded-3xl p-8 md:p-12 relative overflow-hidden border border-brand-gold/20 shadow-xl">
            <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-brand-gold/5 filter blur-3xl" />
            <div className="absolute -left-16 -top-16 w-64 h-64 rounded-full bg-brand-gold/5 filter blur-3xl" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-right">
              <div className="space-y-4 flex flex-col items-center md:items-start text-center md:text-right">
                <span className={`inline-block px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-bold tracking-wider ${isRtl ? 'font-serif-ar' : ''}`}>
                  {isRtl ? 'رؤيتنا في النجاح والتميز' : 'Our Commitment to Success'}
                </span>
                <p className={`text-xl md:text-3xl font-extrabold leading-normal text-[#F9F6F0] max-w-2xl ${isRtl ? 'font-serif-ar leading-snug' : 'font-serif-en'}`}>
                  {isRtl 
                    ? '« نحن لا نعدك بالنجاح فقط... نحن نرافقك حتى تحقيقه »' 
                    : '“We do not just promise you success... we accompany you until you achieve it”'}
                </p>
                <div className="flex items-center justify-center md:justify-start gap-4 text-xs font-semibold text-brand-gold/90">
                  <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> {isRtl ? 'جودة عالية' : 'High Quality'}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> {isRtl ? 'ثقة متبادلة' : 'Mutual Trust'}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> {isRtl ? 'تميز علمي' : 'Scientific Excellence'}</span>
                </div>
              </div>
              <div className="flex-shrink-0 w-full md:w-auto">
                <button
                  onClick={() => {
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-brand-gold hover:bg-brand-gold-hover text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer text-sm whitespace-nowrap w-full md:w-auto text-center"
                >
                  {isRtl ? 'احجز مقعدك الآن' : 'Book Your Seat Now'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Goals & Values (Bento style grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8 border-t border-brand-cream">
          {/* Goals Column */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-8 h-8 rounded-lg bg-brand-bronze/15 flex items-center justify-center text-brand-bronze">
                <Target className="w-4 h-4" />
              </div>
              <h3 className={`text-xl font-bold text-brand-charcoal ${isRtl ? 'font-serif-ar' : 'font-serif-en'}`}>
                {isRtl ? 'أهداف المعهد' : 'Our Strategic Goals'}
              </h3>
            </div>
            <ul className="space-y-4">
              {(isRtl ? config.goalsAr : config.goalsEn).map((goal, idx) => (
                <li
                  key={idx}
                  className="flex items-start bg-white/50 border border-brand-cream p-4 rounded-xl shadow-sm"
                  dir={isRtl ? 'rtl' : 'ltr'}
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-gold/10 text-brand-bronze font-bold text-xs flex items-center justify-center mt-0.5 ml-3 mr-3">
                    {idx + 1}
                  </span>
                  <span className={`text-brand-charcoal/90 text-sm ${isRtl ? 'font-serif-ar text-base leading-relaxed' : 'leading-relaxed'}`}>
                    {goal}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Values & Regions Column */}
          <div className="space-y-8">
            {/* Values */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-8 h-8 rounded-lg bg-brand-bronze/15 flex items-center justify-center text-brand-bronze">
                  <Award className="w-4 h-4" />
                </div>
                <h3 className={`text-xl font-bold text-brand-charcoal ${isRtl ? 'font-serif-ar' : 'font-serif-en'}`}>
                  {isRtl ? 'قيمنا الحاكمة' : 'Our Core Values'}
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(isRtl ? config.valuesAr : config.valuesEn).map((valueStr, idx) => {
                  const parts = valueStr.split(':');
                  const title = parts[0];
                  const desc = parts[1] || '';
                  return (
                    <div key={idx} className="p-4 bg-white/60 border border-brand-cream rounded-xl" dir={isRtl ? 'rtl' : 'ltr'}>
                      <h4 className={`text-sm font-bold text-brand-bronze mb-1 ${isRtl ? 'font-serif-ar text-base' : ''}`}>
                        {title}
                      </h4>
                      {desc && (
                        <p className={`text-xs text-brand-charcoal/80 leading-relaxed ${isRtl ? 'font-serif-ar' : ''}`}>
                          {desc}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Regions Served */}
            <div className="p-6 rounded-2xl bg-brand-cream/40 border border-brand-cream/80 space-y-3">
              <div className="flex items-center space-x-2 space-x-reverse text-brand-bronze">
                <MapPin className="w-4 h-4" />
                <h4 className={`text-sm font-bold tracking-wider uppercase ${isRtl ? 'font-serif-ar' : 'font-sans'}`}>
                  {isRtl ? 'المناطق التي يخدمها المعهد' : 'Regions We Serve'}
                </h4>
              </div>
              <p className={`text-xs text-brand-charcoal/90 leading-relaxed ${isRtl ? 'font-serif-ar text-sm leading-relaxed' : ''}`}>
                {isRtl ? config.regionsServedAr : config.regionsServedEn}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
