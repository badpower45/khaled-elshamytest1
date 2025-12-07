import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { SiteData } from '../types';
import khaledImage from 'figma:asset/6f9a3b49d9d5a7cf854a44a26780766d0a9dba89.png';

const initialData: SiteData = {
  personalInfo: {
    nameAr: 'خالد الشامي',
    nameEn: 'Khaled El Shamy',
    titleAr: 'خبير Personal Branding ومصور سينمائي',
    titleEn: 'Personal Branding Expert & Cinematographer',
    specialization: 'Video Creator | Personal Branding Expert',
    slogan: '🎥 Video Creator | Personal Branding Expert 🎬 Elevate your brand with scroll-stopping visuals',
    instagramFollowers: '1,126',
    posts: '73',
    visionAr: 'أؤمن بأن كل شخص لديه قصة فريدة تستحق أن تُحكى. من خلال عدستي وخبرتي في مجال Personal Branding، أحول الأفكار والأحلام إلى محتوى مرئي قوي يترك أثراً إيجابياً. رؤيتي هي مساعدة كل عميل في بناء هوية مرئية قوية تعكس شخصيته الحقيقية وتحقق أهدافه المهنية.',
    visionEn: 'I believe every person has a unique story worth telling. Through my lens and expertise in Personal Branding, I transform ideas and dreams into powerful visual content that leaves a positive impact. My vision is to help every client build a strong visual identity that reflects their true personality and achieves their professional goals.',
    closingStatementAr: 'بناء الأحلام، خلق الذكريات، صناعة الفن المرئي',
    closingStatementEn: 'Building dreams, creating memories, crafting visual art',
    heroImage: khaledImage,
    heroVideoUrl: ''
  },
  services: [
    {
      id: '1',
      titleAr: 'فيديوهات الهوية الشخصية',
      titleEn: 'Personal Branding Videos',
      descriptionAr: 'بناء هوية مرئية قوية تعكس شخصيتك المهنية وتميزك في السوق الرقمي',
      descriptionEn: 'Building a strong visual identity that reflects your professional personality and distinguishes you in the digital market',
      features: ['Individual Brand Videos', 'Social Media Content', 'Professional Presentations']
    },
    {
      id: '2',
      titleAr: 'التصوير السينمائي التجاري',
      titleEn: 'Commercial Cinematography',
      descriptionAr: 'إنتاج محتوى إعلاني احترافي يحكي قصة علامتك التجارية بأسلوب سينمائي مميز',
      descriptionEn: 'Professional commercial content production that tells your brand story with distinctive cinematic style',
      features: ['TV Commercials', 'Brand Campaigns', 'Product Showcases']
    },
    {
      id: '3',
      titleAr: 'تغطية الفعاليات',
      titleEn: 'Event Coverage',
      descriptionAr: 'توثيق لحظاتك المهمة بجودة عالية واحترافية تامة',
      descriptionEn: 'Documenting your important moments with high quality and complete professionalism',
      features: ['Corporate Events', 'Conferences & Seminars', 'Special Occasions']
    },
    {
      id: '4',
      titleAr: 'إنتاج المحتوى الرقمي',
      titleEn: 'Content Creation',
      descriptionAr: 'محتوى إبداعي مخصص لمنصات التواصل الاجتماعي يزيد من تفاعل جمهورك',
      descriptionEn: 'Creative content tailored for social media platforms that increases your audience engagement',
      features: ['Instagram Reels', 'YouTube Content', 'TikTok Videos']
    },
    {
      id: '5',
      titleAr: 'التدريب وورش العمل',
      titleEn: 'Training & Workshops',
      descriptionAr: 'تعلم أسرار التصوير وبناء الهوية الشخصية من خلال ورش عملية متخصصة',
      descriptionEn: 'Learn the secrets of photography and personal branding through specialized practical workshops',
      features: ['Cinematography Workshops', 'Personal Branding Sessions', 'Content Strategy Training']
    }
  ],
  portfolio: [
    {
      id: '1',
      titleEn: 'Before - After',
      titleAr: 'Before - After',
      descriptionEn: 'Professional transformation showcase',
      descriptionAr: 'عرض التحول الاحترافي',
      image: '',
      videoUrl: 'https://player.vimeo.com/video/1126504175?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479'
    },
    {
      id: '2',
      titleEn: 'Get',
      titleAr: 'Get',
      descriptionEn: 'Creative content creation',
      descriptionAr: 'إنتاج محتوى إبداعي',
      image: '',
      videoUrl: 'https://player.vimeo.com/video/1126504193?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479'
    },
    {
      id: '3',
      titleEn: 'Listen to Successful People',
      titleAr: 'إسمع للناجحين ، تنجح',
      descriptionEn: 'Motivational content',
      descriptionAr: 'محتوى تحفيزي',
      image: '',
      videoUrl: 'https://player.vimeo.com/video/1126504203?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479'
    },
    {
      id: '4',
      titleEn: 'SFX Sound Effects',
      titleAr: 'اكتب SFX وهبعتهملك فى فايل',
      descriptionEn: 'Video editing tips',
      descriptionAr: 'نصائح مونتاج الفيديو',
      image: '',
      videoUrl: 'https://player.vimeo.com/video/1126504212?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479'
    },
    {
      id: '5',
      titleEn: 'iPhone Camera Settings',
      titleAr: 'مهم جدا تعمل الاعدادات دى لكاميرا الايفون',
      descriptionEn: 'Essential iPhone camera tips',
      descriptionAr: 'نصائح أساسية لكاميرا الايفون',
      image: '',
      videoUrl: 'https://player.vimeo.com/video/1126504229?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479'
    }
  ],
  testimonials: [
    {
      id: '1',
      text: 'خالد لا يصور فيديوهات عادية، بل يخلق قصصاً مرئية تحكي من نحن حقاً. قدرته على فهم رؤيتنا وتحويلها إلى محتوى مؤثر أمر استثنائي حقاً.',
      name: 'سارة أحمد',
      position: 'مؤسسة شركة تك إنوفيشن',
      company: 'Tech Innovation'
    },
    {
      id: '2',
      text: 'العمل مع خالد رفع من مستوى هويتنا البصرية تماماً. احترافيته وإبداعه أنتج محتوى فاق كل توقعاتنا.',
      name: 'أحمد محمود',
      position: 'مدير إبداعي',
      company: 'Digital Masters Agency'
    },
    {
      id: '3',
      text: 'خالد الشامي فنان حقيقي. فيديوهاته ليست مجرد محتوى، بل رسائل قوية تصل للقلب قبل العقل. شراكتنا معه حققت نتائج مذهلة.',
      name: 'نورا حسن',
      position: 'مديرة التسويق',
      company: 'Inspire Brands'
    }
  ],
  awards: [
    {
      id: '1',
      year: '2024',
      titleEn: 'Best Creative Content',
      titleAr: 'أفضل محتوى إبداعي',
      category: 'Personal Branding',
      organization: 'مهرجان المحتوى الرقمي المصري'
    },
    {
      id: '2',
      year: '2023',
      titleEn: 'Excellence in Cinematography',
      titleAr: 'جائزة التميز في التصوير',
      category: 'Commercial Video',
      organization: 'بورسعيد للإبداع المرئي'
    },
    {
      id: '3',
      year: '2023',
      titleEn: 'Best Personal Branding Trainer',
      titleAr: 'أفضل مدرب في مجال Personal Branding',
      category: 'Training',
      organization: 'معهد التطوير المهني'
    }
  ],
  contactInfo: {
    email: 'khaledelshamy360@gmail.com',
    phone: '+20 120 xxx xxxx',
    location: 'Port Said, Egypt',
    studioAddress: 'استوديو الشامي للإنتاج المرئي، بورسعيد',
    workingHours: {
      weekdays: 'السبت - الخميس: 9:00 ص - 7:00 م',
      friday: 'الجمعة: بموعد مسبق',
      emergency: 'متاح 24/7'
    }
  },
  socialMedia: {
    instagram: 'https://instagram.com/khaledelshamy.360',
    facebook: 'https://facebook.com/KhaledElShamy360',
    tiktok: 'https://tiktok.com/@khaledelshamy360'
  }
};

