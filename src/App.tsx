import { useState, useEffect } from 'react';
import { MessageCircle, ArrowUp, BookOpen, Sparkles, Check } from 'lucide-react';
import { Language, WebsiteConfig, Resource, Program, Teacher } from './types';
import { getWebsiteConfig, getResources, getPrograms, getTeachers, auth } from './lib/firebase';
import { defaultWebsiteConfig, defaultResources, defaultPrograms, defaultTeachers } from './data/defaultData';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ProgramsSection from './components/ProgramsSection';
import TeachersSection from './components/TeachersSection';
import LibrarySection from './components/LibrarySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import PdfViewer from './components/PdfViewer';
import AdminDashboard from './components/AdminDashboard';
import { onAuthStateChanged } from 'firebase/auth';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [config, setConfig] = useState<WebsiteConfig>(defaultWebsiteConfig);
  const [resources, setResources] = useState<Resource[]>(defaultResources);
  const [programs, setPrograms] = useState<Program[]>(defaultPrograms);
  const [teachers, setTeachers] = useState<Teacher[]>(defaultTeachers);

  // States for active features
  const [activeSection, setActiveSection] = useState('home');
  const [selectedPdf, setSelectedPdf] = useState<Resource | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load configuration and data from Firebase
  const loadAllData = async () => {
    try {
      const [fetchedConfig, fetchedResources, fetchedPrograms, fetchedTeachers] = await Promise.all([
        getWebsiteConfig(),
        getResources(),
        getPrograms(),
        getTeachers()
      ]);

      setConfig(fetchedConfig);
      setResources(fetchedResources);
      setPrograms(fetchedPrograms);
      setTeachers(fetchedTeachers);
    } catch (error) {
      console.error('Failed to load dynamic data from Firebase. Offline mode activated.', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();

    // Listen to admin auth state change to highlight the header button
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAdminLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  // Set document title and language metadata dynamically
  useEffect(() => {
    const isRtl = lang === 'ar';
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.title = isRtl 
      ? 'معهد زاد الإلكتروني العلمي | لتعليم القرآن والعلوم الشرعية'
      : 'Zad Online Islamic Institute | Qur’an & Islamic Studies';
  }, [lang]);

  // Handle active navigation section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'programs', 'teachers', 'library', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isRtl = lang === 'ar';

  const getWhatsAppLink = () => {
    const text = isRtl
      ? 'السلام عليكم ورحمة الله، أود الاستفسار عن برامج معهد زاد وحلقات الحفظ والتعليم عن بعد.'
      : 'Assalamu Alaikum, I would like to inquire about Zad Online Islamic Institute and remote classes.';
    return `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const navigateToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-parchment flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-brand-bronze border-t-transparent animate-spin" />
        <h2 className="font-serif-ar text-brand-charcoal font-bold text-lg animate-pulse">
          {isRtl ? 'جاري تهيئة صرح زاد العلمي...' : 'Loading Zad Online Institute...'}
        </h2>
      </div>
    );
  }

  return (
    <div className={`min-h-screen selection:bg-brand-gold selection:text-brand-charcoal bg-brand-parchment font-sans antialiased text-brand-charcoal overflow-x-hidden`} dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Dynamic Header */}
      <Header
        lang={lang}
        setLang={setLang}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onAdminClick={() => setIsAdminOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* Main Home Sections */}
      <main>
        {/* Full Screen Hero with dark cinematic overlay */}
        <Hero
          lang={lang}
          config={config}
          onExploreLibrary={() => navigateToSection('library')}
          onContactUs={() => navigateToSection('contact')}
        />

        {/* Short introduction citation */}
        <section className="py-12 bg-brand-cream/30 border-y border-brand-cream/60">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <p className={`text-base md:text-xl font-medium text-brand-bronze italic leading-relaxed max-w-4xl mx-auto ${isRtl ? 'font-serif-ar text-2xl leading-loose' : 'font-serif-en'}`}>
              {isRtl
                ? '«نساعد الطلاب والمهتمين بالعلوم الشرعية على الوصول إلى مصادر تعليمية وبرامج معرفية منظمة من أي مكان في العالم»'
                : '“We help students and seekers of knowledge access organised Islamic learning programs and educational resources from anywhere.”'}
            </p>
          </div>
        </section>

        {/* About the Academy Section */}
        <AboutSection lang={lang} config={config} />

        {/* Programs Grid Section */}
        <ProgramsSection
          lang={lang}
          programs={programs}
          whatsappNumber={config.whatsappNumber}
          onContactUs={() => navigateToSection('contact')}
        />

        {/* Teachers and Scholars Profiles Section */}
        <TeachersSection lang={lang} teachers={teachers} />

        {/* Free Public Resources Educational Library */}
        <LibrarySection
          lang={lang}
          resources={resources}
          onOpenPdf={(res) => setSelectedPdf(res)}
        />

        {/* Contact and FAQ Section */}
        <ContactSection lang={lang} config={config} />
      </main>

      {/* Premium Bilingual Footer */}
      <Footer
        lang={lang}
        config={config}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onAdminClick={() => setIsAdminOpen(true)}
      />

      {/* Premium Floating WhatsApp Enquiry button */}
      <div className={`fixed bottom-6 z-40 ${isRtl ? 'left-6' : 'right-6'}`}>
        <a
          id="floating-whatsapp-btn"
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 relative group border border-white/10"
          title={isRtl ? 'تواصل معنا عبر واتساب' : 'Chat with us on WhatsApp'}
        >
          <MessageCircle className="w-7 h-7" />
          
          {/* Subtle breathing ripple element */}
          <span className="absolute inset-0 rounded-full border-4 border-emerald-400 animate-ping opacity-25" />
          
          {/* Tooltip on Hover */}
          <span className={`absolute top-1/2 -translate-y-1/2 hidden group-hover:block bg-brand-charcoal text-white text-[11px] font-bold py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap ${isRtl ? 'right-16' : 'left-16'}`}>
            {isRtl ? 'تواصل معنا مباشرة عبر واتساب' : 'Chat instantly via WhatsApp'}
          </span>
        </a>
      </div>

      {/* Full screen Custom PDF Reader portal */}
      {selectedPdf && (
        <PdfViewer
          lang={lang}
          resource={selectedPdf}
          onClose={() => setSelectedPdf(null)}
        />
      )}

      {/* Admin dashboard and Login gateway portal modal */}
      {isAdminOpen && (
        <AdminDashboard
          lang={lang}
          config={config}
          resources={resources}
          programs={programs}
          teachers={teachers}
          onRefreshData={loadAllData}
          onClose={() => setIsAdminOpen(false)}
        />
      )}
    </div>
  );
}
