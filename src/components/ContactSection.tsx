import React, { useState } from 'react';
import { Mail, Phone, Clock, MessageSquare, AlertCircle, CheckCircle2, MessageCircle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { WebsiteConfig, Language } from '../types';
import { submitContactMessage } from '../lib/firebase';

interface ContactSectionProps {
  lang: Language;
  config: WebsiteConfig;
}

const FAQS_AR = [
  {
    q: 'كيف يمكنني التسجيل أو الانضمام للحلقات الدراسية؟',
    a: 'التسجيل ميسر للغاية، كل ما عليك هو التواصل معنا مباشرة عبر الوتساب من خلال الضغط على زر التواصل العائم، أو ملء استمارة الاتصال وسيتصل بك منسق المعهد لترتيب الموعد وحلقة المذاكرة المناسبة لك.'
  },
  {
    q: 'هل المصادر والكتب والمواد بالمكتبة مجانية؟',
    a: 'نعم، جميع المواد والكتب وملفات الـ PDF والتسجيلات الصوتية والمرئية المتاحة في مكتبتنا التعليمية عامة ومفتوحة للجميع بشكل مجاني تماماً، وهي خدمة وقفية لخدمة طلاب العلم والمسلمين حول العالم.'
  },
  {
    q: 'ما هي طرق التدريس والأدوات المستخدمة عن بعد؟',
    a: 'نستخدم غرف فصول تفاعلية مباشرة عبر زووم (Zoom) وجوجل ميت (Google Meet) مما يتيح تواصل حي وتفاعلي مباشر بين المعلم والطالب، مع إمكانية مشاركة الشاشة لمتابعة تلاوة القرآن وضبط التجويد بدقة.'
  },
  {
    q: 'هل توجد برامج مخصصة للأطفال والجاليات في الغرب؟',
    a: 'نعم بالتأكيد، لدينا برنامج "زاد البراعم والناشئة" وهو مصمم بعناية للأطفال واليافعين، مع مراعاة فارق التوقيت وتقديم دروس مبسطة وممتعة ومحببة تغرس فيهم حب الدين والقيم النبيلة.'
  }
];

const FAQS_EN = [
  {
    q: 'How can I register or join the educational classes?',
    a: 'Registration is very simple. Just contact us directly via WhatsApp using the floating button, or fill out the contact form. Our institute coordinator will get in touch to arrange the timings and choose the right study circle for you.'
  },
  {
    q: 'Are the resources, books, and materials in the library free?',
    a: 'Yes, all books, PDFs, audio guides, and materials available in our educational library are entirely public and free. It is an endowment service (Waqf) to support seekers of knowledge and Muslims worldwide.'
  },
  {
    q: 'What teaching methods and tools are used for remote classes?',
    a: 'We use live, highly interactive online rooms via Zoom and Google Meet. This allows live face-to-face interaction between teachers and students, with screen sharing for tracking Quran recitation and adjusting Tajweed rules.'
  },
  {
    q: 'Are there dedicated programs for children and western communities?',
    a: 'Yes, indeed. We have the "Zad Program for Children & Youth" which is carefully tailored for kids and teenagers, respecting time zones and presenting enjoyable simplified lessons that plant the love of faith and noble values.'
  }
];

export default function ContactSection({ lang, config }: ContactSectionProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const isRtl = lang === 'ar';
  const faqs = isRtl ? FAQS_AR : FAQS_EN;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    // Dynamic simple validation
    if (!fullName || !email || !phone || !subject || !message) {
      setSubmitError(isRtl ? 'الرجاء ملء جميع الحقول المطلوبة بشكل صحيح.' : 'Please fill in all required fields correctly.');
      setIsSubmitting(false);
      return;
    }

    try {
      await submitContactMessage({
        fullName,
        email,
        phone,
        subject,
        message
      });

      setSubmitSuccess(true);
      setFullName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    } catch (err) {
      console.error(err);
      setSubmitError(isRtl ? 'حدث خطأ أثناء إرسال رسالتك، الرجاء المحاولة مجدداً.' : 'An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppLink = () => {
    const text = isRtl
      ? 'السلام عليكم ورحمة الله، أرغب في التواصل معكم بخصوص التسجيل في حلقات المعهد.'
      : 'Assalamu Alaikum, I would like to get in touch regarding enrolling in the institute circles.';
    return `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="contact" className="py-24 bg-brand-parchment relative overflow-hidden">
      {/* Background Subtle Highlight */}
      <div className="absolute right-0 bottom-0 w-80 h-80 rounded-full bg-brand-cream/30 filter blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 space-x-reverse px-3 py-1 rounded-full bg-brand-bronze/10 text-brand-bronze text-xs font-bold tracking-wider">
            <span>{isRtl ? 'تواصل معنا' : 'GET IN TOUCH'}</span>
          </div>
          <h2 className={`text-3xl md:text-4xl font-extrabold text-brand-charcoal ${isRtl ? 'font-serif-ar' : 'font-serif-en'}`}>
            {isRtl ? 'يسعدنا تواصلكم وخدمتكم' : 'We Are Welcoming Your Inquiries'}
          </h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto rounded-full" />
        </div>

        {/* Info Cards / Form Layout */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-start ${isRtl ? 'lg:grid-cols-reverse' : ''}`}>
          {/* Left Column: Direct info cards */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className={`text-xl font-bold text-brand-charcoal ${isRtl ? 'font-serif-ar' : 'font-serif-en'}`}>
              {isRtl ? 'قنوات التواصل المباشر' : 'Direct Channels'}
            </h3>
            <p className="text-brand-charcoal/85 text-xs leading-relaxed">
              {isRtl
                ? 'أسرع طريقة للاستفسار وحجز مقعدك هي التواصل معنا عبر واتساب مباشرة.'
                : 'The fastest way to inquire and book your seat is to chat with us via WhatsApp directly.'}
            </p>

            <div className="space-y-4 pt-2">
              {/* WhatsApp Premium Link card */}
              <a
                id="contact-whatsapp-card"
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 space-x-reverse p-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 shadow-sm transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white flex-shrink-0">
                  <MessageCircle className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-800">
                    {isRtl ? 'تواصل معنا سريعاً عبر واتساب' : 'Chat Instantly on WhatsApp'}
                  </h4>
                  <p className="text-[11px] text-emerald-600/90 mt-0.5">
                    {isRtl ? 'متاح للرد والاستفسارات طوال اليوم' : 'Active and available throughout the day'}
                  </p>
                </div>
              </a>

              {/* Email Card */}
              <div className="flex items-center space-x-4 space-x-reverse p-4 rounded-2xl bg-white border border-brand-cream shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-brand-bronze/10 flex items-center justify-center text-brand-bronze flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-brand-charcoal/40 uppercase tracking-wider">
                    {isRtl ? 'البريد الإلكتروني' : 'Email Address'}
                  </h4>
                  <a href={`mailto:${config.email}`} className="text-sm font-bold text-brand-charcoal hover:text-brand-bronze">
                    {config.email}
                  </a>
                </div>
              </div>

              {/* Phone Card */}
              <div className="flex items-center space-x-4 space-x-reverse p-4 rounded-2xl bg-white border border-brand-cream shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-brand-bronze/10 flex items-center justify-center text-brand-bronze flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-brand-charcoal/40 uppercase tracking-wider">
                    {isRtl ? 'رقم الهاتف' : 'Phone Number'}
                  </h4>
                  <a href={`tel:${config.phone}`} className="text-sm font-bold text-brand-charcoal hover:text-brand-bronze">
                    {config.phone}
                  </a>
                </div>
              </div>

              {/* Working Hours Card */}
              <div className="flex items-center space-x-4 space-x-reverse p-4 rounded-2xl bg-white border border-brand-cream shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-brand-bronze/10 flex items-center justify-center text-brand-bronze flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-brand-charcoal/40 uppercase tracking-wider">
                    {isRtl ? 'أوقات العمل واستقبال الاستفسارات' : 'Working & Reception Hours'}
                  </h4>
                  <p className="text-sm font-bold text-brand-charcoal">
                    {isRtl ? 'السبت - الخميس: 9:00 ص - 9:00 م (بتوقيت مكة)' : 'Sat - Thu: 9:00 AM - 9:00 PM (Makkah Time)'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-brand-cream shadow-sm space-y-6">
            <h3 className={`text-xl font-bold text-brand-charcoal ${isRtl ? 'font-serif-ar' : 'font-serif-en'}`}>
              {isRtl ? 'أرسل لنا رسالة مباشرة' : 'Send a Direct Message'}
            </h3>

            {submitSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 space-y-3 animate-fade-in" dir={isRtl ? 'rtl' : 'ltr'}>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h4 className="font-extrabold text-sm">
                    {isRtl ? 'تم إرسال رسالتك بنجاح!' : 'Message Sent Successfully!'}
                  </h4>
                </div>
                <p className="text-xs text-emerald-700/90 leading-relaxed">
                  {isRtl
                    ? 'نشكرك على تواصلك مع معهد زاد. سنتواصل معك عبر بريدك الإلكتروني أو رقم هاتف الوتساب بأسرع وقت ممكن.'
                    : 'Thank you for reaching out to Zad Institute. We will contact you via your email or WhatsApp number as soon as possible.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4" dir={isRtl ? 'rtl' : 'ltr'}>
                {submitError && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center space-x-2 space-x-reverse">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-brand-charcoal/70">
                      {isRtl ? 'الاسم الكامل *' : 'Full Name *'}
                    </label>
                    <input
                      id="contact-name-input"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-cream bg-brand-parchment/30 text-xs text-brand-charcoal focus:outline-none focus:border-brand-bronze"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-brand-charcoal/70">
                      {isRtl ? 'البريد الإلكتروني *' : 'Email Address *'}
                    </label>
                    <input
                      id="contact-email-input"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-cream bg-brand-parchment/30 text-xs text-brand-charcoal focus:outline-none focus:border-brand-bronze"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Phone field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-brand-charcoal/70">
                      {isRtl ? 'رقم الهاتف أو واتساب *' : 'Phone or WhatsApp *'}
                    </label>
                    <input
                      id="contact-phone-input"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-cream bg-brand-parchment/30 text-xs text-brand-charcoal focus:outline-none focus:border-brand-bronze"
                    />
                  </div>

                  {/* Subject field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-brand-charcoal/70">
                      {isRtl ? 'الموضوع *' : 'Subject *'}
                    </label>
                    <input
                      id="contact-subject-input"
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-cream bg-brand-parchment/30 text-xs text-brand-charcoal focus:outline-none focus:border-brand-bronze"
                    />
                  </div>
                </div>

                {/* Message field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-brand-charcoal/70">
                    {isRtl ? 'الرسالة *' : 'Message *'}
                  </label>
                  <textarea
                    id="contact-message-input"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-cream bg-brand-parchment/30 text-xs text-brand-charcoal focus:outline-none focus:border-brand-bronze resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-bronze hover:bg-brand-charcoal text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-colors duration-200"
                >
                  {isSubmitting
                    ? (isRtl ? 'جاري الإرسال...' : 'Sending...')
                    : (isRtl ? 'إرسال الرسالة' : 'Send Message')}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ Block below */}
        <div className="mt-24 pt-12 border-t border-brand-cream">
          <div className="flex items-center space-x-3 space-x-reverse mb-10 justify-center">
            <HelpCircle className="w-5 h-5 text-brand-bronze" />
            <h3 className={`text-2xl font-bold text-brand-charcoal ${isRtl ? 'font-serif-ar' : 'font-serif-en'}`}>
              {isRtl ? 'الأسئلة الشائعة ومخاوف الطلاب' : 'Frequently Asked Questions'}
            </h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white border border-brand-cream rounded-2xl overflow-hidden shadow-sm transition-all duration-300"
                  dir={isRtl ? 'rtl' : 'ltr'}
                >
                  <button
                    id={`faq-toggle-${index}`}
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-right hover:bg-brand-parchment/40 transition-colors"
                  >
                    <span className={`text-sm md:text-base font-bold text-brand-charcoal leading-snug ${isRtl ? 'font-serif-ar' : ''}`}>
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-brand-bronze flex-shrink-0 mr-3 ml-3" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-brand-bronze flex-shrink-0 mr-3 ml-3" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs md:text-sm text-brand-charcoal/80 leading-relaxed border-t border-brand-parchment bg-brand-parchment/10">
                      <p className={isRtl ? 'font-serif-ar text-base leading-relaxed' : ''}>
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
