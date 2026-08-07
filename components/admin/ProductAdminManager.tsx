'use client';

import React, { useState, useEffect } from 'react';
import {
  Product,
  ProductCategory,
  getAdminProducts,
  getProductCategories,
  createProduct,
  updateProduct,
  deleteProduct,
  togglePublishProduct,
  getMediaUrl
} from '@/lib/products';

export default function ProductAdminManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<'basic' | 'hero' | 'about' | 'how' | 'features' | 'benefits' | 'vision' | 'why' | 'cta' | 'faqs' | 'seo'>('basic');

  // Form Fields
  const [title, setTitle] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [slug, setSlug] = useState('');
  const [categoryId, setCategoryId] = useState<number | ''>('');
  const [shortDescription, setShortDescription] = useState('');
  const [shortDescriptionAr, setShortDescriptionAr] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaTitleAr, setMetaTitleAr] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [metaDescriptionAr, setMetaDescriptionAr] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');
  const [metaKeywordsAr, setMetaKeywordsAr] = useState('');
  const [cardIcon, setCardIcon] = useState('fas fa-cube');
  const [order, setOrder] = useState(0);
  const [isPublished, setIsPublished] = useState(true);

  // Hero Fields
  const [heroTitle, setHeroTitle] = useState('');
  const [heroTitleAr, setHeroTitleAr] = useState('');
  const [heroSubtitle, setHeroSubtitle] = useState('');
  const [heroSubtitleAr, setHeroSubtitleAr] = useState('');
  const [heroDescription, setHeroDescription] = useState('');
  const [heroDescriptionAr, setHeroDescriptionAr] = useState('');
  const [heroPrimaryCtaText, setHeroPrimaryCtaText] = useState('Request Demo');
  const [heroPrimaryCtaTextAr, setHeroPrimaryCtaTextAr] = useState('طلب تجربة');
  const [heroPrimaryCtaLink, setHeroPrimaryCtaLink] = useState('/contact');
  const [heroSecondaryCtaText, setHeroSecondaryCtaText] = useState('Learn More');
  const [heroSecondaryCtaTextAr, setHeroSecondaryCtaTextAr] = useState('معرفة المزيد');
  const [heroSecondaryCtaLink, setHeroSecondaryCtaLink] = useState('#features');

  // About Section
  const [aboutTitle, setAboutTitle] = useState('');
  const [aboutTitleAr, setAboutTitleAr] = useState('');
  const [aboutContent, setAboutContent] = useState('');
  const [aboutContentAr, setAboutContentAr] = useState('');
  const [aboutImageAlt, setAboutImageAlt] = useState('');
  const [aboutImageAltAr, setAboutImageAltAr] = useState('');

  // Key Features Section
  const [keyFeaturesTitle, setKeyFeaturesTitle] = useState('');
  const [keyFeaturesTitleAr, setKeyFeaturesTitleAr] = useState('');
  const [keyFeaturesImageAlt, setKeyFeaturesImageAlt] = useState('');
  const [keyFeaturesImageAltAr, setKeyFeaturesImageAltAr] = useState('');

  // Vision Section
  const [visionTitle, setVisionTitle] = useState('');
  const [visionTitleAr, setVisionTitleAr] = useState('');
  const [visionSubtitle, setVisionSubtitle] = useState('');
  const [visionSubtitleAr, setVisionSubtitleAr] = useState('');

  // Why CoreMatrix Section
  const [whySharpTitle, setWhySharpTitle] = useState('');
  const [whySharpTitleAr, setWhySharpTitleAr] = useState('');
  const [whySharpContent, setWhySharpContent] = useState('');
  const [whySharpContentAr, setWhySharpContentAr] = useState('');
  const [whySharpImageAlt, setWhySharpImageAlt] = useState('');
  const [whySharpImageAltAr, setWhySharpImageAltAr] = useState('');

  // CTA Section
  const [ctaTitle, setCtaTitle] = useState('');
  const [ctaTitleAr, setCtaTitleAr] = useState('');
  const [ctaDescription, setCtaDescription] = useState('');
  const [ctaDescriptionAr, setCtaDescriptionAr] = useState('');
  const [ctaButton1Text, setCtaButton1Text] = useState('Request a Demo');
  const [ctaButton1TextAr, setCtaButton1TextAr] = useState('طلب تجربة');
  const [ctaButton1Link, setCtaButton1Link] = useState('/contact');
  const [ctaButton2Text, setCtaButton2Text] = useState('Explore Products');
  const [ctaButton2TextAr, setCtaButton2TextAr] = useState('استكشاف المنتجات');
  const [ctaButton2Link, setCtaButton2Link] = useState('/products');

  // JSON List Arrays
  const [howItWorks, setHowItWorks] = useState<{ icon: string; title: string; titleAr: string; description: string; descriptionAr: string }[]>([]);
  const [keyFeaturesList, setKeyFeaturesList] = useState<{ icon: string; text: string; textAr: string }[]>([]);
  const [benefits, setBenefits] = useState<{ icon: string; title: string; titleAr: string; description: string; descriptionAr: string }[]>([]);
  const [visionItems, setVisionItems] = useState<{ icon: string; text: string; textAr: string }[]>([]);
  const [faqs, setFaqs] = useState<{ question: string; questionAr: string; answer: string; answerAr: string }[]>([]);

  // File Upload State
  const [heroIconFile, setHeroIconFile] = useState<File | null>(null);
  const [aboutImageFile, setAboutImageFile] = useState<File | null>(null);
  const [keyFeaturesImageFile, setKeyFeaturesImageFile] = useState<File | null>(null);
  const [whySharpImageFile, setWhySharpImageFile] = useState<File | null>(null);
  const [brochureFile, setBrochureFile] = useState<File | null>(null);

  const loadData = async (currentPage = page, currentSearch = search, currentCat = selectedCategory) => {
    setLoading(true);
    try {
      const [prodRes, catList] = await Promise.all([
        getAdminProducts({
          page: currentPage,
          limit: 10,
          search: currentSearch || undefined,
          categoryId: currentCat === 'all' ? undefined : currentCat
        }),
        getProductCategories()
      ]);
      setProducts(prodRes.products || []);
      setTotalPages(prodRes.totalPages || 1);
      setCategories(catList || []);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [page, selectedCategory]);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editItem) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  const openCreateModal = () => {
    setEditItem(null);
    setActiveTab('basic');
    setTitle('');
    setTitleAr('');
    setSlug('');
    setCategoryId(categories.length > 0 ? categories[0].id : '');
    setShortDescription('');
    setShortDescriptionAr('');
    setMetaTitle('');
    setMetaTitleAr('');
    setMetaDescription('');
    setMetaDescriptionAr('');
    setMetaKeywords('');
    setMetaKeywordsAr('');
    setCardIcon('fas fa-cube');
    setOrder(products.length + 1);
    setIsPublished(true);

    setHeroTitle('');
    setHeroTitleAr('');
    setHeroSubtitle('');
    setHeroSubtitleAr('');
    setHeroDescription('');
    setHeroDescriptionAr('');
    setHeroPrimaryCtaText('Request Demo');
    setHeroPrimaryCtaTextAr('طلب تجربة');
    setHeroPrimaryCtaLink('/contact');
    setHeroSecondaryCtaText('Learn More');
    setHeroSecondaryCtaTextAr('معرفة المزيد');
    setHeroSecondaryCtaLink('#features');

    setAboutTitle('');
    setAboutTitleAr('');
    setAboutContent('');
    setAboutContentAr('');
    setAboutImageAlt('');
    setAboutImageAltAr('');

    setKeyFeaturesTitle('Key Features');
    setKeyFeaturesTitleAr('المميزات الرئيسية');
    setKeyFeaturesImageAlt('');
    setKeyFeaturesImageAltAr('');

    setVisionTitle('Vision Alignment');
    setVisionTitleAr('محاذاة الرؤية');
    setVisionSubtitle('');
    setVisionSubtitleAr('');

    setWhySharpTitle('Why Choose CoreMatrix');
    setWhySharpTitleAr('لماذا كور ماتركس');
    setWhySharpContent('');
    setWhySharpContentAr('');
    setWhySharpImageAlt('');
    setWhySharpImageAltAr('');

    setCtaTitle('Drive Next-Level Transformation Today');
    setCtaTitleAr('ابدأ الخطوة التالية اليوم');
    setCtaDescription('Contact our solution architects for customized platform demonstrations and enterprise pricing.');
    setCtaDescriptionAr('تواصل مع خبراء الحلول لدينا للحصول على عروض مخصصة للمؤسسات.');
    setCtaButton1Text('Request a Demo');
    setCtaButton1TextAr('طلب تجربة');
    setCtaButton1Link('/contact');
    setCtaButton2Text('Explore Products');
    setCtaButton2TextAr('استكشاف المنتجات');
    setCtaButton2Link('/products');

    setHowItWorks([
      { icon: 'fas fa-arrow-right', title: 'Discovery & Consultation', titleAr: 'الاستكشاف والاستشارة', description: 'Analyze organizational requirements and goals', descriptionAr: 'تحليل متطلبات المؤسسة وأهداف العمل' },
      { icon: 'fas fa-arrow-right', title: 'Integration & Deployment', titleAr: 'التكامل والتطوير', description: 'Deploy platform and configure enterprise modules', descriptionAr: 'نشر المنصة وتكوين الوحدات البرمجية' }
    ]);
    setKeyFeaturesList([
      { icon: 'fas fa-check', text: 'High Availability: 99.99% uptime architecture', textAr: 'توافر عالي: بنية نسيجية تضمن 99.99% من التشغيل المستمر' },
      { icon: 'fas fa-check', text: 'Advanced Security: End-to-end encryption & RBAC controls', textAr: 'أمان متقدم: تشفير شامل وعناصر تحكم بالوصول المستندة إلى الأدوار' }
    ]);
    setBenefits([
      { icon: 'fas fa-shield-alt', title: 'Operational Efficiency', titleAr: 'الكفاءة التشغيلية', description: 'Accelerate workflow execution speed by 40%', descriptionAr: 'تسريع سرعة تنفيذ سير العمل بنسبة 40%' }
    ]);
    setVisionItems([
      { icon: 'fas fa-rocket', text: 'Enterprise Scalability', textAr: 'قابلية التوسع للمؤسسات' }
    ]);
    setFaqs([
      { question: 'Is cloud and hybrid deployment supported?', questionAr: 'هل تدعم المنصة النشر السحابي والهجين؟', answer: 'Yes, we support multi-cloud, hybrid, and fully on-premise deployments.', answerAr: 'نعم، نحن ندعم جميع بيئات النشر السحابية والهجينة والمحلية بالكامل.' }
    ]);

    setHeroIconFile(null);
    setAboutImageFile(null);
    setKeyFeaturesImageFile(null);
    setWhySharpImageFile(null);
    setBrochureFile(null);

    setModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditItem(p);
    setActiveTab('basic');
    setTitle(p.title || '');
    setTitleAr(p.titleAr || '');
    setSlug(p.slug || '');
    setCategoryId(p.categoryId || '');
    setShortDescription(p.shortDescription || '');
    setShortDescriptionAr(p.shortDescriptionAr || '');
    setMetaTitle(p.metaTitle || '');
    setMetaTitleAr(p.metaTitleAr || '');
    setMetaDescription(p.metaDescription || '');
    setMetaDescriptionAr(p.metaDescriptionAr || '');
    setMetaKeywords(p.metaKeywords || '');
    setMetaKeywordsAr(p.metaKeywordsAr || '');
    setCardIcon(p.cardIcon || 'fas fa-cube');
    setOrder(p.order || 0);
    setIsPublished(p.isPublished);

    setHeroTitle(p.heroTitle || '');
    setHeroTitleAr(p.heroTitleAr || '');
    setHeroSubtitle(p.heroSubtitle || '');
    setHeroSubtitleAr(p.heroSubtitleAr || '');
    setHeroDescription(p.heroDescription || '');
    setHeroDescriptionAr(p.heroDescriptionAr || '');
    setHeroPrimaryCtaText(p.heroPrimaryCtaText || 'Request Demo');
    setHeroPrimaryCtaTextAr(p.heroPrimaryCtaTextAr || 'طلب تجربة');
    setHeroPrimaryCtaLink(p.heroPrimaryCtaLink || '/contact');
    setHeroSecondaryCtaText(p.heroSecondaryCtaText || 'Learn More');
    setHeroSecondaryCtaTextAr(p.heroSecondaryCtaTextAr || 'معرفة المزيد');
    setHeroSecondaryCtaLink(p.heroSecondaryCtaLink || '#features');

    setAboutTitle(p.aboutTitle || '');
    setAboutTitleAr(p.aboutTitleAr || '');
    setAboutContent(p.aboutContent || '');
    setAboutContentAr(p.aboutContentAr || '');
    setAboutImageAlt(p.aboutImageAlt || '');
    setAboutImageAltAr(p.aboutImageAltAr || '');

    setKeyFeaturesTitle(p.keyFeaturesTitle || 'Key Features');
    setKeyFeaturesTitleAr(p.keyFeaturesTitleAr || 'المميزات الرئيسية');
    setKeyFeaturesImageAlt(p.keyFeaturesImageAlt || '');
    setKeyFeaturesImageAltAr(p.keyFeaturesImageAltAr || '');

    setVisionTitle(p.visionTitle || 'Vision Alignment');
    setVisionTitleAr(p.visionTitleAr || 'محاذاة الرؤية');
    setVisionSubtitle(p.visionSubtitle || '');
    setVisionSubtitleAr(p.visionSubtitleAr || '');

    setWhySharpTitle(p.whySharpTitle || 'Why Choose CoreMatrix');
    setWhySharpTitleAr(p.whySharpTitleAr || 'لماذا كور ماتركس');
    setWhySharpContent(p.whySharpContent || '');
    setWhySharpContentAr(p.whySharpContentAr || '');
    setWhySharpImageAlt(p.whySharpImageAlt || '');
    setWhySharpImageAltAr(p.whySharpImageAltAr || '');

    setCtaTitle(p.ctaTitle || 'Drive Next-Level Transformation Today');
    setCtaTitleAr(p.ctaTitleAr || 'ابدأ الخطوة التالية اليوم');
    setCtaDescription(p.ctaDescription || '');
    setCtaDescriptionAr(p.ctaDescriptionAr || '');
    setCtaButton1Text(p.ctaButton1Text || 'Request a Demo');
    setCtaButton1TextAr(p.ctaButton1TextAr || 'طلب تجربة');
    setCtaButton1Link(p.ctaButton1Link || '/contact');
    setCtaButton2Text(p.ctaButton2Text || 'Explore Products');
    setCtaButton2TextAr(p.ctaButton2TextAr || 'استكشاف المنتجات');
    setCtaButton2Link(p.ctaButton2Link || '/products');

    setHowItWorks(Array.isArray(p.howItWorks) ? p.howItWorks.map((hw: any) => ({
      icon: hw.icon || 'fas fa-arrow-right',
      title: hw.title || '',
      titleAr: hw.titleAr || '',
      description: hw.description || '',
      descriptionAr: hw.descriptionAr || ''
    })) : []);
    setKeyFeaturesList(Array.isArray(p.keyFeaturesList) ? p.keyFeaturesList.map((kf: any) => ({
      icon: typeof kf === 'string' ? 'fas fa-check' : (kf.icon || 'fas fa-check'),
      text: typeof kf === 'string' ? kf : (kf.text || ''),
      textAr: typeof kf === 'string' ? '' : (kf.textAr || '')
    })) : []);
    setBenefits(Array.isArray(p.benefits) ? p.benefits.map((b: any) => ({
      icon: b.icon || 'fas fa-shield-alt',
      title: b.title || '',
      titleAr: b.titleAr || '',
      description: b.description || '',
      descriptionAr: b.descriptionAr || ''
    })) : []);
    setVisionItems(Array.isArray(p.visionItems) ? p.visionItems.map((v: any) => ({
      icon: typeof v === 'string' ? 'fas fa-rocket' : (v.icon || 'fas fa-rocket'),
      text: typeof v === 'string' ? v : (v.text || ''),
      textAr: typeof v === 'string' ? '' : (v.textAr || '')
    })) : []);
    setFaqs(Array.isArray(p.faqs) ? p.faqs.map((f: any) => ({
      question: f.question || f.question_en || '',
      questionAr: f.questionAr || f.question_ar || '',
      answer: f.answer || f.answer_en || '',
      answerAr: f.answerAr || f.answer_ar || ''
    })) : []);

    setHeroIconFile(null);
    setAboutImageFile(null);
    setKeyFeaturesImageFile(null);
    setWhySharpImageFile(null);
    setBrochureFile(null);

    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await deleteProduct(id);
      if (res.success) loadData();
      else alert(res.message || 'Error deleting product');
    } catch (error) {
      alert('An error occurred');
    }
  };

  const handleTogglePublish = async (p: Product) => {
    try {
      const res = await togglePublishProduct(p.id, !p.isPublished);
      if (res.success) loadData();
    } catch (error) {
      console.error('Error toggling publish status:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('title', title || '');
      if (titleAr) formData.append('titleAr', titleAr);
      formData.append('slug', slug || '');
      if (categoryId) formData.append('categoryId', categoryId.toString());
      if (shortDescription) formData.append('shortDescription', shortDescription);
      if (shortDescriptionAr) formData.append('shortDescriptionAr', shortDescriptionAr);
      if (metaTitle) formData.append('metaTitle', metaTitle);
      if (metaTitleAr) formData.append('metaTitleAr', metaTitleAr);
      if (metaDescription) formData.append('metaDescription', metaDescription);
      if (metaDescriptionAr) formData.append('metaDescriptionAr', metaDescriptionAr);
      if (metaKeywords) formData.append('metaKeywords', metaKeywords);
      if (metaKeywordsAr) formData.append('metaKeywordsAr', metaKeywordsAr);
      if (cardIcon) formData.append('cardIcon', cardIcon);
      formData.append('order', order.toString());
      formData.append('isPublished', isPublished ? 'true' : 'false');

      if (heroTitle) formData.append('heroTitle', heroTitle);
      if (heroTitleAr) formData.append('heroTitleAr', heroTitleAr);
      if (heroSubtitle) formData.append('heroSubtitle', heroSubtitle);
      if (heroSubtitleAr) formData.append('heroSubtitleAr', heroSubtitleAr);
      if (heroDescription) formData.append('heroDescription', heroDescription);
      if (heroDescriptionAr) formData.append('heroDescriptionAr', heroDescriptionAr);
      if (heroPrimaryCtaText) formData.append('heroPrimaryCtaText', heroPrimaryCtaText);
      if (heroPrimaryCtaTextAr) formData.append('heroPrimaryCtaTextAr', heroPrimaryCtaTextAr);
      if (heroPrimaryCtaLink) formData.append('heroPrimaryCtaLink', heroPrimaryCtaLink);
      if (heroSecondaryCtaText) formData.append('heroSecondaryCtaText', heroSecondaryCtaText);
      if (heroSecondaryCtaTextAr) formData.append('heroSecondaryCtaTextAr', heroSecondaryCtaTextAr);
      if (heroSecondaryCtaLink) formData.append('heroSecondaryCtaLink', heroSecondaryCtaLink);

      if (aboutTitle) formData.append('aboutTitle', aboutTitle);
      if (aboutTitleAr) formData.append('aboutTitleAr', aboutTitleAr);
      if (aboutContent) formData.append('aboutContent', aboutContent);
      if (aboutContentAr) formData.append('aboutContentAr', aboutContentAr);
      if (aboutImageAlt) formData.append('aboutImageAlt', aboutImageAlt);
      if (aboutImageAltAr) formData.append('aboutImageAltAr', aboutImageAltAr);

      if (keyFeaturesTitle) formData.append('keyFeaturesTitle', keyFeaturesTitle);
      if (keyFeaturesTitleAr) formData.append('keyFeaturesTitleAr', keyFeaturesTitleAr);
      if (keyFeaturesImageAlt) formData.append('keyFeaturesImageAlt', keyFeaturesImageAlt);
      if (keyFeaturesImageAltAr) formData.append('keyFeaturesImageAltAr', keyFeaturesImageAltAr);

      if (visionTitle) formData.append('visionTitle', visionTitle);
      if (visionTitleAr) formData.append('visionTitleAr', visionTitleAr);
      if (visionSubtitle) formData.append('visionSubtitle', visionSubtitle);
      if (visionSubtitleAr) formData.append('visionSubtitleAr', visionSubtitleAr);

      if (whySharpTitle) formData.append('whySharpTitle', whySharpTitle);
      if (whySharpTitleAr) formData.append('whySharpTitleAr', whySharpTitleAr);
      if (whySharpContent) formData.append('whySharpContent', whySharpContent);
      if (whySharpContentAr) formData.append('whySharpContentAr', whySharpContentAr);
      if (whySharpImageAlt) formData.append('whySharpImageAlt', whySharpImageAlt);
      if (whySharpImageAltAr) formData.append('whySharpImageAltAr', whySharpImageAltAr);

      if (ctaTitle) formData.append('ctaTitle', ctaTitle);
      if (ctaTitleAr) formData.append('ctaTitleAr', ctaTitleAr);
      if (ctaDescription) formData.append('ctaDescription', ctaDescription);
      if (ctaDescriptionAr) formData.append('ctaDescriptionAr', ctaDescriptionAr);
      if (ctaButton1Text) formData.append('ctaButton1Text', ctaButton1Text);
      if (ctaButton1TextAr) formData.append('ctaButton1TextAr', ctaButton1TextAr);
      if (ctaButton1Link) formData.append('ctaButton1Link', ctaButton1Link);
      if (ctaButton2Text) formData.append('ctaButton2Text', ctaButton2Text);
      if (ctaButton2TextAr) formData.append('ctaButton2TextAr', ctaButton2TextAr);
      if (ctaButton2Link) formData.append('ctaButton2Link', ctaButton2Link);

      formData.append('howItWorks', JSON.stringify(howItWorks));
      formData.append('keyFeaturesList', JSON.stringify(keyFeaturesList));
      formData.append('benefits', JSON.stringify(benefits));
      formData.append('visionItems', JSON.stringify(visionItems));
      formData.append('faqs', JSON.stringify(faqs));

      if (heroIconFile) formData.append('heroIcon', heroIconFile);
      if (aboutImageFile) formData.append('aboutImage', aboutImageFile);
      if (keyFeaturesImageFile) formData.append('keyFeaturesImages', keyFeaturesImageFile);
      if (whySharpImageFile) formData.append('whySharpImage', whySharpImageFile);
      if (brochureFile) formData.append('brochure', brochureFile);

      const res = editItem
        ? await updateProduct(editItem.id, formData)
        : await createProduct(formData);

      if (res.success) {
        setModalOpen(false);
        loadData();
      } else {
        alert(res.message || 'Error saving product');
      }
    } catch (error) {
      alert('An error occurred while saving product');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-corematrix-bg1 border border-corematrix-border rounded-3xl p-6 shadow-xl">
        <div>
          <h2 className="text-2xl font-black text-corematrix-text tracking-tight">Products Manager</h2>
          <p className="text-corematrix-textMuted text-xs mt-1">Manage enterprise software suites, bilingual descriptions, and feature sections.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-corematrix-green700 to-emerald-600 hover:from-corematrix-green600 hover:to-emerald-500 text-white text-xs font-bold px-6 py-3 rounded-2xl shadow-lg shadow-corematrix-green900/20 transition-all cursor-pointer"
        >
          <i className="fas fa-plus"></i> Add New Product
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-corematrix-bg1 border border-corematrix-border rounded-2xl p-4">
        <form onSubmit={(e) => { e.preventDefault(); loadData(1, search, selectedCategory); }} className="w-full sm:w-auto flex items-center gap-2">
          <input
            type="text"
            value={search || ''}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-2 text-xs text-corematrix-text focus:outline-none focus:border-corematrix-green700 w-full sm:w-64"
          />
          <button type="submit" className="px-4 py-2 rounded-xl bg-corematrix-green900/30 text-corematrix-green400 border border-corematrix-green700/40 text-xs font-bold hover:bg-corematrix-green900/50 transition-colors">
            Search
          </button>
        </form>

        <div className="w-full sm:w-auto flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-corematrix-textMuted shrink-0">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => { setSelectedCategory(e.target.value); setPage(1); }}
            className="bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-2 text-xs text-corematrix-text focus:outline-none focus:border-corematrix-green700 w-full sm:w-auto"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-corematrix-bg1 border border-corematrix-border rounded-3xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-corematrix-textMuted text-[11px] font-bold uppercase tracking-widest border-b border-corematrix-border bg-corematrix-bg0/30">
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Title (EN / AR)</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-corematrix-border/50 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-corematrix-textMuted">
                    <i className="fas fa-spinner fa-spin mr-2"></i> Loading products...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-corematrix-textMuted font-medium italic">
                    No products found. Click "Add New Product" to create one.
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id} className="hover:bg-corematrix-bg0/40 transition-colors">
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleTogglePublish(p)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          p.isPublished ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${p.isPublished ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                        {p.isPublished ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-corematrix-green900/30 border border-corematrix-green700/40 flex items-center justify-center text-corematrix-green400 shrink-0">
                          {p.heroIcon ? (
                            <img src={getMediaUrl(p.heroIcon)} alt="" className="w-6 h-6 object-contain" />
                          ) : (
                            <i className={p.cardIcon || 'fas fa-cube'} />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-corematrix-text">{p.title}</p>
                          {p.titleAr && <p className="text-xs text-corematrix-textMuted" dir="rtl">{p.titleAr}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs bg-corematrix-bg0 border border-corematrix-border px-3 py-1 rounded-lg text-corematrix-textMuted">
                        {p.category?.name || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-corematrix-textMuted">{p.slug}</td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-mono text-corematrix-green400 bg-corematrix-green900/30 border border-corematrix-green700/40 px-2.5 py-1 rounded-lg">
                        #{p.order || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`/products/${p.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 text-corematrix-textMuted hover:text-corematrix-green400 transition-colors"
                          title="Preview"
                        >
                          <i className="fas fa-external-link-alt"></i>
                        </a>
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-2 text-corematrix-textMuted hover:text-corematrix-green400 transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-2 text-corematrix-textMuted hover:text-red-400 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-corematrix-border bg-corematrix-bg0/20">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 rounded-xl border border-corematrix-border text-xs font-bold text-corematrix-textMuted hover:bg-corematrix-bg0 disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-xs font-mono text-corematrix-textMuted">Page {page} of {totalPages}</span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 rounded-xl border border-corematrix-border text-xs font-bold text-corematrix-textMuted hover:bg-corematrix-bg0 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Comprehensive Product Edit / Create Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
          <div className="relative w-full max-w-5xl max-h-[94vh] bg-corematrix-bg1 border border-corematrix-border rounded-3xl p-6 shadow-2xl flex flex-col my-auto">
            
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between border-b border-corematrix-border pb-4 shrink-0">
              <h3 className="text-xl font-bold text-corematrix-text">
                {editItem ? `Edit Product: ${editItem.title}` : 'Add New Product'}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-corematrix-textMuted hover:text-white text-2xl cursor-pointer"
              >
                &times;
              </button>
            </div>

            {/* Modal Tabs Navigation */}
            <div className="flex items-center gap-2 overflow-x-auto py-3 border-b border-corematrix-border/50 shrink-0 text-xs font-bold no-scrollbar scrollbar-none scrollbar-hide [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {[
                { id: 'basic', label: '1. Basic Info' },
                { id: 'hero', label: '2. Hero Section' },
                { id: 'about', label: '3. About Solution' },
                { id: 'how', label: '4. How It Works' },
                { id: 'features', label: '5. Key Features' },
                { id: 'benefits', label: '6. Benefits & Impact' },
                { id: 'vision', label: '7. Vision Alignment' },
                { id: 'why', label: '8. Why CoreMatrix' },
                { id: 'cta', label: '9. CTA & Brochure' },
                { id: 'faqs', label: '10. FAQs List' },
                { id: 'seo', label: '11. SEO & Meta' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-corematrix-green900/40 text-corematrix-green400 border border-corematrix-green700/40'
                      : 'text-corematrix-textMuted hover:bg-corematrix-bg0 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modal Form Content Area */}
            <form onSubmit={handleSubmit} className="space-y-6 py-4 overflow-y-auto corematrix-scrollbar pr-2 flex-1 min-h-0">
              
              {/* TAB 1: BASIC INFO */}
              {activeTab === 'basic' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Product Title (English) *</label>
                      <input
                        type="text"
                        value={title || ''}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="e.g. CoreMatrix Sentinel AI"
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Product Title (Arabic)</label>
                      <input
                        type="text"
                        value={titleAr || ''}
                        onChange={(e) => setTitleAr(e.target.value)}
                        placeholder="كور ماتركس سنتينل"
                        dir="rtl"
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">URL Slug *</label>
                      <input
                        type="text"
                        value={slug || ''}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="corematrix-sentinel-ai"
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm font-mono text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Category</label>
                      <select
                        value={categoryId || ''}
                        onChange={(e) => setCategoryId(Number(e.target.value) || '')}
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                      >
                        <option value="">Select Category</option>
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Short Description (English)</label>
                      <textarea
                        rows={3}
                        value={shortDescription || ''}
                        onChange={(e) => setShortDescription(e.target.value)}
                        placeholder="Brief overview displayed on product cards..."
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Short Description (Arabic)</label>
                      <textarea
                        rows={3}
                        value={shortDescriptionAr || ''}
                        onChange={(e) => setShortDescriptionAr(e.target.value)}
                        placeholder="وصف قصير للمنتج..."
                        dir="rtl"
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Meta Title (EN)</label>
                      <input
                        type="text"
                        value={metaTitle || ''}
                        onChange={(e) => setMetaTitle(e.target.value)}
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Meta Title (AR)</label>
                      <input
                        type="text"
                        value={metaTitleAr || ''}
                        onChange={(e) => setMetaTitleAr(e.target.value)}
                        dir="rtl"
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Card Icon (FontAwesome)</label>
                      <input
                        type="text"
                        value={cardIcon || ''}
                        onChange={(e) => setCardIcon(e.target.value)}
                        placeholder="fas fa-cube"
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm font-mono text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Display Order</label>
                      <input
                        type="number"
                        value={order}
                        onChange={(e) => setOrder(Number(e.target.value))}
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="productIsPublished"
                      checked={isPublished}
                      onChange={(e) => setIsPublished(e.target.checked)}
                      className="w-4 h-4 rounded border-corematrix-border bg-corematrix-bg0 text-corematrix-green500 focus:ring-0 cursor-pointer"
                    />
                    <label htmlFor="productIsPublished" className="text-sm font-medium text-corematrix-text cursor-pointer">
                      Published (Visible on public website)
                    </label>
                  </div>
                </div>
              )}

              {/* TAB 2: HERO SECTION */}
              {activeTab === 'hero' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Hero Title (English)</label>
                      <input
                        type="text"
                        value={heroTitle || ''}
                        onChange={(e) => setHeroTitle(e.target.value)}
                        placeholder="Next-Gen Intelligent Security Platform"
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Hero Title (Arabic)</label>
                      <input
                        type="text"
                        value={heroTitleAr || ''}
                        onChange={(e) => setHeroTitleAr(e.target.value)}
                        dir="rtl"
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Hero Subtitle (English)</label>
                      <input
                        type="text"
                        value={heroSubtitle || ''}
                        onChange={(e) => setHeroSubtitle(e.target.value)}
                        placeholder="Real-Time Threat Prevention"
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Hero Subtitle (Arabic)</label>
                      <input
                        type="text"
                        value={heroSubtitleAr || ''}
                        onChange={(e) => setHeroSubtitleAr(e.target.value)}
                        dir="rtl"
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Hero Description (English)</label>
                      <textarea
                        rows={3}
                        value={heroDescription || ''}
                        onChange={(e) => setHeroDescription(e.target.value)}
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Hero Description (Arabic)</label>
                      <textarea
                        rows={3}
                        value={heroDescriptionAr || ''}
                        onChange={(e) => setHeroDescriptionAr(e.target.value)}
                        dir="rtl"
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Primary CTA (EN / AR & Link)</label>
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={heroPrimaryCtaText || ''}
                          onChange={(e) => setHeroPrimaryCtaText(e.target.value)}
                          placeholder="Request Demo (EN)"
                          className="bg-corematrix-bg0 border border-corematrix-border rounded-xl px-3 py-2 text-xs text-corematrix-text w-full"
                        />
                        <input
                          type="text"
                          value={heroPrimaryCtaTextAr || ''}
                          onChange={(e) => setHeroPrimaryCtaTextAr(e.target.value)}
                          placeholder="طلب تجربة (AR)"
                          dir="rtl"
                          className="bg-corematrix-bg0 border border-corematrix-border rounded-xl px-3 py-2 text-xs text-corematrix-text w-full"
                        />
                        <input
                          type="text"
                          value={heroPrimaryCtaLink || ''}
                          onChange={(e) => setHeroPrimaryCtaLink(e.target.value)}
                          placeholder="/contact"
                          className="bg-corematrix-bg0 border border-corematrix-border rounded-xl px-3 py-2 text-xs text-corematrix-text w-full font-mono"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Secondary CTA (EN / AR & Link)</label>
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={heroSecondaryCtaText || ''}
                          onChange={(e) => setHeroSecondaryCtaText(e.target.value)}
                          placeholder="Learn More (EN)"
                          className="bg-corematrix-bg0 border border-corematrix-border rounded-xl px-3 py-2 text-xs text-corematrix-text w-full"
                        />
                        <input
                          type="text"
                          value={heroSecondaryCtaTextAr || ''}
                          onChange={(e) => setHeroSecondaryCtaTextAr(e.target.value)}
                          placeholder="معرفة المزيد (AR)"
                          dir="rtl"
                          className="bg-corematrix-bg0 border border-corematrix-border rounded-xl px-3 py-2 text-xs text-corematrix-text w-full"
                        />
                        <input
                          type="text"
                          value={heroSecondaryCtaLink || ''}
                          onChange={(e) => setHeroSecondaryCtaLink(e.target.value)}
                          placeholder="#features"
                          className="bg-corematrix-bg0 border border-corematrix-border rounded-xl px-3 py-2 text-xs text-corematrix-text w-full font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Hero Icon / Image File</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setHeroIconFile(e.target.files?.[0] || null)}
                      className="w-full text-xs text-corematrix-textMuted file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-corematrix-green900/30 file:text-corematrix-green400 hover:file:bg-corematrix-green900/50 cursor-pointer"
                    />
                    {editItem?.heroIcon && !heroIconFile && (
                      <p className="text-[11px] text-corematrix-green400 mt-1">Current file: {editItem.heroIcon}</p>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: ABOUT SOLUTION */}
              {activeTab === 'about' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">About Section Title (EN)</label>
                      <input
                        type="text"
                        value={aboutTitle || ''}
                        onChange={(e) => setAboutTitle(e.target.value)}
                        placeholder="About the Solution"
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">About Section Title (AR)</label>
                      <input
                        type="text"
                        value={aboutTitleAr || ''}
                        onChange={(e) => setAboutTitleAr(e.target.value)}
                        placeholder="حول الحل"
                        dir="rtl"
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">About Content (EN)</label>
                      <textarea
                        rows={4}
                        value={aboutContent || ''}
                        onChange={(e) => setAboutContent(e.target.value)}
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">About Content (AR)</label>
                      <textarea
                        rows={4}
                        value={aboutContentAr || ''}
                        onChange={(e) => setAboutContentAr(e.target.value)}
                        dir="rtl"
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">About Section Image & Alt Text</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setAboutImageFile(e.target.files?.[0] || null)}
                      className="w-full text-xs text-corematrix-textMuted file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-corematrix-green900/30 file:text-corematrix-green400 hover:file:bg-corematrix-green900/50 cursor-pointer"
                    />
                    {editItem?.aboutImage && !aboutImageFile && (
                      <p className="text-[11px] text-corematrix-green400 mt-1">Current file: {editItem.aboutImage}</p>
                    )}
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <input
                        type="text"
                        value={aboutImageAlt || ''}
                        onChange={(e) => setAboutImageAlt(e.target.value)}
                        placeholder="Image Alt Text (EN)"
                        className="bg-corematrix-bg0 border border-corematrix-border rounded-xl px-3 py-2 text-xs text-corematrix-text"
                      />
                      <input
                        type="text"
                        value={aboutImageAltAr || ''}
                        onChange={(e) => setAboutImageAltAr(e.target.value)}
                        placeholder="Image Alt Text (AR)"
                        dir="rtl"
                        className="bg-corematrix-bg0 border border-corematrix-border rounded-xl px-3 py-2 text-xs text-corematrix-text"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: HOW IT WORKS */}
              {activeTab === 'how' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-corematrix-green400">How It Works Steps</h4>
                    <button
                      type="button"
                      onClick={() => setHowItWorks([...howItWorks, { icon: 'fas fa-arrow-right', title: '', titleAr: '', description: '', descriptionAr: '' }])}
                      className="text-xs font-bold text-corematrix-green400 hover:underline"
                    >
                      + Add Step
                    </button>
                  </div>

                  {howItWorks.map((hw, idx) => (
                    <div key={idx} className="p-4 bg-corematrix-bg0 rounded-2xl border border-corematrix-border space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-corematrix-green400">Step #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => setHowItWorks(howItWorks.filter((_, i) => i !== idx))}
                          className="text-red-400 hover:text-red-300 text-xs"
                        >
                          <i className="fas fa-trash-alt mr-1"></i> Remove
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={hw.icon || ''}
                          onChange={(e) => {
                            const updated = [...howItWorks];
                            updated[idx].icon = e.target.value;
                            setHowItWorks(updated);
                          }}
                          placeholder="Icon (fas fa-check)"
                          className="bg-corematrix-bg1 border border-corematrix-border rounded-xl px-3 py-2 text-xs font-mono text-corematrix-text"
                        />
                        <input
                          type="text"
                          value={hw.title || ''}
                          onChange={(e) => {
                            const updated = [...howItWorks];
                            updated[idx].title = e.target.value;
                            setHowItWorks(updated);
                          }}
                          placeholder="Title (EN)"
                          className="bg-corematrix-bg1 border border-corematrix-border rounded-xl px-3 py-2 text-xs text-corematrix-text"
                        />
                        <input
                          type="text"
                          value={hw.titleAr || ''}
                          onChange={(e) => {
                            const updated = [...howItWorks];
                            updated[idx].titleAr = e.target.value;
                            setHowItWorks(updated);
                          }}
                          placeholder="Title (AR)"
                          dir="rtl"
                          className="bg-corematrix-bg1 border border-corematrix-border rounded-xl px-3 py-2 text-xs text-corematrix-text"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <textarea
                          rows={2}
                          value={hw.description || ''}
                          onChange={(e) => {
                            const updated = [...howItWorks];
                            updated[idx].description = e.target.value;
                            setHowItWorks(updated);
                          }}
                          placeholder="Description (EN)"
                          className="bg-corematrix-bg1 border border-corematrix-border rounded-xl px-3 py-2 text-xs text-corematrix-text"
                        />
                        <textarea
                          rows={2}
                          value={hw.descriptionAr || ''}
                          onChange={(e) => {
                            const updated = [...howItWorks];
                            updated[idx].descriptionAr = e.target.value;
                            setHowItWorks(updated);
                          }}
                          placeholder="Description (AR)"
                          dir="rtl"
                          className="bg-corematrix-bg1 border border-corematrix-border rounded-xl px-3 py-2 text-xs text-corematrix-text"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 5: KEY FEATURES */}
              {activeTab === 'features' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Key Features Title (EN)</label>
                      <input
                        type="text"
                        value={keyFeaturesTitle || ''}
                        onChange={(e) => setKeyFeaturesTitle(e.target.value)}
                        placeholder="Key Features"
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Key Features Title (AR)</label>
                      <input
                        type="text"
                        value={keyFeaturesTitleAr || ''}
                        onChange={(e) => setKeyFeaturesTitleAr(e.target.value)}
                        placeholder="المميزات الرئيسية"
                        dir="rtl"
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Key Features Section Sticky Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setKeyFeaturesImageFile(e.target.files?.[0] || null)}
                      className="w-full text-xs text-corematrix-textMuted file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-corematrix-green900/30 file:text-corematrix-green400 hover:file:bg-corematrix-green900/50 cursor-pointer"
                    />
                    {editItem?.keyFeaturesImages?.[0] && !keyFeaturesImageFile && (
                      <p className="text-[11px] text-corematrix-green400 mt-1">Current image: {editItem.keyFeaturesImages[0]}</p>
                    )}
                  </div>

                  <div className="border-t border-corematrix-border pt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-corematrix-green400">Feature Items List</h4>
                      <button
                        type="button"
                        onClick={() => setKeyFeaturesList([...keyFeaturesList, { icon: 'fas fa-check', text: '', textAr: '' }])}
                        className="text-xs font-bold text-corematrix-green400 hover:underline"
                      >
                        + Add Feature
                      </button>
                    </div>

                    {keyFeaturesList.map((kf, idx) => (
                      <div key={idx} className="p-3 bg-corematrix-bg0 rounded-xl border border-corematrix-border flex flex-col md:flex-row items-center gap-3">
                        <input
                          type="text"
                          value={kf.icon || ''}
                          onChange={(e) => {
                            const updated = [...keyFeaturesList];
                            updated[idx].icon = e.target.value;
                            setKeyFeaturesList(updated);
                          }}
                          placeholder="Icon (fas fa-check)"
                          className="w-full md:w-36 bg-corematrix-bg1 border border-corematrix-border rounded-lg px-3 py-2 text-xs font-mono text-corematrix-text"
                        />
                        <input
                          type="text"
                          value={kf.text || ''}
                          onChange={(e) => {
                            const updated = [...keyFeaturesList];
                            updated[idx].text = e.target.value;
                            setKeyFeaturesList(updated);
                          }}
                          placeholder="Title: Description (EN)"
                          className="w-full flex-1 bg-corematrix-bg1 border border-corematrix-border rounded-lg px-3 py-2 text-xs text-corematrix-text"
                        />
                        <input
                          type="text"
                          value={kf.textAr || ''}
                          onChange={(e) => {
                            const updated = [...keyFeaturesList];
                            updated[idx].textAr = e.target.value;
                            setKeyFeaturesList(updated);
                          }}
                          placeholder="العنوان: الوصف (AR)"
                          dir="rtl"
                          className="w-full flex-1 bg-corematrix-bg1 border border-corematrix-border rounded-lg px-3 py-2 text-xs text-corematrix-text"
                        />
                        <button
                          type="button"
                          onClick={() => setKeyFeaturesList(keyFeaturesList.filter((_, i) => i !== idx))}
                          className="text-red-400 hover:text-red-300 p-2"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: BENEFITS */}
              {activeTab === 'benefits' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-corematrix-green400">Benefits & Impact Cards</h4>
                    <button
                      type="button"
                      onClick={() => setBenefits([...benefits, { icon: 'fas fa-shield-alt', title: '', titleAr: '', description: '', descriptionAr: '' }])}
                      className="text-xs font-bold text-corematrix-green400 hover:underline"
                    >
                      + Add Benefit
                    </button>
                  </div>

                  {benefits.map((b, idx) => (
                    <div key={idx} className="p-4 bg-corematrix-bg0 rounded-2xl border border-corematrix-border space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-corematrix-green400">Benefit #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => setBenefits(benefits.filter((_, i) => i !== idx))}
                          className="text-red-400 hover:text-red-300 text-xs"
                        >
                          <i className="fas fa-trash-alt mr-1"></i> Remove
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={b.icon || ''}
                          onChange={(e) => {
                            const updated = [...benefits];
                            updated[idx].icon = e.target.value;
                            setBenefits(updated);
                          }}
                          placeholder="Icon (fas fa-shield-alt)"
                          className="bg-corematrix-bg1 border border-corematrix-border rounded-xl px-3 py-2 text-xs font-mono text-corematrix-text"
                        />
                        <input
                          type="text"
                          value={b.title || ''}
                          onChange={(e) => {
                            const updated = [...benefits];
                            updated[idx].title = e.target.value;
                            setBenefits(updated);
                          }}
                          placeholder="Title (EN)"
                          className="bg-corematrix-bg1 border border-corematrix-border rounded-xl px-3 py-2 text-xs text-corematrix-text"
                        />
                        <input
                          type="text"
                          value={b.titleAr || ''}
                          onChange={(e) => {
                            const updated = [...benefits];
                            updated[idx].titleAr = e.target.value;
                            setBenefits(updated);
                          }}
                          placeholder="Title (AR)"
                          dir="rtl"
                          className="bg-corematrix-bg1 border border-corematrix-border rounded-xl px-3 py-2 text-xs text-corematrix-text"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <textarea
                          rows={2}
                          value={b.description || ''}
                          onChange={(e) => {
                            const updated = [...benefits];
                            updated[idx].description = e.target.value;
                            setBenefits(updated);
                          }}
                          placeholder="Description (EN)"
                          className="bg-corematrix-bg1 border border-corematrix-border rounded-xl px-3 py-2 text-xs text-corematrix-text"
                        />
                        <textarea
                          rows={2}
                          value={b.descriptionAr || ''}
                          onChange={(e) => {
                            const updated = [...benefits];
                            updated[idx].descriptionAr = e.target.value;
                            setBenefits(updated);
                          }}
                          placeholder="Description (AR)"
                          dir="rtl"
                          className="bg-corematrix-bg1 border border-corematrix-border rounded-xl px-3 py-2 text-xs text-corematrix-text"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 7: VISION ALIGNMENT */}
              {activeTab === 'vision' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Vision Title (EN)</label>
                      <input
                        type="text"
                        value={visionTitle || ''}
                        onChange={(e) => setVisionTitle(e.target.value)}
                        placeholder="Vision Alignment"
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Vision Title (AR)</label>
                      <input
                        type="text"
                        value={visionTitleAr || ''}
                        onChange={(e) => setVisionTitleAr(e.target.value)}
                        placeholder="محاذاة الرؤية"
                        dir="rtl"
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Vision Subtitle (EN)</label>
                      <input
                        type="text"
                        value={visionSubtitle || ''}
                        onChange={(e) => setVisionSubtitle(e.target.value)}
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Vision Subtitle (AR)</label>
                      <input
                        type="text"
                        value={visionSubtitleAr || ''}
                        onChange={(e) => setVisionSubtitleAr(e.target.value)}
                        dir="rtl"
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                      />
                    </div>
                  </div>

                  <div className="border-t border-corematrix-border pt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-corematrix-green400">Vision Badge Items</h4>
                      <button
                        type="button"
                        onClick={() => setVisionItems([...visionItems, { icon: 'fas fa-rocket', text: '', textAr: '' }])}
                        className="text-xs font-bold text-corematrix-green400 hover:underline"
                      >
                        + Add Vision Item
                      </button>
                    </div>

                    {visionItems.map((v, idx) => (
                      <div key={idx} className="p-3 bg-corematrix-bg0 rounded-xl border border-corematrix-border flex flex-col md:flex-row items-center gap-3">
                        <input
                          type="text"
                          value={v.icon || ''}
                          onChange={(e) => {
                            const updated = [...visionItems];
                            updated[idx].icon = e.target.value;
                            setVisionItems(updated);
                          }}
                          placeholder="Icon (fas fa-rocket)"
                          className="w-full md:w-36 bg-corematrix-bg1 border border-corematrix-border rounded-lg px-3 py-2 text-xs font-mono text-corematrix-text"
                        />
                        <input
                          type="text"
                          value={v.text || ''}
                          onChange={(e) => {
                            const updated = [...visionItems];
                            updated[idx].text = e.target.value;
                            setVisionItems(updated);
                          }}
                          placeholder="Text (EN)"
                          className="w-full flex-1 bg-corematrix-bg1 border border-corematrix-border rounded-lg px-3 py-2 text-xs text-corematrix-text"
                        />
                        <input
                          type="text"
                          value={v.textAr || ''}
                          onChange={(e) => {
                            const updated = [...visionItems];
                            updated[idx].textAr = e.target.value;
                            setVisionItems(updated);
                          }}
                          placeholder="النص (AR)"
                          dir="rtl"
                          className="w-full flex-1 bg-corematrix-bg1 border border-corematrix-border rounded-lg px-3 py-2 text-xs text-corematrix-text"
                        />
                        <button
                          type="button"
                          onClick={() => setVisionItems(visionItems.filter((_, i) => i !== idx))}
                          className="text-red-400 hover:text-red-300 p-2"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 8: WHY COREMATRIX */}
              {activeTab === 'why' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Why CoreMatrix Title (EN)</label>
                      <input
                        type="text"
                        value={whySharpTitle || ''}
                        onChange={(e) => setWhySharpTitle(e.target.value)}
                        placeholder="Why Choose CoreMatrix"
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Why CoreMatrix Title (AR)</label>
                      <input
                        type="text"
                        value={whySharpTitleAr || ''}
                        onChange={(e) => setWhySharpTitleAr(e.target.value)}
                        placeholder="لماذا كور ماتركس"
                        dir="rtl"
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Why Content (EN)</label>
                      <textarea
                        rows={4}
                        value={whySharpContent || ''}
                        onChange={(e) => setWhySharpContent(e.target.value)}
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Why Content (AR)</label>
                      <textarea
                        rows={4}
                        value={whySharpContentAr || ''}
                        onChange={(e) => setWhySharpContentAr(e.target.value)}
                        dir="rtl"
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Why CoreMatrix Image & Alt Text</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setWhySharpImageFile(e.target.files?.[0] || null)}
                      className="w-full text-xs text-corematrix-textMuted file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-corematrix-green900/30 file:text-corematrix-green400 hover:file:bg-corematrix-green900/50 cursor-pointer"
                    />
                    {editItem?.whySharpImage && !whySharpImageFile && (
                      <p className="text-[11px] text-corematrix-green400 mt-1">Current file: {editItem.whySharpImage}</p>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 9: CTA & BROCHURE */}
              {activeTab === 'cta' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">CTA Banner Title (EN)</label>
                      <input
                        type="text"
                        value={ctaTitle || ''}
                        onChange={(e) => setCtaTitle(e.target.value)}
                        placeholder="Drive Next-Level Transformation Today"
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">CTA Banner Title (AR)</label>
                      <input
                        type="text"
                        value={ctaTitleAr || ''}
                        onChange={(e) => setCtaTitleAr(e.target.value)}
                        placeholder="ابدأ الخطوة التالية اليوم"
                        dir="rtl"
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">CTA Description (EN)</label>
                      <input
                        type="text"
                        value={ctaDescription || ''}
                        onChange={(e) => setCtaDescription(e.target.value)}
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">CTA Description (AR)</label>
                      <input
                        type="text"
                        value={ctaDescriptionAr || ''}
                        onChange={(e) => setCtaDescriptionAr(e.target.value)}
                        dir="rtl"
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Button 1 Text (EN / AR & Link)</label>
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={ctaButton1Text || ''}
                          onChange={(e) => setCtaButton1Text(e.target.value)}
                          placeholder="Request a Demo (EN)"
                          className="bg-corematrix-bg0 border border-corematrix-border rounded-xl px-3 py-2 text-xs text-corematrix-text w-full"
                        />
                        <input
                          type="text"
                          value={ctaButton1TextAr || ''}
                          onChange={(e) => setCtaButton1TextAr(e.target.value)}
                          placeholder="طلب تجربة (AR)"
                          dir="rtl"
                          className="bg-corematrix-bg0 border border-corematrix-border rounded-xl px-3 py-2 text-xs text-corematrix-text w-full"
                        />
                        <input
                          type="text"
                          value={ctaButton1Link || ''}
                          onChange={(e) => setCtaButton1Link(e.target.value)}
                          placeholder="/contact"
                          className="bg-corematrix-bg0 border border-corematrix-border rounded-xl px-3 py-2 text-xs text-corematrix-text w-full font-mono"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Button 2 Text (EN / AR & Link)</label>
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={ctaButton2Text || ''}
                          onChange={(e) => setCtaButton2Text(e.target.value)}
                          placeholder="Explore Products (EN)"
                          className="bg-corematrix-bg0 border border-corematrix-border rounded-xl px-3 py-2 text-xs text-corematrix-text w-full"
                        />
                        <input
                          type="text"
                          value={ctaButton2TextAr || ''}
                          onChange={(e) => setCtaButton2TextAr(e.target.value)}
                          placeholder="استكشاف المنتجات (AR)"
                          dir="rtl"
                          className="bg-corematrix-bg0 border border-corematrix-border rounded-xl px-3 py-2 text-xs text-corematrix-text w-full"
                        />
                        <input
                          type="text"
                          value={ctaButton2Link || ''}
                          onChange={(e) => setCtaButton2Link(e.target.value)}
                          placeholder="/products"
                          className="bg-corematrix-bg0 border border-corematrix-border rounded-xl px-3 py-2 text-xs text-corematrix-text w-full font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Product Brochure File (PDF)</label>
                    <input
                      type="file"
                      accept="application/pdf,image/*"
                      onChange={(e) => setBrochureFile(e.target.files?.[0] || null)}
                      className="w-full text-xs text-corematrix-textMuted file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-corematrix-green900/30 file:text-corematrix-green400 hover:file:bg-corematrix-green900/50 cursor-pointer"
                    />
                    {editItem?.brochure && !brochureFile && (
                      <p className="text-[11px] text-corematrix-green400 mt-1">Current brochure: {editItem.brochure}</p>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 10: FAQS LIST */}
              {activeTab === 'faqs' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-corematrix-green400">Product FAQs List</h4>
                    <button
                      type="button"
                      onClick={() => setFaqs([...faqs, { question: '', questionAr: '', answer: '', answerAr: '' }])}
                      className="text-xs font-bold text-corematrix-green400 hover:underline"
                    >
                      + Add FAQ Item
                    </button>
                  </div>

                  {faqs.map((faq, idx) => (
                    <div key={idx} className="p-4 bg-corematrix-bg0 rounded-2xl border border-corematrix-border space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-corematrix-green400">FAQ #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => setFaqs(faqs.filter((_, i) => i !== idx))}
                          className="text-red-400 hover:text-red-300 text-xs"
                        >
                          <i className="fas fa-trash-alt mr-1"></i> Remove
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={faq.question || ''}
                          onChange={(e) => {
                            const updated = [...faqs];
                            updated[idx].question = e.target.value;
                            setFaqs(updated);
                          }}
                          placeholder="Question (EN)"
                          className="bg-corematrix-bg1 border border-corematrix-border rounded-xl px-4 py-2 text-xs text-corematrix-text"
                        />
                        <input
                          type="text"
                          value={faq.questionAr || ''}
                          onChange={(e) => {
                            const updated = [...faqs];
                            updated[idx].questionAr = e.target.value;
                            setFaqs(updated);
                          }}
                          placeholder="السؤال (AR)"
                          dir="rtl"
                          className="bg-corematrix-bg1 border border-corematrix-border rounded-xl px-4 py-2 text-xs text-corematrix-text"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <textarea
                          rows={2}
                          value={faq.answer || ''}
                          onChange={(e) => {
                            const updated = [...faqs];
                            updated[idx].answer = e.target.value;
                            setFaqs(updated);
                          }}
                          placeholder="Answer (EN)"
                          className="bg-corematrix-bg1 border border-corematrix-border rounded-xl px-4 py-2 text-xs text-corematrix-text"
                        />
                        <textarea
                          rows={2}
                          value={faq.answerAr || ''}
                          onChange={(e) => {
                            const updated = [...faqs];
                            updated[idx].answerAr = e.target.value;
                            setFaqs(updated);
                          }}
                          placeholder="الإجابة (AR)"
                          dir="rtl"
                          className="bg-corematrix-bg1 border border-corematrix-border rounded-xl px-4 py-2 text-xs text-corematrix-text"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 11: SEO & META */}
              {activeTab === 'seo' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Meta Title (English)</label>
                      <input
                        type="text"
                        value={metaTitle || ''}
                        onChange={(e) => setMetaTitle(e.target.value)}
                        placeholder="e.g. Enterprise AI Sentinel Solution | CoreMatrix"
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Meta Title (Arabic)</label>
                      <input
                        type="text"
                        value={metaTitleAr || ''}
                        onChange={(e) => setMetaTitleAr(e.target.value)}
                        placeholder="عنوان الميتا (بالعربية)"
                        dir="rtl"
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Meta Description (English)</label>
                      <textarea
                        rows={3}
                        value={metaDescription || ''}
                        onChange={(e) => setMetaDescription(e.target.value)}
                        placeholder="SEO meta description for search engines..."
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Meta Description (Arabic)</label>
                      <textarea
                        rows={3}
                        value={metaDescriptionAr || ''}
                        onChange={(e) => setMetaDescriptionAr(e.target.value)}
                        placeholder="وصف الميتا لمحركات البحث (بالعربية)..."
                        dir="rtl"
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Meta Keywords (English)</label>
                      <input
                        type="text"
                        value={metaKeywords || ''}
                        onChange={(e) => setMetaKeywords(e.target.value)}
                        placeholder="e.g. AI, enterprise, sentinel, software, automation"
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-corematrix-textMuted mb-2">Meta Keywords (Arabic)</label>
                      <input
                        type="text"
                        value={metaKeywordsAr || ''}
                        onChange={(e) => setMetaKeywordsAr(e.target.value)}
                        placeholder="الكلمات المفتاحية (بالعربية)"
                        dir="rtl"
                        className="w-full bg-corematrix-bg0 border border-corematrix-border rounded-xl px-4 py-3 text-sm text-corematrix-text focus:outline-none focus:border-corematrix-green700"
                      />
                    </div>
                  </div>
                </div>
              )}
            </form>

            {/* Modal Bottom Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-corematrix-border shrink-0">
              <div className="text-xs text-corematrix-textMuted font-mono">
                Tab {['basic', 'hero', 'about', 'how', 'features', 'benefits', 'vision', 'why', 'cta', 'faqs', 'seo'].indexOf(activeTab) + 1} of 11
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-corematrix-border text-xs font-bold text-corematrix-textMuted hover:bg-corematrix-bg0 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-corematrix-green700 to-emerald-600 hover:from-corematrix-green600 hover:to-emerald-500 text-white text-xs font-bold shadow-lg shadow-corematrix-green900/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : editItem ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
