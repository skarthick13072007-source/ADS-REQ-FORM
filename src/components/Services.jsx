import { motion } from 'framer-motion';
import { Layout, Briefcase, Cpu, Zap, Radio, Code, Rocket, GraduationCap } from 'lucide-react';

const services = [
  {
    icon: <GraduationCap className="h-8 w-8 text-emerald-600" />,
    title: "INTERNSHIP",
    description: "Hands-on industrial training on web development, embedded systems, and PCB design for students.",
    price: "₹1,999",
  },
  {
    icon: <Layout className="h-8 w-8 text-blue-500" />,
    title: "Website Development",
    description: "Modern, fast, and secure websites tailored for your business growth.",
    price: "₹999",
  },
  {
    icon: <Briefcase className="h-8 w-8 text-indigo-500" />,
    title: "Portfolio Websites",
    description: "Showcase your professional skills with a stunning personal brand.",
    price: "1,999",
  },
  {
    icon: <Cpu className="h-8 w-8 text-emerald-500" />,
    title: "PCB Design",
    description: "Professional circuit design and prototyping for your hardware projects.",
    price: "₹2,999",
  },
  {
    icon: <Zap className="h-8 w-8 text-amber-500" />,
    title: "Embedded Systems",
    description: "Custom firmware and hardware integration for specialized applications.",
    price: "₹1,999",
  },
  {
    icon: <Radio className="h-8 w-8 text-purple-500" />,
    title: "IoT Projects",
    description: "Smart connected solutions with real-time data monitoring and control.",
    price: "₹8999",
  },
  {
    icon: <Code className="h-8 w-8 text-rose-500" />,
    title: "Software Development",
    description: "Custom software solutions to solve complex business challenges.",
    price: "Custom",
  },
  {
    icon: <Rocket className="h-8 w-8 text-blue-600" />,
    title: "Startup Solutions",
    description: "Complete technical roadmap and MVP development for early-stage startups.",
    price: "Flexible",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-white dark:bg-[#020617] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
          >
            Our <span className="gradient-text">Technical Expertise</span>
          </motion.h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            We offer a wide range of engineering and digital services to bring your innovative ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-card p-8 rounded-[2rem] group hover:border-blue-500/50 transition-all duration-300 flex flex-col h-full"
            >
              <div className="mb-6 bg-slate-100 dark:bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow leading-relaxed">
                {service.description}
              </p>
              <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Starting at</p>
                  <p className="text-blue-600 dark:text-blue-400 font-bold text-xl">{service.price}</p>
                </div>
                <a 
                  href="#request-form"
                  className="bg-blue-600/10 text-blue-600 dark:bg-blue-600/20 dark:text-blue-400 p-3 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all"
                >
                  <Rocket className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
