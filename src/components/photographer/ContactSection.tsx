import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Instagram, Facebook, Linkedin, Youtube, Video } from 'lucide-react';
import { useSiteData } from '../../context/SiteDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

export function ContactSection() {
  const { data } = useSiteData();
  const { contactInfo, socialMedia, personalInfo } = data;
  const { language } = useLanguage();

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundImage: [
              'radial-gradient(circle at 20% 50%, rgba(255, 193, 7, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(255, 193, 7, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(255, 193, 7, 0.15) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
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
            {language === 'ar' ? 'تواصل معنا' : 'Get In Touch'}
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 font-['Inter'] max-w-2xl mx-auto mb-2 sm:mb-3 md:mb-4 px-4">
            {language === 'ar' ? 'تواصل معنا لنبدأ رحلة إبداعية معاً' : 'Let\'s start a creative journey together'}
          </p>
          <p className="text-sm sm:text-base md:text-lg text-[#FFC107] font-['Inter'] italic px-4">
            {language === 'ar' ? personalInfo.closingStatementAr : personalInfo.closingStatementEn}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              {/* Email */}
              <motion.div
                className="flex items-start gap-2 sm:gap-3 md:gap-4 group"
                whileHover={{ x: language === 'ar' ? -5 : 5 }}
                transition={{ duration: 0.3 }}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              >
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#FFC107] to-[#FFD54F] rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-black" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white mb-1 font-['Inter'] text-xs sm:text-sm md:text-base" style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
                    {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </h3>
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="text-[#FFC107] hover:text-[#FFD54F] transition-colors font-['Inter'] text-xs sm:text-sm md:text-base break-all"
                    style={{ display: 'block', textAlign: language === 'ar' ? 'right' : 'left' }}
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                className="flex items-start gap-2 sm:gap-3 md:gap-4 group"
                whileHover={{ x: language === 'ar' ? -5 : 5 }}
                transition={{ duration: 0.3 }}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              >
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#FFC107] to-[#FFD54F] rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-black" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white mb-1 font-['Inter'] text-xs sm:text-sm md:text-base" style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
                    {language === 'ar' ? 'الهاتف' : 'Phone'}
                  </h3>
                  <a 
                    href={`tel:${contactInfo.phone}`}
                    className="text-[#FFC107] hover:text-[#FFD54F] transition-colors font-['Inter'] text-xs sm:text-sm md:text-base"
                    style={{ display: 'block', textAlign: language === 'ar' ? 'right' : 'left' }}
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div
                className="flex items-start gap-2 sm:gap-3 md:gap-4 group"
                whileHover={{ x: language === 'ar' ? -5 : 5 }}
                transition={{ duration: 0.3 }}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              >
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#FFC107] to-[#FFD54F] rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-black" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white mb-1 font-['Inter'] text-xs sm:text-sm md:text-base" style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
                    {language === 'ar' ? 'الموقع' : 'Location'}
                  </h3>
                  <p className="text-[#FFC107] font-['Inter'] text-xs sm:text-sm md:text-base" style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
                    {contactInfo.location}
                  </p>
                  <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm mt-1 font-['Inter']" style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
                    {contactInfo.studioAddress}
                  </p>
                </div>
              </motion.div>

              {/* Working Hours */}
              <motion.div
                className="flex items-start gap-2 sm:gap-3 md:gap-4 group"
                whileHover={{ x: language === 'ar' ? -5 : 5 }}
                transition={{ duration: 0.3 }}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              >
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#FFC107] to-[#FFD54F] rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-black" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white mb-2 font-['Inter'] text-xs sm:text-sm md:text-base" style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
                    {language === 'ar' ? 'ساعات العمل' : 'Working Hours'}
                  </h3>
                  <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm mb-1 font-['Inter']" style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
                    {contactInfo.workingHours.weekdays}
                  </p>
                  <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm mb-1 font-['Inter']" style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
                    {contactInfo.workingHours.friday}
                  </p>
                  <p className="text-[#FFC107] text-[10px] sm:text-xs md:text-sm font-['Inter']" style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
                    {language === 'ar' ? 'الطوارئ: ' : 'Emergency: '}{contactInfo.workingHours.emergency}
                  </p>
                </div>
              </motion.div>

              {/* Social Media */}
              <motion.div
                className="pt-6 sm:pt-8 border-t border-[#FFC107]/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h3 className="text-white mb-4 font-['Inter'] text-sm sm:text-base" style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
                  {language === 'ar' ? 'تابعنا على' : 'Follow Us'}
                </h3>
                <div className="flex gap-3 sm:gap-4 flex-wrap" style={{ justifyContent: language === 'ar' ? 'flex-end' : 'flex-start' }}>
                  <motion.a
                    href={socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center border border-[#FFC107]/20 hover:border-[#FFC107] transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFC107]" />
                  </motion.a>

                  <motion.a
                    href={socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center border border-[#FFC107]/20 hover:border-[#FFC107] transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Facebook className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFC107]" />
                  </motion.a>

                  <motion.a
                    href={socialMedia.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center border border-[#FFC107]/20 hover:border-[#FFC107] transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFC107]" />
                  </motion.a>

                  <motion.a
                    href={socialMedia.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center border border-[#FFC107]/20 hover:border-[#FFC107] transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Video className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFC107]" />
                  </motion.a>

                  <motion.a
                    href={socialMedia.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center border border-[#FFC107]/20 hover:border-[#FFC107] transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Youtube className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFC107]" />
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-sm border border-[#FFC107]/20 rounded-3xl p-8">
              <h3 className="text-2xl text-[#FFC107] mb-6 text-right font-['Playfair_Display'] italic">
                أرسل لنا رسالة
              </h3>

              <form className="space-y-6">
                <div>
                  <label className="block text-white mb-2 text-right font-['Inter']">
                    الاسم
                  </label>
                  <Input 
                    type="text"
                    placeholder="اسمك الكريم"
                    className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 text-right"
                    dir="rtl"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 text-right font-['Inter']">
                    البريد الإلكتروني
                  </label>
                  <Input 
                    type="email"
                    placeholder="example@email.com"
                    className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 text-right font-['Inter']">
                    الهاتف
                  </label>
                  <Input 
                    type="tel"
                    placeholder="+20 xxx xxx xxxx"
                    className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 text-right font-['Inter']">
                    رسالتك
                  </label>
                  <Textarea 
                    placeholder="أخبرنا عن مشروعك..."
                    rows={5}
                    className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 text-right resize-none"
                    dir="rtl"
                  />
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#FFC107] to-[#FFD54F] text-black hover:shadow-lg hover:shadow-[#FFC107]/25 font-['Inter']"
                  >
                    إرسال الرسالة
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}