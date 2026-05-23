import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, User, Calendar, MessageSquare, ShieldCheck } from 'lucide-react';
import { db } from '../firebase/config';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to real reviews from Firestore (Honest approach)
    const q = query(
      collection(db, 'reviews'), 
      orderBy('createdAt', 'desc'),
      limit(6)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reviewData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReviews(reviewData);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <section id="reviews" className="py-24 bg-white dark:bg-[#020617] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 px-4 py-2 rounded-full mb-6"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">100% Verified Client Feedback</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Our Client <span className="gradient-text">Experiences</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Real feedback from real clients. We pride ourselves on engineering excellence and transparent communication.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-500 font-bold uppercase tracking-widest text-xs">Fetching verified reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="glass-card p-12 rounded-[3rem] text-center max-w-2xl mx-auto border-blue-500/10">
            <MessageSquare className="w-12 h-12 text-blue-600 mx-auto mb-6 opacity-20" />
            <h3 className="text-xl font-bold dark:text-white mb-2">No Reviews Yet</h3>
            <p className="text-slate-500">Be the first to share your experience after completing a project with us!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-8 rounded-[2.5rem] relative border-blue-500/5 hover:border-blue-500/20 transition-all group"
                >
                  <div className="absolute top-8 right-8 text-blue-600/10 group-hover:text-blue-600/20 transition-colors">
                    <Quote size={48} />
                  </div>
                  
                  <div className="flex items-center space-x-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-slate-200 dark:text-slate-800'}`} 
                      />
                    ))}
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 italic mb-8 leading-relaxed relative z-10 text-lg">
                    "{review.content}"
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100 dark:border-white/5">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center font-black text-blue-600">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-slate-900 dark:text-white font-black">{review.name}</h4>
                        <p className="text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest">{review.projectType}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
