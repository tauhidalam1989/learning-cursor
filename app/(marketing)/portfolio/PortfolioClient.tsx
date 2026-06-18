'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export interface PortfolioProfile {
  id: string;
  companyName: string;
  title?: string;
  logo?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  email?: string;
  phone?: string;
  bottomCtaText?: string;
  bottomCtaLink?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  link?: string;
  image?: string;
  attachment?: string;
  order: number;
  isActive: boolean;
}

interface PortfolioClientProps {
  portfolioData: {
    profile: PortfolioProfile;
    items: PortfolioItem[];
  };
}

// Helper to get media URLs from backend uploads
const getMediaUrl = (url: string | null | undefined) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  const apiOrigin = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  return `${apiOrigin.replace(/\/$/, '')}${url.startsWith('/') ? '' : '/'}${url}`;
};

export default function PortfolioClient({ portfolioData }: PortfolioClientProps) {
  const { profile, items } = portfolioData;
  const { language } = useLanguage();
  const isAr = language === 'ar';

  // Filter active items — guard against undefined/null
  const activeItems = Array.isArray(items) ? items.filter(item => item.isActive) : [];

  // Modals states
  const [cookieModalOpen, setCookieModalOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [subscribeModalOpen, setSubscribeModalOpen] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [subscribeMessage, setSubscribeMessage] = useState('');

  // Share Modal states
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareItem, setShareItem] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handleShareClick = (item: any) => {
    setShareItem(item);
    setShareModalOpen(true);
    setCopied(false);
  };

  const handleShareProfileClick = () => {
    const profileItem = {
      id: 'profile',
      title: profile.companyName,
      image: profile.logo,
      link: typeof window !== 'undefined' ? window.location.href : '',
      isProfile: true
    };
    handleShareClick(profileItem);
  };

  const getShareUrl = (item: any) => {
    if (!item) return '';
    if (item.isProfile) {
      return item.link;
    }
    let url = item.link || (item.attachment ? getMediaUrl(item.attachment) : '');
    if (url && (url.startsWith('/') || !url.startsWith('http'))) {
      if (typeof window !== 'undefined') {
        url = `${window.location.origin}${url.startsWith('/') ? '' : '/'}${url}`;
      }
    }
    return url;
  };

  const handleCopyLink = () => {
    const url = getShareUrl(shareItem);
    if (url) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Cookie settings checkboxes
  const [analyticsCookies, setAnalyticsCookies] = useState(true);
  const [marketingCookies, setMarketingCookies] = useState(false);

  const handleSubscribeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribeEmail) return;

    setSubscribeStatus('loading');
    setSubscribeMessage('');

    try {
      const response = await fetch('/api/newsletters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: subscribeEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubscribeStatus('success');
        setSubscribeMessage(data.message || (isAr ? 'تم الاشتراك بنجاح!' : 'Subscribed successfully!'));
        setSubscribeEmail('');
        setTimeout(() => {
          setSubscribeStatus('idle');
          setSubscribeModalOpen(false);
        }, 4000);
      } else {
        setSubscribeStatus('error');
        setSubscribeMessage(data.message || (isAr ? 'حدث خطأ ما. يرجى المحاولة مرة أخرى.' : 'Something went wrong. Please try again.'));
      }
    } catch (error) {
      setSubscribeStatus('error');
      setSubscribeMessage(isAr ? 'خطأ في الشبكة. يرجى التحقق من الاتصال.' : 'Network error. Please check your connection.');
    }
  };

  return (
    <div className="min-h-screen bg-corematrix-bg0 flex items-center justify-center p-0 md:p-4 py-0 md:py-12 relative overflow-hidden font-sans text-corematrix-textPrimary">
      {/* Ambient Background Glows - Styled Green */}
      <div className="absolute -top-48 -right-48 w-[400px] h-[400px] bg-corematrix-green500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute -bottom-48 -left-48 w-[500px] h-[500px] bg-corematrix-green300/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Central Phone Card Container */}
      <div className="w-full md:max-w-[520px] min-h-screen md:min-h-fit bg-gradient-to-b from-corematrix-card2 to-corematrix-bg1 rounded-none md:rounded-[48px] p-6 md:p-10 shadow-2xl relative border-0 md:border border-corematrix-border flex flex-col items-center overflow-hidden">
        {/* Visual Accent Waves */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-[-15deg] translate-x-1/2 pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 border-[32px] border-corematrix-border/20 rounded-full pointer-events-none"></div>

        {/* Top Control Bar */}
        <div className="w-full flex justify-between items-center relative z-10 mb-8">
          <div className="w-9 h-9 rounded-full bg-corematrix-green900/30 border border-corematrix-border backdrop-blur-sm flex items-center justify-center text-corematrix-green400">
            <i className="fa-solid fa-asterisk text-sm animate-spin-slow"></i>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSubscribeModalOpen(true)}
              className="bg-corematrix-green900/40 hover:bg-corematrix-green700 border border-corematrix-border2 text-corematrix-green300 hover:text-white rounded-full px-5 py-2 text-xs font-semibold tracking-wide uppercase backdrop-blur-sm transition-all cursor-pointer"
            >
              {isAr ? 'اشترك' : 'Subscribe'}
            </button>
            <button
              onClick={handleShareProfileClick}
              className="w-9 h-9 rounded-full bg-corematrix-green900/40 hover:bg-corematrix-green700 border border-corematrix-border2 backdrop-blur-sm flex items-center justify-center text-corematrix-green300 hover:text-white transition-all cursor-pointer"
            >
              <i className="fa-solid fa-share-nodes text-xs"></i>
            </button>
          </div>
        </div>

        {/* Circular Profile Avatar */}
        <div className="relative z-10 mb-5">
          <div className="w-28 h-28 rounded-full bg-corematrix-card flex items-center justify-center shadow-2xl border-4 border-corematrix-border p-4 transform hover:scale-105 transition-transform duration-300 overflow-hidden">
            {profile.logo ? (
              <img
                src={getMediaUrl(profile.logo)}
                alt={profile.companyName}
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <i className="fa-solid fa-building text-3xl text-corematrix-textDim"></i>
            )}
          </div>
        </div>

        {/* Company & Subtitle Details */}
        <div className="text-center relative z-10 max-w-sm mb-6">
          <h1 className="text-2xl font-black text-corematrix-textPrimary tracking-tight uppercase leading-tight mb-2">
            {profile.companyName}
          </h1>
          {profile.title && (
            <p className="text-sm text-corematrix-textSecondary font-medium leading-relaxed px-4">
              {profile.title}
            </p>
          )}
        </div>

        {/* Social Network Links Row */}
        <div className="flex flex-row flex-nowrap gap-3 justify-center items-center relative z-10 mb-8 max-w-full px-2">
          {profile.instagram && (
            <a href={profile.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 shrink-0 rounded-full bg-corematrix-green900/20 border border-corematrix-border flex items-center justify-center text-corematrix-green400 hover:bg-corematrix-green400 hover:text-corematrix-bg0 hover:scale-110 transition-all shadow-md">
              <i className="fab fa-instagram text-base"></i>
            </a>
          )}
          {profile.facebook && (
            <a href={profile.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 shrink-0 rounded-full bg-corematrix-green900/20 border border-corematrix-border flex items-center justify-center text-corematrix-green400 hover:bg-corematrix-green400 hover:text-corematrix-bg0 hover:scale-110 transition-all shadow-md">
              <i className="fab fa-facebook-f text-base"></i>
            </a>
          )}
          {profile.twitter && (
            <a href={profile.twitter} target="_blank" rel="noreferrer" className="w-10 h-10 shrink-0 rounded-full bg-corematrix-green900/20 border border-corematrix-border flex items-center justify-center text-corematrix-green400 hover:bg-corematrix-green400 hover:text-corematrix-bg0 hover:scale-110 transition-all shadow-md">
              <i className="fa-brands fa-x-twitter text-base"></i>
            </a>
          )}
          {profile.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 shrink-0 rounded-full bg-corematrix-green900/20 border border-corematrix-border flex items-center justify-center text-corematrix-green400 hover:bg-corematrix-green400 hover:text-corematrix-bg0 hover:scale-110 transition-all shadow-md">
              <i className="fab fa-linkedin-in text-base"></i>
            </a>
          )}
          {profile.email && (
            <a href={`mailto:${profile.email}`} className="w-10 h-10 shrink-0 rounded-full bg-corematrix-green900/20 border border-corematrix-border flex items-center justify-center text-corematrix-green400 hover:bg-corematrix-green400 hover:text-corematrix-bg0 hover:scale-110 transition-all shadow-md">
              <i className="fas fa-envelope text-base"></i>
            </a>
          )}
          {profile.phone && (
            <a href={`tel:${profile.phone}`} className="w-10 h-10 shrink-0 rounded-full bg-corematrix-green900/20 border border-corematrix-border flex items-center justify-center text-corematrix-green400 hover:bg-corematrix-green400 hover:text-corematrix-bg0 hover:scale-110 transition-all shadow-md">
              <i className="fas fa-phone text-base"></i>
            </a>
          )}
        </div>

        {/* Main Links Container */}
        <div className="w-full space-y-4 relative z-10 flex-grow mb-10">
          {activeItems.length === 0 ? (
            <div className="text-center bg-corematrix-card/50 rounded-3xl p-8 border border-corematrix-border">
              <p className="text-xs text-corematrix-textMuted font-medium italic">
                {isAr ? 'لا توجد روابط متاحة بعد' : 'No links available yet'}
              </p>
            </div>
          ) : (
            activeItems.map((item) => {
              const mainUrl = item.link || (item.attachment ? getMediaUrl(item.attachment) : '#');
              return (
                <a
                  key={item.id}
                  href={mainUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-corematrix-card hover:bg-corematrix-card2 border border-corematrix-border hover:border-corematrix-green500/35 rounded-2xl md:rounded-[24px] p-3 shadow-lg flex items-center justify-center relative transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group min-h-[68px]"
                >
                  {/* Thumbnail Icon */}
                  <div className="absolute start-3 w-11 h-11 rounded-xl bg-corematrix-bg2 border border-corematrix-border flex items-center justify-center p-1.5 shrink-0 overflow-hidden shadow-inner group-hover:scale-105 transition-transform">
                    {item.image ? (
                      <img
                        src={getMediaUrl(item.image)}
                        alt=""
                        className="w-full h-full object-cover rounded-md"
                      />
                    ) : (
                      <i className="fa-solid fa-link text-corematrix-green400 text-base"></i>
                    )}
                  </div>

                  {/* Title */}
                  <span className="text-sm md:text-[15px] font-bold text-corematrix-textPrimary truncate text-center ps-14 pe-14 w-full">
                    {item.title}
                  </span>

                  {/* 3-Dots Share Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleShareClick(item);
                    }}
                    className="absolute end-4 w-8 h-8 rounded-full bg-corematrix-bg1 hover:bg-corematrix-bg2 border border-corematrix-border flex items-center justify-center text-corematrix-textMuted hover:text-corematrix-green400 transition-all z-20 cursor-pointer"
                  >
                    <i className="fa-solid fa-ellipsis-vertical text-xs"></i>
                  </button>
                </a>
              );
            })
          )}
        </div>

        {/* Bottom CTA Button */}
        {profile.bottomCtaText && (
          <a
            href={profile.bottomCtaLink || '#'}
            target="_blank"
            rel="noreferrer"
            className="relative z-10 w-full bg-corematrix-green500 hover:bg-corematrix-green400 text-corematrix-bg0 text-center font-bold py-4 px-6 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all text-xs tracking-wider uppercase"
          >
            {profile.bottomCtaText}
          </a>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-[9px] text-corematrix-textDim font-bold tracking-wider uppercase space-x-1.5 relative z-10 select-none">
          <span className="hover:text-corematrix-green400 cursor-pointer" onClick={() => setCookieModalOpen(true)}>
            {isAr ? 'تفضيلات ملفات تعريف الارتباط' : 'Cookie Preferences'}
          </span>
          <span>•</span>
          <a href="/terms" target="_blank" rel="noreferrer" className="hover:text-corematrix-green400">
            {isAr ? 'الشروط والأحكام' : 'Terms & Conditions'}
          </a>
          <span>•</span>
          <a href="/privacy" target="_blank" rel="noreferrer" className="hover:text-corematrix-green400">
            {isAr ? 'الخصوصية' : 'Privacy'}
          </a>
          <span>•</span>
          <span className="hover:text-corematrix-green400 cursor-pointer" onClick={() => setAboutModalOpen(true)}>
            {isAr ? 'حول هذا الحساب' : 'About this account'}
          </span>
        </div>
      </div>

      {/* Floating Mobile QR Card (Desktop viewports only) */}
      <div className="hidden xl:flex fixed bottom-8 right-8 flex-col items-center bg-corematrix-card border border-corematrix-border p-4 rounded-3xl shadow-2xl backdrop-blur-md z-20">
        <span className="text-[9px] uppercase font-bold tracking-widest text-corematrix-textMuted mb-2.5">
          {isAr ? 'عرض على الهاتف' : 'View on Mobile'}
        </span>
        <div className="w-24 h-24 bg-white p-1 rounded-xl flex items-center justify-center overflow-hidden">
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https%3A%2F%2Fcorematrixs.com%2Fportfolio&color=000000&bgcolor=ffffff&margin=0&format=svg"
            alt="QR code for https://corematrixs.com/portfolio"
            width={96}
            height={96}
            className="w-full h-full object-contain"
          />
        </div>
        <span className="text-[8px] text-corematrix-textDim mt-2 font-mono tracking-tight opacity-60">
          corematrixs.com/portfolio
        </span>
      </div>

      {/* 1. COOKIE PREFERENCES MODAL */}
      {cookieModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-in" dir={isAr ? 'rtl' : 'ltr'}>
          <div className="bg-corematrix-card rounded-[32px] border border-corematrix-border w-full max-w-md overflow-hidden shadow-2xl flex flex-col">
            <div className="px-6 py-5 border-b border-corematrix-border flex justify-between items-center bg-corematrix-bg2/50">
              <h2 className="text-sm font-bold text-corematrix-textPrimary uppercase tracking-wider">
                {isAr ? 'تفضيلات ملفات تعريف الارتباط' : 'Cookie Preferences'}
              </h2>
              <button
                onClick={() => setCookieModalOpen(false)}
                className="w-8 h-8 rounded-full bg-corematrix-bg1 border border-corematrix-border flex items-center justify-center text-corematrix-textMuted hover:text-corematrix-textPrimary transition-colors cursor-pointer"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-xs text-corematrix-textMuted leading-relaxed font-normal">
                {isAr
                  ? 'نحن نستخدم ملفات تعريف الارتباط لتحسين أداء موقعنا وتقديم تجربة مستخدم مخصصة.'
                  : 'We use cookies to optimize your platform experience, analyze layout traffic, and support operations.'}
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 bg-corematrix-bg2 p-3.5 rounded-2xl border border-corematrix-border">
                  <input type="checkbox" checked disabled className="mt-1 w-4 h-4 rounded text-corematrix-green500 border-corematrix-border focus:ring-corematrix-green500" />
                  <div className="flex flex-col text-start">
                    <span className="text-xs font-bold text-corematrix-textPrimary">
                      {isAr ? 'ملفات تعريف الارتباط الأساسية' : 'Essential Cookies'}
                    </span>
                    <span className="text-[10px] text-corematrix-textMuted">
                      {isAr ? 'مطلوب لتشغيل الموقع بشكل صحيح.' : 'Required for core platform features.'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-corematrix-bg2 p-3.5 rounded-2xl border border-corematrix-border cursor-pointer" onClick={() => setAnalyticsCookies(!analyticsCookies)}>
                  <input type="checkbox" checked={analyticsCookies} readOnly className="mt-1 w-4 h-4 rounded text-corematrix-green500 border-corematrix-border focus:ring-corematrix-green500" />
                  <div className="flex flex-col text-start">
                    <span className="text-xs font-bold text-corematrix-textPrimary">
                      {isAr ? 'ملفات تعريف الارتباط التحليلية' : 'Analytics Cookies'}
                    </span>
                    <span className="text-[10px] text-corematrix-textMuted">
                      {isAr ? 'تساعدنا في قياس حركة المرور وتحسين أداء الموقع.' : 'Helps us measure site traffic and improve performance.'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-corematrix-bg2 p-3.5 rounded-2xl border border-corematrix-border cursor-pointer" onClick={() => setMarketingCookies(!marketingCookies)}>
                  <input type="checkbox" checked={marketingCookies} readOnly className="mt-1 w-4 h-4 rounded text-corematrix-green500 border-corematrix-border focus:ring-corematrix-green500" />
                  <div className="flex flex-col text-start">
                    <span className="text-xs font-bold text-corematrix-textPrimary">
                      {isAr ? 'ملفات تعريف الارتباط التسويقية' : 'Marketing Cookies'}
                    </span>
                    <span className="text-[10px] text-corematrix-textMuted">
                      {isAr ? 'تستخدم لتتبع الزوار وتخصيص الإعلانات.' : 'Used for tracking visitors to deliver relevant ads.'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-corematrix-border">
                <button
                  onClick={() => setCookieModalOpen(false)}
                  className="flex-1 py-3 px-4 rounded-xl bg-corematrix-green750 bg-corematrix-green700 hover:bg-corematrix-green500 text-corematrix-bg0 font-bold text-xs shadow-lg transition-all cursor-pointer"
                >
                  {isAr ? 'حفظ التفضيلات' : 'Save Preferences'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. ABOUT THIS ACCOUNT MODAL */}
      {aboutModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-in" dir={isAr ? 'rtl' : 'ltr'}>
          <div className="bg-corematrix-card rounded-[32px] border border-corematrix-border w-full max-w-md overflow-hidden shadow-2xl flex flex-col">
            <div className="px-6 py-5 border-b border-corematrix-border flex justify-between items-center bg-corematrix-bg2/50">
              <h2 className="text-sm font-bold text-corematrix-textPrimary uppercase tracking-wider">
                {isAr ? 'حول هذا الحساب' : 'About This Account'}
              </h2>
              <button
                onClick={() => setAboutModalOpen(false)}
                className="w-8 h-8 rounded-full bg-corematrix-bg1 border border-corematrix-border flex items-center justify-center text-corematrix-textMuted hover:text-corematrix-textPrimary transition-colors cursor-pointer"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 border-b border-corematrix-border pb-4">
                <div className="w-16 h-16 rounded-full bg-corematrix-card border border-corematrix-border flex items-center justify-center p-2.5 shrink-0 overflow-hidden shadow-inner">
                  {profile.logo ? (
                    <img src={getMediaUrl(profile.logo)} alt="" className="max-w-full max-h-full object-contain" />
                  ) : (
                    <i className="fa-solid fa-building text-xl text-corematrix-textDim"></i>
                  )}
                </div>
                <div className="flex flex-col text-start">
                  <h4 className="text-sm font-bold text-corematrix-textPrimary flex items-center gap-1.5 uppercase tracking-tight leading-none">
                    {profile.companyName}
                    <i className="fas fa-check-circle text-corematrix-green400 text-sm" title="Verified Account"></i>
                  </h4>
                  <span className="text-[10px] text-corematrix-textMuted mt-1">
                    {isAr ? 'الحساب الرسمي المعتمد' : 'Verified Official Portfolio'}
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-start text-xs text-corematrix-textMuted leading-relaxed font-normal">
                <p>
                  {isAr
                    ? 'هذا هو حساب المحفظة الرسمي لشركة كورماتريكس (Corematrix).'
                    : 'This is the official link tree index and digital asset directory managed by the administrators of Corematrix.'}
                </p>
                <div className="bg-corematrix-bg2 p-4 rounded-2xl border border-corematrix-border space-y-2">
                  <div className="flex justify-between text-[11px]">
                    <span className="font-bold text-corematrix-textDim">{isAr ? 'الحالة:' : 'Status:'}</span>
                    <span className="font-black text-corematrix-green400">{isAr ? 'نشط ومعتمد' : 'Active & Verified'}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="font-bold text-corematrix-textDim">{isAr ? 'الجهة:' : 'Publisher:'}</span>
                    <span className="font-bold text-corematrix-textSecondary">Corematrix Co.</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="font-bold text-corematrix-textDim">{isAr ? 'موقع الشركة:' : 'Corporate Website:'}</span>
                    <a href="https://corematrixs.com" target="_blank" rel="noreferrer" className="font-bold text-corematrix-green400 hover:underline">
                      corematrixs.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-corematrix-border">
                <button
                  onClick={() => setAboutModalOpen(false)}
                  className="flex-grow py-3 px-4 rounded-xl bg-corematrix-bg1 border border-corematrix-border hover:bg-corematrix-bg2 text-corematrix-textPrimary font-bold text-xs transition-all cursor-pointer"
                >
                  {isAr ? 'إغلاق' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. SUBSCRIBE MODAL */}
      {subscribeModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-in" dir={isAr ? 'rtl' : 'ltr'}>
          <div className="bg-corematrix-card rounded-[32px] border border-corematrix-border w-full max-w-md overflow-hidden shadow-2xl flex flex-col">
            <div className="px-6 py-5 border-b border-corematrix-border flex justify-between items-center bg-corematrix-bg2/50">
              <h2 className="text-sm font-bold text-corematrix-textPrimary uppercase tracking-wider">
                {isAr ? 'الاشتراك في النشرة الإخبارية' : 'Subscribe to Newsletter'}
              </h2>
              <button
                onClick={() => {
                  setSubscribeModalOpen(false);
                  setSubscribeEmail('');
                  setSubscribeStatus('idle');
                  setSubscribeMessage('');
                }}
                className="w-8 h-8 rounded-full bg-corematrix-bg1 border border-corematrix-border flex items-center justify-center text-corematrix-textMuted hover:text-corematrix-textPrimary transition-colors cursor-pointer"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleSubscribeSubmit} className="p-6 space-y-4">
              <p className="text-xs text-corematrix-textMuted leading-relaxed font-normal text-start">
                {isAr
                  ? 'اشترك في نشرتنا الإخبارية لتلقي آخر الأخبار والتحديثات والعروض الحصرية مباشرة في بريدك الإلكتروني.'
                  : 'Subscribe to our newsletter to receive the latest updates, news, and exclusive offers directly in your inbox.'}
              </p>

              {subscribeStatus === 'success' ? (
                <div className="p-4 bg-corematrix-green900/20 text-corematrix-green400 rounded-2xl border border-corematrix-border flex items-start gap-3">
                  <i className="fas fa-check-circle mt-0.5 text-base shrink-0"></i>
                  <div className="text-start">
                    <p className="text-xs font-bold">{isAr ? 'تم الاشتراك بنجاح!' : 'Subscription Successful!'}</p>
                    <p className="text-[10px] mt-0.5 opacity-90">{subscribeMessage || (isAr ? 'شكرًا لك على الاشتراك في نشرتنا الإخبارية.' : 'Thank you for subscribing to our newsletter.')}</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-2 text-start">
                    <label htmlFor="sub-email" className="text-xs font-bold text-corematrix-textSecondary">
                      {isAr ? 'البريد الإلكتروني' : 'Email Address'}
                    </label>
                    <input
                      id="sub-email"
                      type="email"
                      required
                      value={subscribeEmail}
                      onChange={(e) => setSubscribeEmail(e.target.value)}
                      placeholder="name@example.com"
                      disabled={subscribeStatus === 'loading'}
                      className="w-full px-4 py-3 rounded-2xl border border-corematrix-border bg-corematrix-bg2 text-corematrix-textPrimary placeholder-corematrix-textDim focus:outline-none focus:ring-2 focus:ring-corematrix-green500 focus:border-transparent text-sm disabled:opacity-50 transition-all"
                    />
                  </div>

                  {subscribeStatus === 'error' && (
                    <div className="p-3 bg-red-900/10 text-red-400 rounded-2xl border border-red-900/30 flex items-start gap-2.5">
                      <i className="fas fa-exclamation-circle mt-0.5 text-sm shrink-0"></i>
                      <span className="text-[11px] leading-snug text-start">{subscribeMessage}</span>
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSubscribeModalOpen(false);
                        setSubscribeEmail('');
                        setSubscribeStatus('idle');
                        setSubscribeMessage('');
                      }}
                      className="flex-1 py-3 px-4 rounded-xl bg-corematrix-bg1 hover:bg-corematrix-bg2 border border-corematrix-border text-corematrix-textPrimary font-bold text-xs transition-all cursor-pointer"
                      disabled={subscribeStatus === 'loading'}
                    >
                      {isAr ? 'إلغاء' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      disabled={subscribeStatus === 'loading'}
                      className="flex-1 py-3 px-4 rounded-xl bg-corematrix-green700 hover:bg-corematrix-green500 text-corematrix-bg0 font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                    >
                      {subscribeStatus === 'loading' && (
                        <i className="fas fa-spinner animate-spin"></i>
                      )}
                      {isAr ? 'اشترك الآن' : 'Subscribe Now'}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}

      {/* 4. SHARE MODAL */}
      {shareModalOpen && shareItem && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-in" dir={isAr ? 'rtl' : 'ltr'}>
          <div className="bg-corematrix-card rounded-[32px] border border-corematrix-border w-full max-w-md overflow-hidden shadow-2xl flex flex-col">
            <div className="px-6 py-5 border-b border-corematrix-border flex justify-between items-center bg-corematrix-bg2/50">
              <h2 className="text-sm font-bold text-corematrix-textPrimary uppercase tracking-wider">
                {isAr ? 'مشاركة الرابط' : 'Share link'}
              </h2>
              <button
                onClick={() => {
                  setShareModalOpen(false);
                  setShareItem(null);
                  setCopied(false);
                }}
                className="w-8 h-8 rounded-full bg-corematrix-bg1 border border-corematrix-border flex items-center justify-center text-corematrix-textMuted hover:text-corematrix-textPrimary transition-colors cursor-pointer"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-6 flex flex-col items-center">
              {/* Link Preview Card */}
              <div className="w-full bg-corematrix-bg2 text-corematrix-textPrimary p-6 rounded-[24px] flex flex-col items-center justify-center shadow-inner mb-6 text-center border border-corematrix-border relative overflow-hidden">

                {/* Decorative SVG Background */}
                <svg
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 400 200"
                  preserveAspectRatio="xMidYMid slice"
                >
                  {/* Grid lines */}
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#4ade80" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="400" height="200" fill="url(#grid)" />

                  {/* Circuit nodes */}
                  <circle cx="40" cy="40" r="3" fill="#4ade80"/>
                  <circle cx="100" cy="40" r="2" fill="#4ade80"/>
                  <circle cx="160" cy="80" r="3" fill="#4ade80"/>
                  <circle cx="240" cy="40" r="2" fill="#4ade80"/>
                  <circle cx="320" cy="80" r="3" fill="#4ade80"/>
                  <circle cx="360" cy="40" r="2" fill="#4ade80"/>
                  <circle cx="60" cy="120" r="2" fill="#4ade80"/>
                  <circle cx="140" cy="160" r="3" fill="#4ade80"/>
                  <circle cx="280" cy="140" r="2" fill="#4ade80"/>
                  <circle cx="360" cy="160" r="3" fill="#4ade80"/>

                  {/* Circuit traces */}
                  <polyline points="40,40 100,40 100,80 160,80" fill="none" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round"/>
                  <polyline points="160,80 240,80 240,40 320,40 320,80 360,80" fill="none" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round"/>
                  <polyline points="60,120 60,160 140,160 140,120 200,120" fill="none" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round"/>
                  <polyline points="200,120 280,120 280,140 360,140 360,160" fill="none" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round"/>
                  <polyline points="40,40 40,120 60,120" fill="none" stroke="#4ade80" strokeWidth="1" strokeDasharray="4 3"/>
                  <polyline points="360,40 360,80" fill="none" stroke="#4ade80" strokeWidth="1" strokeDasharray="4 3"/>

                  {/* IC chip shapes */}
                  <rect x="90" y="30" width="20" height="20" rx="2" fill="none" stroke="#4ade80" strokeWidth="1"/>
                  <rect x="230" y="30" width="20" height="20" rx="2" fill="none" stroke="#4ade80" strokeWidth="1"/>
                  <rect x="270" y="128" width="20" height="24" rx="2" fill="none" stroke="#4ade80" strokeWidth="1"/>

                  {/* Glow dots */}
                  <circle cx="200" cy="40" r="4" fill="#4ade80" opacity="0.5"/>
                  <circle cx="200" cy="160" r="4" fill="#4ade80" opacity="0.5"/>
                </svg>

                {/* Radial gradient overlay to fade edges */}
                <div className="absolute inset-0 bg-radial-[ellipse_80%_60%_at_50%_50%] from-transparent to-corematrix-bg2/80 pointer-events-none rounded-[24px]" />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-20 h-20 bg-corematrix-card border border-corematrix-border rounded-2xl flex items-center justify-center p-2 mb-4 shadow-md overflow-hidden shrink-0">
                    {shareItem.image ? (
                      <img
                        src={getMediaUrl(shareItem.image)}
                        alt=""
                        className="w-full h-full object-cover rounded-md"
                      />
                    ) : (
                      <i className="fa-solid fa-link text-corematrix-green400 text-2xl"></i>
                    )}
                  </div>
                  <h3 className="text-base font-bold truncate max-w-full px-2">
                    {shareItem.title}
                  </h3>
                  <p className="text-[10px] text-corematrix-textMuted mt-1 truncate max-w-full px-4 select-all">
                    {getShareUrl(shareItem)}
                  </p>
                </div>
              </div>

              {/* Share Targets Horizontal Row */}
              <div className="w-full overflow-x-auto no-scrollbar pb-2 pt-1">
                <div className="flex gap-6 px-4 justify-center min-w-max">
                  {/* Copy Link */}
                  <button
                    onClick={handleCopyLink}
                    className="flex flex-col items-center gap-2 group focus:outline-none cursor-pointer"
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-base transition-all shadow-md shrink-0 ${copied
                      ? 'bg-emerald-500 text-white'
                      : 'bg-corematrix-bg1 hover:bg-corematrix-bg2 border border-corematrix-border text-corematrix-green400'
                      }`}>
                      {copied ? (
                        <i className="fas fa-check animate-scale-up"></i>
                      ) : (
                        <i className="fas fa-link"></i>
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-corematrix-textMuted uppercase tracking-tight">
                      {copied ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'نسخ الرابط' : 'Copy link')}
                    </span>
                  </button>

                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(shareItem.title + ' ' + getShareUrl(shareItem))}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#1ebe57] text-white flex items-center justify-center text-lg transition-all shadow-md shrink-0">
                      <i className="fab fa-whatsapp"></i>
                    </div>
                    <span className="text-[10px] font-bold text-corematrix-textMuted uppercase tracking-tight">
                      {isAr ? 'واتساب' : 'WhatsApp'}
                    </span>
                  </a>

                  {/* Twitter / X */}
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(getShareUrl(shareItem))}&text=${encodeURIComponent(shareItem.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-black hover:bg-zinc-900 border border-corematrix-border text-white flex items-center justify-center text-lg transition-all shadow-md shrink-0">
                      <i className="fab fa-x-twitter"></i>
                    </div>
                    <span className="text-[10px] font-bold text-corematrix-textMuted uppercase tracking-tight">
                      X
                    </span>
                  </a>

                  {/* Facebook */}
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl(shareItem))}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center text-lg transition-all shadow-md shrink-0">
                      <i className="fab fa-facebook-f"></i>
                    </div>
                    <span className="text-[10px] font-bold text-corematrix-textMuted uppercase tracking-tight">
                      Facebook
                    </span>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getShareUrl(shareItem))}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-700 hover:bg-blue-800 text-white flex items-center justify-center text-lg transition-all shadow-md shrink-0">
                      <i className="fab fa-linkedin-in"></i>
                    </div>
                    <span className="text-[10px] font-bold text-corematrix-textMuted uppercase tracking-tight">
                      LinkedIn
                    </span>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:?subject=${encodeURIComponent(shareItem.title)}&body=${encodeURIComponent(shareItem.title + '\n\n' + getShareUrl(shareItem))}`}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-corematrix-green900/40 hover:bg-corematrix-green700 border border-corematrix-border2 text-corematrix-green300 hover:text-white flex items-center justify-center text-lg transition-all shadow-md shrink-0">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <span className="text-[10px] font-bold text-corematrix-textMuted uppercase tracking-tight">
                      {isAr ? 'إيميل' : 'Email'}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
