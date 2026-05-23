import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: "Eco-Shop E-Commerce",
    category: "E-Commerce",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80",
    description: "A full-featured sustainable product marketplace with secure checkout.",
  },
  {
    title: "Student Connect Portal",
    category: "College Project",
    image: "https://images.unsplash.com/photo-1523240715639-963c7108920b?w=800&q=80",
    description: "Social networking and resource sharing platform for university students.",
  },
  {
    title: "Nova Tech Landing",
    category: "Startup",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    description: "Premium SaaS landing page with dark glassmorphism design.",
  },
  {
    title: "FitLife Tracker",
    category: "Custom Web App",
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80",
    description: "Health and workout tracking application with data visualization.",
  },
  {
    title: "Gourmet Garden",
    category: "Business Website",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    description: "Elegant restaurant website with online booking and menu management.",
  },
  {
    title: "Dream Wedding",
    category: "Event Website",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
    description: "Complete event management platform for grand celebrations.",
  },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 bg-[#0f172a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            Our <span className="gradient-text">Success Stories</span>
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Explore our latest projects and see how we've helped businesses and individuals achieve their digital goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group glass-card rounded-3xl overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-60"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-6 line-clamp-2">
                  {project.description}
                </p>
                <button className="flex items-center text-blue-400 font-bold hover:text-blue-300 transition-colors group-hover:translate-x-2 transition-transform">
                  Visit Project <ExternalLink className="ml-2 h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
