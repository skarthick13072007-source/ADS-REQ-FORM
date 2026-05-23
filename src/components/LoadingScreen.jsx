import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-white dark:bg-[#020617] z-[100] flex flex-col items-center justify-center">
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="mb-8"
      >
        <Rocket className="h-16 w-16 text-blue-600 dark:text-blue-500" />
      </motion.div>
      
      <div className="w-48 h-1 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-full h-full bg-blue-600 dark:bg-blue-500"
        />
      </div>
      
      <p className="mt-6 text-slate-600 dark:text-blue-400 font-bold tracking-widest uppercase text-xs animate-pulse">
        Alpha Digitronix
      </p>
    </div>
  );
};

export default LoadingScreen;
