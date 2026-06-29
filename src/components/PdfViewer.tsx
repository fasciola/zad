import { useState, useEffect } from 'react';
import { ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Download, Maximize2, Minimize2, X, BookOpen, FileText } from 'lucide-react';
import { Resource, Language } from '../types';

interface PdfViewerProps {
  lang: Language;
  resource: Resource;
  onClose: () => void;
}

export default function PdfViewer({ lang, resource, onClose }: PdfViewerProps) {
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const totalPages = resource.pages || 35;
  const isRtl = lang === 'ar';

  // Realistic sample academic chapters/pages for books to make reading experience magical!
  const getMockPageContent = (page: number) => {
    if (resource.category === 'الفقه') {
      return {
        title: isRtl ? `الباب الأول: في الطهارة وأحكامها (صفحة ${page})` : `Chapter 1: On Purification & Rules (Page ${page})`,
        paragraphs: isRtl ? [
          "طهور مَاء الْبَحْر مِثْل مَاء الْمَطَر، وَكُلُّ مَاءٍ نَزَلَ مِنَ السَّمَاءِ أَوْ نَبَعَ مِنَ الْأَرْضِ فَهُوَ طَاهِرٌ طَهُورٌ يُطَهِّرُ مِنَ الْحَدَثِ وَالْخَبَثِ.",
          "وَشُرُوطُ الصَّلَاةِ طَهَارَةُ الْخَبَثِ مِنَ الثَّوْبِ وَالْبَدَنِ وَالْمَكَانِ، وَطَهَارَةُ الْحَدَثِ بِالْوُضُوءِ أَوْ الْغُسْلِ عِنْدَ وُجُودِ مُوجِبِهِ أَوْ التَّيَمُّمِ عِنْدَ الْعَجْزِ عَنِ اسْتِعْمَالِ الْمَاءِ.",
          "فُرُوضُ الْوُضُوءِ سَبْعَةٌ: النِّيَّةُ، وَغَسْلُ الْوَجْهِ، وَغَسْلُ الْيَدَيْنِ إِلَى الْمِرْفَقَيْنِ، وَمَسْحُ الرَّأْسِ، وَغَسْلُ الرِّجْلَيْنِ إِلَى الْكَعْبَيْنِ، وَالدَّلْكُ، وَالْفَوْرُ."
        ] : [
          "The water of the sea is pure like rain water. Any water descending from the heavens or gushing from the earth is clean and purifying.",
          "The prerequisites of prayer include purification from physical impurities (Khabath) on clothing, body, and place of worship, and minor purification (Wudu).",
          "The obligatory acts of Wudu are seven: Intention, washing the face, washing the hands to the elbows, wiping the head, washing the feet to the ankles, rubbing (Dalk), and sequence (Fawr)."
        ]
      };
    } else if (resource.category === 'التجويد') {
      return {
        title: isRtl ? `الباب الثاني: أحكام النون الساكنة والتنوين (صفحة ${page})` : `Chapter 2: Rules of Noon Sakinah & Tanween (Page ${page})`,
        paragraphs: isRtl ? [
          "لِلنُّونِ إِنْ تَسْكُنْ وَلِلتَّنْوِينِ *** أَرْبَعُ أَحْكَامٍ فَخُذْ تَبْيِينِي",
          "فَالْأَوَّلُ الإِظْهَارُ قَبْلَ أَحْرُفِ *** لِلْحَلْقِ سِتٌّ رُتِّبَتْ فَلْتَعْرِفِ: هَمْزٌ فَهَاءٌ ثُمَّ عَيْنٌ حَاءُ *** مُهْمَلَتَانِ ثُمَّ غَيْنٌ خَاءُ",
          "وَالثَّانِي إِدْغَامٌ بِسِتَّةٍ أَتَتْ *** فِي يَرْمَلُونَ عِنْدَهُمْ قَدْ ثَبَتَتْ، لَكِنَّهَا قِسْمَانِ: قِسْمٌ يُدْغَمَا *** فِيهِ بِغُنَّةٍ بِيَنْمُو عُلِمَا."
        ] : [
          "For Noon if it is silent and for Tanween, there are four rules, so take my explanation:",
          "First is Idhhar (Clarity) before six throat letters: Hamz, Ha, then 'Ayn, Haa, and finally Ghayn, Khaa.",
          "Second is Idgham (Assimilation) with six letters combined in 'Yarmaloon', divided into two parts: one with Ghunnah (nasal sound) combined in 'Yanmoo'."
        ]
      };
    } else {
      return {
        title: isRtl ? `الباب الثالث: في الأدب والأخلاق النبوية (صفحة ${page})` : `Chapter 3: On Manners & Prophetic Ethics (Page ${page})`,
        paragraphs: isRtl ? [
          "عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ أَنَّ رَسُولَ اللَّهِ ﷺ قَالَ: (إِنَّمَا بُعِثْتُ لِأُتَمِّمَ صَالِحَ الْأَخْلَاقِ) رواه أحمد وصححه الألباني.",
          "وَالْأَخْلَاقُ هِيَ عِمَادُ الدِّينِ، وَبِهَا يَرْتَقِي الْمُسْلِمُ فِي دَرَجَاتِ الْإِيمَانِ، وَأَقْرَبُ النَّاسِ مَجْلِساً مِنَ النَّبِيِّ ﷺ يَوْمَ الْقِيَامَةِ أَحَاسِنُهُمْ أَخْلَاقاً.",
          "مِنْ جُمْلَةِ الْأَخْلَاقِ الْحَمِيدَةِ: الصِّدْقُ فِي الْقَوْلِ وَالْعَمَلِ، وَبِرُّ الْوَالِدَيْنِ، وَصِلَةُ الْأَرْحَامِ، وَحُسْنُ الْجِوَارِ، وَالْكَفُّ عَنِ الْأَذَى."
        ] : [
          "On the authority of Abu Hurayrah (RA) that the Messenger of Allah (peace be upon him) said: 'I was sent only to perfect honorable morals.'",
          "Character is the pillar of faith, through which a Muslim rises in the ranks of belief. Those nearest to the Prophet on Resurrection Day will be the best in character.",
          "Among noble characters are: Truthfulness in speech and deed, dutifulness to parents, keeping family ties, being good to neighbors, and refraining from harm."
        ]
      };
    }
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 20, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 20, 60));

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const pageData = getMockPageContent(currentPage);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col animate-fade-in text-white">
      {/* Top Navbar */}
      <div className="bg-brand-charcoal border-b border-white/10 px-6 py-4 flex items-center justify-between" dir={isRtl ? 'rtl' : 'ltr'}>
        <div className="flex items-center space-x-3 space-x-reverse">
          <button
            id="close-reader-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors mr-2 ml-2"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2 space-x-reverse">
            <FileText className="w-5 h-5 text-brand-gold" />
            <div>
              <h2 className="text-sm font-bold truncate max-w-xs md:max-w-md">
                {isRtl ? resource.titleAr : resource.titleEn}
              </h2>
              <span className="text-[10px] text-brand-parchment/60 font-medium">
                {isRtl ? resource.authorAr : resource.authorEn}
              </span>
            </div>
          </div>
        </div>

        {/* Toolbar controls */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center bg-white/5 border border-white/10 rounded-xl px-2">
            <button
              id="zoom-out-btn"
              onClick={handleZoomOut}
              className="p-2 hover:text-brand-gold transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-medium px-2 min-w-[50px] text-center">
              {zoom}%
            </span>
            <button
              id="zoom-in-btn"
              onClick={handleZoomIn}
              className="p-2 hover:text-brand-gold transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          <a
            id="download-pdf-btn"
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 bg-brand-gold hover:bg-brand-gold-hover text-brand-charcoal px-3 py-1.5 rounded-xl text-xs font-bold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isRtl ? 'تحميل PDF' : 'Download PDF'}</span>
          </a>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-grow overflow-auto p-4 md:p-8 flex items-center justify-center">
        <div
          id="pdf-pages-container"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center center' }}
          className="transition-transform duration-200 w-full max-w-2xl bg-[#fdfaf2] text-brand-charcoal p-10 md:p-14 rounded-2xl shadow-2xl border border-brand-cream/30 min-h-[700px] flex flex-col justify-between"
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          {/* Book Header Design */}
          <div className="border-b border-brand-bronze/20 pb-4 mb-6 flex items-center justify-between">
            <span className="text-[10px] tracking-widest font-bold text-brand-bronze uppercase">
              {isRtl ? 'معهد زاد الإلكتروني العلمي' : 'ZAD ONLINE ACADEMY'}
            </span>
            <span className="text-[10px] font-mono font-bold text-brand-charcoal/55">
              {isRtl ? `القسم: ${resource.category}` : `Section: ${resource.category}`}
            </span>
          </div>

          {/* Book Excerpt / Readable Content */}
          <div className="flex-grow flex flex-col justify-start space-y-6">
            <h3 className={`text-xl font-bold text-brand-bronze border-b border-dashed border-brand-bronze/10 pb-2 ${isRtl ? 'font-serif-ar' : 'font-serif-en'}`}>
              {pageData.title}
            </h3>

            <div className="space-y-4">
              {pageData.paragraphs.map((para, idx) => (
                <p
                  key={idx}
                  className={`text-sm md:text-base leading-relaxed text-brand-charcoal/90 text-justify ${
                    isRtl ? 'font-serif-ar text-lg leading-loose' : 'font-sans'
                  }`}
                >
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Book Footer / Note */}
          <div className="border-t border-brand-bronze/10 pt-4 mt-8 flex items-center justify-between text-[10px] text-brand-charcoal/50">
            <span>
              {isRtl ? 'زاد العلم زاد الآخرة' : 'Knowledge builds character.'}
            </span>
            <span className="font-mono">
              {currentPage} / {totalPages}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="bg-brand-charcoal border-t border-white/10 py-4 px-6 flex items-center justify-center space-x-6 space-x-reverse">
        <button
          id="pdf-prev-btn"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`flex items-center space-x-1 space-x-reverse py-2 px-4 rounded-xl text-xs font-semibold ${
            currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/5 text-white'
          }`}
        >
          <ChevronRight className={`w-4 h-4 ${isRtl ? '' : 'rotate-180'}`} />
          <span>{isRtl ? 'الصفحة السابقة' : 'Prev Page'}</span>
        </button>

        <span className="text-sm font-mono font-semibold">
          {isRtl ? `صفحة ${currentPage} من ${totalPages}` : `Page ${currentPage} of ${totalPages}`}
        </span>

        <button
          id="pdf-next-btn"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`flex items-center space-x-1 space-x-reverse py-2 px-4 rounded-xl text-xs font-semibold ${
            currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/5 text-white'
          }`}
        >
          <span>{isRtl ? 'الصفحة التالية' : 'Next Page'}</span>
          <ChevronLeft className={`w-4 h-4 ${isRtl ? '' : 'rotate-180'}`} />
        </button>
      </div>
    </div>
  );
}
