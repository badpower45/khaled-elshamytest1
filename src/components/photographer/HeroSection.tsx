import { motion } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Camera, Aperture } from 'lucide-react';
import { useSiteData } from '../../context/SiteDataContext';
import { useLanguage } from '../../context/LanguageContext';
import heroImage from '@/assets/hero-image.jpg';
import bg1 from '@/assets/bg1.jpg';
import bg2 from '@/assets/bg2.jpg';
import bg3 from '@/assets/bg3.jpg';

export function HeroSection() {
  const { data } = useSiteData();
  const { personalInfo } = data;
  const { language } = useLanguage();

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0A0A0A] pt-16 sm:pt-20">
      {/* Dynamic background blur of photography work */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          backgroundImage: [
            `url(${bg1})`,
            `url(${bg2})`,
            `url(${bg3})`,
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(20px)',
        }}
      />
      
      {/* Subtle metallic texture overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFC107]/5 via-transparent to-[#FFC107]/10 opacity-60" />
      
      <div className="container mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-16 relative z-10 py-8 sm:py-12">
        {/* Hero Content */}
        <motion.div
          className="flex-1 text-center lg:text-left max-w-3xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          {/* Kinetic Typography - Name */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl text-[#FFC107] mb-3 sm:mb-4 leading-tight font-['Playfair_Display'] italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          >
            {language === 'ar' ? (
              <>
                <motion.span
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  style={{
                    textShadow: '0 0 30px rgba(255, 193, 7, 0.5)',
                  }}
                >
                  {personalInfo.nameAr.split(' ')[0]}
                </motion.span>
                <br />
                <motion.span
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  style={{
                    textShadow: '0 0 30px rgba(255, 193, 7, 0.5)',
                  }}
                >
                  {personalInfo.nameAr.split(' ')[1]}
                </motion.span>
              </>
            ) : (
              <>
                <motion.span
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  style={{
                    textShadow: '0 0 30px rgba(255, 193, 7, 0.5)',
                  }}
                >
                  {personalInfo.nameEn.split(' ').slice(0, 2).join(' ')}
                </motion.span>
                <br />
                <motion.span
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  style={{
                    textShadow: '0 0 30px rgba(255, 193, 7, 0.5)',
                  }}
                >
                  {personalInfo.nameEn.split(' ').slice(2).join(' ')}
                </motion.span>
              </>
            )}
          </motion.h1>
          
          {/* Specialty */}
          <motion.h2
            className="text-base sm:text-xl md:text-2xl lg:text-3xl text-white mb-4 sm:mb-6 font-['Inter'] px-2 sm:px-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          >
            {language === 'ar' ? personalInfo.titleAr : personalInfo.titleEn}
          </motion.h2>
          
          {/* Typewriter motto */}
          <motion.p
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed font-['Inter'] max-w-2xl mx-auto lg:mx-0 px-2 sm:px-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
          >
            {personalInfo.slogan}
          </motion.p>
          
          {/* Liquid effect CTA */}
          <motion.button
            className="relative bg-[#FFC107] text-black px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 rounded-lg text-sm sm:text-base md:text-lg font-['Inter'] overflow-hidden group"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const portfolioSection = document.querySelector('#portfolio');
              if (portfolioSection) {
                portfolioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#FFC107] via-[#FFD54F] to-[#FFC107]"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            <motion.span
              className="relative z-10"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {language === 'ar' ? 'اكتشف أعمالي' : 'View My Work'}
            </motion.span>
          </motion.button>
          
          {/* Rotating 3D aperture icon - hidden on mobile */}
          <motion.div
            className="absolute top-0 right-0 lg:top-10 lg:right-10 hidden lg:block"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Aperture className="w-16 h-16 lg:w-20 lg:h-20 text-[#FFC107] opacity-60" />
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Hero Portrait */}
        <motion.div
          className="flex-1 max-w-[280px] sm:max-w-md lg:max-w-lg xl:max-w-xl w-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          <div className="relative">
            {/* Chiaroscuro lighting effect */}
            <div className="absolute inset-0 bg-gradient-to-l from-[#FFC107]/30 via-transparent to-transparent rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl" />
            <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-[#FFC107]/20 to-transparent rounded-2xl sm:rounded-3xl blur-lg sm:blur-xl" />
            
            <motion.div
              className="relative z-10"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <ImageWithFallback
                src={heroImage}
                alt={`${language === 'ar' ? personalInfo.nameAr : personalInfo.nameEn} - ${language === 'ar' ? personalInfo.titleAr : personalInfo.titleEn}`}
                className="w-full h-auto rounded-2xl sm:rounded-3xl shadow-2xl border border-[#FFC107]/20"
                style={{
                  filter: 'contrast(1.1) saturate(0.9)',
                }}
              />
            </motion.div>
            
            {/* Subtle camera overlay */}
            <motion.div
              className="absolute bottom-3 sm:bottom-4 md:bottom-6 right-3 sm:right-4 md:right-6 bg-[#FFC107]/90 backdrop-blur-sm rounded-full p-2 sm:p-2.5 md:p-3"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Camera className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-black" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}