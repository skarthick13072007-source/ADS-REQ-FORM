import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { db, storage } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Send, CheckCircle, Loader2, Upload, Paperclip, X } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number is required'),
  whatsapp: z.string().min(10, 'Valid WhatsApp number is required'),
  companyCollege: z.string().min(2, 'Company or College name is required'),
  projectType: z.string().min(1, 'Please select a project type'),
  description: z.string().min(20, 'Please provide a more detailed description'),
  features: z.string().min(10, 'Please list required features'),
  budget: z.string().min(1, 'Budget range is required'),
  deadline: z.string().min(1, 'Deadline is required'),
  referenceLink: z.string().url('Invalid URL').or(z.literal('')),
  notes: z.string().optional(),
});

const RequestForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [files, setFiles] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles([...files, ...selectedFiles]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Save text data to Firestore (Free on Spark Plan)
      await addDoc(collection(db, 'requests'), {
        ...data,
        status: 'New',
        createdAt: serverTimestamp(),
      });

      // Optional: Send to Google Sheets if backend is running
      try {
        await fetch('http://localhost:5000/api/submit-request', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      } catch (e) {
        console.log('Google Sheets sync skipped (Backend not running)');
      }

      setIsSuccess(true);
      reset();
      setFiles([]);
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Detailed Submission Error:', error);
      alert(`Failed to submit request: ${error.message || 'Unknown error'}. Please check your Firebase Console setup.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="request-form" className="py-24 bg-slate-50 dark:bg-[#020617] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block p-3 bg-blue-600/10 dark:bg-blue-600/20 rounded-2xl mb-4"
          >
            <Send className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Secure <span className="gradient-text">Project Request</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Submit your requirements securely. Our team will review and contact you within 24 hours.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-12 rounded-[2.5rem] shadow-2xl"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="form-label">Full Name *</label>
                <input {...register('fullName')} className="form-input" placeholder="John Doe" />
                {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="form-label">Email Address *</label>
                <input {...register('email')} className="form-input" placeholder="john@example.com" />
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="form-label">Phone Number *</label>
                <input {...register('phone')} className="form-input" placeholder="+91 00000 00000" />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="form-label">WhatsApp Number *</label>
                <input {...register('whatsapp')} className="form-input" placeholder="+91 00000 00000" />
                {errors.whatsapp && <p className="text-red-500 text-xs">{errors.whatsapp.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="form-label">Company / College Name *</label>
                <input {...register('companyCollege')} className="form-input" placeholder="Alpha Institute" />
                {errors.companyCollege && <p className="text-red-500 text-xs">{errors.companyCollege.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="form-label">Project Type *</label>
                <select {...register('projectType')} className="form-input appearance-none">
                  <option value="">Select Type</option>
                  <option value="website">Website Development</option>
                  <option value="pcb">PCB Design</option>
                  <option value="embedded">Embedded Systems</option>
                  <option value="iot">IoT Projects</option>
                  <option value="software">Software Development</option>
                  <option value="portfolio">Portfolio Website</option>
                </select>
                {errors.projectType && <p className="text-red-500 text-xs">{errors.projectType.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="form-label">Project Description *</label>
              <textarea {...register('description')} rows="4" className="form-input" placeholder="Describe your project in detail..."></textarea>
              {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="form-label">Required Features *</label>
              <textarea {...register('features')} rows="3" className="form-input" placeholder="e.g. Login system, Real-time tracking, Dashboard..."></textarea>
              {errors.features && <p className="text-red-500 text-xs">{errors.features.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="form-label">Budget Range *</label>
                <select {...register('budget')} className="form-input appearance-none">
                  <option value="">Select Budget</option>
                  <option value="under-5k">Under ₹5,000</option>
                  <option value="5k-15k">₹5,000 - ₹15,000</option>
                  <option value="15k-30k">₹15,000 - ₹30,000</option>
                  <option value="30k-plus">₹30,000+</option>
                </select>
                {errors.budget && <p className="text-red-500 text-xs">{errors.budget.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="form-label">Deadline *</label>
                <input type="date" {...register('deadline')} className="form-input" />
                {errors.deadline && <p className="text-red-500 text-xs">{errors.deadline.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="form-label">Reference Website Link</label>
                <input {...register('referenceLink')} className="form-input" placeholder="https://example.com" />
                {errors.referenceLink && <p className="text-red-500 text-xs">{errors.referenceLink.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="form-label">Deadline *</label>
                <input type="date" {...register('deadline')} className="form-input" />
                {errors.deadline && <p className="text-red-500 text-xs">{errors.deadline.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="form-label">Additional Notes</label>
              <textarea {...register('notes')} rows="2" className="form-input" placeholder="Any other specific requirements?"></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full gradient-button text-white font-bold py-4 rounded-2xl flex items-center justify-center text-lg shadow-xl disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2" /> Processing Securely...
                </>
              ) : (
                <>
                  Submit Request <Send className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </form>
        </motion.div>

        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm"
            >
              <div className="glass-card p-8 rounded-[2.5rem] text-center max-w-sm border-blue-500/30">
                <div className="bg-emerald-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="text-emerald-500 h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Request Submitted!</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Thank you for your trust. We have received your request and will get back to you shortly.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
                >
                  Done
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default RequestForm;
