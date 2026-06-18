'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';

type Tab = 'overview' | 'services' | 'blogs' | 'careers' | 'applications' | 'categories' | 'newsletter' | 'portfolio' | 'settings' | 'users';

function parseArrayToString(val: any): string {
  if (!val) return '';
  if (Array.isArray(val)) return val.join(', ');
  if (typeof val === 'string') {
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return parsed.join(', ');
    } catch (e) { }
    return val;
  }
  return '';
}

export default function AdminPortal() {
  const [token, setToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [mounted, setMounted] = useState(false);

  // Custom Confirmation Dialog State
  const [confirmState, setConfirmState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    isDanger?: boolean;
    onConfirm: () => void | Promise<void>;
  }>({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    isDanger: true,
    onConfirm: () => { },
  });

  const triggerConfirm = (
    title: string,
    message: string,
    onConfirm: () => void | Promise<void>,
    options?: { confirmText?: string; cancelText?: string; isDanger?: boolean }
  ) => {
    setConfirmState({
      isOpen: true,
      title,
      message,
      confirmText: options?.confirmText || 'Delete',
      cancelText: options?.cancelText || 'Cancel',
      isDanger: options?.isDanger !== false,
      onConfirm: async () => {
        await onConfirm();
        setConfirmState(prev => ({ ...prev, isOpen: false }));
      },
    });
  };

  // User Management & RBAC States
  const [userRole, setUserRole] = useState<string>('editor');
  const [userUsername, setUserUsername] = useState<string>('Staff');
  const [users, setUsers] = useState<any[]>([]);
  const [userForm, setUserForm] = useState({ id: '', username: '', password: '', role: 'editor' });
  const [showUserModal, setShowUserModal] = useState(false);
  const [userFormError, setUserFormError] = useState<string | null>(null);
  const [userFormSuccess, setUserFormSuccess] = useState<string | null>(null);
  const [userFormLoading, setUserFormLoading] = useState(false);

  // Auth form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Database lists
  const [services, setServices] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [careers, setCareers] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [serviceCategories, setServiceCategories] = useState<any[]>([]);
  const [newsletters, setNewsletters] = useState<any[]>([]);

  // Portfolio States
  const [portfolioProfile, setPortfolioProfile] = useState<any>(null);
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  const [portfolioLoading, setPortfolioLoading] = useState(false);
  const [portfolioProfileForm, setPortfolioProfileForm] = useState({
    companyName: '',
    title: '',
    instagram: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    email: '',
    phone: '',
    bottomCtaText: '',
    bottomCtaLink: '',
  });
  const [portfolioProfileLogoFile, setPortfolioProfileLogoFile] = useState<File | null>(null);
  const [portfolioProfileError, setPortfolioProfileError] = useState<string | null>(null);
  const [portfolioProfileSuccess, setPortfolioProfileSuccess] = useState<string | null>(null);
  const [portfolioProfileSaving, setPortfolioProfileSaving] = useState(false);
  const [showPortfolioItemModal, setShowPortfolioItemModal] = useState(false);
  const [portfolioItemForm, setPortfolioItemForm] = useState({
    id: '',
    title: '',
    link: '',
    order: 0,
    isActive: true,
  });
  const [portfolioItemImageFile, setPortfolioItemImageFile] = useState<File | null>(null);
  const [portfolioItemAttachFile, setPortfolioItemAttachFile] = useState<File | null>(null);
  const [portfolioItemError, setPortfolioItemError] = useState<string | null>(null);
  const [portfolioItemSuccess, setPortfolioItemSuccess] = useState<string | null>(null);
  const [portfolioItemSaving, setPortfolioItemSaving] = useState(false);

  // Category Edit Form States
  const [categoryForm, setCategoryForm] = useState({
    id: '',
    filterKey: '',
    label_en: '',
    label_ar: '',
    anchorId: '',
  });

  // Statistics
  const [stats, setStats] = useState({
    servicesCount: 0,
    blogsCount: 0,
    careersCount: 0,
    applicationsCount: 0,
    pendingApps: 0,
    newslettersCount: 0,
  });

  // Form loading states
  const [dataLoading, setDataLoading] = useState(false);

  // Service Edit Form States
  const [serviceForm, setServiceForm] = useState({
    id: '',
    category: 'ai',
    icon: 'fas fa-cogs',
    title_en: '',
    title_ar: '',
    description_en: '',
    description_ar: '',
    tags_en: '',
    tags_ar: '',
    detailSlug: '',
    badge_en: '',
    badge_ar: '',
    features_en: '',
    features_ar: '',
    metaTitle_en: '',
    metaTitle_ar: '',
    metaKeywords_en: '',
    metaKeywords_ar: '',
    metaDescription_en: '',
    metaDescription_ar: '',

    // HERO SECTION
    heroTitle: '',
    heroTitleAr: '',
    heroTagline: '',
    heroTaglineAr: '',
    heroIntroduction: '',
    heroIntroductionAr: '',
    primaryCtaText: '',
    primaryCtaTextAr: '',
    primaryCtaLink: '',
    secondaryCtaText: '',
    secondaryCtaTextAr: '',
    secondaryCtaLink: '',
    cardIcon: '',

    // ABOUT SECTION
    aboutSectionTitle: '',
    aboutSectionTitleAr: '',
    aboutSectionDescription: '',
    aboutSectionDescriptionAr: '',
    aboutSectionImageAlt: '',
    aboutSectionImageAltAr: '',
    aboutSectionBottomNote: '',
    aboutSectionBottomNoteAr: '',

    // SOLUTIONS / CAPABILITIES
    capabilitiesSectionTitle: '',
    capabilitiesSectionTitleAr: '',

    // INDUSTRIES SUPPORTED
    industriesSectionTitle: '',
    industriesSectionTitleAr: '',
    industriesSectionDescription: '',
    industriesSectionDescriptionAr: '',
    industriesImageAlt: '',
    industriesImageAltAr: '',
    industriesSectionBottomNote: '',
    industriesSectionBottomNoteAr: '',

    // CRITICAL WHY SECTION
    criticalSectionTitle: '',
    criticalSectionTitleAr: '',
    criticalSectionDescription: '',
    criticalSectionDescriptionAr: '',
    criticalSectionButtonText: '',
    criticalSectionButtonTextAr: '',
    criticalSectionButtonLink: '',
    criticalRightTitle: '',
    criticalRightTitleAr: '',

    // WHY CHOOSE US
    whyChooseUsSectionTitle: '',
    whyChooseUsSectionTitleAr: '',
    whyChooseUsDescription: '',
    whyChooseUsDescriptionAr: '',
    whyChooseUsShortDescription: '',
    whyChooseUsShortDescriptionAr: '',
    whyChooseUsBottomNote: '',
    whyChooseUsBottomNoteAr: '',

    // OVERVIEW SECTION (Legacy/Alternative)
    overviewSectionTitle: '',
    overviewSectionTitleAr: '',
    overviewWhatIsIt: '',
    overviewWhatIsItAr: '',
    overviewWhoIsItFor: '',
    overviewWhoIsItForAr: '',
    overviewProblemsSolved: '',
    overviewProblemsSolvedAr: '',

    // FINAL CALL TO ACTION (CTA)
    ctaMessage: '',
    ctaMessageAr: '',
    ctaPrimaryText: '',
    ctaPrimaryTextAr: '',
    ctaPrimaryLink: '',
    ctaSecondaryText: '',
    ctaSecondaryTextAr: '',
    ctaSecondaryLink: '',

    // AUDIT & ORDERING
    order: 0,
    isPublished: false,
    views: 0,
  });

  // Services dynamic arrays
  const [aboutPillars, setAboutPillars] = useState<any[]>([]);
  const [capabilities, setCapabilities] = useState<any[]>([]);
  const [industries, setIndustries] = useState<any[]>([]);
  const [criticalCards, setCriticalCards] = useState<any[]>([]);
  const [whyChooseUs, setWhyChooseUs] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);

  // Services sub-tab state for editing
  const [modalSubTab, setModalSubTab] = useState('basic');

  // Services file states
  const [serviceFiles, setServiceFiles] = useState<{ [key: string]: File | null }>({
    heroImage: null,
    heroIcon: null,
    aboutSectionImage: null,
    industriesImage: null,
    overviewImage: null,
  });
  const [servicePreviews, setServicePreviews] = useState<{ [key: string]: string | null }>({
    heroImage: null,
    heroIcon: null,
    aboutSectionImage: null,
    industriesImage: null,
    overviewImage: null,
  });

  // Blog Edit Form States
  const [blogForm, setBlogForm] = useState({
    id: '',
    slug: '',
    category: 'ai',
    tags: '',
    title_en: '',
    title_ar: '',
    excerpt_en: '',
    excerpt_ar: '',
    content_en: '',
    content_ar: '',
    authorName_en: 'Admin',
    authorName_ar: 'المشرف',
    authorRole_en: 'Content Manager',
    authorRole_ar: 'مدير المحتوى',
    authorInitials: 'AD',
    status: 'DRAFT',
    metaTitle_en: '',
    metaTitle_ar: '',
    metaKeywords_en: '',
    metaKeywords_ar: '',
    metaDescription_en: '',
    metaDescription_ar: '',
  });
  const [blogCoverFile, setBlogCoverFile] = useState<File | null>(null);

  // Career Edit Form States
  const [careerForm, setCareerForm] = useState({
    id: '',
    department: 'engineering',
    icon: 'fas fa-laptop-code',
    salaryRange: '',
    badge_en: '',
    badge_ar: '',
    title_en: '',
    title_ar: '',
    location_en: 'Remote',
    location_ar: 'عن بعد',
    employmentType_en: 'full-time',
    employmentType_ar: 'دوام كامل',
    description_en: '',
    description_ar: '',
    requirements_en: '',
    requirements_ar: '',
    responsibilities_en: '',
    responsibilities_ar: '',
  });

  const [requirementsList, setRequirementsList] = useState<{ en: string; ar: string }[]>([]);
  const [responsibilitiesList, setResponsibilitiesList] = useState<{ en: string; ar: string }[]>([]);

  // Settings form states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [settingsError, setSettingsError] = useState<string | null>(null);
  const [settingsSuccess, setSettingsSuccess] = useState<string | null>(null);
  const [settingsLoading, setSettingsLoading] = useState(false);

  // Form states mapping helper
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const savedToken = localStorage.getItem('corematrix-admin-token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserRole(payload.role || 'editor');
        setUserUsername(payload.username || 'Staff');
      } catch (err) {
        console.error('Failed to parse token payload:', err);
        setUserRole('editor');
        setUserUsername('Staff');
      }
    } else {
      setUserRole('editor');
      setUserUsername('Staff');
    }
  }, [token]);

  useEffect(() => {
    if (activeTab === 'users' && userRole !== 'admin') {
      setActiveTab('overview');
    }
  }, [activeTab, userRole]);

  useEffect(() => {
    if (activeTab === 'portfolio' && token) {
      fetchPortfolioData();
    }
  }, [activeTab, token]);

  const fetchUsers = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/auth/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  useEffect(() => {
    if (token && userRole === 'admin') {
      fetchUsers();
    }
  }, [token, userRole]);

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  const fetchDashboardData = async () => {
    setDataLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };

      const [servicesRes, blogsRes, careersRes, applicationsRes, categoriesRes, newslettersRes] = await Promise.all([
        fetch('/api/services', { headers }),
        fetch('/api/blogs', { headers }),
        fetch('/api/careers', { headers }),
        fetch('/api/applications', { headers }),
        fetch('/api/service-categories', { headers }),
        fetch('/api/newsletters', { headers }),
      ]);

      if (servicesRes.ok && blogsRes.ok && careersRes.ok && applicationsRes.ok && categoriesRes.ok) {
        const sData = await servicesRes.json();
        const bData = await blogsRes.json();
        const cData = await careersRes.json();
        const aData = await applicationsRes.json();
        const catData = await categoriesRes.json();
        const nlData = newslettersRes.ok ? await newslettersRes.json() : [];

        setServices(sData);
        setBlogs(bData);
        setCareers(cData);
        setApplications(aData);
        setServiceCategories(catData);
        setNewsletters(nlData);

        const pending = aData.filter((a: any) => a.status === 'pending').length;
        setStats({
          servicesCount: sData.length,
          blogsCount: bData.length,
          careersCount: cData.length,
          applicationsCount: aData.length,
          pendingApps: pending,
          newslettersCount: nlData.length,
        });
      } else if (servicesRes.status === 403 || blogsRes.status === 403) {
        // Token expired
        handleLogout();
      }
    } catch (err) {
      console.error('Failed to retrieve dashboard records:', err);
    } finally {
      setDataLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('corematrix-admin-token', data.token);
      setToken(data.token);
    } catch (err: any) {
      setAuthError(err.message || 'Failed to authenticate');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('corematrix-admin-token');
    setToken(null);
    setServices([]);
    setBlogs([]);
    setCareers([]);
    setApplications([]);
  };

  // Applications status modifications
  const updateApplicationStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/applications/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        fetchDashboardData();
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const deleteApplication = (id: string) => {
    triggerConfirm(
      'Delete Application',
      'Are you sure you want to delete this job application?',
      async () => {
        try {
          const res = await fetch(`/api/applications/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            fetchDashboardData();
          }
        } catch (err) {
          console.error('Failed to delete application:', err);
        }
      }
    );
  };

  // SERVICES CRUD
  const handleServiceFileChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setServiceFiles(prev => ({ ...prev, [name]: file }));
      setServicePreviews(prev => ({ ...prev, [name]: URL.createObjectURL(file) }));
    }
  };

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    const endpoint = editingId
      ? `/api/services/${editingId}`
      : '/api/services';

    const method = editingId ? 'PUT' : 'POST';

    try {
      const data = new FormData();

      // Append standard values
      Object.entries(serviceForm).forEach(([key, value]) => {
        if (key !== 'id' && value !== null && value !== undefined) {
          data.append(key, value.toString());
        }
      });

      // Append dynamic arrays serialized as JSON
      data.append('aboutPillars', JSON.stringify(aboutPillars));
      data.append('capabilities', JSON.stringify(capabilities));
      data.append('industries', JSON.stringify(industries));
      data.append('criticalCards', JSON.stringify(criticalCards));
      data.append('whyChooseUs', JSON.stringify(whyChooseUs));
      data.append('faqs', JSON.stringify(faqs));

      // Append files
      Object.entries(serviceFiles).forEach(([key, file]) => {
        if (file) {
          data.append(key, file);
        }
      });

      const res = await fetch(endpoint, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          // Note: DO NOT set Content-Type header when sending FormData! The browser will set it automatically with the boundary string.
        },
        body: data,
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.message || (resData.errors && resData.errors.join(', ')) || 'Action failed');
      }

      setFormSuccess(editingId ? 'Service updated successfully!' : 'Service created successfully!');
      fetchDashboardData();
      setTimeout(() => setShowFormModal(false), 1500);
    } catch (err: any) {
      setFormError(err.message || 'Operation failed');
    }
  };

  const deleteService = (id: string) => {
    triggerConfirm(
      'Delete Service',
      'Are you sure you want to delete this service card?',
      async () => {
        try {
          const res = await fetch(`/api/services/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            fetchDashboardData();
          }
        } catch (err) {
          console.error(err);
        }
      }
    );
  };

  // BLOGS CRUD
  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    const formData = new FormData();
    Object.entries(blogForm).forEach(([key, val]) => {
      formData.append(key, val);
    });
    if (blogCoverFile) {
      formData.append('coverImage', blogCoverFile);
    }

    const endpoint = editingId
      ? `/api/blogs/${editingId}`
      : '/api/blogs';

    const method = editingId ? 'PUT' : 'POST';

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || (data.errors && data.errors.join(', ')) || 'Action failed');
      }

      setFormSuccess(editingId ? 'Blog updated successfully!' : 'Blog created successfully!');
      setBlogCoverFile(null);
      fetchDashboardData();
      setTimeout(() => setShowFormModal(false), 1500);
    } catch (err: any) {
      setFormError(err.message || 'Operation failed');
    }
  };

  const deleteBlog = (id: string) => {
    triggerConfirm(
      'Delete Blog Post',
      'Are you sure you want to delete this blog post?',
      async () => {
        try {
          const res = await fetch(`/api/blogs/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            fetchDashboardData();
          }
        } catch (err) {
          console.error(err);
        }
      }
    );
  };

  // CAREERS CRUD
  const handleCareerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    const endpoint = editingId
      ? `/api/careers/${editingId}`
      : '/api/careers';

    const method = editingId ? 'PUT' : 'POST';

    // Parse dynamic requirement and responsibility point fields into separate en/ar arrays
    const payload = {
      ...careerForm,
      requirements_en: requirementsList.map(r => r.en.trim()).filter(Boolean),
      requirements_ar: requirementsList.map(r => r.ar.trim()).filter(Boolean),
      responsibilities_en: responsibilitiesList.map(r => r.en.trim()).filter(Boolean),
      responsibilities_ar: responsibilitiesList.map(r => r.ar.trim()).filter(Boolean),
    };

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || (data.errors && data.errors.join(', ')) || 'Action failed');
      }

      setFormSuccess(editingId ? 'Career post updated successfully!' : 'Career post created successfully!');
      fetchDashboardData();
      setTimeout(() => setShowFormModal(false), 1500);
    } catch (err: any) {
      setFormError(err.message || 'Operation failed');
    }
  };

  const deleteCareer = (id: string) => {
    triggerConfirm(
      'Delete Career Post',
      'Are you sure you want to delete this career post?',
      async () => {
        try {
          const res = await fetch(`/api/careers/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            fetchDashboardData();
          }
        } catch (err) {
          console.error(err);
        }
      }
    );
  };

  // CATEGORIES CRUD
  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    const endpoint = editingId
      ? `/api/service-categories/${editingId}`
      : '/api/service-categories';

    const method = editingId ? 'PUT' : 'POST';

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(categoryForm),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Operation failed');
      }

      setFormSuccess(editingId ? 'Service category updated successfully!' : 'Service category created successfully!');
      fetchDashboardData();
      setTimeout(() => setShowFormModal(false), 1500);
    } catch (err: any) {
      setFormError(err.message || 'Operation failed');
    }
  };

  const deleteCategory = (id: string) => {
    triggerConfirm(
      'Delete Service Category',
      'Are you sure you want to delete this service category?',
      async () => {
        try {
          const res = await fetch(`/api/service-categories/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            fetchDashboardData();
          } else {
            const data = await res.json();
            alert(data.message || 'Failed to delete category');
          }
        } catch (err) {
          console.error(err);
        }
      }
    );
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsError(null);
    setSettingsSuccess(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setSettingsError('All fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setSettingsError('New password and confirmation password do not match.');
      return;
    }

    setSettingsLoading(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Password update failed.');
      }

      setSettingsSuccess('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setSettingsError(err.message || 'Network error.');
    } finally {
      setSettingsLoading(false);
    }
  };

  // USER CRUD OPERATIONS
  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUserFormError(null);
    setUserFormSuccess(null);

    if (!userForm.username.trim()) {
      setUserFormError('Username is required.');
      return;
    }

    if (!userForm.id && !userForm.password.trim()) {
      setUserFormError('Password is required for new users.');
      return;
    }

    setUserFormLoading(true);
    const isEdit = !!userForm.id;
    const endpoint = isEdit
      ? `/api/auth/users/${userForm.id}`
      : '/api/auth/users';
    const method = isEdit ? 'PUT' : 'POST';

    const payload: any = {
      username: userForm.username.trim(),
      role: userForm.role,
    };
    if (userForm.password.trim()) {
      payload.password = userForm.password.trim();
    }

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Operation failed');
      }

      setUserFormSuccess(isEdit ? 'User updated successfully!' : 'User created successfully!');
      fetchUsers();
      setTimeout(() => {
        setShowUserModal(false);
        setUserForm({ id: '', username: '', password: '', role: 'editor' });
        setUserFormSuccess(null);
      }, 1200);
    } catch (err: any) {
      setUserFormError(err.message || 'An error occurred.');
    } finally {
      setUserFormLoading(false);
    }
  };

  const deleteUser = (id: string) => {
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.id === id) {
        alert('You cannot delete your own account.');
        return;
      }
    } catch (e) { }

    triggerConfirm(
      'Delete User',
      'Are you sure you want to delete this user? This action is permanent.',
      async () => {
        try {
          const res = await fetch(`/api/auth/users/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
          });

          if (res.ok) {
            fetchUsers();
          } else {
            const data = await res.json();
            alert(data.message || 'Failed to delete user.');
          }
        } catch (err) {
          console.error('Failed to delete user:', err);
        }
      }
    );
  };

  // PORTFOLIO CRUD
  const fetchPortfolioData = async () => {
    if (!token) return;
    setPortfolioLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [profileRes, itemsRes] = await Promise.all([
        fetch('/api/portfolio/profile', { headers }),
        fetch('/api/portfolio/items', { headers }),
      ]);
      if (profileRes.ok) {
        const pJson = await profileRes.json();
        // Backend returns { success: true, data: profile }
        const pData = pJson.data ?? pJson;
        setPortfolioProfile(pData);
        setPortfolioProfileForm({
          companyName: pData.companyName || '',
          title: pData.title || '',
          instagram: pData.instagram || '',
          facebook: pData.facebook || '',
          twitter: pData.twitter || '',
          linkedin: pData.linkedin || '',
          email: pData.email || '',
          phone: pData.phone || '',
          bottomCtaText: pData.bottomCtaText || '',
          bottomCtaLink: pData.bottomCtaLink || '',
        });
      }
      if (itemsRes.ok) {
        const iData = await itemsRes.json();
        setPortfolioItems(Array.isArray(iData) ? iData : []);
      }
    } catch (err) {
      console.error('Failed to fetch portfolio data:', err);
    } finally {
      setPortfolioLoading(false);
    }
  };

  const handlePortfolioProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setPortfolioProfileError(null);
    setPortfolioProfileSuccess(null);
    setPortfolioProfileSaving(true);
    try {
      const fd = new FormData();
      Object.entries(portfolioProfileForm).forEach(([k, v]) => fd.append(k, v as string));
      if (portfolioProfileLogoFile) fd.append('portfolioLogo', portfolioProfileLogoFile);
      const res = await fetch('/api/portfolio/profile', {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Save failed');
      // Backend returns { success, message, data: profile }
      setPortfolioProfile(json.data ?? json);
      setPortfolioProfileLogoFile(null);
      setPortfolioProfileSuccess('Portfolio profile saved successfully!');
      setTimeout(() => setPortfolioProfileSuccess(null), 3000);
    } catch (err: any) {
      setPortfolioProfileError(err.message || 'Failed to save profile.');
    } finally {
      setPortfolioProfileSaving(false);
    }
  };

  const openNewPortfolioItem = () => {
    setPortfolioItemForm({ id: '', title: '', link: '', order: portfolioItems.length, isActive: true });
    setPortfolioItemImageFile(null);
    setPortfolioItemAttachFile(null);
    setPortfolioItemError(null);
    setPortfolioItemSuccess(null);
    setShowPortfolioItemModal(true);
  };

  const openEditPortfolioItem = (item: any) => {
    setPortfolioItemForm({
      id: item.id,
      title: item.title || '',
      link: item.link || '',
      order: item.order ?? 0,
      isActive: item.isActive !== false,
    });
    setPortfolioItemImageFile(null);
    setPortfolioItemAttachFile(null);
    setPortfolioItemError(null);
    setPortfolioItemSuccess(null);
    setShowPortfolioItemModal(true);
  };

  const handlePortfolioItemSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setPortfolioItemError(null);
    setPortfolioItemSuccess(null);
    setPortfolioItemSaving(true);
    try {
      const fd = new FormData();
      fd.append('title', portfolioItemForm.title);
      fd.append('link', portfolioItemForm.link);
      fd.append('order', String(portfolioItemForm.order));
      fd.append('isActive', portfolioItemForm.isActive ? 'true' : 'false');
      if (portfolioItemImageFile) fd.append('image', portfolioItemImageFile);
      if (portfolioItemAttachFile) fd.append('attachment', portfolioItemAttachFile);

      const isEdit = !!portfolioItemForm.id;
      const url = isEdit ? `/api/portfolio/items/${portfolioItemForm.id}` : '/api/portfolio/items';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Save failed');
      setPortfolioItemSuccess(isEdit ? 'Item updated!' : 'Item created!');
      fetchPortfolioData();
      setTimeout(() => setShowPortfolioItemModal(false), 1200);
    } catch (err: any) {
      setPortfolioItemError(err.message || 'Failed to save item.');
    } finally {
      setPortfolioItemSaving(false);
    }
  };

  const deletePortfolioItem = (id: string) => {
    triggerConfirm(
      'Delete Portfolio Item',
      'Are you sure you want to delete this portfolio link item?',
      async () => {
        try {
          const res = await fetch(`/api/portfolio/items/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            fetchPortfolioData();
          }
        } catch (err) {
          console.error(err);
        }
      }
    );
  };

  const getPortfolioMediaUrl = (url: string | null | undefined) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    const apiOrigin = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    return `${apiOrigin.replace(/\/$/, '')}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  if (!mounted) return null;

  // --- LOGIN WORKSPACE ---
  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-corematrix-bg0 px-4 py-12 text-corematrix-textPrimary font-sans">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c1d12_1px,transparent_1px),linear-gradient(to_bottom,#0c1d12_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />
        <div className="relative w-full max-w-md rounded-3xl border border-corematrix-border bg-corematrix-card p-10 shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-corematrix-green500 to-transparent" />

          <div className="text-center mb-8">
            <span className="inline-block text-4xl mb-4">🛡️</span>
            <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl font-bold uppercase tracking-wider">
              Corematrix Admin Desk
            </h1>
            <p className="text-sm text-corematrix-textMuted mt-1">Authenticate to access database console</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">
                Username (Email)
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin@corematrix.co"
                className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none transition-all placeholder:text-corematrix-textDim focus:border-corematrix-green700 focus:shadow-[0_0_0_3px_rgba(22,163,74,0.1)]"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">
                Access Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none transition-all placeholder:text-corematrix-textDim focus:border-corematrix-green700 focus:shadow-[0_0_0_3px_rgba(22,163,74,0.1)]"
              />
            </div>

            {authError && <p className="text-xs font-light text-red-400 mt-2">{authError}</p>}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full rounded-xl bg-corematrix-green700 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-corematrix-green500 disabled:cursor-not-allowed disabled:opacity-50 mt-4 shadow-lg shadow-corematrix-green900/30"
            >
              {authLoading ? 'Verifying Credentials...' : 'Access Dashboard'}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-corematrix-border pt-6">
            <Link href="/" className="text-xs text-corematrix-textMuted hover:text-corematrix-green400">
              ← Return to homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- CORE DASHBOARD WORKSPACE ---
  return (
    <div className="flex min-h-screen bg-corematrix-bg0 text-corematrix-textPrimary font-sans">

      {/* Sidebar Panel */}
      <aside className="w-64 border-r border-corematrix-border bg-corematrix-bg1/90 backdrop-blur-md p-6 flex flex-col justify-between shrink-0 h-screen sticky top-0">
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex items-center mb-10 pb-4 border-b border-corematrix-border shrink-0">
            <Image src="/images/logo.svg" alt="Corematrix Logo" width={140} height={35} className="h-8 w-auto object-contain" />
          </div>

          {/* User Profile Info Badge */}
          <div className="mb-6 p-4 rounded-2xl bg-corematrix-card/60 border border-corematrix-border/50 flex items-center gap-3 shrink-0">
            <div className="h-9 w-9 rounded-full bg-corematrix-green900/60 border border-corematrix-green700/50 flex items-center justify-center font-bold text-corematrix-green400 text-sm">
              {userUsername.substring(0, 2).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold truncate max-w-[130px]">{userUsername}</p>
              <span className={`inline-block text-[9px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded mt-0.5 ${userRole === 'admin'
                ? 'bg-red-500/20 text-red-400 border border-red-500/20'
                : userRole === 'editor'
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20'
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/20'
                }`}>
                {userRole}
              </span>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto corematrix-scrollbar pr-1.5 space-y-1.5 min-h-0 mb-6">
            {[
              { id: 'overview', label: 'Overview', icon: 'fas fa-chart-line' },
              { id: 'services', label: 'Services Manager', icon: 'fas fa-cogs' },
              { id: 'categories', label: 'Service Categories', icon: 'fas fa-folder' },
              { id: 'blogs', label: 'Blogs Desk', icon: 'fas fa-edit' },
              { id: 'careers', label: 'Careers Desk', icon: 'fas fa-briefcase' },
              { id: 'applications', label: 'Applications', icon: 'fas fa-users' },
              { id: 'newsletter', label: 'Newsletter', icon: 'fas fa-envelope' },
              { id: 'portfolio', label: 'Portfolio Manager', icon: 'fas fa-layer-group' },
              { id: 'users', label: 'Users', icon: 'fas fa-user-shield' },
              { id: 'settings', label: 'Settings', icon: 'fas fa-cog' },
            ].filter(t => t.id !== 'users' || userRole === 'admin').map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setActiveTab(t.id as Tab);
                  setShowFormModal(false);
                }}
                className={`w-full flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-medium tracking-wide transition-all cursor-pointer ${activeTab === t.id
                  ? 'bg-corematrix-green900/40 border border-corematrix-green700/30 text-corematrix-green400 font-semibold'
                  : 'text-corematrix-textMuted hover:text-corematrix-textPrimary hover:bg-corematrix-card/45'
                  }`}
              >
                <i className={`${t.icon} w-5 text-center`} />
                {t.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="shrink-0 pt-4 border-t border-corematrix-border/40">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-950/10 px-4 py-3 text-sm font-semibold text-red-400 hover:bg-red-900/20 transition-all cursor-pointer"
          >
            <i className="fas fa-sign-out-alt mr-2" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Primary Workspace */}
      <main className="flex-1 p-10 overflow-y-auto max-h-screen relative">
        <div className="absolute top-0 right-10 p-4">
          <Link href="/" className="text-xs text-corematrix-textMuted hover:text-corematrix-green400">
            Visit Frontend Site ↗
          </Link>
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-extrabold tracking-tight uppercase mb-8">
              Corematrix Console Dashboard
            </h1>

            {/* Glowing Statistics Counters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
              {[
                { title: 'Total Services', count: stats.servicesCount, icon: 'fas fa-cogs', color: 'border-blue-500/20 text-blue-400' },
                { title: 'Published Blogs', count: stats.blogsCount, icon: 'fas fa-edit', color: 'border-amber-500/20 text-amber-400' },
                { title: 'Active Careers', count: stats.careersCount, icon: 'fas fa-briefcase', color: 'border-purple-500/20 text-purple-400' },
                { title: 'Applications Received', count: stats.applicationsCount, icon: 'fas fa-users', color: 'border-corematrix-green700/20 text-corematrix-green400', glow: true },
                { title: 'Newsletter Subscribers', count: stats.newslettersCount, icon: 'fas fa-envelope', color: 'border-teal-500/20 text-teal-400' },
              ].map((c, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-2xl border ${c.color} bg-corematrix-card p-6 ${c.glow ? 'shadow-lg shadow-corematrix-green900/10' : ''
                    }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-corematrix-textMuted uppercase tracking-wider font-semibold">{c.title}</p>
                      <h3 className="text-3xl font-bold mt-2 font-display">{c.count}</h3>
                    </div>
                    <i className={`${c.icon} text-xl opacity-80`} />
                  </div>
                </div>
              ))}
            </div>

            {/* Active Applications Review Queue */}
            <div className="rounded-2xl border border-corematrix-border bg-corematrix-card p-6 shadow-xl">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-corematrix-border">
                <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-xl font-bold uppercase tracking-wider flex items-center gap-2">
                  <i className="fas fa-exclamation-triangle text-amber-500" />
                  Critical Review Queue ({stats.pendingApps} Pending)
                </h2>
                <button
                  onClick={() => setActiveTab('applications')}
                  className="text-xs text-corematrix-green400 hover:text-corematrix-green300 font-semibold"
                >
                  View full queue →
                </button>
              </div>

              {applications.filter((a) => a.status === 'pending').length === 0 ? (
                <p className="py-8 text-center text-corematrix-textMuted text-sm">
                  Excellent! No pending applications require immediate review. All caught up! ✓
                </p>
              ) : (
                <div className="divide-y divide-corematrix-border">
                  {applications
                    .filter((a) => a.status === 'pending')
                    .slice(0, 4)
                    .map((app) => (
                      <div key={app.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-sm">{app.candidateName}</p>
                          <p className="text-xs text-corematrix-textMuted mt-0.5">
                            Applying for: <span className="text-corematrix-textSecondary font-medium">{app.career ? app.career.title_en : 'Speculative/Open Application'}</span> · {app.candidateEmail}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateApplicationStatus(app.id, 'review')}
                            className="px-3 py-1 rounded bg-corematrix-green700 hover:bg-corematrix-green500 text-xs font-semibold cursor-pointer"
                          >
                            Mark Reviewing
                          </button>
                          <button
                            onClick={() => updateApplicationStatus(app.id, 'reject')}
                            className="px-3 py-1 rounded bg-red-950/40 hover:bg-red-900/40 text-red-400 text-xs font-semibold cursor-pointer"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* SERVICES MANAGER TAB */}
        {activeTab === 'services' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-extrabold uppercase tracking-tight">
                Services Card Panel
              </h1>
              <button
                onClick={() => {
                  setEditingId(null);
                  setServiceForm({
                    id: '',
                    category: serviceCategories.length > 0 ? serviceCategories[0].filterKey : 'ai',
                    icon: 'fas fa-cogs',
                    title_en: '',
                    title_ar: '',
                    description_en: '',
                    description_ar: '',
                    tags_en: '',
                    tags_ar: '',
                    detailSlug: '',
                    badge_en: '',
                    badge_ar: '',
                    features_en: '',
                    features_ar: '',
                    metaTitle_en: '',
                    metaTitle_ar: '',
                    metaKeywords_en: '',
                    metaKeywords_ar: '',
                    metaDescription_en: '',
                    metaDescription_ar: '',

                    // HERO SECTION
                    heroTitle: '',
                    heroTitleAr: '',
                    heroTagline: '',
                    heroTaglineAr: '',
                    heroIntroduction: '',
                    heroIntroductionAr: '',
                    primaryCtaText: '',
                    primaryCtaTextAr: '',
                    primaryCtaLink: '',
                    secondaryCtaText: '',
                    secondaryCtaTextAr: '',
                    secondaryCtaLink: '',
                    cardIcon: '',

                    // ABOUT SECTION
                    aboutSectionTitle: '',
                    aboutSectionTitleAr: '',
                    aboutSectionDescription: '',
                    aboutSectionDescriptionAr: '',
                    aboutSectionImageAlt: '',
                    aboutSectionImageAltAr: '',
                    aboutSectionBottomNote: '',
                    aboutSectionBottomNoteAr: '',

                    // SOLUTIONS
                    capabilitiesSectionTitle: '',
                    capabilitiesSectionTitleAr: '',

                    // INDUSTRIES
                    industriesSectionTitle: '',
                    industriesSectionTitleAr: '',
                    industriesSectionDescription: '',
                    industriesSectionDescriptionAr: '',
                    industriesImageAlt: '',
                    industriesImageAltAr: '',
                    industriesSectionBottomNote: '',
                    industriesSectionBottomNoteAr: '',

                    // CRITICAL
                    criticalSectionTitle: '',
                    criticalSectionTitleAr: '',
                    criticalSectionDescription: '',
                    criticalSectionDescriptionAr: '',
                    criticalSectionButtonText: '',
                    criticalSectionButtonTextAr: '',
                    criticalSectionButtonLink: '',
                    criticalRightTitle: '',
                    criticalRightTitleAr: '',

                    // WHY CHOOSE US
                    whyChooseUsSectionTitle: '',
                    whyChooseUsSectionTitleAr: '',
                    whyChooseUsDescription: '',
                    whyChooseUsDescriptionAr: '',
                    whyChooseUsShortDescription: '',
                    whyChooseUsShortDescriptionAr: '',
                    whyChooseUsBottomNote: '',
                    whyChooseUsBottomNoteAr: '',

                    // OVERVIEW
                    overviewSectionTitle: '',
                    overviewSectionTitleAr: '',
                    overviewWhatIsIt: '',
                    overviewWhatIsItAr: '',
                    overviewWhoIsItFor: '',
                    overviewWhoIsItForAr: '',
                    overviewProblemsSolved: '',
                    overviewProblemsSolvedAr: '',

                    // FINAL CTA
                    ctaMessage: '',
                    ctaMessageAr: '',
                    ctaPrimaryText: '',
                    ctaPrimaryTextAr: '',
                    ctaPrimaryLink: '',
                    ctaSecondaryText: '',
                    ctaSecondaryTextAr: '',
                    ctaSecondaryLink: '',

                    order: 0,
                    isPublished: false,
                    views: 0,
                  });
                  setAboutPillars([]);
                  setCapabilities([]);
                  setIndustries([]);
                  setCriticalCards([]);
                  setWhyChooseUs([]);
                  setFaqs([]);
                  setServiceFiles({
                    heroImage: null,
                    heroIcon: null,
                    aboutSectionImage: null,
                    industriesImage: null,
                    overviewImage: null,
                  });
                  setServicePreviews({
                    heroImage: null,
                    heroIcon: null,
                    aboutSectionImage: null,
                    industriesImage: null,
                    overviewImage: null,
                  });
                  setModalSubTab('basic');
                  setFormError(null);
                  setFormSuccess(null);
                  setShowFormModal(true);
                }}
                className="rounded-lg bg-corematrix-green700 px-5 py-2.5 text-sm font-semibold hover:bg-corematrix-green500 transition cursor-pointer"
              >
                + Create New Service
              </button>
            </div>

            {/* List Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {services.map((s) => (
                <div key={s.id} className="rounded-2xl border border-corematrix-border bg-corematrix-card p-6 flex flex-col justify-between hover:border-corematrix-border2 transition">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl p-2 rounded-xl bg-corematrix-card2 border border-corematrix-border text-corematrix-green400">
                        <i className={s.icon} />
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-corematrix-green900/30 text-corematrix-green400 border border-corematrix-green700/20">
                        {s.category}
                      </span>
                    </div>
                    <h3 className="font-semibold text-base">{s.title_en}</h3>
                    <p className="text-xs text-corematrix-textSecondary font-light mt-1 text-right">{s.title_ar}</p>
                    <p className="text-xs text-corematrix-textMuted mt-3 line-clamp-3 font-light leading-relaxed">{s.description_en}</p>
                  </div>

                  <div className="mt-6 flex justify-end gap-2 border-t border-corematrix-border pt-4">
                    <button
                      onClick={() => {
                        setEditingId(s.id);
                        setServiceForm({
                          id: s.id,
                          category: s.category,
                          icon: s.icon,
                          title_en: s.title_en,
                          title_ar: s.title_ar,
                          description_en: s.description_en,
                          description_ar: s.description_ar,
                          tags_en: parseArrayToString(s.tags_en),
                          tags_ar: parseArrayToString(s.tags_ar),
                          detailSlug: s.detailSlug,
                          badge_en: s.badge_en || '',
                          badge_ar: s.badge_ar || '',
                          features_en: parseArrayToString(s.features_en),
                          features_ar: parseArrayToString(s.features_ar),
                          metaTitle_en: s.metaTitle_en || '',
                          metaTitle_ar: s.metaTitle_ar || '',
                          metaKeywords_en: s.metaKeywords_en || '',
                          metaKeywords_ar: s.metaKeywords_ar || '',
                          metaDescription_en: s.metaDescription_en || '',
                          metaDescription_ar: s.metaDescription_ar || '',

                          // HERO SECTION
                          heroTitle: s.heroTitle || '',
                          heroTitleAr: s.heroTitleAr || '',
                          heroTagline: s.heroTagline || '',
                          heroTaglineAr: s.heroTaglineAr || '',
                          heroIntroduction: s.heroIntroduction || '',
                          heroIntroductionAr: s.heroIntroductionAr || '',
                          primaryCtaText: s.primaryCtaText || '',
                          primaryCtaTextAr: s.primaryCtaTextAr || '',
                          primaryCtaLink: s.primaryCtaLink || '',
                          secondaryCtaText: s.secondaryCtaText || '',
                          secondaryCtaTextAr: s.secondaryCtaTextAr || '',
                          secondaryCtaLink: s.secondaryCtaLink || '',
                          cardIcon: s.cardIcon || '',

                          // ABOUT SECTION
                          aboutSectionTitle: s.aboutSectionTitle || '',
                          aboutSectionTitleAr: s.aboutSectionTitleAr || '',
                          aboutSectionDescription: s.aboutSectionDescription || '',
                          aboutSectionDescriptionAr: s.aboutSectionDescriptionAr || '',
                          aboutSectionImageAlt: s.aboutSectionImageAlt || '',
                          aboutSectionImageAltAr: s.aboutSectionImageAltAr || '',
                          aboutSectionBottomNote: s.aboutSectionBottomNote || '',
                          aboutSectionBottomNoteAr: s.aboutSectionBottomNoteAr || '',

                          // SOLUTIONS
                          capabilitiesSectionTitle: s.capabilitiesSectionTitle || '',
                          capabilitiesSectionTitleAr: s.capabilitiesSectionTitleAr || '',

                          // INDUSTRIES
                          industriesSectionTitle: s.industriesSectionTitle || '',
                          industriesSectionTitleAr: s.industriesSectionTitleAr || '',
                          industriesSectionDescription: s.industriesSectionDescription || '',
                          industriesSectionDescriptionAr: s.industriesSectionDescriptionAr || '',
                          industriesImageAlt: s.industriesImageAlt || '',
                          industriesImageAltAr: s.industriesImageAltAr || '',
                          industriesSectionBottomNote: s.industriesSectionBottomNote || '',
                          industriesSectionBottomNoteAr: s.industriesSectionBottomNoteAr || '',

                          // CRITICAL
                          criticalSectionTitle: s.criticalSectionTitle || '',
                          criticalSectionTitleAr: s.criticalSectionTitleAr || '',
                          criticalSectionDescription: s.criticalSectionDescription || '',
                          criticalSectionDescriptionAr: s.criticalSectionDescriptionAr || '',
                          criticalSectionButtonText: s.criticalSectionButtonText || '',
                          criticalSectionButtonTextAr: s.criticalSectionButtonTextAr || '',
                          criticalSectionButtonLink: s.criticalSectionButtonLink || '',
                          criticalRightTitle: s.criticalRightTitle || '',
                          criticalRightTitleAr: s.criticalRightTitleAr || '',

                          // WHY CHOOSE US
                          whyChooseUsSectionTitle: s.whyChooseUsSectionTitle || '',
                          whyChooseUsSectionTitleAr: s.whyChooseUsSectionTitleAr || '',
                          whyChooseUsDescription: s.whyChooseUsDescription || '',
                          whyChooseUsDescriptionAr: s.whyChooseUsDescriptionAr || '',
                          whyChooseUsShortDescription: s.whyChooseUsShortDescription || '',
                          whyChooseUsShortDescriptionAr: s.whyChooseUsShortDescriptionAr || '',
                          whyChooseUsBottomNote: s.whyChooseUsBottomNote || '',
                          whyChooseUsBottomNoteAr: s.whyChooseUsBottomNoteAr || '',

                          // OVERVIEW
                          overviewSectionTitle: s.overviewSectionTitle || '',
                          overviewSectionTitleAr: s.overviewSectionTitleAr || '',
                          overviewWhatIsIt: s.overviewWhatIsIt || '',
                          overviewWhatIsItAr: s.overviewWhatIsItAr || '',
                          overviewWhoIsItFor: s.overviewWhoIsItFor || '',
                          overviewWhoIsItForAr: s.overviewWhoIsItForAr || '',
                          overviewProblemsSolved: s.overviewProblemsSolved || '',
                          overviewProblemsSolvedAr: s.overviewProblemsSolvedAr || '',

                          // FINAL CTA
                          ctaMessage: s.ctaMessage || '',
                          ctaMessageAr: s.ctaMessageAr || '',
                          ctaPrimaryText: s.ctaPrimaryText || '',
                          ctaPrimaryTextAr: s.ctaPrimaryTextAr || '',
                          ctaPrimaryLink: s.ctaPrimaryLink || '',
                          ctaSecondaryText: s.ctaSecondaryText || '',
                          ctaSecondaryTextAr: s.ctaSecondaryTextAr || '',
                          ctaSecondaryLink: s.ctaSecondaryLink || '',

                          order: s.order || 0,
                          isPublished: s.isPublished || false,
                          views: s.views || 0,
                        });
                        setAboutPillars((s.aboutPillars || []).map((p: any) => ({
                          title: p.title || p.title_en || p.text_en || '',
                          titleAr: p.titleAr || p.title_ar || p.text_ar || '',
                          description: p.description || p.description_en || '',
                          descriptionAr: p.descriptionAr || p.description_ar || ''
                        })));
                        setCapabilities((s.capabilities || []).map((c: any) => ({
                          title: c.title || c.title_en || '',
                          titleAr: c.titleAr || c.title_ar || '',
                          description: c.description || c.description_en || c.description_en_ar || '',
                          descriptionAr: c.descriptionAr || c.description_ar || '',
                          icon: c.icon || 'fas fa-cog'
                        })));
                        setIndustries(s.industries || []);
                        setCriticalCards((s.criticalCards || []).map((card: any) => ({
                          title: card.title || card.title_en || '',
                          titleAr: card.titleAr || card.title_ar || '',
                          description: card.description || card.description_en || '',
                          descriptionAr: card.descriptionAr || card.description_ar || '',
                          icon: card.icon || 'fas fa-exclamation-triangle'
                        })));
                        setWhyChooseUs((s.whyChooseUs || []).map((item: any) => ({
                          title: item.title || item.title_en || '',
                          titleAr: item.titleAr || item.title_ar || '',
                          description: item.description || item.description_en || '',
                          descriptionAr: item.descriptionAr || item.description_ar || '',
                          icon: item.icon || 'fas fa-award'
                        })));
                        setFaqs((s.faqs || []).map((f: any) => ({
                          q: f.q || f.questionEn || '',
                          q_ar: f.q_ar || f.questionAr || '',
                          a: f.a || f.answerEn || '',
                          a_ar: f.a_ar || f.answerAr || ''
                        })));
                        setServiceFiles({
                          heroImage: null,
                          heroIcon: null,
                          aboutSectionImage: null,
                          industriesImage: null,
                          overviewImage: null,
                        });
                        setServicePreviews({
                          heroImage: s.heroImage || null,
                          heroIcon: s.heroIcon || null,
                          aboutSectionImage: s.aboutSectionImage || null,
                          industriesImage: s.industriesImage || null,
                          overviewImage: s.overviewImage || null,
                        });
                        setModalSubTab('basic');
                        setFormError(null);
                        setFormSuccess(null);
                        setShowFormModal(true);
                      }}
                      className="px-3.5 py-1.5 rounded-lg border border-corematrix-border hover:border-corematrix-green400/30 text-xs font-semibold transition cursor-pointer"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => deleteService(s.id)}
                      className="px-3.5 py-1.5 rounded-lg border border-red-500/20 bg-red-950/10 hover:bg-red-900/20 text-red-400 text-xs font-semibold transition cursor-pointer"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {services.length === 0 && (
              <p className="text-center text-corematrix-textMuted py-12">No custom services listed. The frontend is currently rendering static content fallbacks.</p>
            )}
          </div>
        )}

        {/* BLOGS DESK TAB */}
        {activeTab === 'blogs' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-extrabold uppercase tracking-tight">
                Bilingual Articles Desk
              </h1>
              <button
                onClick={() => {
                  setEditingId(null);
                  setBlogForm({
                    id: '',
                    slug: '',
                    category: 'ai',
                    tags: '',
                    title_en: '',
                    title_ar: '',
                    excerpt_en: '',
                    excerpt_ar: '',
                    content_en: '',
                    content_ar: '',
                    authorName_en: 'Sara Raza',
                    authorName_ar: 'سارة رضا',
                    authorRole_en: 'CTO',
                    authorRole_ar: 'الرئيس التنفيذي للتكنولوجيا',
                    authorInitials: 'SR',
                    status: 'DRAFT',
                    metaTitle_en: '',
                    metaTitle_ar: '',
                    metaKeywords_en: '',
                    metaKeywords_ar: '',
                    metaDescription_en: '',
                    metaDescription_ar: '',
                  });
                  setBlogCoverFile(null);
                  setFormError(null);
                  setFormSuccess(null);
                  setShowFormModal(true);
                }}
                className="rounded-lg bg-corematrix-green700 px-5 py-2.5 text-sm font-semibold hover:bg-corematrix-green500 transition cursor-pointer"
              >
                + Publish New Article
              </button>
            </div>

            {/* List Blogs */}
            <div className="grid grid-cols-1 gap-5">
              {blogs.map((b) => (
                <div key={b.id} className="rounded-2xl border border-corematrix-border bg-corematrix-card p-6 flex items-start gap-6 hover:border-corematrix-border2 transition">
                  <div className="relative w-28 h-20 bg-corematrix-card2 rounded-lg border border-corematrix-border overflow-hidden shrink-0">
                    {b.coverImage ? (
                      <img src={`${b.coverImage}`} alt={b.title_en} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">📝</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-base">{b.title_en}</h3>
                        <p className="text-xs text-corematrix-textSecondary font-light mt-0.5">{b.title_ar}</p>
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${b.status === 'PUBLISHED'
                        ? 'bg-corematrix-green900/30 text-corematrix-green400 border-corematrix-green700/20'
                        : 'bg-corematrix-border text-corematrix-textMuted border-corematrix-border'
                        }`}>
                        {b.status}
                      </span>
                    </div>

                    <p className="text-xs text-corematrix-textMuted mt-2 font-light line-clamp-2">{b.excerpt_en}</p>

                    <div className="mt-4 flex justify-between items-center border-t border-corematrix-border pt-4">
                      <span className="text-[10px] text-corematrix-textDim font-mono">Slug: {b.slug}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingId(b.id);
                            setBlogForm({
                              id: b.id,
                              slug: b.slug,
                              category: b.category,
                              tags: b.tags ? b.tags.join(', ') : '',
                              title_en: b.title_en,
                              title_ar: b.title_ar,
                              excerpt_en: b.excerpt_en || '',
                              excerpt_ar: b.excerpt_ar || '',
                              content_en: b.content_en,
                              content_ar: b.content_ar,
                              authorName_en: b.authorName_en,
                              authorName_ar: b.authorName_ar,
                              authorRole_en: b.authorRole_en,
                              authorRole_ar: b.authorRole_ar,
                              authorInitials: b.authorInitials,
                              status: b.status,
                              metaTitle_en: b.metaTitle_en || '',
                              metaTitle_ar: b.metaTitle_ar || '',
                              metaKeywords_en: b.metaKeywords_en || '',
                              metaKeywords_ar: b.metaKeywords_ar || '',
                              metaDescription_en: b.metaDescription_en || '',
                              metaDescription_ar: b.metaDescription_ar || '',
                            });
                            setBlogCoverFile(null);
                            setFormError(null);
                            setFormSuccess(null);
                            setShowFormModal(true);
                          }}
                          className="px-3 py-1 rounded bg-corematrix-card2 hover:border-corematrix-green400/30 border border-corematrix-border text-xs font-semibold cursor-pointer"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => deleteBlog(b.id)}
                          className="px-3 py-1 rounded bg-red-950/40 hover:bg-red-900/40 text-red-400 text-xs font-semibold cursor-pointer"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {blogs.length === 0 && (
              <p className="text-center text-corematrix-textMuted py-12">No dynamic blogs found. Rendering static mockup fallbacks.</p>
            )}
          </div>
        )}

        {/* CAREERS DESK TAB */}
        {activeTab === 'careers' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-extrabold uppercase tracking-tight">
                Careers & Job Desk
              </h1>
              <button
                onClick={() => {
                  setEditingId(null);
                  setCareerForm({
                    id: '',
                    department: 'engineering',
                    icon: 'fas fa-laptop-code',
                    salaryRange: '',
                    badge_en: '',
                    badge_ar: '',
                    title_en: '',
                    title_ar: '',
                    location_en: 'Remote',
                    location_ar: 'عن بعد',
                    employmentType_en: 'full-time',
                    employmentType_ar: 'دوام كامل',
                    description_en: '',
                    description_ar: '',
                    requirements_en: '',
                    requirements_ar: '',
                    responsibilities_en: '',
                    responsibilities_ar: '',
                  });
                  setRequirementsList([{ en: '', ar: '' }]);
                  setResponsibilitiesList([{ en: '', ar: '' }]);
                  setFormError(null);
                  setFormSuccess(null);
                  setShowFormModal(true);
                }}
                className="rounded-lg bg-corematrix-green700 px-5 py-2.5 text-sm font-semibold hover:bg-corematrix-green500 transition cursor-pointer"
              >
                + Post New Job Role
              </button>
            </div>

            {/* List Careers */}
            <div className="grid grid-cols-1 gap-5">
              {careers.map((c) => (
                <div key={c.id} className="rounded-2xl border border-corematrix-border bg-corematrix-card p-6 flex flex-col justify-between hover:border-corematrix-border2 transition">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <span className="text-xl p-2.5 bg-corematrix-card2 rounded-lg border border-corematrix-border text-corematrix-green400">
                        <i className={c.icon} />
                      </span>
                      <div>
                        <h3 className="font-semibold text-base">{c.title_en}</h3>
                        <p className="text-xs text-corematrix-textSecondary font-light mt-0.5">{c.title_ar}</p>
                        <p className="text-xs text-corematrix-textDim mt-1">
                          {c.department} · {c.location_en} · {c.salaryRange}
                        </p>
                      </div>
                    </div>
                    {c.badge_en && (
                      <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-red-950/20 text-red-400 border border-red-500/10">
                        {c.badge_en}
                      </span>
                    )}
                  </div>

                  <div className="mt-6 flex justify-end gap-2 border-t border-corematrix-border pt-4">
                    <button
                      onClick={() => {
                        setEditingId(c.id);
                        setCareerForm({
                          id: c.id,
                          department: c.department,
                          icon: c.icon,
                          salaryRange: c.salaryRange,
                          badge_en: c.badge_en || '',
                          badge_ar: c.badge_ar || '',
                          title_en: c.title_en,
                          title_ar: c.title_ar,
                          location_en: c.location_en,
                          location_ar: c.location_ar,
                          employmentType_en: c.employmentType_en,
                          employmentType_ar: c.employmentType_ar,
                          description_en: c.description_en,
                          description_ar: c.description_ar,
                          requirements_en: '',
                          requirements_ar: '',
                          responsibilities_en: '',
                          responsibilities_ar: '',
                        });

                        const reqs = [];
                        const maxReqLen = Math.max(c.requirements_en?.length || 0, c.requirements_ar?.length || 0);
                        for (let i = 0; i < maxReqLen; i++) {
                          reqs.push({
                            en: c.requirements_en?.[i] || '',
                            ar: c.requirements_ar?.[i] || '',
                          });
                        }
                        if (reqs.length === 0) reqs.push({ en: '', ar: '' });
                        setRequirementsList(reqs);

                        const resps = [];
                        const maxRespLen = Math.max(c.responsibilities_en?.length || 0, c.responsibilities_ar?.length || 0);
                        for (let i = 0; i < maxRespLen; i++) {
                          resps.push({
                            en: c.responsibilities_en?.[i] || '',
                            ar: c.responsibilities_ar?.[i] || '',
                          });
                        }
                        if (resps.length === 0) resps.push({ en: '', ar: '' });
                        setResponsibilitiesList(resps);

                        setFormError(null);
                        setFormSuccess(null);
                        setShowFormModal(true);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-corematrix-border hover:border-corematrix-green400/30 text-xs font-semibold transition cursor-pointer"
                    >
                      <i className="fas fa-pen text-[10px]" /> Edit Job details
                    </button>
                    <button
                      onClick={() => deleteCareer(c.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-500/20 bg-red-950/10 hover:bg-red-900/20 text-red-400 text-xs font-semibold transition cursor-pointer"
                    >
                      <i className="fas fa-trash-alt text-[10px]" /> Remove Listing
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {careers.length === 0 && (
              <p className="text-center text-corematrix-textMuted py-12">No dynamic careers posted. Rendering static mockup fallbacks.</p>
            )}
          </div>
        )}

        {/* CANDIDATE APPLICATIONS TAB */}
        {activeTab === 'applications' && (
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-extrabold uppercase tracking-tight mb-8">
              Candidate Submissions Desk
            </h1>

            {/* List Candidate Applications */}
            <div className="space-y-6">
              {applications.map((app) => (
                <div key={app.id} className="rounded-2xl border border-corematrix-border bg-corematrix-card p-6 shadow-xl hover:border-corematrix-border2 transition">
                  <div className="flex justify-between items-start pb-4 border-b border-corematrix-border mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-corematrix-textPrimary">{app.candidateName}</h3>
                      <p className="text-xs text-corematrix-textMuted mt-0.5">
                        Email: <span className="text-corematrix-textSecondary font-medium">{app.candidateEmail}</span> · Phone: {app.candidatePhone || '—'}
                      </p>
                      <p className="text-xs text-corematrix-textDim mt-1">
                        Position: <span className="text-corematrix-green400 font-semibold">{app.career ? app.career.title_en : 'Speculative/Open spec'}</span> · Exp: {app.experience || '—'}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border ${app.status === 'offer' ? 'bg-corematrix-green900/30 text-corematrix-green400 border-corematrix-green700/20' :
                        app.status === 'reject' ? 'bg-red-950/20 text-red-400 border-red-500/10' :
                          app.status === 'interviewed' ? 'bg-blue-950/20 text-blue-400 border-blue-500/10' :
                            app.status === 'shortlist' ? 'bg-purple-950/20 text-purple-400 border-purple-500/10' :
                              'bg-corematrix-border text-corematrix-textMuted border-corematrix-border'
                        }`}>
                        {app.status}
                      </span>
                      <span className="text-[10px] text-corematrix-textDim font-mono">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider mb-1">Message / Cover Letter</p>
                    <p className="text-sm text-corematrix-textSecondary font-light leading-relaxed whitespace-pre-line bg-corematrix-card2/50 border border-corematrix-border/50 rounded-xl p-4">{app.message}</p>
                  </div>

                  {app.resumePath && (
                    <div className="mb-6 flex items-center gap-2">
                      <span className="text-lg">📄</span>
                      <a
                        href={`${app.resumePath}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-corematrix-green400 hover:text-corematrix-green300 font-semibold underline"
                      >
                        Download Candidate Resume Document
                      </a>
                    </div>
                  )}

                  {/* Workflow Pipeline Action Bar */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-corematrix-border justify-between items-center">
                    <div className="flex flex-wrap gap-1.5 items-center">
                      <span className="text-[10px] font-semibold text-corematrix-textMuted uppercase tracking-wider mr-2">Action Pipeline:</span>
                      {[
                        { status: 'review', label: 'Reviewing', color: 'bg-corematrix-border text-corematrix-textPrimary hover:bg-corematrix-border/80' },
                        { status: 'shortlist', label: 'Shortlist', color: 'bg-purple-950/50 text-purple-400 hover:bg-purple-900/30' },
                        { status: 'interviewed', label: 'Interview', color: 'bg-blue-950/50 text-blue-400 hover:bg-blue-900/30' },
                        { status: 'offer', label: 'Selected / Offer', color: 'bg-corematrix-green900/40 text-corematrix-green400 hover:bg-corematrix-green700/40' },
                        { status: 'reject', label: 'Reject', color: 'bg-red-950/40 text-red-400 hover:bg-red-900/40' },
                      ].map((action) => (
                        <button
                          key={action.status}
                          type="button"
                          onClick={() => updateApplicationStatus(app.id, action.status)}
                          className={`px-3 py-1 rounded text-xs font-medium cursor-pointer transition-all ${action.color}`}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => deleteApplication(app.id)}
                      className="text-xs text-red-500 hover:text-red-400 font-bold hover:underline cursor-pointer"
                    >
                      Delete Application
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {applications.length === 0 && (
              <p className="text-center text-corematrix-textMuted py-12">No candidate submissions found in the database console.</p>
            )}
          </div>
        )}

        {/* SERVICE CATEGORIES PANEL */}
        {activeTab === 'categories' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-extrabold uppercase tracking-tight">
                Service Categories Panel
              </h1>
              <button
                onClick={() => {
                  setEditingId(null);
                  setCategoryForm({
                    id: '',
                    filterKey: '',
                    label_en: '',
                    label_ar: '',
                    anchorId: '',
                  });
                  setFormError(null);
                  setFormSuccess(null);
                  setShowFormModal(true);
                }}
                className="rounded-lg bg-corematrix-green700 px-5 py-2.5 text-sm font-semibold hover:bg-corematrix-green500 transition cursor-pointer"
              >
                + Add New Category
              </button>
            </div>

            {/* List Service Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {serviceCategories.map((cat) => (
                <div key={cat.id} className="rounded-2xl border border-corematrix-border bg-corematrix-card p-6 flex flex-col justify-between hover:border-corematrix-border2 transition">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-corematrix-green900/30 text-corematrix-green400 border border-corematrix-green700/20">
                        Key: {cat.filterKey}
                      </span>
                      <span className="text-[10px] uppercase font-mono text-corematrix-textMuted">
                        Anchor: #{cat.anchorId}
                      </span>
                    </div>
                    <h3 className="font-semibold text-base">{cat.label_en}</h3>
                    <p className="text-xs text-corematrix-textSecondary font-light mt-1 text-right">{cat.label_ar}</p>
                  </div>

                  <div className="mt-6 flex justify-end gap-2 border-t border-corematrix-border pt-4">
                    <button
                      onClick={() => {
                        setEditingId(cat.id);
                        setCategoryForm({
                          id: cat.id,
                          filterKey: cat.filterKey,
                          label_en: cat.label_en,
                          label_ar: cat.label_ar,
                          anchorId: cat.anchorId,
                        });
                        setFormError(null);
                        setFormSuccess(null);
                        setShowFormModal(true);
                      }}
                      className="px-3 py-1.5 rounded-lg border border-corematrix-border hover:border-corematrix-green400/30 text-xs font-semibold transition cursor-pointer"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => deleteCategory(cat.id)}
                      className="px-3 py-1.5 rounded-lg border border-red-500/20 bg-red-950/10 hover:bg-red-900/20 text-red-400 text-xs font-semibold transition cursor-pointer"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {serviceCategories.length === 0 && (
              <p className="text-center text-corematrix-textMuted py-12">No service categories found.</p>
            )}
          </div>
        )}

        {/* --- MODAL FORM EDITOR PANEL --- */}
        {showFormModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 overflow-y-auto">
            <div className="relative w-full max-w-4xl rounded-3xl border border-corematrix-border bg-corematrix-card p-8 sm:p-10 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-corematrix-green500 to-transparent" />

              <button
                type="button"
                onClick={() => setShowFormModal(false)}
                className="absolute top-6 right-6 text-xl text-corematrix-textMuted hover:text-corematrix-textPrimary cursor-pointer"
              >
                ✕
              </button>

              <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl font-bold uppercase mb-6">
                {editingId ? 'Edit Database Record' : 'Publish New Database Record'}
              </h2>

              {formError && <p className="mb-4 text-sm font-light text-red-400">{formError}</p>}
              {formSuccess && <p className="mb-4 text-sm font-semibold text-corematrix-green400">{formSuccess}</p>}

              {/* SERVICES FORM */}
              {activeTab === 'services' && (
                <form onSubmit={handleServiceSubmit} className="space-y-6">
                  {/* Modal Sub-Tabs Navigation */}
                  <div className="flex p-1 bg-corematrix-card2 border border-corematrix-border rounded-xl w-full overflow-x-auto no-scrollbar mb-6 gap-1">
                    {[
                      { id: 'basic', label: 'General' },
                      { id: 'hero', label: 'Hero Section' },
                      { id: 'about', label: 'About' },
                      { id: 'solutions', label: 'Solutions Grid' },
                      { id: 'critical', label: 'Critical Why' },
                      { id: 'why-choose', label: 'Why Us' },
                      { id: 'extra', label: 'FAQ & SEO' },
                    ].map(tab => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setModalSubTab(tab.id)}
                        className={`flex-shrink-0 px-4 py-2 rounded-lg font-semibold text-xs transition-all cursor-pointer ${modalSubTab === tab.id
                            ? 'bg-corematrix-green700 text-white shadow'
                            : 'text-corematrix-textMuted hover:text-corematrix-textPrimary'
                          }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* SUBTAB 1: GENERAL */}
                  {modalSubTab === 'basic' && (
                    <div className="space-y-4 text-left">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">Category *</label>
                          <select
                            value={serviceForm.category}
                            onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700"
                          >
                            {serviceCategories.map((cat) => (
                              <option key={cat.id} value={cat.filterKey}>
                                {cat.label_en} ({cat.filterKey})
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">Card Icon Class (FontAwesome / Emoji) *</label>
                          <input
                            type="text"
                            required
                            value={serviceForm.icon}
                            onChange={(e) => setServiceForm({ ...serviceForm, icon: e.target.value })}
                            placeholder="fas fa-cogs"
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">Service Title (EN) *</label>
                          <input
                            type="text"
                            required
                            value={serviceForm.title_en}
                            onChange={(e) => setServiceForm({ ...serviceForm, title_en: e.target.value })}
                            placeholder="AI Product Development"
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">Service Title (AR) *</label>
                          <input
                            type="text"
                            required
                            value={serviceForm.title_ar}
                            onChange={(e) => setServiceForm({ ...serviceForm, title_ar: e.target.value })}
                            placeholder="تطوير منتجات الذكاء الاصطناعي"
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700 text-right"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">Description (EN) *</label>
                          <textarea
                            required
                            rows={3}
                            value={serviceForm.description_en}
                            onChange={(e) => setServiceForm({ ...serviceForm, description_en: e.target.value })}
                            placeholder="Detailed service explanation..."
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700 resize-none font-light leading-relaxed"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">Description (AR) *</label>
                          <textarea
                            required
                            rows={3}
                            value={serviceForm.description_ar}
                            onChange={(e) => setServiceForm({ ...serviceForm, description_ar: e.target.value })}
                            placeholder="شرح تفصيلي للخدمة باللغة العربية..."
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700 resize-none text-right font-light leading-relaxed"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">SEO URL Slug *</label>
                          <input
                            type="text"
                            required
                            value={serviceForm.detailSlug}
                            onChange={(e) => setServiceForm({ ...serviceForm, detailSlug: e.target.value })}
                            placeholder="ai-product-development"
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">Display Order</label>
                          <input
                            type="number"
                            value={serviceForm.order}
                            onChange={(e) => setServiceForm({ ...serviceForm, order: parseInt(e.target.value, 10) || 0 })}
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700"
                          />
                        </div>
                        <div className="flex items-end pb-3">
                          <label className="flex items-center gap-3 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={serviceForm.isPublished}
                              onChange={(e) => setServiceForm({ ...serviceForm, isPublished: e.target.checked })}
                              className="h-4 w-4 rounded border-corematrix-border bg-corematrix-card2 text-corematrix-green700 outline-none focus:ring-0 focus:ring-offset-0"
                            />
                            <span className="text-xs font-semibold text-corematrix-textPrimary uppercase tracking-wider">Publish Directly</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SUBTAB 2: HERO SECTION */}
                  {modalSubTab === 'hero' && (
                    <div className="space-y-4 text-left">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted">Hero Title (EN)</label>
                          <input
                            type="text"
                            value={serviceForm.heroTitle}
                            onChange={(e) => setServiceForm({ ...serviceForm, heroTitle: e.target.value })}
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted text-right">عنوان الواجهة (AR)</label>
                          <input
                            type="text"
                            value={serviceForm.heroTitleAr}
                            onChange={(e) => setServiceForm({ ...serviceForm, heroTitleAr: e.target.value })}
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700 text-right"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted">Hero Tagline / Badge (EN)</label>
                          <input
                            type="text"
                            value={serviceForm.heroTagline}
                            onChange={(e) => setServiceForm({ ...serviceForm, heroTagline: e.target.value })}
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted text-right">الوسم الفرعي (AR)</label>
                          <input
                            type="text"
                            value={serviceForm.heroTaglineAr}
                            onChange={(e) => setServiceForm({ ...serviceForm, heroTaglineAr: e.target.value })}
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700 text-right"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted">Hero Introduction (EN)</label>
                          <textarea
                            rows={3}
                            value={serviceForm.heroIntroduction}
                            onChange={(e) => setServiceForm({ ...serviceForm, heroIntroduction: e.target.value })}
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700 resize-none"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted text-right">المقدمة التعريفية (AR)</label>
                          <textarea
                            rows={3}
                            value={serviceForm.heroIntroductionAr}
                            onChange={(e) => setServiceForm({ ...serviceForm, heroIntroductionAr: e.target.value })}
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700 resize-none text-right"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 border-t border-corematrix-border pt-4">
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted">Hero Main Image File</label>
                          <div className="flex items-center gap-3">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleServiceFileChange(e, 'heroImage')}
                              className="text-xs text-corematrix-textMuted cursor-pointer"
                            />
                            {servicePreviews.heroImage && (
                              <img src={servicePreviews.heroImage} className="h-10 w-10 object-cover rounded-lg border border-corematrix-border" />
                            )}
                          </div>
                        </div>
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted">Hero Icon (Overlay)</label>
                          <div className="flex items-center gap-3">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleServiceFileChange(e, 'heroIcon')}
                              className="text-xs text-corematrix-textMuted cursor-pointer"
                            />
                            {servicePreviews.heroIcon && (
                              <img src={servicePreviews.heroIcon} className="h-10 w-10 object-contain rounded-lg border border-corematrix-border" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SUBTAB 3: ABOUT */}
                  {modalSubTab === 'about' && (
                    <div className="space-y-4 text-left">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted">About Section Title</label>
                          <input
                            type="text"
                            value={serviceForm.aboutSectionTitle}
                            onChange={(e) => setServiceForm({ ...serviceForm, aboutSectionTitle: e.target.value })}
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted text-right">عنوان قسم التعريف (AR)</label>
                          <input
                            type="text"
                            value={serviceForm.aboutSectionTitleAr}
                            onChange={(e) => setServiceForm({ ...serviceForm, aboutSectionTitleAr: e.target.value })}
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-right"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted">About Description</label>
                          <textarea
                            rows={3}
                            value={serviceForm.aboutSectionDescription}
                            onChange={(e) => setServiceForm({ ...serviceForm, aboutSectionDescription: e.target.value })}
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm resize-none"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted text-right">الوصف التعريفي (AR)</label>
                          <textarea
                            rows={3}
                            value={serviceForm.aboutSectionDescriptionAr}
                            onChange={(e) => setServiceForm({ ...serviceForm, aboutSectionDescriptionAr: e.target.value })}
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm resize-none text-right"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted">About Image Alt Text</label>
                          <input
                            type="text"
                            value={serviceForm.aboutSectionImageAlt}
                            onChange={(e) => setServiceForm({ ...serviceForm, aboutSectionImageAlt: e.target.value })}
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted text-right">النص البديل للصورة (AR)</label>
                          <input
                            type="text"
                            value={serviceForm.aboutSectionImageAltAr}
                            onChange={(e) => setServiceForm({ ...serviceForm, aboutSectionImageAltAr: e.target.value })}
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-right"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted">About Bottom Note</label>
                          <input
                            type="text"
                            value={serviceForm.aboutSectionBottomNote}
                            onChange={(e) => setServiceForm({ ...serviceForm, aboutSectionBottomNote: e.target.value })}
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted text-right">ملاحظة أسفل القسم (AR)</label>
                          <input
                            type="text"
                            value={serviceForm.aboutSectionBottomNoteAr}
                            onChange={(e) => setServiceForm({ ...serviceForm, aboutSectionBottomNoteAr: e.target.value })}
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-right"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted">About Section Image File</label>
                          <div className="flex items-center gap-3">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleServiceFileChange(e, 'aboutSectionImage')}
                              className="text-xs text-corematrix-textMuted cursor-pointer"
                            />
                            {servicePreviews.aboutSectionImage && (
                              <img src={servicePreviews.aboutSectionImage} className="h-10 w-10 object-cover rounded-lg border border-corematrix-border" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Dynamic Pillars */}
                      <div className="border-t border-corematrix-border pt-4">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-corematrix-green400">About Section Key Pillars</h4>
                          <button
                            type="button"
                            onClick={() => setAboutPillars([...aboutPillars, { title: '', titleAr: '', description: '', descriptionAr: '' }])}
                            className="text-[10px] font-bold bg-corematrix-green900/30 text-corematrix-green400 border border-corematrix-green700/30 px-3 py-1 rounded hover:bg-corematrix-green700 hover:text-white transition"
                          >
                            + Add Pillar
                          </button>
                        </div>
                        <div className="space-y-3">
                          {aboutPillars.map((p, idx) => (
                            <div key={idx} className="p-4 rounded-xl border border-corematrix-border bg-corematrix-card2 relative space-y-3">
                              <button
                                type="button"
                                onClick={() => setAboutPillars(aboutPillars.filter((_, i) => i !== idx))}
                                className="absolute top-2 right-2 text-corematrix-textMuted hover:text-red-400 font-bold animate-in fade-in"
                              >
                                ×
                              </button>
                              <div className="grid grid-cols-2 gap-4">
                                <input
                                  type="text"
                                  value={p.title}
                                  onChange={(e) => {
                                    const n = [...aboutPillars];
                                    n[idx].title = e.target.value;
                                    setAboutPillars(n);
                                  }}
                                  placeholder="Pillar Title (EN)"
                                  className="bg-transparent border-b border-corematrix-border py-1 text-xs outline-none text-corematrix-textPrimary focus:border-corematrix-green700"
                                />
                                <input
                                  type="text"
                                  value={p.titleAr || ''}
                                  onChange={(e) => {
                                    const n = [...aboutPillars];
                                    n[idx].titleAr = e.target.value;
                                    setAboutPillars(n);
                                  }}
                                  placeholder="العنوان (AR)"
                                  className="bg-transparent border-b border-corematrix-border py-1 text-xs outline-none text-corematrix-textPrimary focus:border-corematrix-green700 text-right"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <input
                                  type="text"
                                  value={p.description || ''}
                                  onChange={(e) => {
                                    const n = [...aboutPillars];
                                    n[idx].description = e.target.value;
                                    setAboutPillars(n);
                                  }}
                                  placeholder="Short Description (Optional, EN)"
                                  className="bg-transparent border-b border-corematrix-border py-1 text-[11px] outline-none text-corematrix-textSecondary"
                                />
                                <input
                                  type="text"
                                  value={p.descriptionAr || ''}
                                  onChange={(e) => {
                                    const n = [...aboutPillars];
                                    n[idx].descriptionAr = e.target.value;
                                    setAboutPillars(n);
                                  }}
                                  placeholder="وصف فرعي (اختياري، AR)"
                                  className="bg-transparent border-b border-corematrix-border py-1 text-[11px] outline-none text-corematrix-textSecondary text-right"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SUBTAB 4: SOLUTIONS GRID */}
                  {modalSubTab === 'solutions' && (
                    <div className="space-y-4 text-left">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted">Solutions Section Title</label>
                          <input
                            type="text"
                            value={serviceForm.capabilitiesSectionTitle}
                            onChange={(e) => setServiceForm({ ...serviceForm, capabilitiesSectionTitle: e.target.value })}
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted text-right">عنوان قسم القدرات والحلول (AR)</label>
                          <input
                            type="text"
                            value={serviceForm.capabilitiesSectionTitleAr}
                            onChange={(e) => setServiceForm({ ...serviceForm, capabilitiesSectionTitleAr: e.target.value })}
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-right"
                          />
                        </div>
                      </div>

                      {/* Capabilities Dynamic Array */}
                      <div className="border-t border-corematrix-border pt-4">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-corematrix-green400">Solution Cards Matrix</h4>
                          <button
                            type="button"
                            onClick={() => setCapabilities([...capabilities, { title: '', titleAr: '', description: '', descriptionAr: '', icon: 'fas fa-cog' }])}
                            className="text-[10px] font-bold bg-corematrix-green900/30 text-corematrix-green400 border border-corematrix-green700/30 px-3 py-1 rounded hover:bg-corematrix-green700 hover:text-white transition"
                          >
                            + Add Solution Card
                          </button>
                        </div>
                        <div className="space-y-3">
                          {capabilities.map((c, idx) => (
                            <div key={idx} className="p-4 rounded-xl border border-corematrix-border bg-corematrix-card2 relative space-y-3 animate-in fade-in">
                              <button
                                type="button"
                                onClick={() => setCapabilities(capabilities.filter((_, i) => i !== idx))}
                                className="absolute top-2 right-2 text-corematrix-textMuted hover:text-red-400 font-bold"
                              >
                                ×
                              </button>
                              <div className="grid grid-cols-3 gap-4">
                                <input
                                  type="text"
                                  value={c.title}
                                  onChange={(e) => {
                                    const n = [...capabilities];
                                    n[idx].title = e.target.value;
                                    setCapabilities(n);
                                  }}
                                  placeholder="Solution Title (EN)"
                                  className="bg-transparent border-b border-corematrix-border py-1 text-xs outline-none text-corematrix-textPrimary focus:border-corematrix-green700"
                                />
                                <input
                                  type="text"
                                  value={c.titleAr || ''}
                                  onChange={(e) => {
                                    const n = [...capabilities];
                                    n[idx].titleAr = e.target.value;
                                    setCapabilities(n);
                                  }}
                                  placeholder="العنوان (AR)"
                                  className="bg-transparent border-b border-corematrix-border py-1 text-xs outline-none text-corematrix-textPrimary focus:border-corematrix-green700 text-right"
                                />
                                <input
                                  type="text"
                                  value={c.icon || ''}
                                  onChange={(e) => {
                                    const n = [...capabilities];
                                    n[idx].icon = e.target.value;
                                    setCapabilities(n);
                                  }}
                                  placeholder="Icon (Class or Emoji)"
                                  className="bg-transparent border-b border-corematrix-border py-1 text-[11px] outline-none text-corematrix-textSecondary"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <textarea
                                  rows={2}
                                  value={c.description}
                                  onChange={(e) => {
                                    const n = [...capabilities];
                                    n[idx].description = e.target.value;
                                    setCapabilities(n);
                                  }}
                                  placeholder="Brief card description (EN)"
                                  className="bg-transparent border-b border-corematrix-border py-1 text-xs outline-none text-corematrix-textSecondary focus:border-corematrix-green700 resize-none font-light leading-relaxed"
                                />
                                <textarea
                                  rows={2}
                                  value={c.descriptionAr || ''}
                                  onChange={(e) => {
                                    const n = [...capabilities];
                                    n[idx].descriptionAr = e.target.value;
                                    setCapabilities(n);
                                  }}
                                  placeholder="وصف البطاقة بالعربية (AR)"
                                  className="bg-transparent border-b border-corematrix-border py-1 text-xs outline-none text-corematrix-textSecondary focus:border-corematrix-green700 resize-none text-right font-light leading-relaxed"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}


                  {/* SUBTAB 6: CRITICAL WHY */}
                  {modalSubTab === 'critical' && (
                    <div className="space-y-4 text-left">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted">Critical Section Title</label>
                          <input
                            type="text"
                            value={serviceForm.criticalSectionTitle}
                            onChange={(e) => setServiceForm({ ...serviceForm, criticalSectionTitle: e.target.value })}
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted text-right">عنوان قسم الجدوى البالغة (AR)</label>
                          <input
                            type="text"
                            value={serviceForm.criticalSectionTitleAr}
                            onChange={(e) => setServiceForm({ ...serviceForm, criticalSectionTitleAr: e.target.value })}
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-right"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted">Critical Description</label>
                          <textarea
                            rows={3}
                            value={serviceForm.criticalSectionDescription}
                            onChange={(e) => setServiceForm({ ...serviceForm, criticalSectionDescription: e.target.value })}
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm resize-none"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted text-right">الوصف التعريفي للجدوى (AR)</label>
                          <textarea
                            rows={3}
                            value={serviceForm.criticalSectionDescriptionAr}
                            onChange={(e) => setServiceForm({ ...serviceForm, criticalSectionDescriptionAr: e.target.value })}
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm resize-none text-right"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted">Critical Action Link</label>
                          <input
                            type="text"
                            value={serviceForm.criticalSectionButtonLink}
                            onChange={(e) => setServiceForm({ ...serviceForm, criticalSectionButtonLink: e.target.value })}
                            placeholder="/contact"
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted">Button Text</label>
                          <input
                            type="text"
                            value={serviceForm.criticalSectionButtonText}
                            onChange={(e) => setServiceForm({ ...serviceForm, criticalSectionButtonText: e.target.value })}
                            placeholder="Get Started"
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted">Button Text (AR)</label>
                          <input
                            type="text"
                            value={serviceForm.criticalSectionButtonTextAr}
                            onChange={(e) => setServiceForm({ ...serviceForm, criticalSectionButtonTextAr: e.target.value })}
                            placeholder="ابدأ الآن"
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-right"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted">Critical Highlights Right Side Title</label>
                          <input
                            type="text"
                            value={serviceForm.criticalRightTitle}
                            onChange={(e) => setServiceForm({ ...serviceForm, criticalRightTitle: e.target.value })}
                            placeholder="Primary Value Anchors"
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted text-right">عنوان الجانب الأيمن من القسم (AR)</label>
                          <input
                            type="text"
                            value={serviceForm.criticalRightTitleAr}
                            onChange={(e) => setServiceForm({ ...serviceForm, criticalRightTitleAr: e.target.value })}
                            placeholder="الركائز الأساسية لنجاح الخدمة"
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-right"
                          />
                        </div>
                      </div>

                      {/* Critical Highlights Cards dynamic grid */}
                      <div className="border-t border-corematrix-border pt-4">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-corematrix-green400">Critical Highlights Cards (Max 4 recommended)</h4>
                          <button
                            type="button"
                            onClick={() => setCriticalCards([...criticalCards, { title: '', titleAr: '', description: '', descriptionAr: '', icon: 'fas fa-exclamation-triangle' }])}
                            className="text-[10px] font-bold bg-corematrix-green900/30 text-corematrix-green400 border border-corematrix-green700/30 px-3 py-1 rounded hover:bg-corematrix-green700 hover:text-white transition"
                          >
                            + Add Value Anchor Card
                          </button>
                        </div>
                        <div className="space-y-3">
                          {criticalCards.map((card, idx) => (
                            <div key={idx} className="p-4 rounded-xl border border-corematrix-border bg-corematrix-card2 relative space-y-3 animate-in fade-in">
                              <button
                                type="button"
                                onClick={() => setCriticalCards(criticalCards.filter((_, i) => i !== idx))}
                                className="absolute top-2 right-2 text-corematrix-textMuted hover:text-red-400 font-bold"
                              >
                                ×
                              </button>
                              <div className="grid grid-cols-3 gap-4">
                                <input
                                  type="text"
                                  value={card.title}
                                  onChange={(e) => {
                                    const n = [...criticalCards];
                                    n[idx].title = e.target.value;
                                    setCriticalCards(n);
                                  }}
                                  placeholder="Anchor Title (EN)"
                                  className="bg-transparent border-b border-corematrix-border py-1 text-xs outline-none text-corematrix-textPrimary focus:border-corematrix-green700"
                                />
                                <input
                                  type="text"
                                  value={card.titleAr || ''}
                                  onChange={(e) => {
                                    const n = [...criticalCards];
                                    n[idx].titleAr = e.target.value;
                                    setCriticalCards(n);
                                  }}
                                  placeholder="العنوان بالعربية (AR)"
                                  className="bg-transparent border-b border-corematrix-border py-1 text-xs outline-none text-corematrix-textPrimary focus:border-corematrix-green700 text-right"
                                />
                                <input
                                  type="text"
                                  value={card.icon || ''}
                                  onChange={(e) => {
                                    const n = [...criticalCards];
                                    n[idx].icon = e.target.value;
                                    setCriticalCards(n);
                                  }}
                                  placeholder="FA Icon Class (e.g. fas fa-lock)"
                                  className="bg-transparent border-b border-corematrix-border py-1 text-[11px] outline-none text-corematrix-textSecondary"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <textarea
                                  rows={2}
                                  value={card.description}
                                  onChange={(e) => {
                                    const n = [...criticalCards];
                                    n[idx].description = e.target.value;
                                    setCriticalCards(n);
                                  }}
                                  placeholder="Brief anchor value (EN)"
                                  className="bg-transparent border-b border-corematrix-border py-1 text-xs outline-none focus:border-corematrix-green700 resize-none font-light leading-relaxed text-corematrix-textSecondary"
                                />
                                <textarea
                                  rows={2}
                                  value={card.descriptionAr || ''}
                                  onChange={(e) => {
                                    const n = [...criticalCards];
                                    n[idx].descriptionAr = e.target.value;
                                    setCriticalCards(n);
                                  }}
                                  placeholder="شرح الركيزة بالعربية (AR)"
                                  className="bg-transparent border-b border-corematrix-border py-1 text-xs outline-none focus:border-corematrix-green700 resize-none text-right font-light leading-relaxed text-corematrix-textSecondary"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SUBTAB 7: WHY CHOOSE US */}
                  {modalSubTab === 'why-choose' && (
                    <div className="space-y-4 text-left">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted">Why Choose Us Section Title</label>
                          <input
                            type="text"
                            value={serviceForm.whyChooseUsSectionTitle}
                            onChange={(e) => setServiceForm({ ...serviceForm, whyChooseUsSectionTitle: e.target.value })}
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted text-right">عنوان قسم اختيارنا (AR)</label>
                          <input
                            type="text"
                            value={serviceForm.whyChooseUsSectionTitleAr}
                            onChange={(e) => setServiceForm({ ...serviceForm, whyChooseUsSectionTitleAr: e.target.value })}
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-right"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted">Why Choose Description</label>
                          <textarea
                            rows={3}
                            value={serviceForm.whyChooseUsDescription}
                            onChange={(e) => setServiceForm({ ...serviceForm, whyChooseUsDescription: e.target.value })}
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm resize-none"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted text-right">الوصف التعريفي (AR)</label>
                          <textarea
                            rows={3}
                            value={serviceForm.whyChooseUsDescriptionAr}
                            onChange={(e) => setServiceForm({ ...serviceForm, whyChooseUsDescriptionAr: e.target.value })}
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm resize-none text-right"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted">Why Choose Bottom Note</label>
                          <input
                            type="text"
                            value={serviceForm.whyChooseUsBottomNote}
                            onChange={(e) => setServiceForm({ ...serviceForm, whyChooseUsBottomNote: e.target.value })}
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted text-right">ملاحظة ختامية أسفل القسم (AR)</label>
                          <input
                            type="text"
                            value={serviceForm.whyChooseUsBottomNoteAr}
                            onChange={(e) => setServiceForm({ ...serviceForm, whyChooseUsBottomNoteAr: e.target.value })}
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-right"
                          />
                        </div>
                      </div>

                      {/* Advantages Dynamic Array */}
                      <div className="border-t border-corematrix-border pt-4">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-corematrix-green400">Company Advantages</h4>
                          <button
                            type="button"
                            onClick={() => setWhyChooseUs([...whyChooseUs, { title: '', titleAr: '', description: '', descriptionAr: '', icon: 'fas fa-award' }])}
                            className="text-[10px] font-bold bg-corematrix-green900/30 text-corematrix-green400 border border-corematrix-green700/30 px-3 py-1 rounded hover:bg-corematrix-green700 hover:text-white transition"
                          >
                            + Add Advantage Card
                          </button>
                        </div>
                        <div className="space-y-3">
                          {whyChooseUs.map((item, idx) => (
                            <div key={idx} className="p-4 rounded-xl border border-corematrix-border bg-corematrix-card2 relative space-y-3 animate-in fade-in">
                              <button
                                type="button"
                                onClick={() => setWhyChooseUs(whyChooseUs.filter((_, i) => i !== idx))}
                                className="absolute top-2 right-2 text-corematrix-textMuted hover:text-red-400 font-bold"
                              >
                                ×
                              </button>
                              <div className="grid grid-cols-3 gap-4">
                                <input
                                  type="text"
                                  value={item.title}
                                  onChange={(e) => {
                                    const n = [...whyChooseUs];
                                    n[idx].title = e.target.value;
                                    setWhyChooseUs(n);
                                  }}
                                  placeholder="Advantage Title (EN)"
                                  className="bg-transparent border-b border-corematrix-border py-1 text-xs outline-none text-corematrix-textPrimary focus:border-corematrix-green700"
                                />
                                <input
                                  type="text"
                                  value={item.titleAr || ''}
                                  onChange={(e) => {
                                    const n = [...whyChooseUs];
                                    n[idx].titleAr = e.target.value;
                                    setWhyChooseUs(n);
                                  }}
                                  placeholder="العنوان (AR)"
                                  className="bg-transparent border-b border-corematrix-border py-1 text-xs outline-none text-corematrix-textPrimary focus:border-corematrix-green700 text-right"
                                />
                                <input
                                  type="text"
                                  value={item.icon || ''}
                                  onChange={(e) => {
                                    const n = [...whyChooseUs];
                                    n[idx].icon = e.target.value;
                                    setWhyChooseUs(n);
                                  }}
                                  placeholder="FA Icon Class (e.g. fas fa-star)"
                                  className="bg-transparent border-b border-corematrix-border py-1 text-[11px] outline-none text-corematrix-textSecondary"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <textarea
                                  rows={2}
                                  value={item.description}
                                  onChange={(e) => {
                                    const n = [...whyChooseUs];
                                    n[idx].description = e.target.value;
                                    setWhyChooseUs(n);
                                  }}
                                  placeholder="Short details (EN)"
                                  className="bg-transparent border-b border-corematrix-border py-1 text-xs outline-none focus:border-corematrix-green700 resize-none font-light leading-relaxed text-corematrix-textSecondary"
                                />
                                <textarea
                                  rows={2}
                                  value={item.descriptionAr || ''}
                                  onChange={(e) => {
                                    const n = [...whyChooseUs];
                                    n[idx].descriptionAr = e.target.value;
                                    setWhyChooseUs(n);
                                  }}
                                  placeholder="التفاصيل بالعربية (AR)"
                                  className="bg-transparent border-b border-corematrix-border py-1 text-xs outline-none focus:border-corematrix-green700 resize-none text-right font-light leading-relaxed text-corematrix-textSecondary"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SUBTAB 8: FAQ & SEO METADATA */}
                  {modalSubTab === 'extra' && (
                    <div className="space-y-4 text-left">
                      {/* SEO Meta Titles */}
                      <h4 className="text-xs font-bold uppercase tracking-wider text-corematrix-green400 border-b border-corematrix-border pb-2">🔍 Search Engine Optimization (SEO)</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-2 block text-xs text-corematrix-textMuted">Meta Title (EN)</label>
                          <input
                            type="text"
                            value={serviceForm.metaTitle_en}
                            onChange={(e) => setServiceForm({ ...serviceForm, metaTitle_en: e.target.value })}
                            placeholder="AI Development Services | Corematrix"
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-xs text-corematrix-textMuted text-right">عنوان السيو (AR)</label>
                          <input
                            type="text"
                            value={serviceForm.metaTitle_ar}
                            onChange={(e) => setServiceForm({ ...serviceForm, metaTitle_ar: e.target.value })}
                            placeholder="خدمات تطوير الذكاء الاصطناعي | كورماتريكس"
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700 text-right"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-2 block text-xs text-corematrix-textMuted">Meta Keywords (EN)</label>
                          <input
                            type="text"
                            value={serviceForm.metaKeywords_en}
                            onChange={(e) => setServiceForm({ ...serviceForm, metaKeywords_en: e.target.value })}
                            placeholder="AI, Next.js, LLM, RAG"
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-xs text-corematrix-textMuted text-right">الكلمات الدلالية (AR)</label>
                          <input
                            type="text"
                            value={serviceForm.metaKeywords_ar}
                            onChange={(e) => setServiceForm({ ...serviceForm, metaKeywords_ar: e.target.value })}
                            placeholder="الذكاء الاصطناعي، ويب، تطبيقات"
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700 text-right"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-2 block text-xs text-corematrix-textMuted">Meta Description (EN)</label>
                          <textarea
                            rows={2}
                            value={serviceForm.metaDescription_en}
                            onChange={(e) => setServiceForm({ ...serviceForm, metaDescription_en: e.target.value })}
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm resize-none animate-none"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-xs text-corematrix-textMuted text-right">الوصف التعريفي للسيو (AR)</label>
                          <textarea
                            rows={2}
                            value={serviceForm.metaDescription_ar}
                            onChange={(e) => setServiceForm({ ...serviceForm, metaDescription_ar: e.target.value })}
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm resize-none text-right animate-none"
                          />
                        </div>
                      </div>

                      {/* FAQs dynamic checklist */}
                      <div className="border-t border-corematrix-border pt-4">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-corematrix-green400">Bilingual Frequently Asked Questions (FAQ)</h4>
                          <button
                            type="button"
                            onClick={() => setFaqs([...faqs, { q: '', q_ar: '', a: '', a_ar: '' }])}
                            className="text-[10px] font-bold bg-corematrix-green900/30 text-corematrix-green400 border border-corematrix-green700/30 px-3 py-1 rounded hover:bg-corematrix-green700 hover:text-white transition"
                          >
                            + Add FAQ Item
                          </button>
                        </div>
                        <div className="space-y-3">
                          {faqs.map((f, idx) => (
                            <div key={idx} className="p-4 rounded-xl border border-corematrix-border bg-corematrix-card2 relative space-y-3 animate-in fade-in">
                              <button
                                type="button"
                                onClick={() => setFaqs(faqs.filter((_, i) => i !== idx))}
                                className="absolute top-2 right-2 text-corematrix-textMuted hover:text-red-400 font-bold"
                              >
                                ×
                              </button>
                              <div className="grid grid-cols-2 gap-4">
                                <input
                                  type="text"
                                  value={f.q}
                                  onChange={(e) => {
                                    const n = [...faqs];
                                    n[idx].q = e.target.value;
                                    setFaqs(n);
                                  }}
                                  placeholder="Question (EN)"
                                  className="bg-transparent border-b border-corematrix-border py-1 text-xs outline-none text-corematrix-textPrimary focus:border-corematrix-green700"
                                />
                                <input
                                  type="text"
                                  value={f.q_ar || ''}
                                  onChange={(e) => {
                                    const n = [...faqs];
                                    n[idx].q_ar = e.target.value;
                                    setFaqs(n);
                                  }}
                                  placeholder="السؤال بالعربية (AR)"
                                  className="bg-transparent border-b border-corematrix-border py-1 text-xs outline-none text-corematrix-textPrimary focus:border-corematrix-green700 text-right"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <textarea
                                  rows={2}
                                  value={f.a}
                                  onChange={(e) => {
                                    const n = [...faqs];
                                    n[idx].a = e.target.value;
                                    setFaqs(n);
                                  }}
                                  placeholder="Answer explanation (EN)"
                                  className="bg-transparent border-b border-corematrix-border py-1 text-xs outline-none focus:border-corematrix-green700 resize-none font-light leading-relaxed text-corematrix-textSecondary"
                                />
                                <textarea
                                  rows={2}
                                  value={f.a_ar || ''}
                                  onChange={(e) => {
                                    const n = [...faqs];
                                    n[idx].a_ar = e.target.value;
                                    setFaqs(n);
                                  }}
                                  placeholder="الإجابة والتوضيح بالعربية (AR)"
                                  className="bg-transparent border-b border-corematrix-border py-1 text-xs outline-none focus:border-corematrix-green700 resize-none text-right font-light leading-relaxed text-corematrix-textSecondary"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-corematrix-green700 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-corematrix-green500 shadow-lg cursor-pointer"
                  >
                    {editingId ? 'Update Service Database Record' : 'Create Service Database Record'}
                  </button>
                </form>
              )}

              {/* CATEGORIES FORM */}
              {activeTab === 'categories' && (
                <form onSubmit={handleCategorySubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">English Label *</label>
                      <input
                        type="text"
                        required
                        value={categoryForm.label_en}
                        onChange={(e) => {
                          const val = e.target.value;
                          const slug = val
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/(^-|-$)+/g, '');
                          setCategoryForm({
                            ...categoryForm,
                            label_en: val,
                            filterKey: slug,
                            anchorId: slug ? `${slug}-dev` : '',
                          });
                        }}
                        placeholder="Cloud Solutions"
                        className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">Arabic Label *</label>
                      <input
                        type="text"
                        required
                        value={categoryForm.label_ar}
                        onChange={(e) => setCategoryForm({ ...categoryForm, label_ar: e.target.value })}
                        placeholder="حلول السحابة"
                        className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700 text-right"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">Filter Key (Slug, e.g. "cloud") *</label>
                      <input
                        type="text"
                        required
                        value={categoryForm.filterKey}
                        onChange={(e) => setCategoryForm({ ...categoryForm, filterKey: e.target.value })}
                        placeholder="cloud"
                        className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">Anchor ID (e.g. "cloud-dev") *</label>
                      <input
                        type="text"
                        required
                        value={categoryForm.anchorId}
                        onChange={(e) => setCategoryForm({ ...categoryForm, anchorId: e.target.value })}
                        placeholder="cloud-dev"
                        className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-corematrix-green700 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-corematrix-green500 shadow-lg cursor-pointer"
                  >
                    {editingId ? 'Update Service Category' : 'Create Service Category'}
                  </button>
                </form>
              )}

              {/* BLOGS FORM */}
              {activeTab === 'blogs' && (
                <form onSubmit={handleBlogSubmit} className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">SEO slug *</label>
                      <input
                        type="text"
                        required
                        value={blogForm.slug}
                        onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                        placeholder="rag-systems-guide"
                        className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">Category *</label>
                      <select
                        value={blogForm.category}
                        onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                        className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700"
                      >
                        <option value="ai">AI Development</option>
                        <option value="nextjs">Next.js & React</option>
                        <option value="saas">SaaS & Cloud</option>
                        <option value="devops">DevOps</option>
                        <option value="mobile">Mobile Dev</option>
                        <option value="tutorials">Tutorials</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">Publication Status *</label>
                      <select
                        value={blogForm.status}
                        onChange={(e) => setBlogForm({ ...blogForm, status: e.target.value })}
                        className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700"
                      >
                        <option value="DRAFT">DRAFT</option>
                        <option value="PUBLISHED">PUBLISHED</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">Cover Image File</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            setBlogCoverFile(e.target.files[0]);
                          }
                        }}
                        className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-2.5 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">Tags (Comma Sep)</label>
                      <input
                        type="text"
                        value={blogForm.tags}
                        onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                        placeholder="#RAG, #LangChain"
                        className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">Blog Title (EN) *</label>
                      <input
                        type="text"
                        required
                        value={blogForm.title_en}
                        onChange={(e) => setBlogForm({ ...blogForm, title_en: e.target.value })}
                        placeholder="Building production RAG systems"
                        className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">Blog Title (AR) *</label>
                      <input
                        type="text"
                        required
                        value={blogForm.title_ar}
                        onChange={(e) => setBlogForm({ ...blogForm, title_ar: e.target.value })}
                        placeholder="بناء أنظمة التوليد المعزز بالاسترجاع (RAG)"
                        className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700 text-right"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">Excerpt / Intro (EN)</label>
                      <textarea
                        rows={2}
                        value={blogForm.excerpt_en}
                        onChange={(e) => setBlogForm({ ...blogForm, excerpt_en: e.target.value })}
                        placeholder="Brief summary sentence..."
                        className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700 resize-none"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">Excerpt / Intro (AR)</label>
                      <textarea
                        rows={2}
                        value={blogForm.excerpt_ar}
                        onChange={(e) => setBlogForm({ ...blogForm, excerpt_ar: e.target.value })}
                        placeholder="ملخص قصير للمقالة باللغة العربية..."
                        className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700 resize-none text-right"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <RichTextEditor
                      label="Article Content (EN) *"
                      dir="ltr"
                      value={blogForm.content_en}
                      onChange={(html) => setBlogForm({ ...blogForm, content_en: html })}
                      placeholder="Write English article body..."
                    />
                    <RichTextEditor
                      label="Article Content (AR) *"
                      dir="rtl"
                      value={blogForm.content_ar}
                      onChange={(html) => setBlogForm({ ...blogForm, content_ar: html })}
                      placeholder="اكتب نص المقالة باللغة العربية هنا..."
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4 border-t border-corematrix-border pt-4">
                    <div>
                      <label className="mb-2 block text-xs text-corematrix-textMuted">Author Name (EN)</label>
                      <input
                        type="text"
                        value={blogForm.authorName_en}
                        onChange={(e) => setBlogForm({ ...blogForm, authorName_en: e.target.value })}
                        className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs text-corematrix-textMuted">Author Role (EN)</label>
                      <input
                        type="text"
                        value={blogForm.authorRole_en}
                        onChange={(e) => setBlogForm({ ...blogForm, authorRole_en: e.target.value })}
                        className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs text-corematrix-textMuted">Author Initials</label>
                      <input
                        type="text"
                        value={blogForm.authorInitials}
                        onChange={(e) => setBlogForm({ ...blogForm, authorInitials: e.target.value })}
                        className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm"
                      />
                    </div>
                  </div>

                  {/* SEO Section as requested by user */}
                  <div className="border-t border-corematrix-border pt-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-corematrix-green400 mb-4">
                      🔍 SEO Metadata Fields (Approved by User)
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-2 block text-xs text-corematrix-textMuted">Meta Title (EN)</label>
                        <input
                          type="text"
                          value={blogForm.metaTitle_en}
                          onChange={(e) => setBlogForm({ ...blogForm, metaTitle_en: e.target.value })}
                          placeholder="Article title | Corematrix Blog"
                          className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-xs text-corematrix-textMuted">Meta Title (AR)</label>
                        <input
                          type="text"
                          value={blogForm.metaTitle_ar}
                          onChange={(e) => setBlogForm({ ...blogForm, metaTitle_ar: e.target.value })}
                          className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-right"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="mb-2 block text-xs text-corematrix-textMuted">Meta Keywords (EN)</label>
                        <input
                          type="text"
                          value={blogForm.metaKeywords_en}
                          onChange={(e) => setBlogForm({ ...blogForm, metaKeywords_en: e.target.value })}
                          className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-xs text-corematrix-textMuted">Meta Keywords (AR)</label>
                        <input
                          type="text"
                          value={blogForm.metaKeywords_ar}
                          onChange={(e) => setBlogForm({ ...blogForm, metaKeywords_ar: e.target.value })}
                          className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-right"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="mb-2 block text-xs text-corematrix-textMuted">Meta Description (EN)</label>
                        <textarea
                          rows={2}
                          value={blogForm.metaDescription_en}
                          onChange={(e) => setBlogForm({ ...blogForm, metaDescription_en: e.target.value })}
                          className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm resize-none"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-xs text-corematrix-textMuted">Meta Description (AR)</label>
                        <textarea
                          rows={2}
                          value={blogForm.metaDescription_ar}
                          onChange={(e) => setBlogForm({ ...blogForm, metaDescription_ar: e.target.value })}
                          className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm resize-none text-right"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-corematrix-green700 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-corematrix-green500 shadow-lg cursor-pointer"
                  >
                    {editingId ? 'Update Blog Post' : 'Publish Blog Post'}
                  </button>
                </form>
              )}

              {/* CAREERS FORM */}
              {activeTab === 'careers' && (
                <form onSubmit={handleCareerSubmit} className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">Department *</label>
                      <select
                        value={careerForm.department}
                        onChange={(e) => setCareerForm({ ...careerForm, department: e.target.value })}
                        className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700"
                      >
                        <option value="engineering">Engineering</option>
                        <option value="design">Design</option>
                        <option value="product">Product</option>
                        <option value="devops">DevOps</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">Salary Range *</label>
                      <input
                        type="text"
                        required
                        value={careerForm.salaryRange}
                        onChange={(e) => setCareerForm({ ...careerForm, salaryRange: e.target.value })}
                        placeholder="$90k–$130k"
                        className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">Icon fontawesome *</label>
                      <input
                        type="text"
                        required
                        value={careerForm.icon}
                        onChange={(e) => setCareerForm({ ...careerForm, icon: e.target.value })}
                        placeholder="fas fa-brain"
                        className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">Job Title (EN) *</label>
                      <input
                        type="text"
                        required
                        value={careerForm.title_en}
                        onChange={(e) => setCareerForm({ ...careerForm, title_en: e.target.value })}
                        placeholder="Senior LLM Engineer"
                        className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">Job Title (AR) *</label>
                      <input
                        type="text"
                        required
                        value={careerForm.title_ar}
                        onChange={(e) => setCareerForm({ ...careerForm, title_ar: e.target.value })}
                        placeholder="مهندس نماذج لغوية كبير"
                        className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700 text-right"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">Job Description (EN) *</label>
                      <textarea
                        required
                        rows={3}
                        value={careerForm.description_en}
                        onChange={(e) => setCareerForm({ ...careerForm, description_en: e.target.value })}
                        placeholder="Role overview..."
                        className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700 resize-none"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">Job Description (AR) *</label>
                      <textarea
                        required
                        rows={3}
                        value={careerForm.description_ar}
                        onChange={(e) => setCareerForm({ ...careerForm, description_ar: e.target.value })}
                        placeholder="الوصف الوظيفي باللغة العربية..."
                        className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700 resize-none text-right"
                      />
                    </div>
                  </div>

                  {/* Bilingual Requirements Dynamic List */}
                  <div className="border border-corematrix-border bg-corematrix-card2/30 rounded-2xl p-5 space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-corematrix-border">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-corematrix-green400">
                        Bilingual Requirements (English & Arabic Side-by-Side) *
                      </h3>
                      <button
                        type="button"
                        onClick={() => setRequirementsList([...requirementsList, { en: '', ar: '' }])}
                        className="rounded-lg bg-corematrix-green700/20 border border-corematrix-green700/30 px-3 py-1.5 text-xs font-semibold text-corematrix-green400 hover:bg-corematrix-green700/30 transition cursor-pointer"
                      >
                        <i className="fas fa-plus mr-1.5" /> Add Requirement Point
                      </button>
                    </div>

                    <div className="space-y-3">
                      {requirementsList.map((item, idx) => (
                        <div key={idx} className="flex gap-3 items-center">
                          <span className="text-xs text-corematrix-textMuted font-mono w-6 shrink-0 text-center">{idx + 1}.</span>
                          <input
                            type="text"
                            required
                            value={item.en}
                            onChange={(e) => {
                              const updated = [...requirementsList];
                              updated[idx].en = e.target.value;
                              setRequirementsList(updated);
                            }}
                            placeholder="English: e.g. 5+ years Python expertise"
                            className="flex-1 rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700"
                          />
                          <input
                            type="text"
                            required
                            value={item.ar}
                            onChange={(e) => {
                              const updated = [...requirementsList];
                              updated[idx].ar = e.target.value;
                              setRequirementsList(updated);
                            }}
                            placeholder="العربية: مثال: خبرة 5 سنوات بايثون"
                            className="flex-1 rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700 text-right"
                          />
                          {requirementsList.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const updated = requirementsList.filter((_, i) => i !== idx);
                                setRequirementsList(updated);
                              }}
                              className="p-3 text-red-400 hover:text-red-300 hover:bg-red-950/20 rounded-xl transition cursor-pointer"
                              title="Delete point"
                            >
                              <i className="fas fa-trash-alt" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bilingual Responsibilities Dynamic List */}
                  <div className="border border-corematrix-border bg-corematrix-card2/30 rounded-2xl p-5 space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-corematrix-border">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-corematrix-green400">
                        Bilingual Responsibilities (English & Arabic Side-by-Side) *
                      </h3>
                      <button
                        type="button"
                        onClick={() => setResponsibilitiesList([...responsibilitiesList, { en: '', ar: '' }])}
                        className="rounded-lg bg-corematrix-green700/20 border border-corematrix-green700/30 px-3 py-1.5 text-xs font-semibold text-corematrix-green400 hover:bg-corematrix-green700/30 transition cursor-pointer"
                      >
                        <i className="fas fa-plus mr-1.5" /> Add Responsibility Point
                      </button>
                    </div>

                    <div className="space-y-3">
                      {responsibilitiesList.map((item, idx) => (
                        <div key={idx} className="flex gap-3 items-center">
                          <span className="text-xs text-corematrix-textMuted font-mono w-6 shrink-0 text-center">{idx + 1}.</span>
                          <input
                            type="text"
                            required
                            value={item.en}
                            onChange={(e) => {
                              const updated = [...responsibilitiesList];
                              updated[idx].en = e.target.value;
                              setResponsibilitiesList(updated);
                            }}
                            placeholder="English: e.g. Design RAG databases"
                            className="flex-1 rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700"
                          />
                          <input
                            type="text"
                            required
                            value={item.ar}
                            onChange={(e) => {
                              const updated = [...responsibilitiesList];
                              updated[idx].ar = e.target.value;
                              setResponsibilitiesList(updated);
                            }}
                            placeholder="العربية: مثال: تصميم قواعد بيانات RAG"
                            className="flex-1 rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700 text-right"
                          />
                          {responsibilitiesList.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const updated = responsibilitiesList.filter((_, i) => i !== idx);
                                setResponsibilitiesList(updated);
                              }}
                              className="p-3 text-red-400 hover:text-red-300 hover:bg-red-950/20 rounded-xl transition cursor-pointer"
                              title="Delete point"
                            >
                              <i className="fas fa-trash-alt" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 border-t border-corematrix-border pt-4">
                    <div>
                      <label className="mb-2 block text-xs text-corematrix-textMuted">Job Badge (e.g. hot / new)</label>
                      <input
                        type="text"
                        value={careerForm.badge_en}
                        onChange={(e) => setCareerForm({ ...careerForm, badge_en: e.target.value })}
                        placeholder="hot"
                        className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs text-corematrix-textMuted">Job Location</label>
                      <input
                        type="text"
                        value={careerForm.location_en}
                        onChange={(e) => setCareerForm({ ...careerForm, location_en: e.target.value })}
                        className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs text-corematrix-textMuted">Employment Type</label>
                      <input
                        type="text"
                        value={careerForm.employmentType_en}
                        onChange={(e) => setCareerForm({ ...careerForm, employmentType_en: e.target.value })}
                        className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-corematrix-green700 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-corematrix-green500 shadow-lg cursor-pointer"
                  >
                    {editingId ? 'Update Career Listing' : 'Publish Career Listing'}
                  </button>
                </form>
              )}

            </div>
          </div>
        )}

        {/* NEWSLETTER TAB */}
        {activeTab === 'newsletter' && (
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-extrabold tracking-tight uppercase mb-8">
              Newsletter Subscribers
            </h1>

            <div className="rounded-2xl border border-corematrix-border bg-corematrix-card p-6 shadow-xl">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-corematrix-border">
                <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-xl font-bold uppercase tracking-wider flex items-center gap-2">
                  <i className="fas fa-envelope text-teal-400" />
                  All Subscriptions ({newsletters.length})
                </h2>
              </div>

              {newsletters.length === 0 ? (
                <p className="py-12 text-center text-corematrix-textMuted text-sm">
                  No newsletter subscriptions yet. Subscribers will appear here when users sign up on the blog page.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-corematrix-border text-xs uppercase tracking-wider text-corematrix-textMuted">
                        <th className="py-3 px-4 font-semibold">#</th>
                        <th className="py-3 px-4 font-semibold">Email</th>
                        <th className="py-3 px-4 font-semibold">Status</th>
                        <th className="py-3 px-4 font-semibold">Subscribed At</th>
                        <th className="py-3 px-4 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-corematrix-border">
                      {newsletters.map((nl: any, idx: number) => (
                        <tr key={nl.id} className="hover:bg-corematrix-card2/40 transition-colors">
                          <td className="py-3.5 px-4 text-corematrix-textMuted font-mono text-xs">{idx + 1}</td>
                          <td className="py-3.5 px-4 font-medium text-corematrix-textPrimary">{nl.email}</td>
                          <td className="py-3.5 px-4">
                            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${nl.status === 'Contacted'
                              ? 'bg-corematrix-green900/30 text-corematrix-green400 border border-corematrix-green700/30'
                              : 'bg-amber-950/30 text-amber-400 border border-amber-700/30'
                              }`}>
                              <span className={`h-1.5 w-1.5 rounded-full ${nl.status === 'Contacted' ? 'bg-corematrix-green400' : 'bg-amber-400'}`} />
                              {nl.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-corematrix-textSecondary text-xs">
                            {new Date(nl.subscribedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                            {' · '}
                            {new Date(nl.subscribedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={async () => {
                                  const newStatus = nl.status === 'Pending' ? 'Contacted' : 'Pending';
                                  try {
                                    const res = await fetch(`/api/newsletters/${nl.id}/status`, {
                                      method: 'PUT',
                                      headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: `Bearer ${token}`,
                                      },
                                      body: JSON.stringify({ status: newStatus }),
                                    });
                                    if (res.ok) fetchDashboardData();
                                  } catch (err) {
                                    console.error('Failed to update newsletter status:', err);
                                  }
                                }}
                                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${nl.status === 'Pending'
                                  ? 'bg-corematrix-green900/20 text-corematrix-green400 hover:bg-corematrix-green900/40 border border-corematrix-green700/20'
                                  : 'bg-amber-950/20 text-amber-400 hover:bg-amber-900/30 border border-amber-700/20'
                                  }`}
                                title={nl.status === 'Pending' ? 'Mark as Contacted' : 'Mark as Pending'}
                              >
                                <i className={`fas ${nl.status === 'Pending' ? 'fa-check-circle' : 'fa-undo'} text-[10px]`} />
                                {nl.status === 'Pending' ? 'Mark Contacted' : 'Mark Pending'}
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  triggerConfirm(
                                    'Delete Subscription',
                                    `Delete subscription for "${nl.email}"? This cannot be undone.`,
                                    async () => {
                                      try {
                                        const res = await fetch(`/api/newsletters/${nl.id}`, {
                                          method: 'DELETE',
                                          headers: { Authorization: `Bearer ${token}` },
                                        });
                                        if (res.ok) fetchDashboardData();
                                      } catch (err) {
                                        console.error('Failed to delete newsletter subscription:', err);
                                      }
                                    }
                                  );
                                }}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-red-950/20 border border-red-700/20 px-3 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-900/30 transition cursor-pointer"
                                title="Delete subscription"
                              >
                                <i className="fas fa-trash-alt text-[10px]" />
                                Delete
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
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-extrabold tracking-tight uppercase mb-8">
              System Settings
            </h1>

            <div className="max-w-xl rounded-2xl border border-corematrix-border bg-corematrix-card p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-corematrix-green500 to-transparent" />

              <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-xl font-bold uppercase tracking-wider flex items-center gap-2 mb-6 pb-4 border-b border-corematrix-border">
                <i className="fas fa-key text-corematrix-green400" />
                Change Access Password
              </h2>

              <form onSubmit={handlePasswordChange} className="space-y-5">
                <div>
                  <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">
                    Current Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none transition-all placeholder:text-corematrix-textDim focus:border-corematrix-green700 focus:shadow-[0_0_0_3px_rgba(22,163,74,0.1)]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">
                    New Access Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none transition-all placeholder:text-corematrix-textDim focus:border-corematrix-green700 focus:shadow-[0_0_0_3px_rgba(22,163,74,0.1)]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">
                    Confirm New Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none transition-all placeholder:text-corematrix-textDim focus:border-corematrix-green700 focus:shadow-[0_0_0_3px_rgba(22,163,74,0.1)]"
                  />
                </div>

                {settingsError && (
                  <p className="text-xs font-medium text-red-400 mt-2">
                    <i className="fas fa-exclamation-circle mr-1.5" />
                    {settingsError}
                  </p>
                )}

                {settingsSuccess && (
                  <p className="text-xs font-semibold text-corematrix-green400 mt-2">
                    <i className="fas fa-check-circle mr-1.5" />
                    {settingsSuccess}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={settingsLoading}
                  className="w-full rounded-xl bg-corematrix-green700 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-corematrix-green500 disabled:cursor-not-allowed disabled:opacity-50 mt-4 shadow-lg shadow-corematrix-green900/30 cursor-pointer"
                >
                  {settingsLoading ? 'Updating Password...' : 'Update Password'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === 'users' && userRole === 'admin' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-extrabold tracking-tight uppercase">
                  User Management
                </h1>
                <p className="text-sm text-corematrix-textMuted mt-1">Manage admin panel accounts and role-based permissions</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setUserForm({ id: '', username: '', password: '', role: 'editor' });
                  setUserFormError(null);
                  setUserFormSuccess(null);
                  setShowUserModal(true);
                }}
                className="rounded-lg bg-corematrix-green700 px-5 py-2.5 text-sm font-semibold hover:bg-corematrix-green500 transition cursor-pointer flex items-center gap-2"
              >
                <i className="fas fa-user-plus" />
                Register New User
              </button>
            </div>

            {/* Users Directory Table */}
            <div className="rounded-2xl border border-corematrix-border bg-corematrix-card p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-corematrix-border">
                <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-xl font-bold uppercase tracking-wider flex items-center gap-2">
                  <i className="fas fa-users-cog text-corematrix-green400" />
                  Active Members Directory ({users.length})
                </h2>
              </div>

              {users.length === 0 ? (
                <p className="py-12 text-center text-corematrix-textMuted text-sm">
                  No registered admin panel users found.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-corematrix-border text-xs uppercase tracking-wider text-corematrix-textMuted">
                        <th className="py-3 px-4 font-semibold w-12">#</th>
                        <th className="py-3 px-4 font-semibold">Username</th>
                        <th className="py-3 px-4 font-semibold w-40">Access Role</th>
                        <th className="py-3 px-4 font-semibold w-64">Created Date</th>
                        <th className="py-3 px-4 font-semibold text-right w-44">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-corematrix-border">
                      {users.map((usr: any, idx: number) => {
                        const isSelf = token ? JSON.parse(atob(token.split('.')[1])).id === usr.id : false;
                        return (
                          <tr key={usr.id} className="hover:bg-corematrix-card2/40 transition-colors">
                            <td className="py-3.5 px-4 text-corematrix-textMuted font-mono text-xs">{idx + 1}</td>
                            <td className="py-3.5 px-4 font-semibold text-corematrix-textPrimary flex items-center gap-2">
                              {usr.username}
                              {isSelf && (
                                <span className="bg-corematrix-green900/30 text-[10px] font-bold text-corematrix-green400 px-1.5 py-0.5 rounded border border-corematrix-green700/30">
                                  You
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-4">
                              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${usr.role === 'admin'
                                ? 'bg-red-950/40 text-red-400 border border-red-700/30'
                                : usr.role === 'editor'
                                  ? 'bg-blue-950/40 text-blue-400 border border-blue-700/30'
                                  : 'bg-amber-950/40 text-amber-400 border border-amber-700/30'
                                }`}>
                                <span className={`h-1.5 w-1.5 rounded-full ${usr.role === 'admin' ? 'bg-red-400' : usr.role === 'editor' ? 'bg-blue-400' : 'bg-amber-400'
                                  }`} />
                                {usr.role}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-corematrix-textSecondary text-xs">
                              {new Date(usr.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                              {' · '}
                              {new Date(usr.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="flex justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setUserForm({
                                      id: usr.id,
                                      username: usr.username,
                                      password: '',
                                      role: usr.role,
                                    });
                                    setUserFormError(null);
                                    setUserFormSuccess(null);
                                    setShowUserModal(true);
                                  }}
                                  className="inline-flex items-center gap-1.5 rounded-lg bg-corematrix-green900/20 border border-corematrix-green700/20 px-3 py-1.5 text-xs font-semibold text-corematrix-green400 hover:bg-corematrix-green900/40 transition cursor-pointer"
                                >
                                  <i className="fas fa-edit" />
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  disabled={isSelf}
                                  onClick={() => deleteUser(usr.id)}
                                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${isSelf
                                    ? 'border-gray-500/10 text-gray-500 cursor-not-allowed opacity-40'
                                    : 'bg-red-950/20 border-red-700/20 text-red-400 hover:bg-red-900/30'
                                    }`}
                                  title={isSelf ? 'Cannot delete your own account' : 'Delete user'}
                                >
                                  <i className="fas fa-trash-alt" />
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Custom User Dialog Modal */}
            {showUserModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                <div className="relative w-full max-w-md rounded-2xl border border-corematrix-border bg-corematrix-card p-8 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-corematrix-green500 to-transparent" />

                  <div className="flex justify-between items-center mb-6">
                    <h3 style={{ fontFamily: 'var(--font-display)' }} className="text-xl font-bold uppercase tracking-wider">
                      {userForm.id ? 'Edit System Account' : 'Register New Member'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowUserModal(false)}
                      className="p-1 text-corematrix-textMuted hover:text-corematrix-textPrimary transition cursor-pointer"
                    >
                      <i className="fas fa-times text-lg" />
                    </button>
                  </div>

                  <form onSubmit={handleUserSubmit} className="space-y-4">
                    <div>
                      <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">
                        Username (Email) *
                      </label>
                      <input
                        type="text"
                        required
                        value={userForm.username}
                        onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
                        placeholder="user@corematrix.co"
                        className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">
                        Account Role *
                      </label>
                      <select
                        value={userForm.role}
                        onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                        className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700"
                      >
                        <option value="admin">Administrator (Full Access)</option>
                        <option value="editor">Editor (Exclude Users)</option>
                        <option value="marketing">Marketing (Exclude Users)</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">
                        Access Password {userForm.id && '(Leave blank to keep current)'}
                      </label>
                      <input
                        type="password"
                        required={!userForm.id}
                        value={userForm.password}
                        onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                        placeholder={userForm.id ? '••••••••' : 'Password (min 6 characters)'}
                        className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700"
                      />
                    </div>

                    {userFormError && (
                      <p className="text-xs font-medium text-red-400 mt-2">
                        <i className="fas fa-exclamation-circle mr-1.5" />
                        {userFormError}
                      </p>
                    )}

                    {userFormSuccess && (
                      <p className="text-xs font-semibold text-corematrix-green400 mt-2">
                        <i className="fas fa-check-circle mr-1.5" />
                        {userFormSuccess}
                      </p>
                    )}

                    <div className="flex gap-3 justify-end border-t border-corematrix-border pt-4 mt-6">
                      <button
                        type="button"
                        onClick={() => setShowUserModal(false)}
                        className="px-4 py-2 text-sm font-semibold rounded-lg bg-corematrix-card2 border border-corematrix-border hover:bg-corematrix-card transition cursor-pointer text-corematrix-textMuted"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={userFormLoading}
                        className="px-5 py-2 text-sm font-semibold rounded-lg bg-corematrix-green700 hover:bg-corematrix-green500 transition cursor-pointer text-white disabled:opacity-50"
                      >
                        {userFormLoading ? 'Saving...' : userForm.id ? 'Save Changes' : 'Create User'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* PORTFOLIO TAB */}
        {activeTab === 'portfolio' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-extrabold tracking-tight uppercase">
                Portfolio Manager
              </h1>
              <a href="/portfolio" target="_blank" rel="noreferrer" className="text-xs text-corematrix-green400 hover:text-corematrix-green300 font-semibold flex items-center gap-1.5">
                <i className="fas fa-external-link-alt" /> View Live Portfolio
              </a>
            </div>

            {portfolioLoading ? (
              <div className="flex items-center justify-center h-48">
                <i className="fas fa-spinner animate-spin text-corematrix-green400 text-2xl" />
                <span className="ml-3 text-corematrix-textMuted text-sm">Loading portfolio data...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">

                {/* Left: Profile Editor */}
                <div className="xl:col-span-2">
                  <div className="rounded-2xl border border-corematrix-border bg-corematrix-card p-6 shadow-xl">
                    <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-lg font-bold uppercase tracking-wider mb-6 pb-4 border-b border-corematrix-border flex items-center gap-2">
                      <i className="fas fa-id-card text-corematrix-green400" /> Profile Settings
                    </h2>
                    <form onSubmit={handlePortfolioProfileSave} className="space-y-4">

                      {/* Logo Preview + Upload */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-20 h-20 rounded-2xl bg-corematrix-bg2 border border-corematrix-border flex items-center justify-center overflow-hidden shrink-0">
                          {portfolioProfileLogoFile ? (
                            <img src={URL.createObjectURL(portfolioProfileLogoFile)} alt="Logo preview" className="w-full h-full object-contain p-2" />
                          ) : portfolioProfile?.logo ? (
                            <img src={getPortfolioMediaUrl(portfolioProfile.logo)} alt="Logo" className="w-full h-full object-contain p-2" />
                          ) : (
                            <i className="fas fa-building text-2xl text-corematrix-textDim" />
                          )}
                        </div>
                        <div className="flex-1">
                          <label className="mb-1.5 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">Company Logo</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setPortfolioProfileLogoFile(e.target.files?.[0] || null)}
                            className="w-full text-xs text-corematrix-textMuted file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-corematrix-green900/30 file:text-corematrix-green400 file:text-xs file:font-semibold hover:file:bg-corematrix-green900/50 cursor-pointer"
                          />
                          <p className="text-[10px] text-corematrix-textDim mt-1">PNG, SVG, JPG recommended</p>
                        </div>
                      </div>

                      {[
                        { key: 'companyName', label: 'Company Name *', placeholder: 'Corematrix', required: true },
                        { key: 'title', label: 'Tagline / Title', placeholder: 'AI & Software Development Co.' },
                      ].map(({ key, label, placeholder, required }) => (
                        <div key={key}>
                          <label className="mb-1.5 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">{label}</label>
                          <input
                            type="text"
                            required={!!required}
                            value={(portfolioProfileForm as any)[key]}
                            onChange={(e) => setPortfolioProfileForm({ ...portfolioProfileForm, [key]: e.target.value })}
                            placeholder={placeholder}
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700 transition-all"
                          />
                        </div>
                      ))}

                      <div className="pt-2">
                        <p className="text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider mb-3">Social Links</p>
                        <div className="space-y-3">
                          {[
                            { key: 'instagram', icon: 'fab fa-instagram', placeholder: 'https://instagram.com/...' },
                            { key: 'facebook', icon: 'fab fa-facebook-f', placeholder: 'https://facebook.com/...' },
                            { key: 'twitter', icon: 'fab fa-x-twitter', placeholder: 'https://x.com/...' },
                            { key: 'linkedin', icon: 'fab fa-linkedin-in', placeholder: 'https://linkedin.com/in/...' },
                            { key: 'email', icon: 'fas fa-envelope', placeholder: 'contact@corematrix.co' },
                            { key: 'phone', icon: 'fas fa-phone', placeholder: '+1 234 567 8900' },
                          ].map(({ key, icon, placeholder }) => (
                            <div key={key} className="flex items-center gap-2">
                              <div className="w-9 h-9 rounded-xl bg-corematrix-bg2 border border-corematrix-border flex items-center justify-center shrink-0">
                                <i className={`${icon} text-corematrix-green400 text-sm`} />
                              </div>
                              <input
                                type={key === 'email' ? 'email' : 'text'}
                                value={(portfolioProfileForm as any)[key]}
                                onChange={(e) => setPortfolioProfileForm({ ...portfolioProfileForm, [key]: e.target.value })}
                                placeholder={placeholder}
                                className="flex-1 rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-3 py-2.5 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700 transition-all"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2">
                        <p className="text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider mb-3">Bottom CTA Button (Optional)</p>
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={portfolioProfileForm.bottomCtaText}
                            onChange={(e) => setPortfolioProfileForm({ ...portfolioProfileForm, bottomCtaText: e.target.value })}
                            placeholder="Button Label (e.g. Contact Us)"
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700 transition-all"
                          />
                          <input
                            type="text"
                            value={portfolioProfileForm.bottomCtaLink}
                            onChange={(e) => setPortfolioProfileForm({ ...portfolioProfileForm, bottomCtaLink: e.target.value })}
                            placeholder="Button URL (e.g. /contact)"
                            className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700 transition-all"
                          />
                        </div>
                      </div>

                      {portfolioProfileError && (
                        <p className="text-xs text-red-400 flex items-center gap-1.5"><i className="fas fa-exclamation-circle" /> {portfolioProfileError}</p>
                      )}
                      {portfolioProfileSuccess && (
                        <p className="text-xs text-corematrix-green400 flex items-center gap-1.5"><i className="fas fa-check-circle" /> {portfolioProfileSuccess}</p>
                      )}

                      <button
                        type="submit"
                        disabled={portfolioProfileSaving}
                        className="w-full rounded-xl bg-corematrix-green700 hover:bg-corematrix-green500 px-6 py-3 text-sm font-bold text-white transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-2"
                      >
                        {portfolioProfileSaving && <i className="fas fa-spinner animate-spin" />}
                        {portfolioProfileSaving ? 'Saving...' : 'Save Profile'}
                      </button>
                    </form>
                  </div>
                </div>

                {/* Right: Portfolio Items Manager */}
                <div className="xl:col-span-3">
                  <div className="rounded-2xl border border-corematrix-border bg-corematrix-card p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-corematrix-border">
                      <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-lg font-bold uppercase tracking-wider flex items-center gap-2">
                        <i className="fas fa-link text-corematrix-green400" /> Link Items ({portfolioItems.length})
                      </h2>
                      <button
                        type="button"
                        onClick={openNewPortfolioItem}
                        className="flex items-center gap-2 rounded-xl bg-corematrix-green700 hover:bg-corematrix-green500 px-4 py-2 text-xs font-bold text-white transition cursor-pointer"
                      >
                        <i className="fas fa-plus" /> Add New Item
                      </button>
                    </div>

                    {portfolioItems.length === 0 ? (
                      <div className="py-16 text-center">
                        <i className="fas fa-layer-group text-4xl text-corematrix-textDim mb-4 block" />
                        <p className="text-corematrix-textMuted text-sm">No portfolio items yet. Add your first link!</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {[...portfolioItems].sort((a, b) => a.order - b.order).map((item) => (
                          <div key={item.id} className="flex items-center gap-3 p-4 rounded-2xl border border-corematrix-border bg-corematrix-bg2 hover:border-corematrix-green700/30 transition-all group">
                            {/* Thumbnail */}
                            <div className="w-12 h-12 rounded-xl bg-corematrix-card border border-corematrix-border flex items-center justify-center overflow-hidden shrink-0">
                              {item.image ? (
                                <img src={getPortfolioMediaUrl(item.image)} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <i className="fas fa-link text-corematrix-green400 text-sm" />
                              )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-corematrix-textPrimary truncate">{item.title}</p>
                              <p className="text-[10px] text-corematrix-textMuted truncate mt-0.5">
                                {item.link || (item.attachment ? 'Has attachment' : 'No link set')}
                              </p>
                            </div>

                            {/* Status badge */}
                            <span className={`shrink-0 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${item.isActive ? 'bg-corematrix-green900/30 text-corematrix-green400 border border-corematrix-green700/30' : 'bg-corematrix-bg1 text-corematrix-textDim border border-corematrix-border'}`}>
                              {item.isActive ? 'Active' : 'Hidden'}
                            </span>

                            {/* Order badge */}
                            <span className="shrink-0 text-[10px] text-corematrix-textDim font-bold w-6 text-center">#{item.order}</span>

                            {/* Actions */}
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={() => openEditPortfolioItem(item)}
                                className="w-8 h-8 rounded-lg bg-corematrix-card border border-corematrix-border flex items-center justify-center text-corematrix-textMuted hover:text-corematrix-green400 hover:border-corematrix-green700/40 transition cursor-pointer"
                              >
                                <i className="fas fa-edit text-xs" />
                              </button>
                              <button
                                type="button"
                                onClick={() => deletePortfolioItem(item.id)}
                                className="w-8 h-8 rounded-lg bg-corematrix-card border border-corematrix-border flex items-center justify-center text-corematrix-textMuted hover:text-red-400 hover:border-red-500/30 transition cursor-pointer"
                              >
                                <i className="fas fa-trash text-xs" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Portfolio Item Modal */}
            {showPortfolioItemModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                <div className="bg-corematrix-card rounded-3xl border border-corematrix-border w-full max-w-lg shadow-2xl overflow-hidden">
                  <div className="px-6 py-5 border-b border-corematrix-border flex justify-between items-center bg-corematrix-bg2/50">
                    <h3 style={{ fontFamily: 'var(--font-display)' }} className="text-sm font-bold uppercase tracking-wider">
                      {portfolioItemForm.id ? 'Edit Link Item' : 'Add New Link Item'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowPortfolioItemModal(false)}
                      className="w-8 h-8 rounded-full bg-corematrix-bg1 border border-corematrix-border flex items-center justify-center text-corematrix-textMuted hover:text-corematrix-textPrimary transition cursor-pointer"
                    >
                      <i className="fas fa-times" />
                    </button>
                  </div>

                  <form onSubmit={handlePortfolioItemSave} className="p-6 space-y-4">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">Title *</label>
                      <input
                        type="text"
                        required
                        value={portfolioItemForm.title}
                        onChange={(e) => setPortfolioItemForm({ ...portfolioItemForm, title: e.target.value })}
                        placeholder="e.g. Our Website, Download Brochure"
                        className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700 transition-all"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">Link URL</label>
                      <input
                        type="text"
                        value={portfolioItemForm.link}
                        onChange={(e) => setPortfolioItemForm({ ...portfolioItemForm, link: e.target.value })}
                        placeholder="https://..."
                        className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">Thumbnail Image</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setPortfolioItemImageFile(e.target.files?.[0] || null)}
                          className="w-full text-xs text-corematrix-textMuted file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-corematrix-green900/30 file:text-corematrix-green400 file:text-xs file:font-semibold hover:file:bg-corematrix-green900/50 cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">Attachment File</label>
                        <input
                          type="file"
                          onChange={(e) => setPortfolioItemAttachFile(e.target.files?.[0] || null)}
                          className="w-full text-xs text-corematrix-textMuted file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-corematrix-green900/30 file:text-corematrix-green400 file:text-xs file:font-semibold hover:file:bg-corematrix-green900/50 cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">Display Order</label>
                        <input
                          type="number"
                          min={0}
                          value={portfolioItemForm.order}
                          onChange={(e) => setPortfolioItemForm({ ...portfolioItemForm, order: parseInt(e.target.value) || 0 })}
                          className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700 transition-all"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">Visibility</label>
                        <select
                          value={portfolioItemForm.isActive ? 'true' : 'false'}
                          onChange={(e) => setPortfolioItemForm({ ...portfolioItemForm, isActive: e.target.value === 'true' })}
                          className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none focus:border-corematrix-green700 transition-all"
                        >
                          <option value="true">Active (Visible)</option>
                          <option value="false">Hidden</option>
                        </select>
                      </div>
                    </div>

                    {portfolioItemError && (
                      <p className="text-xs text-red-400 flex items-center gap-1.5"><i className="fas fa-exclamation-circle" /> {portfolioItemError}</p>
                    )}
                    {portfolioItemSuccess && (
                      <p className="text-xs text-corematrix-green400 flex items-center gap-1.5"><i className="fas fa-check-circle" /> {portfolioItemSuccess}</p>
                    )}

                    <div className="flex gap-3 pt-2 border-t border-corematrix-border">
                      <button
                        type="button"
                        onClick={() => setShowPortfolioItemModal(false)}
                        className="flex-1 py-3 rounded-xl border border-corematrix-border bg-corematrix-bg1 hover:bg-corematrix-bg2 text-corematrix-textPrimary text-sm font-semibold transition cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={portfolioItemSaving}
                        className="flex-1 py-3 rounded-xl bg-corematrix-green700 hover:bg-corematrix-green500 text-white text-sm font-bold transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {portfolioItemSaving && <i className="fas fa-spinner animate-spin" />}
                        {portfolioItemSaving ? 'Saving...' : portfolioItemForm.id ? 'Save Changes' : 'Create Item'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Custom Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmState.isOpen}
        title={confirmState.title}
        message={confirmState.message}
        confirmText={confirmState.confirmText}
        cancelText={confirmState.cancelText}
        isDanger={confirmState.isDanger}
        onConfirm={confirmState.onConfirm}
        onCancel={() => setConfirmState((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
