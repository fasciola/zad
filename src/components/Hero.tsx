import { ArrowDown, BookOpen, MessageSquare } from 'lucide-react';
import { WebsiteConfig, Language } from '../types';

interface HeroProps {
  lang: Language;
  config: WebsiteConfig;
  onExploreLibrary: () => void;
  onContactUs: () => void;
}

export default function Hero({ lang, config, onExploreLibrary, onContactUs }: HeroProps) {
  const isRtl = lang === 'ar';

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-[#F5F2EA] overflow-hidden pt-16"
    >
      {/* Cinematic Background Image with Parallax Style */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-islamic-study.jpg"
          alt="Islamic Studies Library Background"
          className="w-full h-full object-cover object-center filter opacity-[0.08] mix-blend-multiply"
        />
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.03]" />
      </div>

      {/* Centered Translucent Glass Content Panel */}
      <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
        <div className="glass-light p-8 md:p-14 rounded-3xl border border-brand-cream/80 shadow-xl space-y-8 animate-fade-in-up bg-[#FDFCF7]/85">
          {/* Subtle Accent Badge */}
          <div className="inline-flex items-center space-x-2 space-x-reverse px-4 py-1.5 rounded-full bg-brand-bronze/10 border border-brand-gold/30">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
            <span className={`text-xs font-semibold uppercase tracking-widest text-brand-gold ${isRtl ? 'font-serif-ar' : 'font-sans'}`}>
              {isRtl ? 'بناء معرفي متين وأصيل' : 'AUTHENTIC SYSTEMATIC KNOWLEDGE'}
            </span>
          </div>

          {/* Heading */}
          <h2
            className={`text-3xl md:text-5xl lg:text-6xl font-extrabold text-brand-charcoal leading-tight ${
              isRtl ? 'font-serif-ar' : 'font-serif-en'
            }`}
          >
            {isRtl ? config.heroTitleAr : config.heroTitleEn}
          </h2>

          {/* Subtitle */}
          <p
            className={`text-base md:text-lg text-brand-charcoal/80 max-w-2xl mx-auto leading-relaxed ${
              isRtl ? 'font-serif-ar text-lg' : 'font-sans'
            }`}
          >
            {isRtl ? config.heroSubtitleAr : config.heroSubtitleEn}
          </p>

          <div className="h-[1px] bg-gradient-to-r from-transparent via-brand-gold/25 to-transparent my-6" />

          {/* Call to Actions */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
            <button
              id="hero-contact-btn"
              onClick={onContactUs}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 space-x-reverse bg-brand-gold hover:bg-brand-gold-hover text-white font-bold px-8 py-4 rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{isRtl ? 'تواصل معنا' : 'Contact Us'}</span>
            </button>

            <button
              id="hero-explore-btn"
              onClick={onExploreLibrary}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 space-x-reverse border border-brand-charcoal hover:bg-brand-charcoal hover:text-white text-brand-charcoal font-semibold px-8 py-4 rounded-xl transition-all duration-300 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-brand-gold" />
              <span>{isRtl ? 'استكشف المكتبة' : 'Explore the Library'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce cursor-pointer">
        <button
          id="scroll-down-indicator"
          onClick={() => {
            const nextSec = document.getElementById('about');
            if (nextSec) nextSec.scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-10 h-10 rounded-full border border-brand-charcoal/20 flex items-center justify-center text-brand-gold hover:border-brand-gold hover:text-brand-charcoal transition-colors cursor-pointer"
        >
          <ArrowDown className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
