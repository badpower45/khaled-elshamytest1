import { motion } from 'motion/react';
import { Camera, Video, Users, Smartphone, GraduationCap } from 'lucide-react';
import { useSiteData } from '../../context/SiteDataContext';
import { useLanguage } from '../../context/LanguageContext';

const serviceIcons = [Camera, Video, Users, Smartphone, GraduationCap];

export function ServicesSection() {
  const { data } = useSiteData();
  const { services } = data;
  const { language } = useLanguage();

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A] relative overflow-hidden">
      {/* Isometric grid background */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `
          linear-gradient(30deg, transparent 40%, rgba(255, 193, 7, 0.1) 40%, rgba(255, 193, 7, 0.1) 60%, transparent 60%),
          linear-gradient(-30deg, transparent 40%, rgba(255, 193, 7, 0.1) 40%, rgba(255, 193, 7, 0.1) 60%, transparent 60%)
        `,
        backgroundSize: '40px 40px'
      }} />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-[#FFC107] mb-3 sm:mb-4 md:mb-6 font-['Playfair_Display'] italic">
            {language === 'ar' ? 'خدماتي' : 'Behind the Lens'}
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 font-['Inter'] max-w-3xl mx-auto px-4">
            {language === 'ar' ? 'خدمات متكاملة للتصوير السينمائي وبناء الهوية الشخصية' : 'Comprehensive services for cinematography and personal branding'}
          </p>
        </motion.div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = serviceIcons[index] || Camera;
            
            return (
              <motion.div
                key={service.id}
                className="group relative"
                initial={{ opacity: 0, rotateY: -15 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                style={{ perspective: 1000 }}
              >
                <motion.div
                  className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 h-full relative overflow-hidden"
                  whileHover={{ 
                    rotateY: 5,
                    rotateX: 5,
                    boxShadow: "0 25px 50px rgba(255, 193, 7, 0.15)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Particle effect on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `
                        radial-gradient(circle at 20% 20%, rgba(255, 193, 7, 0.1) 1px, transparent 1px),
                        radial-gradient(circle at 80% 80%, rgba(255, 193, 7, 0.1) 1px, transparent 1px),
                        radial-gradient(circle at 40% 40%, rgba(255, 193, 7, 0.1) 1px, transparent 1px)
                      `,
                      backgroundSize: '50px 50px, 30px 30px, 70px 70px'
                    }}
                    animate={{
                      backgroundPosition: [
                        '0px 0px, 0px 0px, 0px 0px',
                        '50px 50px, 30px 30px, 70px 70px'
                      ]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Icon with glow effect */}
                  <motion.div
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#FFC107] to-[#FFD54F] rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 relative"
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.1
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-black" />
                    
                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-[#FFC107] rounded-xl blur-xl opacity-0 group-hover:opacity-50"
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                  
                  <h3 
                    className="text-base sm:text-lg md:text-xl text-white mb-2 text-center group-hover:text-[#FFC107] transition-colors font-['Playfair_Display']"
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                  >
                    {language === 'ar' ? service.titleAr : service.titleEn}
                  </h3>
                  
                  <p 
                    className="text-gray-400 mb-3 sm:mb-4 md:mb-6 leading-relaxed font-['Inter'] text-xs sm:text-sm md:text-base"
                    style={{ textAlign: language === 'ar' ? 'right' : 'left' }}
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                  >
                    {language === 'ar' ? service.descriptionAr : service.descriptionEn}
                  </p>
                  
                  <ul className="space-y-2" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    {service.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        className="text-xs sm:text-sm text-gray-500 flex items-center gap-2 font-['Inter']"
                        style={{ justifyContent: language === 'ar' ? 'flex-end' : 'flex-start' }}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index * 0.1) + (featureIndex * 0.05) }}
                        viewport={{ once: true }}
                      >
                        <div className="w-1 h-1 bg-[#FFC107] rounded-full flex-shrink-0" />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  {/* Subtle tilt indicator */}
                  <motion.div
                    className="absolute bottom-4 right-4 w-6 h-6 border border-[#FFC107]/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="w-1 h-1 bg-[#FFC107] rounded-full mt-1 ml-1" />
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Call to action */}
        <motion.div
          className="text-center mt-8 sm:mt-12 md:mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="bg-gradient-to-r from-[#FFC107] to-[#FFD54F] text-black px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg text-sm sm:text-base md:text-lg font-['Inter'] hover:shadow-lg hover:shadow-[#FFC107]/25"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const contactSection = document.querySelector('#contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
          >
            {language === 'ar' ? 'ناقش رؤيتك معنا' : 'Discuss Your Vision'}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}