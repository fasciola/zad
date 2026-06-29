import React, { useState, useEffect } from 'react';
import { LogIn, LogOut, FileText, Settings, Inbox, Plus, Edit, Trash2, Check, AlertCircle, Sparkles, BookOpen, Users, Globe, ExternalLink } from 'lucide-react';
import { Resource, Message, WebsiteConfig, Program, Teacher, Language } from '../types';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, saveResource, deleteResource, updateWebsiteConfig, getContactMessages, deleteContactMessage, saveProgram, deleteProgram, saveTeacher, deleteTeacher } from '../lib/firebase';
import { CATEGORIES_AR, CATEGORIES_EN } from './LibrarySection';

interface AdminDashboardProps {
  lang: Language;
  config: WebsiteConfig;
  resources: Resource[];
  programs: Program[];
  teachers: Teacher[];
  onRefreshData: () => void;
  onClose: () => void;
}

export default function AdminDashboard({
  lang,
  config,
  resources,
  programs,
  teachers,
  onRefreshData,
  onClose
}: AdminDashboardProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<any>(null);
  const [authError, setAuthError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Dashboard Tabs
  const [activeTab, setActiveTab] = useState<'resources' | 'programs' | 'teachers' | 'config' | 'messages'>('resources');

  // Contact Messages Inbox state
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  // Success/Error notifications for saves
  const [actionSuccess, setActionSuccess] = useState('');
  const [actionError, setActionError] = useState('');

  // Editing items state
  const [isEditingResource, setIsEditingResource] = useState(false);
  const [currentResource, setCurrentResource] = useState<Partial<Resource>>({});

  const [isEditingProgram, setIsEditingProgram] = useState(false);
  const [currentProgram, setCurrentProgram] = useState<Partial<Program>>({});

  const [isEditingTeacher, setIsEditingTeacher] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState<Partial<Teacher>>({});

  const [editableConfig, setEditableConfig] = useState<WebsiteConfig>({ ...config });

  const isRtl = lang === 'ar';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        loadInboxMessages();
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setAuthError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      console.error(err);
      setAuthError(
        isRtl
          ? 'خطأ في البريد الإلكتروني أو كلمة المرور. تأكد من تهيئة حساب الإدارة في كونسول فيربيز.'
          : 'Invalid credentials. Ensure your admin credentials exist in Firebase Auth.'
      );
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  const loadInboxMessages = async () => {
    setIsLoadingMessages(true);
    try {
      const msgs = await getContactMessages();
      setMessages(msgs);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const showNotification = (msg: string, isErr = false) => {
    if (isErr) {
      setActionError(msg);
      setTimeout(() => setActionError(''), 4000);
    } else {
      setActionSuccess(msg);
      setTimeout(() => setActionSuccess(''), 4000);
    }
  };

  // Resources Management
  const handleSaveResource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentResource.titleAr || !currentResource.titleEn || !currentResource.category || !currentResource.type || !currentResource.url) {
      showNotification(isRtl ? 'الرجاء تعبئة الحقول الأساسية المطلوبة.' : 'Please fill all required fields.', true);
      return;
    }

    try {
      const resId = currentResource.id || 'res_' + Math.random().toString(36).substr(2, 9);
      const resPayload: Resource = {
        id: resId,
        titleAr: currentResource.titleAr,
        titleEn: currentResource.titleEn,
        descriptionAr: currentResource.descriptionAr || '',
        descriptionEn: currentResource.descriptionEn || '',
        category: currentResource.category,
        type: currentResource.type as any,
        url: currentResource.url,
        coverUrl: currentResource.coverUrl || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=400&q=80',
        isFeatured: !!currentResource.isFeatured,
        createdAt: currentResource.createdAt || new Date().toISOString(),
        authorAr: currentResource.authorAr,
        authorEn: currentResource.authorEn,
        pages: currentResource.pages ? Number(currentResource.pages) : undefined,
        fileSize: currentResource.fileSize
      };

      await saveResource(resPayload);
      showNotification(isRtl ? 'تم حفظ المصدر التعليمي بنجاح!' : 'Resource saved successfully!');
      setIsEditingResource(false);
      setCurrentResource({});
      onRefreshData();
    } catch (err) {
      console.error(err);
      showNotification(isRtl ? 'حدث خطأ أثناء حفظ المصدر.' : 'Error saving resource.', true);
    }
  };

  const handleDeleteResource = async (id: string) => {
    if (!window.confirm(isRtl ? 'هل أنت متأكد من رغبتك في حذف هذا المصدر؟' : 'Are you sure you want to delete this resource?')) return;
    try {
      await deleteResource(id);
      showNotification(isRtl ? 'تم حذف المصدر بنجاح!' : 'Resource deleted successfully!');
      onRefreshData();
    } catch (err) {
      console.error(err);
      showNotification(isRtl ? 'تعذر حذف المصدر.' : 'Error deleting resource.', true);
    }
  };

  // Programs Management
  const handleSaveProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProgram.titleAr || !currentProgram.titleEn || !currentProgram.category) {
      showNotification(isRtl ? 'الرجاء تعبئة حقول العنوان والتصنيف.' : 'Title and category are required.', true);
      return;
    }

    try {
      const progId = currentProgram.id || 'prog_' + Math.random().toString(36).substr(2, 9);
      const progPayload: Program = {
        id: progId,
        titleAr: currentProgram.titleAr,
        titleEn: currentProgram.titleEn,
        descriptionAr: currentProgram.descriptionAr || '',
        descriptionEn: currentProgram.descriptionEn || '',
        category: currentProgram.category as any,
        imageUrl: currentProgram.imageUrl || 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=800&q=80',
        detailsAr: currentProgram.detailsAr || [],
        detailsEn: currentProgram.detailsEn || []
      };

      await saveProgram(progPayload);
      showNotification(isRtl ? 'تم حفظ البرنامج الدراسي بنجاح!' : 'Program saved successfully!');
      setIsEditingProgram(false);
      setCurrentProgram({});
      onRefreshData();
    } catch (err) {
      console.error(err);
      showNotification(isRtl ? 'حدث خطأ أثناء حفظ البرنامج.' : 'Error saving program.', true);
    }
  };

  const handleDeleteProgram = async (id: string) => {
    if (!window.confirm(isRtl ? 'هل أنت متأكد من رغبتك في حذف هذا البرنامج؟' : 'Are you sure you want to delete this program?')) return;
    try {
      await deleteProgram(id);
      showNotification(isRtl ? 'تم حذف البرنامج بنجاح!' : 'Program deleted successfully!');
      onRefreshData();
    } catch (err) {
      console.error(err);
      showNotification(isRtl ? 'تعذر حذف البرنامج.' : 'Error deleting program.', true);
    }
  };

  // Teachers Management
  const handleSaveTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTeacher.nameAr || !currentTeacher.nameEn || !currentTeacher.specialtyAr) {
      showNotification(isRtl ? 'الرجاء تعبئة الاسم والتخصص.' : 'Name and specialty are required.', true);
      return;
    }

    try {
      const teachId = currentTeacher.id || 'teach_' + Math.random().toString(36).substr(2, 9);
      const teachPayload: Teacher = {
        id: teachId,
        nameAr: currentTeacher.nameAr,
        nameEn: currentTeacher.nameEn,
        bioAr: currentTeacher.bioAr || '',
        bioEn: currentTeacher.bioEn || '',
        specialtyAr: currentTeacher.specialtyAr,
        specialtyEn: currentTeacher.specialtyEn || '',
        coursesAr: currentTeacher.coursesAr || [],
        coursesEn: currentTeacher.coursesEn || [],
        languagesAr: currentTeacher.languagesAr || ['العربية'],
        languagesEn: currentTeacher.languagesEn || ['Arabic'],
        imageUrl: currentTeacher.imageUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
      };

      await saveTeacher(teachPayload);
      showNotification(isRtl ? 'تم حفظ ملف المعلم بنجاح!' : 'Teacher saved successfully!');
      setIsEditingTeacher(false);
      setCurrentTeacher({});
      onRefreshData();
    } catch (err) {
      console.error(err);
      showNotification(isRtl ? 'حدث خطأ أثناء الحفظ.' : 'Error saving teacher.', true);
    }
  };

  const handleDeleteTeacher = async (id: string) => {
    if (!window.confirm(isRtl ? 'هل أنت متأكد من رغبتك في حذف هذا المعلم؟' : 'Are you sure you want to delete this teacher?')) return;
    try {
      await deleteTeacher(id);
      showNotification(isRtl ? 'تم حذف المعلم بنجاح!' : 'Teacher deleted successfully!');
      onRefreshData();
    } catch (err) {
      console.error(err);
      showNotification(isRtl ? 'تعذر حذف المعلم.' : 'Error deleting teacher.', true);
    }
  };

  // Site Configuration Save
  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateWebsiteConfig(editableConfig);
      showNotification(isRtl ? 'تم تحديث بيانات ومحتوى الموقع بنجاح!' : 'Website settings updated successfully!');
      onRefreshData();
    } catch (err) {
      console.error(err);
      showNotification(isRtl ? 'تعذر تحديث إعدادات الموقع.' : 'Error updating settings.', true);
    }
  };

  // Message Inbox Management
  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm(isRtl ? 'هل أنت متأكد من حذف هذه الرسالة؟' : 'Are you sure you want to delete this message?')) return;
    try {
      await deleteContactMessage(id);
      setMessages(prev => prev.filter(m => m.id !== id));
      showNotification(isRtl ? 'تم حذف الرسالة بنجاح' : 'Message deleted successfully');
    } catch (err) {
      console.error(err);
    }
  };

  // If NOT logged in, show elegant custom Login page
  if (!user) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 text-brand-charcoal">
        <div className="bg-[#fdfaf2] w-full max-w-md p-8 rounded-3xl border border-brand-cream shadow-2xl space-y-6 relative animate-fade-in-up">
          
          <button
            id="close-login-btn"
            onClick={onClose}
            className="absolute top-4 left-4 right-auto p-2 rounded-full hover:bg-brand-cream text-brand-charcoal/60 transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>

          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-brand-bronze/10 flex items-center justify-center text-brand-bronze mx-auto">
              <BookOpen className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold font-serif-ar text-brand-charcoal">
              {isRtl ? 'دخول لوحة تحكم الإدارة' : 'Admin Portal Access'}
            </h2>
            <p className="text-xs text-brand-charcoal/60">
              {isRtl ? 'خاص بالمدير الفني للمعهد ومعلمي الإدارة' : 'Only authorized staff & institute owners.'}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4" dir={isRtl ? 'rtl' : 'ltr'}>
            {authError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center space-x-2 space-x-reverse">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-brand-charcoal/70">
                {isRtl ? 'البريد الإلكتروني للإدارة' : 'Admin Email'}
              </label>
              <input
                id="admin-email-input"
                type="email"
                required
                placeholder="admin@zadonline.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-cream bg-white text-xs text-brand-charcoal focus:outline-none focus:border-brand-bronze"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-brand-charcoal/70">
                {isRtl ? 'كلمة المرور' : 'Password'}
              </label>
              <input
                id="admin-password-input"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-cream bg-white text-xs text-brand-charcoal focus:outline-none focus:border-brand-bronze"
              />
            </div>

            <button
              id="admin-login-submit-btn"
              type="submit"
              disabled={isAuthenticating}
              className="w-full bg-brand-bronze hover:bg-brand-charcoal text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-colors"
            >
              {isAuthenticating
                ? (isRtl ? 'جاري التحقق...' : 'Authenticating...')
                : (isRtl ? 'تسجيل الدخول' : 'Sign In')}
            </button>
          </form>

          {/* Quick guide on how to configure */}
          <div className="p-4 bg-brand-cream/40 rounded-2xl text-xs text-brand-charcoal/75 space-y-1.5" dir={isRtl ? 'rtl' : 'ltr'}>
            <span className="font-bold flex items-center space-x-1.5 space-x-reverse">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold fill-brand-gold" />
              <span>{isRtl ? 'تنبيه إعداد الخدمة الأول مرة' : 'First-time Setup Guide'}</span>
            </span>
            <p className="leading-relaxed">
              {isRtl
                ? 'لاستخدام الحساب، تأكد من تسجيل بريدك الإلكتروني كمسؤول في لوحة Firebase Authentication الخاصة بـ Google Workspace للمشروع.'
                : 'To log in, please ensure your email and password are created inside your Firebase Authentication users console.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Render Full Admin Dashboard when authenticated
  return (
    <div className="fixed inset-0 z-50 bg-[#faf8f5] flex flex-col text-brand-charcoal overflow-hidden">
      
      {/* Dashboard Top Navbar */}
      <div className="bg-brand-charcoal border-b border-brand-cream/10 px-6 py-4 flex items-center justify-between text-white" dir={isRtl ? 'rtl' : 'ltr'}>
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="w-9 h-9 rounded-lg bg-brand-bronze/20 flex items-center justify-center text-brand-gold">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold font-serif-ar leading-none">
              {isRtl ? 'لوحة تحكم معهد زاد الإلكتروني' : 'Zad Institute Admin Console'}
            </h2>
            <span className="text-[10px] text-brand-parchment/60 font-medium">
              {isRtl ? 'مرحباً بالمسؤول والمشرف الفني' : 'Welcome Administrator'}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          <button
            id="admin-logout-btn"
            onClick={handleLogout}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-red-900/30 text-white border border-white/10"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{isRtl ? 'تسجيل الخروج' : 'Log Out'}</span>
          </button>
          <button
            id="admin-dashboard-close-btn"
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-gold text-brand-charcoal hover:bg-brand-gold-hover"
          >
            {isRtl ? 'عرض الموقع' : 'View Site'}
          </button>
        </div>
      </div>

      {/* Main Content Pane */}
      <div className="flex-grow flex overflow-hidden">
        
        {/* Sidebar Nav (RTL aware) */}
        <div className="w-64 border-l border-brand-cream bg-white p-4 flex flex-col justify-between" dir={isRtl ? 'rtl' : 'ltr'}>
          <div className="space-y-2">
            <button
              id="tab-btn-resources"
              onClick={() => setActiveTab('resources')}
              className={`w-full flex items-center space-x-3 space-x-reverse p-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'resources' ? 'bg-brand-bronze text-white shadow' : 'text-brand-charcoal hover:bg-brand-parchment'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>{isRtl ? 'المكتبة التعليمية (كتب وروابط)' : 'Educational Library'}</span>
            </button>

            <button
              id="tab-btn-programs"
              onClick={() => setActiveTab('programs')}
              className={`w-full flex items-center space-x-3 space-x-reverse p-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'programs' ? 'bg-brand-bronze text-white shadow' : 'text-brand-charcoal hover:bg-brand-parchment'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{isRtl ? 'البرامج الدراسية' : 'Academic Programs'}</span>
            </button>

            <button
              id="tab-btn-teachers"
              onClick={() => setActiveTab('teachers')}
              className={`w-full flex items-center space-x-3 space-x-reverse p-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'teachers' ? 'bg-brand-bronze text-white shadow' : 'text-brand-charcoal hover:bg-brand-parchment'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>{isRtl ? 'شؤون المعلمين والمعلمات' : 'Scholars & Teachers'}</span>
            </button>

            <button
              id="tab-btn-config"
              onClick={() => setActiveTab('config')}
              className={`w-full flex items-center space-x-3 space-x-reverse p-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'config' ? 'bg-brand-bronze text-white shadow' : 'text-brand-charcoal hover:bg-brand-parchment'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>{isRtl ? 'إعدادات ومحتوى الموقع' : 'Website Settings'}</span>
            </button>

            <button
              id="tab-btn-messages"
              onClick={() => setActiveTab('messages')}
              className={`w-full flex items-center space-x-3 space-x-reverse p-3 rounded-xl text-xs font-bold transition-all relative ${
                activeTab === 'messages' ? 'bg-brand-bronze text-white shadow' : 'text-brand-charcoal hover:bg-brand-parchment'
              }`}
            >
              <Inbox className="w-4 h-4" />
              <span>{isRtl ? 'صندوق الرسائل الواردة' : 'Contact Inbox'}</span>
              {messages.length > 0 && (
                <span className="absolute top-1/2 transform -translate-y-1/2 left-3 right-auto bg-brand-gold text-brand-charcoal text-[9px] font-bold px-2 py-0.5 rounded-full">
                  {messages.length}
                </span>
              )}
            </button>
          </div>

          <div className="p-3 bg-brand-parchment rounded-xl text-[10px] text-brand-charcoal/50 leading-relaxed text-center">
            {isRtl ? 'معهد زاد العلمي © ٢٠٢٦' : 'Zad Islamic Institute © 2026'}
          </div>
        </div>

        {/* Tab Detail panel */}
        <div className="flex-grow p-8 overflow-y-auto" dir={isRtl ? 'rtl' : 'ltr'}>
          {/* Action Notification toasts inside panel */}
          {actionSuccess && (
            <div className="mb-6 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center space-x-2 space-x-reverse animate-fade-in">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{actionSuccess}</span>
            </div>
          )}
          {actionError && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs flex items-center space-x-2 space-x-reverse animate-fade-in">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span>{actionError}</span>
            </div>
          )}

          {/* 1. Resources Tab */}
          {activeTab === 'resources' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-brand-cream pb-4">
                <div>
                  <h3 className="text-xl font-bold font-serif-ar">{isRtl ? 'إدارة كتب ومصادر المكتبة' : 'Library Resources Management'}</h3>
                  <p className="text-xs text-brand-charcoal/60 mt-1">{isRtl ? 'إضافة وتعديل كتب الـ PDF، الروابط المفيدة، المقاطع المرئية والمواد الصوتية.' : 'Add and manage books, external guides, audio, and videos.'}</p>
                </div>
                {!isEditingResource && (
                  <button
                    id="add-resource-btn"
                    onClick={() => {
                      setCurrentResource({ type: 'pdf', isFeatured: false });
                      setIsEditingResource(true);
                    }}
                    className="flex items-center space-x-1.5 space-x-reverse bg-brand-bronze text-white px-4 py-2 rounded-xl text-xs font-bold shadow hover:bg-brand-charcoal transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isRtl ? 'إضافة مصدر جديد' : 'Add New Resource'}</span>
                  </button>
                )}
              </div>

              {isEditingResource ? (
                <form onSubmit={handleSaveResource} className="bg-white p-6 rounded-2xl border border-brand-cream space-y-4 shadow-sm">
                  <h4 className="text-sm font-bold border-b border-brand-cream pb-2">
                    {currentResource.id ? (isRtl ? 'تعديل بيانات المصدر' : 'Edit Resource') : (isRtl ? 'إدخال مصدر جديد' : 'New Resource Details')}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-charcoal/70">{isRtl ? 'العنوان بالعربية *' : 'Title Ar *'}</label>
                      <input
                        id="res-form-title-ar"
                        type="text"
                        required
                        value={currentResource.titleAr || ''}
                        onChange={(e) => setCurrentResource({ ...currentResource, titleAr: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-brand-cream text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-charcoal/70">{isRtl ? 'العنوان بالإنجليزية *' : 'Title En *'}</label>
                      <input
                        id="res-form-title-en"
                        type="text"
                        required
                        value={currentResource.titleEn || ''}
                        onChange={(e) => setCurrentResource({ ...currentResource, titleEn: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-brand-cream text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-charcoal/70">{isRtl ? 'القسم الحركي / القسم العلمي *' : 'Category *'}</label>
                      <select
                        id="res-form-category"
                        required
                        value={currentResource.category || ''}
                        onChange={(e) => setCurrentResource({ ...currentResource, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-brand-cream text-xs bg-white"
                      >
                        <option value="">{isRtl ? '-- اختر القسم --' : '-- Choose Category --'}</option>
                        {CATEGORIES_AR.slice(1).map((cat, idx) => (
                          <option key={idx} value={cat}>{cat} / {CATEGORIES_EN[idx+1]}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-charcoal/70">{isRtl ? 'نوع المورد *' : 'Type *'}</label>
                      <select
                        id="res-form-type"
                        required
                        value={currentResource.type || 'pdf'}
                        onChange={(e) => setCurrentResource({ ...currentResource, type: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-lg border border-brand-cream text-xs bg-white"
                      >
                        <option value="pdf">{isRtl ? 'كتاب PDF' : 'PDF Book'}</option>
                        <option value="audio">{isRtl ? 'مادة صوتية' : 'Audio Material'}</option>
                        <option value="video">{isRtl ? 'فيديو توضيحي' : 'Video Tutorial'}</option>
                        <option value="link">{isRtl ? 'رابط خارجي' : 'External Link'}</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-charcoal/70">{isRtl ? 'رابط الملف أو الرابط الخارجي *' : 'Resource URL *'}</label>
                      <input
                        id="res-form-url"
                        type="url"
                        required
                        placeholder="https://archive.org/..."
                        value={currentResource.url || ''}
                        onChange={(e) => setCurrentResource({ ...currentResource, url: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-brand-cream text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-charcoal/70">{isRtl ? 'الوصف بالعربية' : 'Description Ar'}</label>
                      <textarea
                        id="res-form-desc-ar"
                        rows={2}
                        value={currentResource.descriptionAr || ''}
                        onChange={(e) => setCurrentResource({ ...currentResource, descriptionAr: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-brand-cream text-xs resize-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-charcoal/70">{isRtl ? 'الوصف بالإنجليزية' : 'Description En'}</label>
                      <textarea
                        id="res-form-desc-en"
                        rows={2}
                        value={currentResource.descriptionEn || ''}
                        onChange={(e) => setCurrentResource({ ...currentResource, descriptionEn: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-brand-cream text-xs resize-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-1 col-span-2">
                      <label className="text-xs font-bold text-brand-charcoal/70">{isRtl ? 'رابط صورة الغلاف' : 'Cover Image URL'}</label>
                      <input
                        id="res-form-cover"
                        type="url"
                        placeholder="https://images.unsplash.com/..."
                        value={currentResource.coverUrl || ''}
                        onChange={(e) => setCurrentResource({ ...currentResource, coverUrl: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-brand-cream text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-charcoal/70">{isRtl ? 'المؤلف (Ar)' : 'Author Ar'}</label>
                      <input
                        id="res-form-author-ar"
                        type="text"
                        value={currentResource.authorAr || ''}
                        onChange={(e) => setCurrentResource({ ...currentResource, authorAr: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-brand-cream text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-charcoal/70">{isRtl ? 'المؤلف (En)' : 'Author En'}</label>
                      <input
                        id="res-form-author-en"
                        type="text"
                        value={currentResource.authorEn || ''}
                        onChange={(e) => setCurrentResource({ ...currentResource, authorEn: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-brand-cream text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-charcoal/70">{isRtl ? 'عدد الصفحات (إذا كان PDF)' : 'Pages'}</label>
                      <input
                        id="res-form-pages"
                        type="number"
                        value={currentResource.pages || ''}
                        onChange={(e) => setCurrentResource({ ...currentResource, pages: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-brand-cream text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-charcoal/70">{isRtl ? 'حجم الملف (مثال: 2.4 MB)' : 'File Size'}</label>
                      <input
                        id="res-form-filesize"
                        type="text"
                        placeholder="2.4 MB"
                        value={currentResource.fileSize || ''}
                        onChange={(e) => setCurrentResource({ ...currentResource, fileSize: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-brand-cream text-xs"
                      />
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse pt-6">
                      <input
                        id="res-form-featured"
                        type="checkbox"
                        checked={!!currentResource.isFeatured}
                        onChange={(e) => setCurrentResource({ ...currentResource, isFeatured: e.target.checked })}
                        className="w-4 h-4 text-brand-bronze focus:ring-brand-bronze border-gray-300 rounded"
                      />
                      <label className="text-xs font-bold text-brand-charcoal/75">{isRtl ? 'تميز كمصدر موصى به في مقدمة المكتبة' : 'Feature as recommended'}</label>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 space-x-reverse pt-4 border-t border-brand-cream">
                    <button
                      id="res-form-cancel"
                      type="button"
                      onClick={() => {
                        setIsEditingResource(false);
                        setCurrentResource({});
                      }}
                      className="px-4 py-2 border border-brand-cream rounded-xl text-xs font-bold"
                    >
                      {isRtl ? 'إلغاء' : 'Cancel'}
                    </button>
                    <button
                      id="res-form-save"
                      type="submit"
                      className="px-6 py-2 bg-brand-bronze text-white rounded-xl text-xs font-bold hover:bg-brand-charcoal"
                    >
                      {isRtl ? 'حفظ المورد' : 'Save Resource'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="bg-white border border-brand-cream rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-right border-collapse" dir={isRtl ? 'rtl' : 'ltr'}>
                    <thead>
                      <tr className="bg-brand-parchment text-brand-charcoal/60 text-[10px] font-bold uppercase tracking-wider border-b border-brand-cream">
                        <th className="px-6 py-4">{isRtl ? 'الغلاف' : 'Cover'}</th>
                        <th className="px-6 py-4">{isRtl ? 'العنوان' : 'Title'}</th>
                        <th className="px-6 py-4">{isRtl ? 'القسم الحركي' : 'Category'}</th>
                        <th className="px-6 py-4">{isRtl ? 'النوع' : 'Type'}</th>
                        <th className="px-6 py-4">{isRtl ? 'موصى به' : 'Featured'}</th>
                        <th className="px-6 py-4 text-center">{isRtl ? 'العمليات' : 'Actions'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-cream/60 text-xs">
                      {resources.map((res) => (
                        <tr key={res.id} className="hover:bg-brand-parchment/30">
                          <td className="px-6 py-4">
                            <img src={res.coverUrl} className="w-8 h-10 object-cover rounded shadow" referrerPolicy="no-referrer" />
                          </td>
                          <td className="px-6 py-4 font-bold">
                            {isRtl ? res.titleAr : res.titleEn}
                          </td>
                          <td className="px-6 py-4 font-medium text-brand-bronze">{res.category}</td>
                          <td className="px-6 py-4 uppercase font-mono text-[10px]">{res.type}</td>
                          <td className="px-6 py-4 font-bold">{res.isFeatured ? '✅' : '❌'}</td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center space-x-2 space-x-reverse">
                              <button
                                id={`edit-res-${res.id}`}
                                onClick={() => {
                                  setCurrentResource(res);
                                  setIsEditingResource(true);
                                }}
                                className="p-1.5 rounded-lg bg-brand-cream text-brand-charcoal hover:bg-brand-gold/30"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                id={`del-res-${res.id}`}
                                onClick={() => handleDeleteResource(res.id)}
                                className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* 2. Programs Tab */}
          {activeTab === 'programs' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-brand-cream pb-4">
                <div>
                  <h3 className="text-xl font-bold font-serif-ar">{isRtl ? 'إدارة البرامج الدراسية' : 'Academic Programs Management'}</h3>
                  <p className="text-xs text-brand-charcoal/60 mt-1">{isRtl ? 'إضافة وتعديل وحذف البرامج المعروضة على الصفحة الرئيسية.' : 'Manage programs visible to public visitors.'}</p>
                </div>
                {!isEditingProgram && (
                  <button
                    id="add-prog-btn"
                    onClick={() => {
                      setCurrentProgram({ category: 'sharia', detailsAr: [], detailsEn: [] });
                      setIsEditingProgram(true);
                    }}
                    className="flex items-center space-x-1.5 space-x-reverse bg-brand-bronze text-white px-4 py-2 rounded-xl text-xs font-bold"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isRtl ? 'إضافة برنامج جديد' : 'Add New Program'}</span>
                  </button>
                )}
              </div>

              {isEditingProgram ? (
                <form onSubmit={handleSaveProgram} className="bg-white p-6 rounded-2xl border border-brand-cream space-y-4">
                  <h4 className="text-sm font-bold border-b border-brand-cream pb-2">{isRtl ? 'تفاصيل البرنامج' : 'Program Details'}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-charcoal/70">{isRtl ? 'العنوان بالعربية *' : 'Title Ar *'}</label>
                      <input
                        id="prog-form-title-ar"
                        type="text"
                        required
                        value={currentProgram.titleAr || ''}
                        onChange={(e) => setCurrentProgram({ ...currentProgram, titleAr: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-brand-cream text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-charcoal/70">{isRtl ? 'العنوان بالإنجليزية *' : 'Title En *'}</label>
                      <input
                        id="prog-form-title-en"
                        type="text"
                        required
                        value={currentProgram.titleEn || ''}
                        onChange={(e) => setCurrentProgram({ ...currentProgram, titleEn: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-brand-cream text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-charcoal/70">{isRtl ? 'التصنيف الدراسي *' : 'Category *'}</label>
                      <select
                        id="prog-form-cat"
                        required
                        value={currentProgram.category || 'sharia'}
                        onChange={(e) => setCurrentProgram({ ...currentProgram, category: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-lg border border-brand-cream text-xs bg-white"
                      >
                        <option value="quran">{isRtl ? 'القرآن الكريم' : 'Qur’an Studies'}</option>
                        <option value="sharia">{isRtl ? 'العلوم الشرعية' : 'Islamic Studies'}</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-charcoal/70">{isRtl ? 'رابط صورة الغلاف' : 'Cover Image URL'}</label>
                      <input
                        id="prog-form-image"
                        type="url"
                        value={currentProgram.imageUrl || ''}
                        onChange={(e) => setCurrentProgram({ ...currentProgram, imageUrl: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-brand-cream text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-charcoal/70">{isRtl ? 'وصف مختصر (عربي)' : 'Short Description Ar'}</label>
                      <textarea
                        id="prog-form-desc-ar"
                        rows={2}
                        value={currentProgram.descriptionAr || ''}
                        onChange={(e) => setCurrentProgram({ ...currentProgram, descriptionAr: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-brand-cream text-xs resize-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-charcoal/70">{isRtl ? 'وصف مختصر (إنجليزي)' : 'Short Description En'}</label>
                      <textarea
                        id="prog-form-desc-en"
                        rows={2}
                        value={currentProgram.descriptionEn || ''}
                        onChange={(e) => setCurrentProgram({ ...currentProgram, descriptionEn: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-brand-cream text-xs resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 space-x-reverse pt-4 border-t border-brand-cream">
                    <button
                      id="prog-form-cancel"
                      type="button"
                      onClick={() => {
                        setIsEditingProgram(false);
                        setCurrentProgram({});
                      }}
                      className="px-4 py-2 border border-brand-cream rounded-xl text-xs font-bold"
                    >
                      {isRtl ? 'إلغاء' : 'Cancel'}
                    </button>
                    <button
                      id="prog-form-save"
                      type="submit"
                      className="px-6 py-2 bg-brand-bronze text-white rounded-xl text-xs font-bold"
                    >
                      {isRtl ? 'حفظ البرنامج' : 'Save Program'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="bg-white border border-brand-cream rounded-2xl overflow-hidden">
                  <table className="w-full text-right border-collapse">
                    <thead>
                      <tr className="bg-brand-parchment text-brand-charcoal/60 text-[10px] font-bold uppercase border-b border-brand-cream">
                        <th className="px-6 py-4">{isRtl ? 'العنوان' : 'Title'}</th>
                        <th className="px-6 py-4">{isRtl ? 'التصنيف' : 'Category'}</th>
                        <th className="px-6 py-4 text-center">{isRtl ? 'العمليات' : 'Actions'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-cream/60 text-xs">
                      {programs.map((prog) => (
                        <tr key={prog.id} className="hover:bg-brand-parchment/30">
                          <td className="px-6 py-4 font-bold">{isRtl ? prog.titleAr : prog.titleEn}</td>
                          <td className="px-6 py-4 font-semibold text-brand-bronze">{prog.category === 'quran' ? 'القرآن الكريم' : 'العلوم الشرعية'}</td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center space-x-2 space-x-reverse">
                              <button
                                id={`edit-prog-${prog.id}`}
                                onClick={() => {
                                  setCurrentProgram(prog);
                                  setIsEditingProgram(true);
                                }}
                                className="p-1.5 rounded-lg bg-brand-cream hover:bg-brand-gold/20"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                id={`del-prog-${prog.id}`}
                                onClick={() => handleDeleteProgram(prog.id)}
                                className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* 3. Teachers Tab */}
          {activeTab === 'teachers' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-brand-cream pb-4">
                <div>
                  <h3 className="text-xl font-bold font-serif-ar">{isRtl ? 'الهيئة التدريسية والأكاديمية' : 'Faculty Profiles Management'}</h3>
                  <p className="text-xs text-brand-charcoal/60 mt-1">{isRtl ? 'إدارة السير الذاتية وصور المعلمين والمعلمات.' : 'Add and manage teacher profiles.'}</p>
                </div>
                {!isEditingTeacher && (
                  <button
                    id="add-teach-btn"
                    onClick={() => {
                      setCurrentTeacher({ coursesAr: [], coursesEn: [], languagesAr: ['العربية'], languagesEn: ['Arabic'] });
                      setIsEditingTeacher(true);
                    }}
                    className="flex items-center space-x-1.5 space-x-reverse bg-brand-bronze text-white px-4 py-2 rounded-xl text-xs font-bold"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isRtl ? 'إضافة معلم جديد' : 'Add New Teacher'}</span>
                  </button>
                )}
              </div>

              {isEditingTeacher ? (
                <form onSubmit={handleSaveTeacher} className="bg-white p-6 rounded-2xl border border-brand-cream space-y-4">
                  <h4 className="text-sm font-bold border-b border-brand-cream pb-2">{isRtl ? 'تفاصيل المعلم' : 'Teacher Details'}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-charcoal/70">{isRtl ? 'الاسم بالكامل (عربي) *' : 'Name Ar *'}</label>
                      <input
                        id="teach-form-name-ar"
                        type="text"
                        required
                        value={currentTeacher.nameAr || ''}
                        onChange={(e) => setCurrentTeacher({ ...currentTeacher, nameAr: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-brand-cream text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-charcoal/70">{isRtl ? 'الاسم بالكامل (إنجليزي) *' : 'Name En *'}</label>
                      <input
                        id="teach-form-name-en"
                        type="text"
                        required
                        value={currentTeacher.nameEn || ''}
                        onChange={(e) => setCurrentTeacher({ ...currentTeacher, nameEn: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-brand-cream text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-charcoal/70">{isRtl ? 'التخصص (عربي) *' : 'Specialty Ar *'}</label>
                      <input
                        id="teach-form-spec-ar"
                        type="text"
                        required
                        value={currentTeacher.specialtyAr || ''}
                        onChange={(e) => setCurrentTeacher({ ...currentTeacher, specialtyAr: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-brand-cream text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-charcoal/70">{isRtl ? 'التخصص (إنجليزي)' : 'Specialty En'}</label>
                      <input
                        id="teach-form-spec-en"
                        type="text"
                        value={currentTeacher.specialtyEn || ''}
                        onChange={(e) => setCurrentTeacher({ ...currentTeacher, specialtyEn: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-brand-cream text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-charcoal/70">{isRtl ? 'السيرة الذاتية (عربي)' : 'Bio Ar'}</label>
                      <textarea
                        id="teach-form-bio-ar"
                        rows={2}
                        value={currentTeacher.bioAr || ''}
                        onChange={(e) => setCurrentTeacher({ ...currentTeacher, bioAr: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-brand-cream text-xs resize-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-charcoal/70">{isRtl ? 'السيرة الذاتية (إنجليزي)' : 'Bio En'}</label>
                      <textarea
                        id="teach-form-bio-en"
                        rows={2}
                        value={currentTeacher.bioEn || ''}
                        onChange={(e) => setCurrentTeacher({ ...currentTeacher, bioEn: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-brand-cream text-xs resize-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-brand-charcoal/70">{isRtl ? 'رابط صورة المعلم الشخصية' : 'Teacher Image URL'}</label>
                    <input
                      id="teach-form-image"
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={currentTeacher.imageUrl || ''}
                      onChange={(e) => setCurrentTeacher({ ...currentTeacher, imageUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-brand-cream text-xs"
                    />
                  </div>

                  <div className="flex justify-end space-x-3 space-x-reverse pt-4 border-t border-brand-cream">
                    <button
                      id="teach-form-cancel"
                      type="button"
                      onClick={() => {
                        setIsEditingTeacher(false);
                        setCurrentTeacher({});
                      }}
                      className="px-4 py-2 border border-brand-cream rounded-xl text-xs font-bold"
                    >
                      {isRtl ? 'إلغاء' : 'Cancel'}
                    </button>
                    <button
                      id="teach-form-save"
                      type="submit"
                      className="px-6 py-2 bg-brand-bronze text-white rounded-xl text-xs font-bold"
                    >
                      {isRtl ? 'حفظ المعلم' : 'Save Teacher'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="bg-white border border-brand-cream rounded-2xl overflow-hidden">
                  <table className="w-full text-right border-collapse">
                    <thead>
                      <tr className="bg-brand-parchment text-brand-charcoal/60 text-[10px] font-bold uppercase border-b border-brand-cream">
                        <th className="px-6 py-4">{isRtl ? 'الصورة' : 'Photo'}</th>
                        <th className="px-6 py-4">{isRtl ? 'الاسم' : 'Name'}</th>
                        <th className="px-6 py-4">{isRtl ? 'التخصص' : 'Specialty'}</th>
                        <th className="px-6 py-4 text-center">{isRtl ? 'العمليات' : 'Actions'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-cream/60 text-xs">
                      {teachers.map((teach) => (
                        <tr key={teach.id} className="hover:bg-brand-parchment/30">
                          <td className="px-6 py-4">
                            <img src={teach.imageUrl} className="w-8 h-8 object-cover rounded-full" referrerPolicy="no-referrer" />
                          </td>
                          <td className="px-6 py-4 font-bold">{isRtl ? teach.nameAr : teach.nameEn}</td>
                          <td className="px-6 py-4 font-semibold text-brand-bronze">{isRtl ? teach.specialtyAr : teach.specialtyEn}</td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center space-x-2 space-x-reverse">
                              <button
                                id={`edit-teach-${teach.id}`}
                                onClick={() => {
                                  setCurrentTeacher(teach);
                                  setIsEditingTeacher(true);
                                }}
                                className="p-1.5 rounded-lg bg-brand-cream hover:bg-brand-gold/20"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                id={`del-teach-${teach.id}`}
                                onClick={() => handleDeleteTeacher(teach.id)}
                                className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* 4. Settings/Config Tab */}
          {activeTab === 'config' && (
            <div className="space-y-8">
              <div className="border-b border-brand-cream pb-4">
                <h3 className="text-xl font-bold font-serif-ar">{isRtl ? 'إعدادات ومحتوى الموقع العام' : 'Global Website Content settings'}</h3>
                <p className="text-xs text-brand-charcoal/60 mt-1">{isRtl ? 'تعديل نصوص واجهات الموقع والعناوين وأرقام الهواتف وقنوات التواصل.' : 'Edit titles, taglines, about pages, values, goals, and communication channels.'}</p>
              </div>

              <form onSubmit={handleSaveConfig} className="bg-white p-8 rounded-2xl border border-brand-cream space-y-6">
                
                {/* Contact info section */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold border-b border-brand-cream pb-2 text-brand-bronze">{isRtl ? 'روابط وقنوات التواصل المباشر' : 'Direct Contacts'}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-charcoal/70">{isRtl ? 'رقم الوتساب (بدون أصفار أو رمز +)' : 'WhatsApp Number'}</label>
                      <input
                        id="cfg-form-whatsapp"
                        type="text"
                        required
                        value={editableConfig.whatsappNumber}
                        onChange={(e) => setEditableConfig({ ...editableConfig, whatsappNumber: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-brand-cream text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-charcoal/70">{isRtl ? 'رقم الهاتف المعروض' : 'Phone'}</label>
                      <input
                        id="cfg-form-phone"
                        type="text"
                        required
                        value={editableConfig.phone}
                        onChange={(e) => setEditableConfig({ ...editableConfig, phone: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-brand-cream text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-charcoal/70">{isRtl ? 'البريد الإلكتروني العام' : 'Public Email'}</label>
                      <input
                        id="cfg-form-email"
                        type="email"
                        required
                        value={editableConfig.email}
                        onChange={(e) => setEditableConfig({ ...editableConfig, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-brand-cream text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Hero titles Section */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold border-b border-brand-cream pb-2 text-brand-bronze">{isRtl ? 'العنوان الرئيسي للواجهة الترحيبية' : 'Hero Section Headlines'}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-charcoal/70">{isRtl ? 'العنوان بالعربية (الترحيب)' : 'Hero Title Ar'}</label>
                      <input
                        id="cfg-form-herotitle-ar"
                        type="text"
                        required
                        value={editableConfig.heroTitleAr}
                        onChange={(e) => setEditableConfig({ ...editableConfig, heroTitleAr: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-brand-cream text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-charcoal/70">{isRtl ? 'العنوان بالإنجليزية (الترحيب)' : 'Hero Title En'}</label>
                      <input
                        id="cfg-form-herotitle-en"
                        type="text"
                        required
                        value={editableConfig.heroTitleEn}
                        onChange={(e) => setEditableConfig({ ...editableConfig, heroTitleEn: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-brand-cream text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-charcoal/70">{isRtl ? 'السطر المساعد (عربي)' : 'Hero Subtitle Ar'}</label>
                      <textarea
                        id="cfg-form-herosubtitle-ar"
                        rows={2}
                        required
                        value={editableConfig.heroSubtitleAr}
                        onChange={(e) => setEditableConfig({ ...editableConfig, heroSubtitleAr: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-brand-cream text-xs resize-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-charcoal/70">{isRtl ? 'السطر المساعد (إنجليزي)' : 'Hero Subtitle En'}</label>
                      <textarea
                        id="cfg-form-herosubtitle-en"
                        rows={2}
                        required
                        value={editableConfig.heroSubtitleEn}
                        onChange={(e) => setEditableConfig({ ...editableConfig, heroSubtitleEn: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-brand-cream text-xs resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* About text section */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold border-b border-brand-cream pb-2 text-brand-bronze">{isRtl ? 'نبذة عن المعهد في صفحة التعريف' : 'About the Academy Texts'}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-charcoal/70">{isRtl ? 'النص التعريفي (عربي)' : 'About Text Ar'}</label>
                      <textarea
                        id="cfg-form-about-ar"
                        rows={4}
                        required
                        value={editableConfig.aboutTextAr}
                        onChange={(e) => setEditableConfig({ ...editableConfig, aboutTextAr: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-brand-cream text-xs resize-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-charcoal/70">{isRtl ? 'النص التعريفي (إنجليزي)' : 'About Text En'}</label>
                      <textarea
                        id="cfg-form-about-en"
                        rows={4}
                        required
                        value={editableConfig.aboutTextEn}
                        onChange={(e) => setEditableConfig({ ...editableConfig, aboutTextEn: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-brand-cream text-xs resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex justify-end pt-4 border-t border-brand-cream">
                  <button
                    id="cfg-form-submit"
                    type="submit"
                    className="px-8 py-3 bg-brand-bronze hover:bg-brand-charcoal text-white rounded-xl text-xs font-bold"
                  >
                    {isRtl ? 'حفظ وتحديث الإعدادات العامة' : 'Save General Settings'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 5. Contact Inbox Tab */}
          {activeTab === 'messages' && (
            <div className="space-y-8">
              <div className="border-b border-brand-cream pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold font-serif-ar">{isRtl ? 'صندوق رسائل واستفسارات الزوار' : 'Contact Forms Inbox'}</h3>
                  <p className="text-xs text-brand-charcoal/60 mt-1">{isRtl ? 'استعراض وقراءة طلبات التسجيل والاستفسارات الواردة عبر الموقع.' : 'View messages submitted by visitors.'}</p>
                </div>
                <button
                  id="refresh-inbox-btn"
                  onClick={loadInboxMessages}
                  className="px-4 py-2 border border-brand-cream rounded-xl text-xs font-bold hover:bg-brand-parchment"
                >
                  {isRtl ? 'تحديث الصندوق' : 'Refresh Inbox'}
                </button>
              </div>

              {isLoadingMessages ? (
                <div className="text-center py-16">
                  <div className="w-8 h-8 border-4 border-brand-bronze border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <span className="text-xs text-brand-charcoal/60">{isRtl ? 'جاري تحميل الرسائل...' : 'Loading messages...'}</span>
                </div>
              ) : messages.length > 0 ? (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className="bg-white p-6 rounded-2xl border border-brand-cream shadow-sm hover:shadow relative group"
                    >
                      <button
                        id={`del-msg-${msg.id}`}
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="absolute top-4 left-4 right-auto p-1.5 rounded-lg text-brand-charcoal/40 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title={isRtl ? 'حذف الرسالة' : 'Delete Message'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border-b border-brand-cream/60 pb-4 mb-4 text-xs">
                        <div>
                          <span className="text-[10px] font-bold text-brand-charcoal/40 uppercase block">{isRtl ? 'الاسم بالكامل' : 'Sender Name'}</span>
                          <span className="font-bold text-brand-charcoal text-sm">{msg.fullName}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-brand-charcoal/40 uppercase block">{isRtl ? 'البريد الإلكتروني' : 'Email Address'}</span>
                          <a href={`mailto:${msg.email}`} className="font-bold text-brand-bronze hover:underline">{msg.email}</a>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-brand-charcoal/40 uppercase block">{isRtl ? 'رقم الهاتف/وتساب' : 'Phone/WhatsApp'}</span>
                          <a href={`tel:${msg.phone}`} className="font-bold text-brand-charcoal">{msg.phone}</a>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-brand-charcoal/40 uppercase block">{isRtl ? 'تاريخ الإرسال' : 'Date Submitted'}</span>
                          <span className="font-medium text-brand-charcoal/70">{new Date(msg.createdAt).toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US')}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-brand-charcoal/40 uppercase block">{isRtl ? 'موضوع الرسالة' : 'Subject'}</span>
                        <h4 className="text-sm font-extrabold text-brand-charcoal">{msg.subject}</h4>
                      </div>

                      <div className="mt-3 p-4 bg-brand-parchment/60 rounded-xl text-xs md:text-sm text-brand-charcoal/85 leading-relaxed">
                        <p className="whitespace-pre-line">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white border border-brand-cream rounded-2xl">
                  <Inbox className="w-12 h-12 text-brand-charcoal/20 mx-auto mb-4" />
                  <h4 className="font-bold text-brand-charcoal/70">{isRtl ? 'صندوق الوارد فارغ' : 'Your inbox is empty'}</h4>
                  <p className="text-xs text-brand-charcoal/40 mt-1">{isRtl ? 'لا توجد رسائل اتصال أو استفسارات حالياً.' : 'No contact form submissions received yet.'}</p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
