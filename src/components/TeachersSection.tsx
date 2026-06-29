import { BookOpen, GraduationCap, Languages } from 'lucide-react';
import { Teacher, Language } from '../types';

interface TeachersSectionProps {
  lang: Language;
  teachers: Teacher[];
}

export default function TeachersSection({ lang, teachers }: TeachersSectionProps) {
  const isRtl = lang === 'ar';

  return (
    <section id="teachers" className="py-24 bg-brand-parchment relative overflow-hidden">
      {/* Background Subtle Highlights */}
      <div className="absolute left-0 bottom-1/4 w-96 h-96 rounded-full bg-brand-cream/50 filter blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 space-x-reverse px-3 py-1 rounded-full bg-brand-bronze/10 text-brand-bronze text-xs font-bold tracking-wider">
            <span>{isRtl ? 'الهيئة التدريسية' : 'OUR SCHOLARS & TEACHERS'}</span>
          </div>
          <h2 className={`text-3xl md:text-4xl font-extrabold text-brand-charcoal ${isRtl ? 'font-serif-ar' : 'font-serif-en'}`}>
            {isRtl ? 'نخبة من خيرة المعلمين والمعلمات' : 'Learn from Specialized Educators'}
          </h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto rounded-full" />
        </div>

        {/* Teachers List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white border border-brand-cream hover:border-brand-gold/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
              dir={isRtl ? 'rtl' : 'ltr'}
            >
              {/* Profile Image with subtle gold accent line */}
              <div className="h-64 overflow-hidden relative">
                <img
                  src={teacher.imageUrl}
                  alt={isRtl ? teacher.nameAr : teacher.nameEn}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-transparent opacity-45" />
                
                {/* Specialization Badge overlaid on image bottom */}
                <div className="absolute bottom-4 left-4 right-4 bg-brand-charcoal/80 backdrop-blur-sm p-3 rounded-xl border border-white/10">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-brand-gold block mb-0.5">
                    {isRtl ? 'التخصص الدقيق' : 'SPECIALIZATION'}
                  </span>
                  <span className={`text-xs text-white font-bold block ${isRtl ? 'font-serif-ar' : ''}`}>
                    {isRtl ? teacher.specialtyAr : teacher.specialtyEn}
                  </span>
                </div>
              </div>

              {/* Teacher Details */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div>
                    <h3 className={`text-xl font-extrabold text-brand-charcoal ${isRtl ? 'font-serif-ar' : 'font-serif-en'}`}>
                      {isRtl ? teacher.nameAr : teacher.nameEn}
                    </h3>
                  </div>

                  <p className={`text-xs text-brand-charcoal/80 leading-relaxed ${isRtl ? 'font-serif-ar text-sm leading-relaxed' : ''}`}>
                    {isRtl ? teacher.bioAr : teacher.bioEn}
                  </p>

                  <div className="h-[1px] bg-brand-cream" />

                  {/* Courses Tag */}
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-1.5 space-x-reverse text-brand-bronze">
                      <GraduationCap className="w-4 h-4" />
                      <span className="text-xs font-bold tracking-wider uppercase">
                        {isRtl ? 'المواد المدرسية:' : 'Subjects Taught:'}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {(isRtl ? teacher.coursesAr : teacher.coursesEn).map((course, index) => (
                        <span
                          key={index}
                          className={`text-[10px] font-medium px-2 py-0.5 rounded bg-brand-parchment border border-brand-cream text-brand-charcoal ${isRtl ? 'font-serif-ar text-xs' : ''}`}
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Teaching Languages */}
                <div className="flex items-center justify-between pt-4 border-t border-brand-cream text-brand-charcoal/70">
                  <div className="flex items-center space-x-1.5 space-x-reverse">
                    <Languages className="w-3.5 h-3.5 text-brand-bronze" />
                    <span className="text-[10px] uppercase font-semibold tracking-wider">
                      {isRtl ? 'لغات التدريس:' : 'Teaching languages:'}
                    </span>
                  </div>
                  <span className={`text-xs font-semibold ${isRtl ? 'font-serif-ar' : ''}`}>
                    {(isRtl ? teacher.languagesAr : teacher.languagesEn).join(' / ')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
