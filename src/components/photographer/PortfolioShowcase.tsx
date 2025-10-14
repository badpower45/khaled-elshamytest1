import { motion } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useState } from 'react';
import { X, Play, Instagram } from 'lucide-react';
import { useSiteData } from '../../context/SiteDataContext';
import { useLanguage } from '../../context/LanguageContext';

export function PortfolioShowcase() {
  const { data } = useSiteData();
  const { portfolio } = data;
  const { language } = useLanguage();
  const [selectedItem, setSelectedItem] = useState<typeof portfolio[0] | null>(null);

  const handleItemClick = (item: typeof portfolio[0]) => {
    setSelectedItem(item);
  };

  const closeLightbox = () => {
    setSelectedItem(null);
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 193, 7, 0.3) 1px, transparent 0)',
          backgroundSize: '30px 30px'
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
            {language === 'ar' ? 'معرض الأعمال' : 'Portfolio'}
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 font-['Inter'] max-w-2xl mx-auto px-4">
            {language === 'ar' ? 'ريلز وفيديوهات سينمائية للـ Personal Branding' : 'Reels & Cinematic Videos for Personal Branding'}
          </p>
        </motion.div>

        {/* Portrait Grid - Mobile-first Reels Style */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
          {portfolio.map((item, index) => (
            <motion.div
              key={item.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => handleItemClick(item)}
            >
              <div className="relative overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl">
                {/* Portrait aspect ratio for Reels (9:16) */}
                <motion.div
                  className="relative aspect-[9/16] bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Static Background - No Video Loading */}
                  <div className="absolute inset-0">
                    {/* Cinematic pattern */}
                    <div className="absolute inset-0 opacity-10" style={{
                      backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 193, 7, 0.3) 0%, transparent 50%)',
                    }} />
                    
                    {/* Film grain effect */}
                    <div className="absolute inset-0 opacity-5" style={{
                      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 193, 7, 0.1) 2px, rgba(255, 193, 7, 0.1) 4px)',
                    }} />
                  </div>
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  
                  {/* Video/Reel indicator */}
                  {item.videoUrl && (
                    <motion.div
                      className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-[#FFC107]/95 backdrop-blur-sm rounded-full p-1.5 sm:p-2 md:p-2.5"
                      whileHover={{ scale: 1.1 }}
                      animate={{ 
                        boxShadow: [
                          '0 0 0 0 rgba(255, 193, 7, 0.7)',
                          '0 0 0 10px rgba(255, 193, 7, 0)',
                        ]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Play className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-black" fill="black" />
                    </motion.div>
                  )}

                  {/* Instagram Reel badge */}
                  <motion.div
                    className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-md sm:rounded-lg px-1.5 sm:px-2 py-0.5 sm:py-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    <Instagram className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                    <span className="text-white text-[10px] sm:text-xs font-['Inter']">Reel</span>
                  </motion.div>
                  
                  {/* Content overlay */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 text-white"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div 
                      className="space-y-0.5 sm:space-y-1 md:space-y-1.5"
                      dir={language === 'ar' ? 'rtl' : 'ltr'}
                    >
                      <p className="text-[#FFC107] uppercase tracking-wider font-['Inter'] text-[9px] sm:text-[10px] md:text-xs">
                        {language === 'ar' ? 'ريل' : 'REEL'}
                      </p>
                      
                      <h3 
                        className="text-xs sm:text-sm md:text-base lg:text-lg font-['Playfair_Display'] italic leading-tight line-clamp-2"
                        style={{ textAlign: language === 'ar' ? 'right' : 'left' }}
                      >
                        {language === 'ar' ? item.titleAr : item.titleEn}
                      </h3>
                      
                      <p 
                        className="text-gray-300 text-[10px] sm:text-xs md:text-sm font-['Inter'] line-clamp-1 sm:line-clamp-2 leading-snug"
                        style={{ textAlign: language === 'ar' ? 'right' : 'left' }}
                      >
                        {language === 'ar' ? item.descriptionAr : item.descriptionEn}
                      </p>
                    </div>
                  </motion.div>

                  {/* Hover border effect */}
                  <motion.div
                    className="absolute inset-0 border-2 border-[#FFC107] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg sm:rounded-xl md:rounded-2xl"
                    initial={{ scale: 0.95 }}
                    whileHover={{ scale: 1 }}
                  />

                  {/* Play button overlay on hover */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1 }}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-[#FFC107]/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Play className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-black ml-0.5 sm:ml-1" fill="black" />
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          className="text-center mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.a
            href={data.socialMedia.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-[#FFC107] to-[#FFD54F] text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-['Inter'] hover:shadow-lg hover:shadow-[#FFC107]/25 inline-flex items-center gap-2"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Instagram className="w-5 h-5" />
            <span>{language === 'ar' ? 'شاهد المزيد على Instagram' : 'View More on Instagram'}</span>
          </motion.a>
        </motion.div>
      </div>

      {/* Lightbox Modal - Portrait Video Player */}
      {selectedItem && (
        <motion.div
          className="fixed inset-0 bg-black/98 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="fixed top-4 sm:top-6 right-4 sm:right-6 z-50 bg-[#FFC107] rounded-full p-2 sm:p-3 hover:bg-[#FFD54F] transition-colors"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
          </button>

          <motion.div
            className="max-w-md w-full mx-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {selectedItem.videoUrl && (
              <div className="relative w-full" style={{ paddingTop: '177.78%' }}>
                <iframe
                  src={selectedItem.videoUrl}
                  className="absolute top-0 left-0 w-full h-full rounded-2xl"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  allowFullScreen
                  style={{ border: 'none' }}
                  referrerPolicy="strict-origin-when-cross-origin"
                  title={language === 'ar' ? selectedItem.titleAr : selectedItem.titleEn}
                />
              </div>
            )}
            
            <div 
              className="mt-4 sm:mt-6 text-center bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-[#FFC107]/20"
              dir={language === 'ar' ? 'rtl' : 'ltr'}
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <Instagram className="w-5 h-5 text-[#FFC107]" />
                <span className="text-xs text-[#FFC107] uppercase tracking-wider font-['Inter']">
                  {language === 'ar' ? 'ريل إنستجرام' : 'Instagram Reel'}
                </span>
              </div>
              
              <h3 className="text-xl sm:text-2xl text-[#FFC107] mb-2 font-['Playfair_Display'] italic">
                {language === 'ar' ? selectedItem.titleAr : selectedItem.titleEn}
              </h3>
              
              <p className="text-base sm:text-lg text-gray-300 font-['Inter']">
                {language === 'ar' ? selectedItem.descriptionAr : selectedItem.descriptionEn}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}