interface SiteDataContextType {
  data: SiteData;
  updatePersonalInfo: (info: Partial<SiteData['personalInfo']>) => void;
  updateService: (id: string, service: Partial<SiteData['services'][0]>) => void;
  updatePortfolio: (id: string, portfolio: Partial<SiteData['portfolio'][0]>) => void;
  addPortfolio: () => void;
  removePortfolio: (id: string) => void;
  updateTestimonial: (id: string, testimonial: Partial<SiteData['testimonials'][0]>) => void;
  addTestimonial: () => void;
  removeTestimonial: (id: string) => void;
  updateAward: (id: string, award: Partial<SiteData['awards'][0]>) => void;
  addAward: () => void;
  removeAward: (id: string) => void;
  updateContactInfo: (info: Partial<SiteData['contactInfo']>) => void;
  updateSocialMedia: (social: Partial<SiteData['socialMedia']>) => void;
  setAllData: (d: SiteData) => void;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(() => {
    // Load from localStorage, preserve all data including manual images
    try {
      const raw = localStorage.getItem('siteData');
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<SiteData>;
        
        // Deep merge to ensure all required fields exist
        function shallowMerge(base: any, ov: any) {
          if (!ov) return base;
          const out: any = Array.isArray(base) ? ov : { ...base };
          Object.keys(ov).forEach(k => {
            const bv = base[k];
            const vv = ov[k];
            if (bv && typeof bv === 'object' && !Array.isArray(bv) && vv && typeof vv === 'object' && !Array.isArray(vv)) {
              out[k] = { ...bv, ...vv };
            } else {
              out[k] = vv;
            }
          });
          return out;
        }
        const merged = shallowMerge(initialData, parsed) as SiteData;
        console.log('📦 Loaded data from localStorage, portfolio count:', merged.portfolio?.length || 0);
        return merged;
      }
    } catch (e) {
      // ignore parse errors
    }
    console.log('📦 Using initial data, portfolio count:', initialData.portfolio.length);
    return initialData;
  });

  // Persist to localStorage whenever data changes
  React.useEffect(() => {
    try {
      localStorage.setItem('siteData', JSON.stringify(data));
    } catch (e) {
      // ignore storage errors (quota, private mode, etc.)
    }
  }, [data]);

  // Sync with Supabase: fetch on mount only (save is manual via admin panel)

  // small deep-merge to ensure remote partial data doesn't remove required fields
  function deepMerge<T>(base: T, override: Partial<T>): T {
    if (override === null || override === undefined) return base;
    if (Array.isArray(base) || Array.isArray(override)) {
      // prefer override arrays when provided
      return ((override as any) ?? base) as any;
    }
    if (typeof base !== 'object' || typeof override !== 'object') {
      return ((override as any) ?? base) as any;
    }
    const out: any = Array.isArray(base) ? [] : { ...base };
    const keys = new Set([...Object.keys(base as any), ...Object.keys(override as any)]);
    keys.forEach((k) => {
      const bv = (base as any)[k];
      const ov = (override as any)[k];
      if (ov === undefined) {
        out[k] = bv;
      } else if (bv === undefined) {
        out[k] = ov;
      } else if (typeof bv === 'object' && bv !== null && typeof ov === 'object' && ov !== null && !Array.isArray(bv)) {
        out[k] = deepMerge(bv, ov);
      } else {
        out[k] = ov;
      }
    });
    return out as T;
  }

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data: rows, error } = await supabase.from('site').select('data').eq('id', 1).limit(1);
        if (error) {
          console.warn('Supabase fetch error (site table?):', error.message);
          return;
        }
        if (rows && rows.length && mounted) {
          const remote = rows[0].data as Partial<SiteData> | null;
          if (remote) {
            // Always use remote data, preserving manual images
            console.log('📦 Loaded data from Supabase');
            setData(deepMerge(initialData, remote) as SiteData);
          }
        }
      } catch (err) {
        console.warn('Supabase fetch failed:', err);
      }
    })();

    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-save disabled - user must click "Save to Cloud" button in admin panel
  // This prevents accidental overwrites of existing data

  const updatePersonalInfo = (info: Partial<SiteData['personalInfo']>) => {
    setData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info }
    }));
  };

  const updateService = (id: string, service: Partial<SiteData['services'][0]>) => {
    setData(prev => ({
      ...prev,
      services: prev.services.map(s => s.id === id ? { ...s, ...service } : s)
    }));
  };

  const updatePortfolio = async (id: string, portfolio: Partial<SiteData['portfolio'][0]>) => {
    setData(prev => ({
      ...prev,
      portfolio: prev.portfolio.map(p => p.id === id ? { ...p, ...portfolio } : p)
    }));
  };

  const updateTestimonial = (id: string, testimonial: Partial<SiteData['testimonials'][0]>) => {
    setData(prev => ({
      ...prev,
      testimonials: prev.testimonials.map(t => t.id === id ? { ...t, ...testimonial } : t)
    }));
  };

  const updateAward = (id: string, award: Partial<SiteData['awards'][0]>) => {
    setData(prev => ({
      ...prev,
      awards: prev.awards.map(a => a.id === id ? { ...a, ...award } : a)
    }));
  };

  const updateContactInfo = (info: Partial<SiteData['contactInfo']>) => {
    setData(prev => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, ...info }
    }));
  };

  const updateSocialMedia = (social: Partial<SiteData['socialMedia']>) => {
    setData(prev => ({
      ...prev,
      socialMedia: { ...prev.socialMedia, ...social }
    }));
  };

  const addPortfolio = () => {
    setData(prev => ({
      ...prev,
      portfolio: [
        ...prev.portfolio,
        {
          id: String(Date.now()),
          titleEn: 'New Video',
          titleAr: 'فيديو جديد',
          descriptionEn: 'Description',
          descriptionAr: 'الوصف',
          image: '',
          videoUrl: ''
        }
      ]
    }));
  };

  const removePortfolio = (id: string) => {
    setData(prev => ({
      ...prev,
      portfolio: prev.portfolio.filter(p => p.id !== id)
    }));
  };

  const addTestimonial = () => {
    setData(prev => ({
      ...prev,
      testimonials: [
        ...prev.testimonials,
        {
          id: String(Date.now()),
          text: 'نص الشهادة',
          name: 'اسم العميل',
          position: 'المنصب',
          company: 'الشركة'
        }
      ]
    }));
  };

  const removeTestimonial = (id: string) => {
    setData(prev => ({
      ...prev,
      testimonials: prev.testimonials.filter(t => t.id !== id)
    }));
  };

  const addAward = () => {
    setData(prev => ({
      ...prev,
      awards: [
        ...prev.awards,
        {
          id: String(Date.now()),
          year: new Date().getFullYear().toString(),
          titleEn: 'New Award',
          titleAr: 'جائزة جديدة',
          category: 'Category',
          organization: 'المؤسسة'
        }
      ]
    }));
  };

  const removeAward = (id: string) => {
    setData(prev => ({
      ...prev,
      awards: prev.awards.filter(a => a.id !== id)
    }));
  };

  const setAllData = (d: SiteData) => {
    setData(deepMerge(initialData, d));
  };

  return (
    <SiteDataContext.Provider
      value={{
        data,
        updatePersonalInfo,
        updateService,
        updatePortfolio,
        addPortfolio,
        removePortfolio,
        updateTestimonial,
        addTestimonial,
        removeTestimonial,
        updateAward,
        addAward,
        removeAward,
        updateContactInfo,
        updateSocialMedia,
        setAllData
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within SiteDataProvider');
  }
  return context;
}