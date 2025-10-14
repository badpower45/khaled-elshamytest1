import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react';
import { useState } from 'react';

export function ContactSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setFormData({ name: '', email: '', message: '' });
    
    // Show success message (in a real app, you'd handle this properly)
    alert('Message sent successfully!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

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
          <h2 className="text-3xl lg:text-5xl text-white mb-6">
            Let's <span className="text-[#FFD700]">Connect</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Ready to bring your digital vision to life? Get in touch and let's create something extraordinary together.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#FFD700] focus:outline-none transition-colors"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-white mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#FFD700] focus:outline-none transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-white mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#FFD700] focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#FFD700] text-black py-3 rounded-lg text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FFD700]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
              >
                {isLoading ? (
                  <motion.div
                    className="flex items-center justify-center gap-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </motion.div>
                ) : (
                  'Send Message'
                )}
              </motion.button>
            </form>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <h3 className="text-2xl text-white mb-6">Get in Touch</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <p className="text-white">Email</p>
                    <p className="text-gray-400">hello@yourcompany.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <p className="text-white">Phone</p>
                    <p className="text-gray-400">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <p className="text-white">Location</p>
                    <p className="text-gray-400">New York, NY</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <h3 className="text-2xl text-white mb-6">Follow Us</h3>
              
              <div className="flex gap-4">
                {[
                  { icon: Linkedin, href: "#" },
                  { icon: Twitter, href: "#" },
                  { icon: Github, href: "#" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#FFD700] hover:text-black transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
            
            {/* Final CTA */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="bg-[#FFD700] text-black px-8 py-4 rounded-lg text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FFD700]/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Project Today
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}