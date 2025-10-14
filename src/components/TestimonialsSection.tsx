import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Quote } from 'lucide-react';
import { useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO, TechStart",
    image: "https://images.unsplash.com/photo-1739298061757-7a3339cee982?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc1ODUwNzM3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    quote: "Exceptional work! They transformed our vision into a stunning digital experience that exceeded all expectations."
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Founder, InnovateLab",
    image: "https://images.unsplash.com/photo-1739298061757-7a3339cee982?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc1ODUwNzM3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    quote: "Professional, creative, and incredibly talented. They delivered a solution that perfectly matched our brand."
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Director, CreativeWorks",
    image: "https://images.unsplash.com/photo-1739298061757-7a3339cee982?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc1ODUwNzM3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    quote: "Their attention to detail and innovative approach made all the difference. Highly recommended!"
  }
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 lg:py-32 bg-[#121212] relative overflow-hidden">
      {/* Background Quote Icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <Quote className="w-96 h-96 text-[#FFD700]" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-5xl text-white mb-6">
            What Our <span className="text-[#FFD700]">Clients</span> Say
          </h2>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className={`text-center ${index === currentIndex ? 'block' : 'hidden'}`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ 
                  opacity: index === currentIndex ? 1 : 0,
                  x: index === currentIndex ? 0 : 100
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-8">
                  <ImageWithFallback
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full mx-auto mb-6 object-cover border-2 border-[#FFD700]"
                  />
                  
                  <blockquote className="text-xl lg:text-2xl text-gray-300 mb-6 italic leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div>
                    <h4 className="text-white text-lg mb-1">{testimonial.name}</h4>
                    <p className="text-[#FFD700] text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-[#FFD700]' : 'bg-gray-600'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}