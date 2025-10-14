import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Menu, X, Camera, Languages } from 'lucide-react';
import { useSiteData } from '../../context/SiteDataContext';
import { useLanguage } from '../../context/LanguageContext';

export function Header() {
  const { data } = useSiteData();
  const { personalInfo } = data;
  const { language, toggleLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { nameAr: 'الرئيسية', nameEn: 'Home', href: '#home' },
    { nameAr: 'الخدمات', nameEn: 'Services', href: '#services' },
    { nameAr: 'الأعمال', nameEn: 'Portfolio', href: '#portfolio' },
    { nameAr: 'الآراء', nameEn: 'Testimonials', href: '#testimonials' },
    { nameAr: 'تواصل', nameEn: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0A0A0A]/95 backdrop-blur-lg border-b border-[#FFC107]/20 shadow-lg shadow-[#FFC107]/5' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <motion.a
            href="#home"
            className="flex items-center gap-2 sm:gap-3 group flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#FFC107] to-[#FFD54F] rounded-xl flex items-center justify-center flex-shrink-0"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl text-[#FFC107] font-['Playfair_Display'] italic leading-tight">
                {language === 'ar' ? personalInfo.nameAr : personalInfo.nameEn}
              </h1>
              <p className="text-xs text-gray-400 font-['Inter']">
                {personalInfo.specialization.split('|')[0].trim()}
              </p>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.nameEn}
                href={item.href}
                className="text-gray-300 hover:text-[#FFC107] transition-colors font-['Inter'] relative group whitespace-nowrap"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector(item.href);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                  setIsMobileMenuOpen(false);
                }}
              >
                {language === 'ar' ? item.nameAr : item.nameEn}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFC107] origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
            
            {/* Language Toggle */}
            <motion.button
              onClick={toggleLanguage}
              className="flex items-center gap-2 bg-[#FFC107]/10 border border-[#FFC107]/30 px-3 py-2 rounded-lg hover:bg-[#FFC107]/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Languages className="w-4 h-4 text-[#FFC107]" />
              <span className="text-[#FFC107] font-['Inter'] text-sm">
                {language === 'ar' ? 'EN' : 'عربي'}
              </span>
            </motion.button>

            <motion.a
              href="/admin"
              className="bg-[#FFC107] text-black px-4 xl:px-6 py-2 rounded-lg font-['Inter'] hover:bg-[#FFD54F] transition-colors whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Admin
            </motion.a>
          </nav>

          {/* Mobile Menu Buttons */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Language Toggle */}
            <motion.button
              onClick={toggleLanguage}
              className="w-10 h-10 flex items-center justify-center bg-[#FFC107]/10 border border-[#FFC107]/30 rounded-lg"
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-[#FFC107] font-['Inter'] text-xs">
                {language === 'ar' ? 'EN' : 'ع'}
              </span>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              className="w-10 h-10 flex items-center justify-center bg-[#FFC107]/10 border border-[#FFC107]/30 rounded-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#FFC107]" />
              ) : (
                <Menu className="w-6 h-6 text-[#FFC107]" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.nav
            className="lg:hidden mt-4 py-4 border-t border-[#FFC107]/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.nameEn}
                  href={item.href}
                  className="text-gray-300 hover:text-[#FFC107] transition-colors font-['Inter'] py-2"
                  style={{ textAlign: language === 'ar' ? 'right' : 'left' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector(item.href);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {language === 'ar' ? item.nameAr : item.nameEn}
                </motion.a>
              ))}
              
              <motion.a
                href="/admin"
                className="bg-[#FFC107] text-black px-6 py-3 rounded-lg font-['Inter'] text-center hover:bg-[#FFD54F] transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
              >
                Admin Panel
              </motion.a>
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
}