import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck, Users } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Target className="h-6 w-6 text-blue-400" />,
      title: "Our Mission",
      desc: "To empower students, startups, and businesses by providing high-quality, scalable, and affordable digital solutions."
    },
    {
      icon: <Eye className="h-6 w-6 text-indigo-400" />,
      title: "Our Vision",
      desc: "To become a leading digital innovation hub that bridges the gap between engineering concepts and practical applications."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-emerald-400" />,
      title: "Quality First",
      desc: "We focus on clean code, modern UI/UX, and robust performance in every project we undertake."
    },
    {
      icon: <Users className="h-6 w-6 text-purple-400" />,
      title: "Client Centric",
      desc: "Your success is our priority. We work closely with you to bring your unique ideas to life."
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#0f172a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              About <span className="gradient-text">Alpha Digitronix Solutions</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Founded with a passion for digital excellence, Alpha Digitronix Solutions is more than just a web development agency. We are a team of practical engineers and digital innovators dedicated to building the next generation of web platforms.
            </p>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Whether you are a college student looking for a project mentor, a startup founder needing a landing page, or a local business ready to go digital, we have the expertise to make it happen.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((item, idx) => (
                <div key={idx} className="flex space-x-4">
                  <div className="mt-1 bg-white/5 p-2 rounded-lg h-fit">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">{item.title}</h4>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" 
                alt="Team working" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-blue-600/20 mix-blend-multiply"></div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
