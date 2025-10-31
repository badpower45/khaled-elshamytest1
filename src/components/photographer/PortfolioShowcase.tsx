import { motion } from 'motion/react';
import { useState, useCallback, useEffect } from 'react';
import { X, Play, Instagram, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSiteData } from '../../context/SiteDataContext';
import { useLanguage } from '../../context/LanguageContext';
import useEmblaCarousel from 'embla-carousel-react';

export function PortfolioShowcase() {
  const { data } = useSiteData();
  const { portfolio } = data;
  const { language } = useLanguage();
  const [selectedItem, setSelectedItem] = useState<typeof portfolio[0] | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
    containScroll: 'trimSnaps'
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleItemClick = (item: typeof portfolio[0]) => {
    setSelectedItem(item);
  };

  const closeLightbox = () => {
    setSelectedItem(null);
  };

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 bg-[#0A0A0A] relative overflow-hidden">
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

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto mb-12">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex items-center">
              {portfolio.map((item, index) => {
                const isCenter = index === selectedIndex;

                return (
                  <div
                    key={item.id}
                    className={`flex-shrink-0 transition-all duration-500 ${
                      isCenter 
                        ? 'w-full sm:w-[70%] md:w-[60%] lg:w-[50%] px-2 sm:px-4' 
                        : 'w-[45%] sm:w-[35%] md:w-[30%] lg:w-[25%] px-1 sm:px-2'
                    }`}
                    style={{
                      opacity: isCenter ? 1 : 0.4,
                      filter: isCenter ? 'blur(0px)' : 'blur(4px)',
                      transform: isCenter ? 'scale(1)' : 'scale(0.85)',
                    }}
                  >
                    <motion.div
                      className="cursor-pointer"
                      onClick={() => handleItemClick(item)}
                      whileHover={{ scale: isCenter ? 1.02 : 0.87 }}
                      transition={{ duration: 0.3 }}
                    >
                      <VideoCard 
                        item={item} 
                        index={index} 
                        language={language} 
                        featured={isCenter}
                      />
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-[#FFC107]/90 hover:bg-[#FFC107] rounded-full p-2 sm:p-3 transition-colors shadow-xl"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
          </button>
          
          <button
            onClick={scrollNext}
            className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-[#FFC107]/90 hover:bg-[#FFC107] rounded-full p-2 sm:p-3 transition-colors shadow-xl"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6 sm:mt-8">
            {portfolio.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex 
                    ? 'w-8 bg-[#FFC107]' 
                    : 'w-2 bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

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

      {/* Lightbox Modal */}
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

function VideoCard({ item, index, language, featured = false }: { 
  item: any; 
  index: number; 
  language: 'ar' | 'en';
  featured?: boolean;
}) {
  return (
    <div className="group relative overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl">
      <motion.div
        className={`relative aspect-[9/16] bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden ${featured ? 'shadow-2xl shadow-[#FFC107]/20 border-2 border-[#FFC107]/30' : 'border border-[#FFC107]/10'}`}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 193, 7, 0.3) 0%, transparent 50%)',
          }} />
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 193, 7, 0.1) 2px, rgba(255, 193, 7, 0.1) 4px)',
          }} />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
        
        {item.videoUrl && (
          <motion.div
            className={`absolute ${featured ? 'top-3 right-3' : 'top-2 right-2'} bg-[#FFC107]/95 backdrop-blur-sm rounded-full ${featured ? 'p-2.5' : 'p-1.5'}`}
            whileHover={{ scale: 1.1 }}
            animate={{ 
              boxShadow: [
                '0 0 0 0 rgba(255, 193, 7, 0.7)',
                '0 0 0 10px rgba(255, 193, 7, 0)',
              ]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Play className={`${featured ? 'w-5 h-5' : 'w-3 h-3'} text-black`} fill="black" />
          </motion.div>
        )}

        <motion.div
          className={`absolute ${featured ? 'top-3 left-3 px-2 py-1' : 'top-2 left-2 px-1.5 py-0.5'} bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-md flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity`}
        >
          <Instagram className={`${featured ? 'w-3 h-3' : 'w-2.5 h-2.5'} text-white`} />
          <span className={`text-white ${featured ? 'text-xs' : 'text-[10px]'} font-['Inter']`}>Reel</span>
        </motion.div>
        
        <motion.div
          className={`absolute bottom-0 left-0 right-0 ${featured ? 'p-4 sm:p-5' : 'p-2 sm:p-3'} text-white`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
          viewport={{ once: true }}
        >
          <div 
            className="space-y-1"
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          >
            <p className={`text-[#FFC107] uppercase tracking-wider font-['Inter'] ${featured ? 'text-xs sm:text-sm' : 'text-[10px]'}`}>
              {language === 'ar' ? 'ريل' : 'REEL'}
            </p>
            
            <h3 
              className={`font-['Playfair_Display'] italic leading-tight ${featured ? 'text-sm sm:text-base md:text-lg line-clamp-2' : 'text-xs line-clamp-1'}`}
              style={{ textAlign: language === 'ar' ? 'right' : 'left' }}
            >
              {language === 'ar' ? item.titleAr : item.titleEn}
            </h3>
            
            {featured && (
              <p 
                className="text-gray-300 font-['Inter'] line-clamp-2 leading-snug text-xs sm:text-sm"
                style={{ textAlign: language === 'ar' ? 'right' : 'left' }}
              >
                {language === 'ar' ? item.descriptionAr : item.descriptionEn}
              </p>
            )}
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1 }}
        >
          <div className={`${featured ? 'w-16 h-16 lg:w-20 lg:h-20' : 'w-10 h-10 sm:w-12 sm:h-12'} bg-[#FFC107]/90 rounded-full flex items-center justify-center backdrop-blur-sm`}>
            <Play className={`${featured ? 'w-8 h-8 lg:w-10 lg:h-10' : 'w-5 h-5 sm:w-6 sm:h-6'} text-black ml-0.5`} fill="black" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
