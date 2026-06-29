import { BookOpen, Calendar, HelpCircle, MessageCircle, PhoneCall } from 'lucide-react';
import { Program, Language } from '../types';

interface ProgramsSectionProps {
  lang: Language;
  programs: Program[];
  whatsappNumber: string;
  onContactUs: () => void;
}

export default function ProgramsSection({
  lang,
  programs,
  whatsappNumber,
  onContactUs
}: ProgramsSectionProps) {
  const isRtl = lang === 'ar';

  const getWhatsAppLink = (programTitle: string) => {
    const text = isRtl
      ? `السلام عليكم، أرغب في الاستفسار عن برنامج: ${programTitle}`
      : `Assalamu Alaikum, I would like to inquire about the program: ${programTitle}`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="programs" className="py-24 bg-white relative overflow-hidden">
      {/* Background Subtle Highlights */}
      <div className="absolute right-0 top-1/3 w-80 h-80 rounded-full bg-brand-parchment/70 filter blur-3xl opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 space-x-reverse px-3 py-1 rounded-full bg-brand-bronze/10 text-brand-bronze text-xs font-bold tracking-wider">
            <span>{isRtl ? 'البرامج التعليمية' : 'ACADEMIC PROGRAMS'}</span>
          </div>
          <h2 className={`text-3xl md:text-4xl font-extrabold text-brand-charcoal ${isRtl ? 'font-serif-ar' : 'font-serif-en'}`}>
            {isRtl ? 'بناء معرفي متدرج ومرن' : 'Explore Our Islamic Programs'}
          </h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto rounded-full" />
        </div>

        {/* Filter categories directly inside layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <div
              key={program.id}
              className="flex flex-col bg-brand-parchment/30 border border-brand-cream hover:border-brand-gold/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
              dir={isRtl ? 'rtl' : 'ltr'}
            >
              {/* Cover Image */}
              <div className="h-48 overflow-hidden relative">
                <img
                  src={program.imageUrl}
                  alt={isRtl ? program.titleAr : program.titleEn}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Badge Category */}
                <span className="absolute top-4 left-4 right-auto px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-white bg-brand-bronze">
                  {program.category === 'quran'
                    ? (isRtl ? 'القرآن الكريم' : 'Qur’an')
                    : (isRtl ? 'العلوم الشرعية' : 'Sharia')}
                </span>

                {/* Cover Title Overlay */}
                <h3 className={`absolute bottom-4 left-4 right-4 text-white text-lg font-bold drop-shadow-sm ${isRtl ? 'font-serif-ar' : 'font-serif-en'}`}>
                  {isRtl ? program.titleAr : program.titleEn}
                </h3>
              </div>

              {/* Program Content */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <p className={`text-brand-charcoal/80 text-sm leading-relaxed ${isRtl ? 'font-serif-ar text-[15px] leading-relaxed' : ''}`}>
                    {isRtl ? program.descriptionAr : program.descriptionEn}
                  </p>

                  <div className="h-[1px] bg-brand-cream" />

                  {/* Highlights/Details list */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-brand-bronze uppercase tracking-widest">
                      {isRtl ? 'ما ستدرسه في هذا البرنامج:' : 'Curriculum Highlights:'}
                    </h4>
                    <ul className="space-y-1.5">
                      {(isRtl ? program.detailsAr : program.detailsEn).map((detail, idx) => (
                        <li key={idx} className="flex items-start text-xs text-brand-charcoal/85">
                          <span className="text-brand-gold mr-1.5 ml-1.5 font-bold">•</span>
                          <span className={isRtl ? 'font-serif-ar text-sm' : ''}>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-brand-cream">
                  <button
                    id={`prog-contact-${program.id}`}
                    onClick={onContactUs}
                    className="flex items-center justify-center space-x-1 space-x-reverse py-2.5 px-3 rounded-xl text-xs font-bold text-brand-charcoal border border-brand-cream hover:border-brand-bronze bg-white hover:bg-brand-parchment transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-brand-bronze" />
                    <span>{isRtl ? 'تواصل معنا' : 'Contact Us'}</span>
                  </button>

                  <a
                    id={`prog-wa-${program.id}`}
                    href={getWhatsAppLink(isRtl ? program.titleAr : program.titleEn)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-1 space-x-reverse py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{isRtl ? 'واتساب' : 'WhatsApp'}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
