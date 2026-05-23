import { Rocket, Mail, Phone, MessageSquare, ArrowUp, Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-[#020617] pt-20 pb-10 border-t border-slate-200 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6 group cursor-pointer">
              <div className="bg-blue-600 p-2 rounded-xl">
                <Rocket className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                Alpha <span className="text-blue-600">Digitronix</span>
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              Leading the way in digital innovation and engineering excellence. We build secure, scalable, and high-performance solutions for the modern world.
            </p>
            <div className="flex space-x-4">
              {[Github, Linkedin, Twitter].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="bg-slate-100 dark:bg-white/5 p-3 rounded-xl text-slate-600 dark:text-slate-400 hover:text-white hover:bg-blue-600 transition-all"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6 text-lg">Services</h4>
            <ul className="space-y-4">
              {['Website Development', 'PCB Design', 'Embedded Systems', 'IoT Projects', 'Software Development'].map((item) => (
                <li key={item}>
                  <a href="#services" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Services', 'Request Service', 'Admin Portal'].map((item) => (
                <li key={item}>
                  <a 
                    href={item === 'Admin Portal' ? '/admin' : `#${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6 text-lg">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-slate-600 dark:text-slate-400">
                <Mail size={18} className="mt-1 text-blue-600 dark:text-blue-400" />
                <span className="break-all">karthick.alphadigitronix@gmail.com</span>
              </li>
              <li className="flex items-start space-x-3 text-slate-600 dark:text-slate-400">
                <Phone size={18} className="mt-1 text-blue-600 dark:text-blue-400" />
                <span>+91 9345334089</span>
              </li>
              <li className="flex items-start space-x-3 text-slate-600 dark:text-slate-400">
                <MessageSquare size={18} className="mt-1 text-blue-600 dark:text-blue-400" />
                <span>+91 9345554311</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-slate-500 dark:text-slate-500 text-sm">
            © {new Date().getFullYear()} Alpha Digitronix Solutions. All rights reserved.
          </p>
          <div className="flex space-x-8 text-sm text-slate-500 dark:text-slate-500">
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms of Service</a>
          </div>
          <button 
            onClick={scrollToTop}
            className="bg-slate-100 dark:bg-white/5 p-3 rounded-full text-slate-600 dark:text-slate-400 hover:text-white hover:bg-blue-600 transition-all group shadow-lg"
          >
            <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
          </button>
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
    </footer>
  );
};

export default Footer;
