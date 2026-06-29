import { useState, useMemo } from 'react';
import { Search, FileText, Headphones, Video, ExternalLink, BookOpen, Star, HelpCircle, Eye, ArrowLeft, ArrowRight } from 'lucide-react';
import { Resource, Language } from '../types';

interface LibrarySectionProps {
  lang: Language;
  resources: Resource[];
  onOpenPdf: (res: Resource) => void;
}

export const CATEGORIES_AR = [
  'الكل',
  'القرآن الكريم',
  'التجويد',
  'الفقه',
  'العقيدة',
  'السيرة النبوية',
  'الحديث',
  'التربية الإسلامية',
  'مواد للأطفال',
  'روابط مفيدة'
];

export const CATEGORIES_EN = [
  'All',
  'Qur’an',
  'Tajweed',
  'Fiqh',
  'Aqeedah',
  'Seerah',
  'Hadith',
  'Islamic Education',
  'Children’s Resources',
  'Useful Links'
];

// Map English selected categories to match realistic library data
const categoryMap: { [key: string]: string } = {
  'All': 'الكل',
  'Qur’an': 'القرآن الكريم',
  'Tajweed': 'التجويد',
  'Fiqh': 'الفقه',
  'Aqeedah': 'العقيدة',
  'Seerah': 'السيرة النبوية',
  'Hadith': 'الحديث',
  'Islamic Education': 'التربية الإسلامية',
  'Children’s Resources': 'مواد للأطفال',
  'Useful Links': 'روابط مفيدة'
};

