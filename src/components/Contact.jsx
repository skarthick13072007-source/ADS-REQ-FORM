import { motion } from 'framer-motion';
import { Mail, Phone, MessageSquare, Globe, MapPin, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-[#0f172a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Let's Start a <span className="gradient-text">Project Together</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10">
              Have a question or a project in mind? Reach out to us through any of the channels below. We're always excited to hear new ideas!
            </p>

            <div className="space-y-8">
              <div className="flex items-center space-x-6 group">
                <div className="bg-blue-600/10 p-4 rounded-2xl group-hover:bg-blue-600 transition-colors duration-300">
                  <Mail className="h-6 w-6 text-blue-400 group-hover:text-white" />
                </div>
                <div>
                  <h4 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Email Us</h4>
                  <a href="mailto:karthick.alphadigitronix@gmail.com" className="text-white text-xl font-bold hover:text-blue-400 transition-colors">
                    karthick.alphadigitronix@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-6 group">
                <div className="bg-indigo-600/10 p-4 rounded-2xl group-hover:bg-indigo-600 transition-colors duration-300">
                  <Phone className="h-6 w-6 text-indigo-400 group-hover:text-white" />
                </div>
                <div>
                  <h4 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Call Us</h4>
                  <a href="tel:+919345334089" className="text-white text-xl font-bold hover:text-indigo-400 transition-colors">
                    +91 9345334089
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-6 group">
                <div className="bg-emerald-600/10 p-4 rounded-2xl group-hover:bg-emerald-600 transition-colors duration-300">
                  <MessageSquare className="h-6 w-6 text-emerald-400 group-hover:text-white" />
                </div>
                <div>
                  <h4 className="text-gray-400 text-sm font-medium uppercase tracking-wider">WhatsApp</h4>
                  <a href="https://wa.me/919345554311" target="_blank" rel="noopener noreferrer" className="text-white text-xl font-bold hover:text-emerald-400 transition-colors">
                    +91 9345554311
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h4 className="text-white font-bold mb-6">Follow Our Journey</h4>
              <div className="flex space-x-4">
                {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
                  <a 
                    key={i} 
                    href="#" 
                    className="bg-white/5 p-3 rounded-xl text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-300"
                  >
                    <Icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-2 rounded-[2.5rem] overflow-hidden border border-white/10"
          >
            <div className="w-full h-[450px] rounded-[2.2rem] overflow-hidden grayscale brightness-75 contrast-125">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.1234567890!2d77.1234567890!3d12.1234567890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDA3JzM0LjQiTiA3N8KwMDcnMzQuNCJF!5e0!3m2!1sen!2sin!4v1621234567890!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                title="Google Maps"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919345554311"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
      >
        <MessageSquare size={32} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 whitespace-nowrap font-bold">
          Chat with us
        </span>
      </a>
    </section>
  );
};

export default Contact;
