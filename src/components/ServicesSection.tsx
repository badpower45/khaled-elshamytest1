import { motion } from 'motion/react';
import { Code, Palette, Rocket } from 'lucide-react';

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Custom web applications built with cutting-edge technologies and best practices."
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful, intuitive interfaces designed to enhance user experience and engagement."
  },
  {
    icon: Rocket,
    title: "Digital Strategy",
    description: "Comprehensive digital solutions to accelerate your business growth and success."
  }
];

export function ServicesSection() {
  return (
    <section className="py-20 lg:py-32 bg-[#121212] relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-5xl text-white mb-6">
            Our <span className="text-[#FFD700]">Services</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            We deliver exceptional digital solutions tailored to your unique business needs.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 text-center group hover:bg-gray-800/50 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 40px rgba(255, 215, 0, 0.1)"
              }}
            >
              <motion.div
                className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-6"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <service.icon className="w-8 h-8 text-black" />
              </motion.div>
              
              <h3 className="text-xl text-white mb-4 group-hover:text-[#FFD700] transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}