export default function LibrarySection({ lang, resources, onOpenPdf }: LibrarySectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const isRtl = lang === 'ar';

  const categories = isRtl ? CATEGORIES_AR : CATEGORIES_EN;

  // Filter resources based on selected category and search term
  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      // Category filter
      const categoryMatch =
        selectedCategoryIndex === 0 ||
        resource.category === CATEGORIES_AR[selectedCategoryIndex] ||
        resource.category === categoryMap[CATEGORIES_EN[selectedCategoryIndex]];

      // Search term filter
      const searchLower = searchTerm.toLowerCase();
      const textMatch =
        resource.titleAr.toLowerCase().includes(searchLower) ||
        resource.titleEn.toLowerCase().includes(searchLower) ||
        resource.descriptionAr.toLowerCase().includes(searchLower) ||
        resource.descriptionEn.toLowerCase().includes(searchLower);

      return categoryMatch && textMatch;
    });
  }, [resources, selectedCategoryIndex, searchTerm]);

  // Featured resources
  const featuredResources = useMemo(() => {
    return resources.filter(res => res.isFeatured);
  }, [resources]);

  const getIcon = (type: string) => {
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

  const getTypeLabel = (type: string) => {
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
      {/* Background decoration */}
      <div className="absolute -left-36 top-1/3 w-96 h-96 rounded-full bg-brand-parchment/60 filter blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 space-x-reverse px-3 py-1 rounded-full bg-brand-bronze/10 text-brand-bronze text-xs font-bold tracking-wider">
            <span>{isRtl ? 'المكتبة التعليمية' : 'EDUCATIONAL LIBRARY'}</span>
          </div>
          <h2 className={`text-3xl md:text-4xl font-extrabold text-brand-charcoal ${isRtl ? 'font-serif-ar' : 'font-serif-en'}`}>
            {isRtl ? 'مصادر مجانية وكتب ومقاطع علمية' : 'Curated Islamic Knowledge & Materials'}
          </h2>
          <p className="text-brand-charcoal/70 text-sm max-w-md mx-auto">
            {isRtl ? 'تصفح وحمّل مصادر المعرفة والكتب الشرعية الموثوقة مجاناً' : 'Browse and download beneficial books, articles, and external links for free.'}
          </p>
          <div className="w-16 h-1 bg-brand-gold mx-auto rounded-full" />
        </div>

        {/* Featured Resources Section (If any) */}
        {featuredResources.length > 0 && selectedCategoryIndex === 0 && !searchTerm && (
          <div className="mb-16 space-y-6">
            <div className="flex items-center space-x-2 space-x-reverse text-brand-bronze">
              <Star className="w-4 h-4 fill-brand-gold text-brand-gold animate-pulse" />
              <h3 className={`text-lg font-bold ${isRtl ? 'font-serif-ar' : 'font-serif-en'}`}>
                {isRtl ? 'إصدارات ومصادر مميزة' : 'Featured & Highly Recommended'}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredResources.map((res) => (
                <div
                  key={res.id}
                  className="bg-brand-parchment/40 border border-brand-gold/30 rounded-2xl p-5 flex space-x-4 space-x-reverse hover:shadow-md transition-shadow duration-300 relative group"
                  dir={isRtl ? 'rtl' : 'ltr'}
                >
                  {/* Resource cover photo */}
                  <div className="w-24 h-32 flex-shrink-0 overflow-hidden rounded-xl border border-brand-cream bg-white relative">
                    <img
                      src={res.coverUrl || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=150&q=80'}
                      alt={isRtl ? res.titleAr : res.titleEn}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-1 left-1 right-auto p-1 rounded-full bg-brand-gold text-brand-charcoal shadow">
                      <Star className="w-3 h-3 fill-brand-charcoal text-brand-charcoal" />
                    </div>
                  </div>

                  {/* Resource details */}
                  <div className="flex-grow flex flex-col justify-between py-1">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-brand-bronze block">
                        {res.category}
                      </span>
                      <h4 className={`text-sm font-extrabold text-brand-charcoal line-clamp-2 ${isRtl ? 'font-serif-ar leading-tight text-base' : 'leading-tight'}`}>
                        {isRtl ? res.titleAr : res.titleEn}
                      </h4>
                      <p className="text-[11px] text-brand-charcoal/60 line-clamp-2 leading-relaxed">
                        {isRtl ? res.descriptionAr : res.descriptionEn}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-[10px] font-bold text-brand-charcoal/50 flex items-center space-x-1 space-x-reverse">
                        {getIcon(res.type)}
                        <span>{getTypeLabel(res.type)}</span>
                      </span>

                      {res.type === 'pdf' ? (
                        <button
                          id={`feat-open-${res.id}`}
                          onClick={() => onOpenPdf(res)}
                          className="text-[11px] font-extrabold text-brand-bronze hover:text-brand-gold flex items-center space-x-1 space-x-reverse"
                        >
                          <span>{isRtl ? 'عرض الكتاب' : 'Read Now'}</span>
                          {isRtl ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                        </button>
                      ) : (
                        <a
                          id={`feat-link-${res.id}`}
                          href={res.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-extrabold text-brand-bronze hover:text-brand-gold flex items-center space-x-1 space-x-reverse"
                        >
                          <span>{isRtl ? 'فتح الرابط' : 'Open Link'}</span>
                          {isRtl ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filter controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 pb-6 border-b border-brand-cream" dir={isRtl ? 'rtl' : 'ltr'}>
          {/* Categories Horizontal Scrolling Tab */}
          <div className="w-full md:max-w-3xl overflow-x-auto scrollbar-none flex space-x-2 space-x-reverse pb-2">
            {categories.map((cat, index) => (
              <button
                key={index}
                id={`cat-tab-${index}`}
                onClick={() => setSelectedCategoryIndex(index)}
                className={`flex-shrink-0 text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-200 ${
                  selectedCategoryIndex === index
                    ? 'bg-brand-bronze border-brand-bronze text-white shadow-sm'
                    : 'bg-brand-parchment/60 border-brand-cream text-brand-charcoal/80 hover:bg-brand-cream'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar Input */}
          <div className="relative w-full md:w-72">
            <input
              id="library-search-input"
              type="text"
              placeholder={isRtl ? 'ابحث عن كتب ومواد علمية...' : 'Search resources...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-brand-cream bg-brand-parchment/40 text-xs font-medium text-brand-charcoal focus:outline-none focus:border-brand-bronze placeholder-brand-charcoal/40"
              dir={isRtl ? 'rtl' : 'ltr'}
            />
            <div className={`absolute top-1/2 transform -translate-y-1/2 ${isRtl ? 'left-4' : 'right-4'}`}>
              <Search className="w-4 h-4 text-brand-charcoal/40" />
            </div>
          </div>
        </div>

        {/* Library Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((res) => (
              <div
                key={res.id}
                className="bg-white border border-brand-cream hover:border-brand-gold/40 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300"
                dir={isRtl ? 'rtl' : 'ltr'}
              >
                <div className="space-y-4">
                  {/* Header / Type / Date */}
                  <div className="flex items-center justify-between text-[10px] font-bold tracking-widest text-brand-charcoal/40">
                    <span className="uppercase text-brand-bronze">{res.category}</span>
                    <span>{new Date(res.createdAt).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US')}</span>
                  </div>

                  {/* Body Content */}
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2.5 space-x-reverse">
                      <div className="mt-1 flex-shrink-0">
                        {getIcon(res.type)}
                      </div>
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

                {/* Footer Info & Action */}
                <div className="flex items-center justify-between pt-5 mt-6 border-t border-brand-cream">
                  {/* Extra info file size / pages */}
                  <span className="text-[10px] font-mono text-brand-charcoal/50">
                    {res.type === 'pdf' && res.pages
                      ? (isRtl ? `${res.pages} صفحة (${res.fileSize})` : `${res.pages} pages (${res.fileSize})`)
                      : getTypeLabel(res.type)}
                  </span>

                  {/* Open button */}
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
            <HelpCircle className="w-12 h-12 text-brand-charcoal/20 mx-auto mb-4 animate-pulse" />
            <h4 className={`text-lg font-bold text-brand-charcoal/70 ${isRtl ? 'font-serif-ar' : ''}`}>
              {isRtl ? 'لا توجد نتائج مطابقة لبحثك' : 'No matching resources found'}
            </h4>
            <p className="text-xs text-brand-charcoal/50 mt-1">
              {isRtl ? 'حاول تغيير معايير البحث أو تصفح الأقسام الأخرى' : 'Try searching different keywords or tabs.'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
