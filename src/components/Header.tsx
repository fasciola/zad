import { useState, useEffect } from 'react';
import { Menu, X, Globe, Lock, BookOpen } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
  onAdminClick: () => void;
  isAdminLoggedIn: boolean;
}

export default function Header({
  lang,
  setLang,
  activeSection,
  setActiveSection,
  onAdminClick,
  isAdminLoggedIn
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'home', labelAr: 'الرئيسية', labelEn: 'Home' },
    { id: 'about', labelAr: 'عن المعهد', labelEn: 'About' },
    { id: 'programs', labelAr: 'البرامج الدراسية', labelEn: 'Programs' },
    { id: 'teachers', labelAr: 'المعلمون', labelEn: 'Teachers' },
    { id: 'library', labelAr: 'المكتبة التعليمية', labelEn: 'Library' },
    { id: 'contact', labelAr: 'تواصل معنا', labelEn: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    
    if (id === 'admin') {
      onAdminClick();
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isRtl = lang === 'ar';

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-light py-3 shadow-sm border-b border-brand-cream'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div 
          onClick={() => handleNavClick('home')} 
          className="flex items-center space-x-3 cursor-pointer group"
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          <div className="w-10 h-10 rounded-full bg-brand-bronze/10 border border-brand-bronze/20 flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
            <BookOpen className="w-5 h-5 text-brand-bronze" />
          </div>
          <div className={`${isRtl ? 'mr-3' : 'ml-3'}`}>
            <h1 className={`font-serif-ar text-lg font-bold text-brand-charcoal leading-tight ${isRtl ? 'font-serif-ar' : 'font-serif-en'}`}>
              {isRtl ? 'معهد زاد الإلكتروني العلمي' : 'Zad Online Islamic Institute'}
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-brand-bronze font-medium -mt-0.5">
              {isRtl ? 'تعلم أينما كنت… وحقق حلمك' : 'Learn from anywhere'}
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1" dir={isRtl ? 'rtl' : 'ltr'}>
          {/* Menu items list has its own spacing direction */}
          <div className={`flex items-center ${isRtl ? 'space-x-reverse space-x-6' : 'space-x-6'}`}>
            {menuItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-sm font-medium transition-colors duration-200 py-1.5 px-1 relative ${
                    isActive
                      ? 'text-brand-bronze'
                      : 'text-brand-charcoal/85 hover:text-brand-bronze'
                  }`}
                >
                  {isRtl ? item.labelAr : item.labelEn}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-bronze rounded-full animate-fade-in" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="h-4 w-[1px] bg-brand-cream mx-4" />

          {/* Controls: Language Switcher & Admin Portal Link */}
          <div className="flex items-center space-x-3 space-x-reverse">
            <button
              id="lang-toggle-btn"
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-brand-cream bg-white/50 text-brand-charcoal hover:bg-brand-cream transition-colors duration-200"
            >
              <Globe className="w-3.5 h-3.5 text-brand-bronze" />
              <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            <button
              id="admin-portal-btn"
              onClick={onAdminClick}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white transition-colors duration-200 ${
                isAdminLoggedIn
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-brand-charcoal hover:bg-brand-bronze'
              }`}
            >
              <Lock className="w-3 h-3" />
              <span>{isRtl ? 'دخول الإدارة' : 'Admin Login'}</span>
            </button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-3">
          <button
            id="mobile-lang-btn"
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-full text-xs font-semibold border border-brand-cream bg-white/50 text-brand-charcoal"
          >
            <Globe className="w-3.5 h-3.5 text-brand-bronze" />
            <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
          </button>

          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-brand-cream transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-brand-charcoal" />
            ) : (
              <Menu className="w-6 h-6 text-brand-charcoal" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-light border-b border-brand-cream shadow-lg absolute top-full left-0 right-0 animate-slide-down">
          <div className="px-6 py-4 space-y-3 flex flex-col" dir={isRtl ? 'rtl' : 'ltr'}>
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-item-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`text-base font-semibold py-2.5 px-3 rounded-lg text-right w-full transition-colors ${
                  activeSection === item.id
                    ? 'bg-brand-bronze/10 text-brand-bronze'
                    : 'text-brand-charcoal hover:bg-brand-cream/50'
                }`}
              >
                {isRtl ? item.labelAr : item.labelEn}
              </button>
            ))}
            <div className="h-[1px] bg-brand-cream my-2" />
            <button
              id="mobile-admin-btn"
              onClick={() => {
                onAdminClick();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-center space-x-2 w-full py-3 px-4 rounded-xl text-sm font-semibold text-white bg-brand-charcoal hover:bg-brand-bronze transition-colors"
            >
              <Lock className="w-4 h-4" />
              <span>{isRtl ? 'دخول الإدارة' : 'Admin Area'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
