import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What is the typical delivery time for a website?",
    answer: "Delivery time depends on the complexity of the project. A basic portfolio can be ready in 3-5 days, while a complex e-commerce or custom application might take 2-4 weeks. We always provide a clear timeline after discussing your requirements."
  },
  {
    question: "How much do you charge for a custom website?",
    answer: "Our pricing starts from ₹2,999 for student projects and ₹4,999 for professional portfolios. Each project is unique, so we provide custom quotes based on the features, design complexity, and deadline."
  },
  {
    question: "Do you provide website maintenance services?",
    answer: "Yes, we offer monthly maintenance packages that include security updates, performance optimization, content updates, and regular backups to keep your website running smoothly."
  },
  {
    question: "Will my website be mobile-responsive?",
    answer: "Absolutely! Every website we build is mobile-first and fully responsive, meaning it will look and function perfectly on smartphones, tablets, and desktops."
  },
  {
    question: "Do you help with hosting and domain registration?",
    answer: "Yes, we assist our clients in choosing the best hosting providers and registering domains. We can also handle the entire deployment process for you."
  },
  {
    question: "Is there any post-launch support?",
    answer: "We provide 30 days of free support after the website goes live to ensure everything is working as expected and to fix any minor issues that may arise."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section id="faq" className="py-24 bg-[#0f172a]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            Frequently Asked <span className="gradient-text">Questions</span>
          </motion.h2>
          <p className="text-gray-400 text-lg">
            Everything you need to know about our services and process.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="glass-card rounded-2xl overflow-hidden border border-white/5"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-lg font-bold text-white pr-8">{faq.question}</span>
                <ChevronDown 
                  className={`h-5 w-5 text-blue-400 transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`} 
                />
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 mt-2">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
