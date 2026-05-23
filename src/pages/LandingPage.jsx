import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import RequestForm from '../components/RequestForm';
import Footer from '../components/Footer';
import { motion, useScroll, useSpring } from 'framer-motion';

const LandingPage = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-slate-50 dark:bg-[#020617] min-h-screen">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 dark:bg-blue-500 origin-left z-[60]"
        style={{ scaleX }}
      />
      
      <Navbar />
      
      <main>
        <Hero />
        <Services />
        <RequestForm />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
