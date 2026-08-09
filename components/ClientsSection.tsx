'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { Client, Partner, Certificate } from '@/lib/clientPartner';
import { getMediaUrl } from '@/lib/products';
import { apiEndpoint } from '@/lib/apiBase';

interface ClientsSectionProps {
  lang?: string;
  dict?: any;
  clients?: Client[];
  partners?: Partner[];
  certificates?: Certificate[];
}

export default function ClientsSection({
  lang,
  dict,
  clients: initialClients = [],
  partners: initialPartners = [],
  certificates: initialCertificates = []
}: ClientsSectionProps) {
  const { language } = useLanguage();
  const currentLang = lang || language || 'en';
  const isRtl = currentLang === 'ar';
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [clients, setClients] = useState<Client[]>(initialClients);
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [certificates, setCertificates] = useState<Certificate[]>(initialCertificates);

  useEffect(() => {
    if (initialClients.length > 0) setClients(initialClients);
    if (initialPartners.length > 0) setPartners(initialPartners);
    if (initialCertificates.length > 0) setCertificates(initialCertificates);
  }, [initialClients, initialPartners, initialCertificates]);

  useEffect(() => {
    async function fetchClientPartnerFallback() {
      try {
        const apiBase = apiEndpoint('/api/client-partner');
        const [cRes, pRes, certRes] = await Promise.all([
          clients.length === 0 ? fetch(`${apiBase}/clients?status=active`, { cache: 'no-store' }) : null,
          partners.length === 0 ? fetch(`${apiBase}/partners?status=active`, { cache: 'no-store' }) : null,
          certificates.length === 0 ? fetch(`${apiBase}/certificates?status=active`, { cache: 'no-store' }) : null
        ]);

        if (cRes && cRes.ok) {
          const cData = await cRes.json();
          const items = Array.isArray(cData?.data) ? cData.data : (Array.isArray(cData?.result) ? cData.result : (Array.isArray(cData) ? cData : []));
          if (items.length > 0) setClients(items);
        }
        if (pRes && pRes.ok) {
          const pData = await pRes.json();
          const items = Array.isArray(pData?.data) ? pData.data : (Array.isArray(pData?.result) ? pData.result : (Array.isArray(pData) ? pData : []));
          if (items.length > 0) setPartners(items);
        }
        if (certRes && certRes.ok) {
          const certData = await certRes.json();
          const items = Array.isArray(certData?.data) ? certData.data : (Array.isArray(certData?.result) ? certData.result : (Array.isArray(certData) ? certData : []));
          if (items.length > 0) setCertificates(items);
        }
      } catch (err) {
        console.error('Client-side client/partner fetch error:', err);
      }
    }

    if (clients.length === 0 || partners.length === 0 || certificates.length === 0) {
      fetchClientPartnerFallback();
    }
  }, [clients.length, partners.length, certificates.length]);

  const getFullImageUrl = (path: string) => {
    if (!path) return '/icon.png';
    return getMediaUrl(path);
  };

  const SectionHeader = ({ title, subtitle, icon }: { title: string; subtitle: string; icon: string }) => (
    <div className="text-center mb-10 px-4">
      <div className="flex flex-row items-center justify-center gap-4 mb-4 group">
        <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/10 transition-transform duration-500 group-hover:scale-110">
          <i className={`fas ${icon} text-xl`} />
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
          {title}
        </h2>
      </div>
      <p className="text-corematrix-textMuted text-sm font-normal max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  );

  const Carousel = ({ items, autoplayTimeout = 3500 }: { items: any[]; autoplayTimeout?: number }) => {
    const [itemsToShow, setItemsToShow] = useState(4);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [transitionEnabled, setTransitionEnabled] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 640) setItemsToShow(2);
        else if (window.innerWidth < 1024) setItemsToShow(3);
        else setItemsToShow(4);
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Clone items for infinite smooth carousel loop
    const displayItems = useMemo(() => {
      if (items.length === 0) return [];
      if (items.length <= itemsToShow) return items;
      return [
        ...items.slice(-itemsToShow),
        ...items,
        ...items.slice(0, itemsToShow)
      ];
    }, [items, itemsToShow]);

    useEffect(() => {
      if (items.length > 0) {
        setCurrentIndex(items.length <= itemsToShow ? 0 : itemsToShow);
      }
    }, [items.length, itemsToShow]);

    const totalPages = Math.ceil(items.length / itemsToShow);
    const realIndex = items.length <= itemsToShow
      ? currentIndex
      : (currentIndex - itemsToShow + items.length) % items.length;
    const currentDot = Math.floor(realIndex / itemsToShow);

    const nextSlide = useCallback(() => {
      if (!transitionEnabled || items.length <= itemsToShow) return;
      setCurrentIndex(prev => prev + 1);
    }, [transitionEnabled, items.length, itemsToShow]);

    const handleTransitionEnd = () => {
      if (items.length <= itemsToShow) return;
      if (currentIndex >= items.length + itemsToShow) {
        setTransitionEnabled(false);
        setCurrentIndex(itemsToShow);
      } else if (currentIndex <= 0) {
        setTransitionEnabled(false);
        setCurrentIndex(items.length);
      }
    };

    useEffect(() => {
      if (!transitionEnabled) {
        const timer = setTimeout(() => setTransitionEnabled(true), 50);
        return () => clearTimeout(timer);
      }
    }, [transitionEnabled]);

    useEffect(() => {
      if (isPaused || items.length <= itemsToShow) return;
      const timer = setInterval(nextSlide, autoplayTimeout);
      return () => clearInterval(timer);
    }, [nextSlide, isPaused, items.length, itemsToShow, autoplayTimeout]);

    if (items.length === 0) return null;

    return (
      <div
        className="w-full mb-12 last:mb-0"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative overflow-hidden px-4 md:px-0 pt-6 pb-4">
          <div
            ref={containerRef}
            className={`flex gap-4 ${transitionEnabled ? 'transition-transform duration-700 ease-in-out' : ''}`}
            onTransitionEnd={handleTransitionEnd}
            style={{
              transform: `translateX(-${(currentIndex * (100 / itemsToShow))}%)`,
              direction: 'ltr'
            }}
          >
            {displayItems.map((item, index) => {
              const imgUrl = getFullImageUrl(item.logo || item.image);
              return (
                <div
                  key={`${item.id || index}-${index}`}
                  className="flex-shrink-0 px-3"
                  style={{ width: `calc(${100 / itemsToShow}%)` }}
                  onClick={() => setSelectedImage(item.logo || item.image || '/icon.png')}
                >
                  <div className="group relative bg-corematrix-bg1 border border-corematrix-border hover:border-cyan-500/50 rounded-2xl p-6 transition-all duration-500 hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)] flex items-center justify-center h-[150px] w-full max-w-[280px] mx-auto cursor-pointer hover:-translate-y-2">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={imgUrl}
                        alt={item.name || 'Logo'}
                        width={180}
                        height={100}
                        unoptimized
                        className="max-h-[100px] w-auto object-contain transition-all duration-500 group-hover:scale-110 filter drop-shadow"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2.5 mt-6">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setTransitionEnabled(true);
                  setCurrentIndex(idx * itemsToShow + itemsToShow);
                }}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentDot === idx
                    ? 'w-8 bg-cyan-500'
                    : 'w-2.5 bg-corematrix-border hover:bg-zinc-600'
                }`}
                aria-label={`Go to slide group ${idx + 1}`}
                suppressHydrationWarning
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  const hasData = clients.length > 0 || partners.length > 0 || certificates.length > 0;
  if (!hasData) return null;

  return (
    <section className="py-16 bg-corematrix-bg0 border-y border-corematrix-border/50 overflow-hidden relative">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">

        {/* Valued Clients */}
        {clients.length > 0 && (
          <div className="mb-16">
            <SectionHeader
              title={dict?.clientsPage?.clients?.title || (isRtl ? 'عملائنا المميزين' : 'Our Valued Clients')}
              subtitle={dict?.clientsPage?.clients?.description || (isRtl ? 'نحن فخورون بالعمل مع قادة الصناعة عبر مختلف القطاعات' : "We're proud to partner with industry leaders across multiple sectors")}
              icon="fa-users"
            />
            <Carousel items={clients} autoplayTimeout={2500} />
          </div>
        )}

        {/* Strategic Partnerships */}
        {partners.length > 0 && (
          <div className="mb-16">
            <SectionHeader
              title={dict?.clientsPage?.partners?.title || (isRtl ? 'الشراكات الاستراتيجية' : 'Strategic Partnerships')}
              subtitle={dict?.clientsPage?.partners?.description || (isRtl ? 'نتعاون مع رواد التكنولوجيا لتقديم حلول متميزة' : 'Collaborating with technology leaders to deliver exceptional solutions')}
              icon="fa-handshake"
            />
            <Carousel items={partners} autoplayTimeout={3500} />
          </div>
        )}

        {/* Certifications */}
        {certificates.length > 0 && (
          <div>
            <SectionHeader
              title={dict?.clientsPage?.certificates?.title || (isRtl ? 'شهاداتنا' : 'Our Certifications')}
              subtitle={dict?.clientsPage?.certificates?.description || (isRtl ? 'تم الاعتراف بنا لالتزامنا بالجودة والتميز' : 'Recognized for our commitment to quality and excellence')}
              icon="fa-award"
            />
            <Carousel items={certificates} autoplayTimeout={4500} />
          </div>
        )}
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-corematrix-bg1 border border-corematrix-border rounded-3xl p-4 shadow-2xl animate-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-12 right-0 text-white text-3xl hover:text-cyan-400 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
            <div className="p-8 flex items-center justify-center bg-corematrix-bg0 rounded-2xl min-h-[350px]">
              <Image
                src={getFullImageUrl(selectedImage)}
                alt="Preview"
                width={800}
                height={600}
                unoptimized
                className="max-h-[65vh] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
