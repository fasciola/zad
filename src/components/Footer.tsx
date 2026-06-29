import { BookOpen, Facebook, Twitter, Youtube, ArrowUp, Lock } from 'lucide-react';
import { WebsiteConfig, Language } from '../types';

interface FooterProps {
  lang: Language;
  config: WebsiteConfig;
  activeSection: string;
  setActiveSection: (sec: string) => void;
  onAdminClick: () => void;
}

export default function Footer({ lang, config, activeSection, setActiveSection, onAdminClick }: FooterProps) {
  const isRtl = lang === 'ar';

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-charcoal text-brand-parchment py-16 relative overflow-hidden">
      {/* Subtle background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.02]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={`grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-white/10 pb-12 mb-10 ${isRtl ? 'md:grid-cols-reverse' : ''}`} dir={isRtl ? 'rtl' : 'ltr'}>
          {/* Column 1: Brand details */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-gold">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold font-serif-ar leading-tight">
                  {isRtl ? 'معهد زاد الإلكتروني العلمي' : 'Zad Online Islamic Institute'}
                </h3>
                <span className="text-[10px] uppercase tracking-wider text-brand-gold font-medium block mt-0.5">
                  {isRtl ? 'تعلم أينما كنت… وحقق حلمك' : 'Learn from anywhere'}
                </span>
              </div>
            </div>
            <p className="text-xs text-brand-parchment/70 leading-relaxed max-w-sm">
              {isRtl
                ? 'مدرسة إلكترونية رائدة تهدف لتعليم القرآن الكريم والقراءات المتواترة والعلوم الشرعية وفق منهج علمي رصين وأصيل.'
                : 'A leading online institute dedicated to teaching the Holy Qur’an, and authentic Islamic sciences.'}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-gold">
              {isRtl ? 'روابط سريعة' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2 text-xs text-brand-parchment/80">
              <li>
                <button id="footer-link-home" onClick={() => handleNavClick('home')} className="hover:text-brand-gold transition-colors">
                  {isRtl ? 'الصفحة الرئيسية' : 'Home'}
                </button>
              </li>
              <li>
                <button id="footer-link-about" onClick={() => handleNavClick('about')} className="hover:text-brand-gold transition-colors">
                  {isRtl ? 'عن المعهد ورسالتنا' : 'About & Mission'}
                </button>
              </li>
              <li>
                <button id="footer-link-programs" onClick={() => handleNavClick('programs')} className="hover:text-brand-gold transition-colors">
                  {isRtl ? 'البرامج العلمية' : 'Our Programs'}
                </button>
              </li>
              <li>
                <button id="footer-link-library" onClick={() => handleNavClick('library')} className="hover:text-brand-gold transition-colors">
                  {isRtl ? 'المكتبة المفتوحة' : 'Educational Library'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Communication & Social */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-gold">
              {isRtl ? 'متابعة المعهد' : 'Stay Connected'}
            </h4>
            <p className="text-xs text-brand-parchment/70">
              {isRtl ? 'تابع قنوات المعهد الرسمية للاطلاع على الفوائد والحلقات العلمية المباشرة.' : 'Follow our accounts for benefits, reminders, and news.'}
            </p>
            <div className="flex items-center space-x-3 space-x-reverse pt-2">
              <a
                id="footer-social-facebook"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:border-brand-gold hover:text-brand-gold flex items-center justify-center transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                id="footer-social-twitter"
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:border-brand-gold hover:text-brand-gold flex items-center justify-center transition-colors"
                title="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                id="footer-social-youtube"
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:border-brand-gold hover:text-brand-gold flex items-center justify-center transition-colors"
                title="Youtube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-brand-parchment/50" dir={isRtl ? 'rtl' : 'ltr'}>
          <span>
            {isRtl
              ? 'معهد زاد الإلكتروني العلمي © ٢٠٢٦. جميع الحقوق محفوظة وقف لله تعالى.'
              : 'Zad Online Islamic Institute © 2026. All rights reserved. Waqf.'}
          </span>

          <div className="flex items-center space-x-4 space-x-reverse">
            <button
              id="footer-admin-btn"
              onClick={onAdminClick}
              className="flex items-center space-x-1 hover:text-brand-gold transition-colors"
            >
              <Lock className="w-3 h-3" />
              <span>{isRtl ? 'بوابة دخول الإدارة المعلمة' : 'Admin Login'}</span>
            </button>
            
            <button
              id="footer-scroll-top-btn"
              onClick={handleScrollToTop}
              className="flex items-center space-x-1 hover:text-brand-gold transition-colors"
            >
              <span>{isRtl ? 'الرجوع للأعلى' : 'Back to top'}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
