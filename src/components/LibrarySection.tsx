import { useMemo, useState } from 'react';
import { Search, FileText, Headphones, Video, ExternalLink, BookOpen, Eye } from 'lucide-react';
import { Resource, Language } from '../types';

interface LibrarySectionProps {
  lang: Language;
  resources: Resource[];
  onOpenPdf: (res: Resource) => void;
}

const LEGACY_PLACEHOLDER_RESOURCE_IDS = new Set(['r1', 'r2', 'r3', 'r4', 'r5', 'r6']);

const LEGACY_PLACEHOLDER_TITLES = [
  'متن المرشد المعين على الضروري من علوم الدين',
  'شرح منظومة تحفة الأطفال في تجويد القرآن',
  'الأربعون النووية مع الشرح المبسط',
  'شرح متن العقيدة الطحاوية',
  'فيديو توضيحي: مخارج الحروف العربية بالتفصيل',
  'موقع المصحف الإلكتروني بجامعة الملك سعود',
  'Al-Murshid Al-Mu’een (Ibn Ashir Text)',
  'Explanation of Tuhfat Al-Atfal (Tajweed Poem)',
  'The Forty Hadith of Al-Nawawi with Simplified Explanation',
  'Explanation of Al-Aqeedah Al-Tahawiyyah',
  'Video Guide: Exit Points of Arabic Letters',
  'KSU Electronic Qur’an Portal'
];

function isLegacyPlaceholderResource(resource: Resource) {
  return (
    LEGACY_PLACEHOLDER_RESOURCE_IDS.has(resource.id) ||
    LEGACY_PLACEHOLDER_TITLES.includes(resource.titleAr) ||
    LEGACY_PLACEHOLDER_TITLES.includes(resource.titleEn)
  );
}

