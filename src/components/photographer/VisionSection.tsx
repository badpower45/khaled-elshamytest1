import { motion } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useSiteData } from '../../context/SiteDataContext';
import { useLanguage } from '../../context/LanguageContext';

export function VisionSection() {
  const { data } = useSiteData();
  const { personalInfo } = data;
  const { language } = useLanguage();

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] relative overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 193, 7, 0.15) 1px, transparent 0)',
        backgroundSize: '20px 20px'
      }} />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-[#FFC107] mb-4 sm:mb-6 font-['Playfair_Display'] italic">
            {language === 'ar' ? 'رؤيتي' : 'My Vision'}
          </h2>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Workspace Image */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Parallax container */}
              <motion.div
                className="relative overflow-hidden rounded-xl sm:rounded-2xl"
                whileInView={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 8, repeat: Infinity }}
                viewport={{ once: true }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1636293875439-b3125c0f1fc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoZXIlMjB3b3Jrc3BhY2UlMjBlZGl0aW5nJTIwc3R1ZGlvfGVufDF8fHx8MTc1ODU3NjI0MHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Photography workspace with editing setup"
                  className="w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] object-cover"
                />
                
                {/* Light reflections overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#FFC107]/20 to-transparent"
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                    x: [-100, 100, -100],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
              
              {/* Golden frame effect */}
              <div className="absolute -inset-1 sm:-inset-2 border border-[#FFC107]/30 rounded-xl sm:rounded-2xl" />
              <div className="absolute -inset-2 sm:-inset-4 border border-[#FFC107]/10 rounded-2xl sm:rounded-3xl hidden sm:block" />
            </div>
          </motion.div>
          
          {/* Vision Statement */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6 sm:space-y-8">
              <motion.p
                className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed font-['Inter']"
                style={{ textAlign: language === 'ar' ? 'right' : 'left' }}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                {language === 'ar' ? personalInfo.visionAr : personalInfo.visionEn}
              </motion.p>
            </div>
            
            {/* Signature */}
            <motion.div
              className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#FFC107]/30"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              viewport={{ once: true }}
              style={{ textAlign: language === 'ar' ? 'right' : 'left' }}
            >
              <p className="text-[#FFC107] text-xl sm:text-2xl font-['Playfair_Display'] italic">
                — {language === 'ar' ? personalInfo.nameAr : personalInfo.nameEn}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}