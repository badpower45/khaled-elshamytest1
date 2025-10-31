import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';
import { useSiteData } from '../../context/SiteDataContext';
import { useLanguage } from '../../context/LanguageContext';

export function TestimonialsSection() {
  const { data } = useSiteData();
  const { testimonials } = data;
  const { language } = useLanguage();

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 193, 7, 0.2) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-[#FFC107] mb-3 sm:mb-4 md:mb-6 font-['Playfair_Display'] italic">
            {language === 'ar' ? 'آراء العملاء' : 'The Acclaim'}
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 font-['Inter'] max-w-2xl mx-auto px-4">
            {language === 'ar' ? 'آراء عملائنا الكرام' : 'What our clients say'}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-sm border border-[#FFC107]/20 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 h-full relative overflow-hidden"
                whileHover={{ 
                  borderColor: 'rgba(255, 193, 7, 0.5)',
                  boxShadow: '0 20px 60px rgba(255, 193, 7, 0.1)'
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Quote icon */}
                <motion.div
                  className="absolute top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-6 opacity-10"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  <Quote className="w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 text-[#FFC107]" fill="currentColor" />
                </motion.div>

                {/* Stars */}
                <div className="flex gap-0.5 sm:gap-1 mb-3 sm:mb-4 md:mb-6" style={{ justifyContent: language === 'ar' ? 'flex-end' : 'flex-start' }}>
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.2 + i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#FFC107]" fill="#FFC107" />
                    </motion.div>
                  ))}
                </div>

                {/* Testimonial text */}
                <motion.p
                  className="text-gray-300 mb-4 sm:mb-6 md:mb-8 leading-relaxed font-['Inter'] relative z-10 text-xs sm:text-sm md:text-base"
                  style={{ textAlign: language === 'ar' ? 'right' : 'left' }}
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                >
                  "{testimonial.text}"
                </motion.p>

                {/* Client info */}
                <motion.div
                  className="border-t border-[#FFC107]/20 pt-3 sm:pt-4 md:pt-6 relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 + 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-between gap-2 sm:gap-4">
                    <div style={{ textAlign: language === 'ar' ? 'right' : 'left' }} className="flex-1 min-w-0">
                      <p className="text-[#FFC107] font-['Playfair_Display'] mb-1 text-xs sm:text-sm md:text-base truncate">
                        {testimonial.name}
                      </p>
                      <p className="text-[10px] sm:text-xs md:text-sm text-gray-400 font-['Inter'] truncate">
                        {testimonial.position}
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-500 font-['Inter'] mt-0.5 sm:mt-1 truncate">
                        {testimonial.company}
                      </p>
                    </div>

                    {/* Decorative circle */}
                    <motion.div
                      className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#FFC107]/30 to-[#FFD54F]/10 flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 180 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-[#FFC107]/50" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Hover effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-[#FFC107]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-3xl"
                  initial={{ x: -100, y: -100 }}
                  whileHover={{ x: 0, y: 0 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}