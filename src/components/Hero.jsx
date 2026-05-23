import { motion } from 'framer-motion';
import { Rocket, Code, Cpu, Globe, Zap, Shield, Smartphone, Terminal } from 'lucide-react';
import logo from '../assets/logo/logo.jpg';

const Hero = () => {
  const features = [
    { icon: <Code className="w-5 h-5" />, text: "Custom Software" },
    { icon: <Globe className="w-5 h-5" />, text: "Web Development" },
    { icon: <Cpu className="w-5 h-5" />, text: "PCB & Embedded" },
    { icon: <Zap className="w-5 h-5" />, text: "IoT Solutions" },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-slate-50 dark:bg-[#020617]">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 dark:bg-blue-600/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 dark:bg-indigo-600/5 rounded-full blur-[150px] animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 dark:bg-blue-500/5 border border-blue-500/20 px-4 py-2 rounded-full mb-8">
              <Terminal className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">Think • Build • Innovate</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] mb-8">
              Build Your <span className="gradient-text">Digital Future</span> with Alpha Digitronix solutions
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-xl leading-relaxed">
              Premium technical solutions for the modern era. From high-performance web apps to complex embedded systems and PCB designs.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 text-slate-700 dark:text-slate-300">
                  <div className="p-2 bg-blue-600/10 rounded-lg text-blue-600 dark:text-blue-400">
                    {feature.icon}
                  </div>
                  <span className="font-bold text-sm">{feature.text}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-5">
              <a href="#request-form" className="gradient-button text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center transition-all hover:scale-105 active:scale-95">
                Start Project <Rocket className="ml-2 h-5 w-5" />
              </a>
              <a href="#services" className="bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-900 dark:text-white px-10 py-5 rounded-2xl font-black text-lg border border-slate-200 dark:border-white/10 backdrop-blur-sm transition-all flex items-center">
                Our Services
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* Logo Container */}
            <div className="relative z-10 flex justify-center items-center">
              <div className="relative group">
                {/* Glow Effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-700"></div>
                
                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 2, -2, 0]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative glass-card p-1 rounded-[4rem] border-blue-500/20 shadow-2xl backdrop-blur-2xl overflow-hidden"
                >
                  <div className="w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
                    <img 
                      src={logo} 
                      alt="Alpha Digitronix Logo" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>

                {/* Floating Badges */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-8 -right-8 glass-card px-6 py-4 rounded-3xl border-emerald-500/20 flex items-center space-x-3 shadow-xl"
                >
                  <Shield className="w-6 h-6 text-emerald-500" />
                  <span className="font-black text-xs uppercase tracking-widest dark:text-white">Secure Lead</span>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute -bottom-8 -left-8 glass-card px-6 py-4 rounded-3xl border-indigo-500/20 flex items-center space-x-3 shadow-xl"
                >
                  <Smartphone className="w-6 h-6 text-indigo-500" />
                  <span className="font-black text-xs uppercase tracking-widest dark:text-white">Responsive</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