export default function LibrarySection({ lang, resources, onOpenPdf }: LibrarySectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const isRtl = lang === 'ar';

  const visibleResources = useMemo(() => {
    const cleanedResources = resources.filter((resource) => !isLegacyPlaceholderResource(resource));
    const searchLower = searchTerm.trim().toLowerCase();

    if (!searchLower) return cleanedResources;

    return cleanedResources.filter((resource) =>
      resource.titleAr.toLowerCase().includes(searchLower) ||
      resource.titleEn.toLowerCase().includes(searchLower) ||
      resource.descriptionAr.toLowerCase().includes(searchLower) ||
      resource.descriptionEn.toLowerCase().includes(searchLower) ||
      resource.category.toLowerCase().includes(searchLower)
    );
  }, [resources, searchTerm]);

  const hasCustomResources = resources.some((resource) => !isLegacyPlaceholderResource(resource));

  if (!hasCustomResources) {
    return null;
  }

  const getIcon = (type: Resource['type']) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-500" />;
      case 'audio':
        return <Headphones className="w-5 h-5 text-blue-500" />;
      case 'video':
        return <Video className="w-5 h-5 text-indigo-500" />;
      case 'link':
        return <ExternalLink className="w-5 h-5 text-emerald-500" />;
      default:
        return <BookOpen className="w-5 h-5 text-amber-500" />;
    }
  };

  const getTypeLabel = (type: Resource['type']) => {
    switch (type) {
      case 'pdf':
        return isRtl ? 'كتاب PDF' : 'PDF Book';
      case 'audio':
        return isRtl ? 'مادة صوتية' : 'Audio Material';
      case 'video':
        return isRtl ? 'فيديو توضيحي' : 'Video Tutorial';
      case 'link':
        return isRtl ? 'رابط خارجي' : 'External Link';
      default:
        return isRtl ? 'مقالة مفصلة' : 'Article';
    }
  };

  return (
    <section id="library" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute -left-36 top-1/3 w-96 h-96 rounded-full bg-brand-parchment/60 filter blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center space-x-2 space-x-reverse px-3 py-1 rounded-full bg-brand-bronze/10 text-brand-bronze text-xs font-bold tracking-wider">
            <span>{isRtl ? 'المكتبة التعليمية' : 'EDUCATIONAL LIBRARY'}</span>
          </div>
          <h2 className={`text-3xl md:text-4xl font-extrabold text-brand-charcoal ${isRtl ? 'font-serif-ar' : 'font-serif-en'}`}>
            {isRtl ? 'مصادر ومواد المعهد' : 'Institute Resources & Materials'}
          </h2>
          <p className="text-brand-charcoal/70 text-sm max-w-md mx-auto">
            {isRtl ? 'سيتم عرض الكتب والقراءات التي يعتمدها المعهد فقط.' : 'Only institute-approved books and readings will be shown here.'}
          </p>
          <div className="w-16 h-1 bg-brand-gold mx-auto rounded-full" />
        </div>

        <div className="relative w-full md:w-96 mx-auto mb-10">
          <input
            id="library-search-input"
            type="text"
            placeholder={isRtl ? 'ابحث في مواد المعهد...' : 'Search institute resources...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-full border border-brand-cream bg-brand-parchment/40 text-sm font-medium text-brand-charcoal focus:outline-none focus:border-brand-bronze placeholder-brand-charcoal/40"
            dir={isRtl ? 'rtl' : 'ltr'}
          />
          <div className={`absolute top-1/2 transform -translate-y-1/2 ${isRtl ? 'left-4' : 'right-4'}`}>
            <Search className="w-4 h-4 text-brand-charcoal/40" />
          </div>
        </div>

        {visibleResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleResources.map((res) => (
              <div
                key={res.id}
                className="bg-white border border-brand-cream hover:border-brand-gold/40 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300"
                dir={isRtl ? 'rtl' : 'ltr'}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[10px] font-bold tracking-widest text-brand-charcoal/40">
                    <span className="uppercase text-brand-bronze">{res.category}</span>
                    <span>{getTypeLabel(res.type)}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start space-x-2.5 space-x-reverse">
                      <div className="mt-1 flex-shrink-0">{getIcon(res.type)}</div>
                      <h4 className={`text-base font-extrabold text-brand-charcoal ${isRtl ? 'font-serif-ar text-lg leading-snug' : 'leading-snug'}`}>
                        {isRtl ? res.titleAr : res.titleEn}
                      </h4>
                    </div>
                    {res.authorAr && (
                      <span className="text-[11px] text-brand-bronze font-medium block">
                        {isRtl ? `تأليف: ${res.authorAr}` : `Author: ${res.authorEn}`}
                      </span>
                    )}
                    <p className={`text-xs text-brand-charcoal/70 leading-relaxed ${isRtl ? 'font-serif-ar text-sm leading-relaxed' : ''}`}>
                      {isRtl ? res.descriptionAr : res.descriptionEn}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-5 mt-6 border-t border-brand-cream">
                  <span className="text-[10px] font-mono text-brand-charcoal/50">
                    {res.type === 'pdf' && res.pages
                      ? (isRtl ? `${res.pages} صفحة (${res.fileSize})` : `${res.pages} pages (${res.fileSize})`)
                      : getTypeLabel(res.type)}
                  </span>

                  {res.type === 'pdf' ? (
                    <button
                      id={`lib-open-${res.id}`}
                      onClick={() => onOpenPdf(res)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-brand-charcoal hover:text-white bg-brand-cream hover:bg-brand-bronze transition-colors flex items-center space-x-1 space-x-reverse"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{isRtl ? 'قراءة ومطالعة' : 'Read'}</span>
                    </button>
                  ) : (
                    <a
                      id={`lib-link-${res.id}`}
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl text-xs font-bold text-brand-charcoal hover:text-white bg-brand-cream hover:bg-brand-bronze transition-colors flex items-center space-x-1 space-x-reverse"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{isRtl ? 'فتح الرابط' : 'Open'}</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-brand-parchment/30 rounded-3xl border border-dashed border-brand-cream">
            <BookOpen className="w-12 h-12 text-brand-charcoal/20 mx-auto mb-4" />
            <h4 className={`text-lg font-bold text-brand-charcoal/70 ${isRtl ? 'font-serif-ar' : ''}`}>
              {isRtl ? 'لا توجد مواد مطابقة للبحث' : 'No matching resources found'}
            </h4>
          </div>
        )}
      </div>
    </section>
  );
}
