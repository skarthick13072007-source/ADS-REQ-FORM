import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Rocket, Mail, Lock, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      // Show specific Firebase error messages
      if (err.code === 'auth/user-not-found') {
        setError('No admin found with this email.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password.');
      } else if (err.code === 'auth/invalid-email') {
        setError('The email address is not valid.');
      } else if (err.code === 'auth/operation-not-allowed') {
        setError('Email/Password login is not enabled in Firebase Console.');
      } else {
        setError('Login failed: ' + err.message);
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 dark:bg-blue-600/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 dark:bg-indigo-600/5 rounded-full blur-[120px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <button 
            onClick={() => navigate('/')}
            className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-6 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" /> Back to Website
          </button>
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-4 rounded-[1.5rem] shadow-xl shadow-blue-500/20">
              <Rocket className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Admin Portal</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Sign in to manage secure client requests</p>
        </div>

        <div className="glass-card p-8 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-white/10 shadow-2xl relative">
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
          
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center space-x-3 mb-6 text-red-600 dark:text-red-400 text-sm font-medium"
            >
              <AlertCircle size={20} className="shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="form-label">Admin Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors h-5 w-5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input pl-12"
                  placeholder="admin@alpha.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="form-label">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors h-5 w-5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input pl-12"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full gradient-button text-white font-bold py-4 rounded-2xl flex items-center justify-center text-lg shadow-xl disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'Sign In Securely'}
            </button>
          </form>
          
          <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/5 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-500 uppercase tracking-widest font-bold">
              Alpha Digitronix Security Protocol
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
