import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#121212]">
      {/* Animated background light flare */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, #FFD700 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, #FFD700 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, #FFD700 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 relative z-10">
        {/* Hero Content */}
        <motion.div
          className="flex-1 text-center lg:text-left max-w-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.h1
            className="text-4xl lg:text-6xl xl:text-7xl text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Crafting Digital
            <span className="text-[#FFD700] block">Excellence</span>
          </motion.h1>
          
          <motion.p
            className="text-gray-300 text-lg lg:text-xl mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Transforming ideas into powerful digital experiences through innovative design and cutting-edge technology.
          </motion.p>
          
          <motion.button
            className="bg-[#FFD700] text-black px-8 py-4 rounded-lg text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FFD700]/20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Discover Our Services
            </motion.span>
          </motion.button>
        </motion.div>
        
        {/* Hero Image */}
        <motion.div
          className="flex-1 max-w-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/20 to-transparent rounded-2xl blur-xl" />
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzEyNTB8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wZXIlMjB3b3JraW5nJTIwY29tcHV0ZXJ8ZW58MHx8fHwxNzM2ODc5NDU0fDA&ixlib=rb-4.0.3&q=80&w=1080"
              alt="Professional developer working"
              className="relative z-10 w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}