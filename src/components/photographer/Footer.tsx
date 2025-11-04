import { motion } from 'motion/react';
import { Camera, Heart, Instagram, Facebook, Video } from 'lucide-react';
import { useSiteData } from '../../context/SiteDataContext';
import { useLanguage } from '../../context/LanguageContext';

export function Footer() {
  const { data } = useSiteData();
  const { personalInfo, socialMedia, contactInfo } = data;
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { nameAr: 'الرئيسية', nameEn: 'Home', href: '#home' },
    { nameAr: 'الخدمات', nameEn: 'Services', href: '#services' },
    { nameAr: 'الأعمال', nameEn: 'Portfolio', href: '#portfolio' },
    { nameAr: 'الآراء', nameEn: 'Testimonials', href: '#testimonials' },
    { nameAr: 'تواصل', nameEn: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-gradient-to-t from-black to-[#0A0A0A] border-t border-[#FFC107]/20 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 193, 7, 0.3) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12 mb-6 sm:mb-8 md:mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4" style={{ justifyContent: language === 'ar' ? 'flex-end' : 'flex-start' }}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#FFC107] to-[#FFD54F] rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                <Camera className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-black" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg md:text-xl text-[#FFC107] font-['Playfair_Display'] italic">
                  {language === 'ar' ? personalInfo.nameAr : personalInfo.nameEn}
                </h3>
              </div>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3 md:mb-4 font-['Inter'] leading-relaxed" style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
              {personalInfo.specialization}
            </p>
            <p className="text-[#FFC107]/80 text-xs sm:text-sm italic font-['Inter']" style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
              {language === 'ar' ? personalInfo.closingStatementAr : personalInfo.closingStatementEn}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          >
            <h4 className="text-[#FFC107] mb-3 sm:mb-4 md:mb-6 font-['Playfair_Display'] text-sm sm:text-base md:text-lg" style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
              {language === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 md:space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.nameEn}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#FFC107] transition-colors font-['Inter'] text-xs sm:text-sm md:text-base block"
                    style={{ textAlign: language === 'ar' ? 'right' : 'left' }}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector(link.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {language === 'ar' ? link.nameAr : link.nameEn}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          >
            <h4 className="text-[#FFC107] mb-3 sm:mb-4 md:mb-6 font-['Playfair_Display'] text-sm sm:text-base md:text-lg" style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
              {language === 'ar' ? 'تواصل معنا' : 'Contact'}
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 md:space-y-3 font-['Inter']">
              <li>
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="text-gray-400 hover:text-[#FFC107] transition-colors block text-xs sm:text-sm md:text-base break-all"
                  style={{ textAlign: language === 'ar' ? 'right' : 'left' }}
                >
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <a 
                  href={`tel:${contactInfo.phone}`}
                  className="text-gray-400 hover:text-[#FFC107] transition-colors block text-xs sm:text-sm md:text-base"
                  style={{ textAlign: language === 'ar' ? 'right' : 'left' }}
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li className="text-gray-400 text-xs sm:text-sm md:text-base" style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
                {contactInfo.location}
              </li>
              <li className="text-gray-500 text-[10px] sm:text-xs pt-1 sm:pt-2" style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
                {contactInfo.studioAddress}
              </li>
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          >
            <h4 className="text-[#FFC107] mb-3 sm:mb-4 md:mb-6 font-['Playfair_Display'] text-sm sm:text-base md:text-lg" style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
              {language === 'ar' ? 'تابعنا' : 'Follow Us'}
            </h4>
            <div className="flex gap-2 sm:gap-3 flex-wrap" style={{ justifyContent: language === 'ar' ? 'flex-end' : 'flex-start' }}>
              <motion.a
                href={socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center border border-[#FFC107]/20 hover:border-[#FFC107] transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#FFC107]" />
              </motion.a>

              <motion.a
                href={socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center border border-[#FFC107]/20 hover:border-[#FFC107] transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#FFC107]" />
              </motion.a>

              <motion.a
                href={socialMedia.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center border border-[#FFC107]/20 hover:border-[#FFC107] transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#FFC107]" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-[#FFC107]/20 pt-4 sm:pt-6 md:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500 font-['Inter'] flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
            <span className="sr-only">Made by</span>
            <a
              href="https://addvalue.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FFC107] hover:underline"
            >
              addvalue.tech
            </a>
          </p>
          <p className="text-gray-500 font-['Inter'] text-xs sm:text-sm">
            © {currentYear} {language === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved'}
          </p>
        </motion.div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFC107] to-transparent" />
    </footer>
  );
}