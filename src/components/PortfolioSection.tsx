import { useState } from 'react';
import { motion } from 'motion/react';
import { Play, X } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { useLanguage } from '../context/LanguageContext';

export function PortfolioSection() {
  const { data } = useSiteData();
  const { language } = useLanguage();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <section className="py-20 lg:py-32 bg-gray-900/30 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-5xl text-white mb-6 font-['Playfair_Display']">
            {language === 'ar' ? 'معرض ' : 'Our '}
            <span className="text-[#FFD700]">{language === 'ar' ? 'الأعمال' : 'Portfolio'}</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto font-['Inter']">
            {language === 'ar' 
              ? 'أحدث أعمالنا وإبداعاتنا المرئية' 
              : 'Showcasing our latest projects and visual creations'}
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.portfolio.map((item, index) => (
            <motion.div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              onClick={() => item.videoUrl && setSelectedVideo(item.videoUrl)}
            >
              <div className="aspect-video overflow-hidden relative">
                {item.image && item.image.trim() !== '' ? (
                  <img
                    src={item.image}
                    alt={language === 'ar' ? item.titleAr : item.titleEn}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                      if (placeholder) placeholder.style.display = 'flex';
                    }}
                  />
                ) : null}
                
                {/* Gradient Placeholder - shown when no image */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center"
                  style={{ display: item.image && item.image.trim() !== '' ? 'none' : 'flex' }}
                >
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-[#FFD700]/10 flex items-center justify-center mx-auto mb-4">
                      <Play className="w-10 h-10 text-[#FFD700]" fill="currentColor" />
                    </div>
                    <p className="text-gray-400 text-sm font-['Inter']">
                      {language === 'ar' ? 'اضغط للمشاهدة' : 'Click to Watch'}
                    </p>
                  </div>
                </div>
                
                {/* Play Button Overlay on Hover */}
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.div
                    className="w-16 h-16 rounded-full bg-[#FFD700] flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-8 h-8 text-black ml-1" fill="currentColor" />
                  </motion.div>
                </div>
              </div>
              
              <div className="p-4 text-center">
                <h3 className="text-white text-lg mb-1 font-['Playfair_Display']">
                  {language === 'ar' ? item.titleAr : item.titleEn}
                </h3>
                <p className="text-gray-400 text-sm font-['Inter']">
                  {language === 'ar' ? item.descriptionAr : item.descriptionEn}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <motion.div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedVideo(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-[#FFD700] transition-colors z-10"
            onClick={() => setSelectedVideo(null)}
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="w-full max-w-5xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={selectedVideo}
              className="w-full h-full rounded-lg"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}