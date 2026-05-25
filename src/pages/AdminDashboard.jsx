import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo/logo.jpg';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Search, 
  Download, 
  MessageSquare, 
  Filter,
  CheckCircle2,
  Clock,
  Loader2,
  ExternalLink,
  Trash2,
  Plus,
  TrendingUp,
  MoreVertical,
  ChevronRight,
  Shield,
  Calendar,
  Rocket
} from 'lucide-react';
import { collection, query, orderBy, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import * as XLSX from 'xlsx';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
  const { logout, userData, isSuperAdmin, isAdmin, dbStatus } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#020617] flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-amber-500/10 p-10 rounded-[2.5rem] mb-8">
          <Shield size={64} className="text-amber-500 mx-auto" />
        </div>
        <h1 className="text-3xl font-black dark:text-white mb-4">Final Setup Step</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6 leading-relaxed font-medium">
          You have successfully logged in, but your account is not yet an Admin in the database.
        </p>
        
        <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-slate-200 dark:border-white/10 mb-10 w-full max-w-md">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 text-left">Your Unique Admin ID (UID)</p>
          <div className="flex items-center justify-between bg-slate-100 dark:bg-black/20 p-3 rounded-xl">
            <code className="text-blue-600 dark:text-blue-400 font-bold break-all text-sm">{useAuth().currentUser?.uid}</code>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(useAuth().currentUser?.uid);
                alert('UID Copied! Now paste this as the Document ID in your "admins" collection.');
              }}
              className="ml-4 p-2 hover:bg-blue-500/10 rounded-lg text-blue-600 transition-all"
              title="Copy UID"
            >
              <FileText size={18} />
            </button>
          </div>
          <p className="text-[10px] text-slate-500 mt-3 text-left leading-relaxed">
            Copy this ID and use it as the **Document ID** in your Firestore <b>'admins'</b> collection.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <a 
            href="https://console.firebase.google.com/project/alpha-digitronix/firestore/data"
            target="_blank"
            rel="noreferrer"
            className="gradient-button px-8 py-4 rounded-2xl font-bold flex items-center justify-center space-x-3"
          >
            <ExternalLink size={20} />
            <span>Open Firebase Console</span>
          </a>
          <button 
            onClick={handleLogout}
            className="bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center space-x-3"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    );
  }

  // Safe header title logic
  const getHeaderTitle = () => {
    if (location.pathname === '/admin') return 'Dashboard Overview';
    if (location.pathname === '/admin/requests') return 'Client Requests';
    if (location.pathname === '/admin/users') return 'Admin Management';
    return 'Settings';
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] flex text-slate-900 dark:text-gray-200">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-[#0f172a] border-r border-slate-200 dark:border-white/5 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex flex-col h-full">
          <div className="p-8 flex items-center justify-between">
            <Link to="/admin" className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg">
                <img src={logo} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl font-bold dark:text-white">Alpha <span className="text-blue-600">Admin</span></span>
            </Link>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-500">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 px-6 space-y-2 mt-4">
            <NavItem icon={<LayoutDashboard size={20} />} label="Overview" to="/admin" />
            <NavItem icon={<FileText size={20} />} label="Requests" to="/admin/requests" />
            {isSuperAdmin && <NavItem icon={<Users size={20} />} label="Manage Admins" to="/admin/users" />}
            <NavItem icon={<Settings size={20} />} label="Settings" to="/admin/settings" />
          </nav>

          <div className="p-6 border-t border-slate-100 dark:border-white/5">
            <div className="flex items-center space-x-3 p-4 rounded-2xl bg-slate-100 dark:bg-white/5 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20 text-xl">
                {userData?.fullName?.charAt(0) || 'A'}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-bold dark:text-white truncate">{userData?.fullName || 'Admin'}</p>
                <div className="flex items-center text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest mt-0.5">
                  <Shield size={10} className="mr-1" />
                  {userData?.role?.replace('_', ' ') || 'Editor'}
                </div>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 p-4 rounded-2xl text-slate-500 hover:text-red-500 hover:bg-red-500/10 transition-all font-bold"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 flex items-center justify-between px-8 z-40">
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-slate-500">
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-bold hidden sm:block">
              {getHeaderTitle()}
            </h2>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input 
                type="text" 
                placeholder="Search everywhere..." 
                className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500 w-64 transition-all"
              />
            </div>
            <div className={`flex items-center space-x-3 px-4 py-2 rounded-full border ${
              dbStatus === 'online' ? 'bg-emerald-500/10 border-emerald-500/20' : 
              dbStatus === 'checking' ? 'bg-amber-500/10 border-amber-500/20' : 
              'bg-red-500/10 border-red-500/20'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                dbStatus === 'online' ? 'bg-emerald-500 animate-pulse' : 
                dbStatus === 'checking' ? 'bg-amber-500 animate-bounce' : 
                'bg-red-500'
              }`}></div>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${
                dbStatus === 'online' ? 'text-emerald-600 dark:text-emerald-400' : 
                dbStatus === 'checking' ? 'text-amber-600 dark:text-amber-400' : 
                'text-red-600 dark:text-red-400'
              }`}>
                {dbStatus === 'online' ? 'Secure Server Online' : 
                 dbStatus === 'checking' ? 'Connecting to Database...' : 
                 'Database Offline'}
              </span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/requests" element={<RequestsTable />} />
            {isSuperAdmin && <Route path="/users" element={<AdminManagement />} />}
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, to }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`flex items-center space-x-4 p-4 rounded-2xl transition-all font-bold ${isActive ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30' : 'text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:bg-blue-600/5 dark:hover:bg-white/5'}`}
    >
      {icon}
      <span>{label}</span>
      {isActive && <motion.div layoutId="nav-active" className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_white]" />}
    </Link>
  );
};

const DashboardHome = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'requests'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reqData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRequests(reqData);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const stats = [
    { label: 'Total Requests', value: requests.length, icon: <FileText size={24} />, color: 'blue', trend: '+12% this week' },
    { label: 'New Submissions', value: requests.filter(r => r.status === 'New').length, icon: <Clock size={24} />, color: 'amber', trend: 'Needs attention' },
    { label: 'Project Success', value: requests.filter(r => r.status === 'Completed').length, icon: <CheckCircle2 size={24} />, color: 'emerald', trend: 'High completion rate' },
  ];

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-8 rounded-[2.5rem] relative overflow-hidden group"
          >
            <div className={`absolute -right-6 -top-6 w-32 h-32 bg-${stat.color}-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700`}></div>
            <div className="flex items-center justify-between mb-6">
              <div className={`p-4 rounded-2xl bg-${stat.color}-500/10 text-${stat.color}-600 dark:text-${stat.color}-400`}>
                {stat.icon}
              </div>
              <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Real-time data
              </div>
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-wider">{stat.label}</p>
            <div className="flex items-baseline space-x-4 mt-2">
              <h3 className="text-4xl font-extrabold dark:text-white">{stat.value}</h3>
              <span className={`text-xs font-bold ${stat.color === 'emerald' ? 'text-emerald-500' : 'text-slate-400'}`}>
                {stat.trend}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="glass-card rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/5">
          <div className="p-8 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
            <h3 className="text-xl font-extrabold dark:text-white">Recent Requests</h3>
            <Link to="/admin/requests" className="text-blue-600 hover:underline text-sm font-bold flex items-center">
              View all <ChevronRight size={16} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                  <th className="px-8 py-5">Client</th>
                  <th className="px-8 py-5">Type</th>
                  <th className="px-8 py-5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {loading ? (
                  <tr><td colSpan="3" className="p-10 text-center"><Loader2 className="animate-spin mx-auto h-8 w-8 text-blue-600" /></td></tr>
                ) : requests.slice(0, 5).map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-6">
                      <p className="font-bold dark:text-white group-hover:text-blue-600 transition-colors">{req.fullName}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{req.companyCollege}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                        {req.projectType}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${req.status === 'Completed' ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-amber-500 shadow-[0_0_8px_#f59e0b]'}`}></div>
                        <span className="text-xs font-bold">{req.status}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-card rounded-[2.5rem] p-8 border border-slate-200 dark:border-white/5">
          <h3 className="text-xl font-extrabold dark:text-white mb-8">System Analytics</h3>
          <div className="space-y-8">
            <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-white/5 rounded-3xl">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-600 p-3 rounded-2xl text-white">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold dark:text-white">Submission Rate</p>
                  <p className="text-xs text-slate-500">Compared to last month</p>
                </div>
              </div>
              <span className="text-emerald-500 font-extrabold text-xl">+24%</span>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-3xl text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Avg. Response</p>
                <p className="text-2xl font-extrabold dark:text-white">1.2 hrs</p>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-3xl text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Conversion</p>
                <p className="text-2xl font-extrabold dark:text-white">18.5%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RequestsTable = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const { isSuperAdmin } = useAuth();

  useEffect(() => {
    const q = query(collection(db, 'requests'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reqData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRequests(reqData);
      setFilteredRequests(reqData);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    let result = requests;
    if (search) {
      result = result.filter(r => 
        r.fullName.toLowerCase().includes(search.toLowerCase()) || 
        r.companyCollege.toLowerCase().includes(search.toLowerCase()) ||
        r.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (statusFilter !== 'All') {
      result = result.filter(r => r.status === statusFilter);
    }
    if (typeFilter !== 'All') {
      result = result.filter(r => r.projectType === typeFilter);
    }
    setFilteredRequests(result);
  }, [search, statusFilter, typeFilter, requests]);

  const updateStatus = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, 'requests', id), { status: newStatus });
    } catch (err) {
      console.error(err);
    }
  };

  const updatePayment = async (id, field, value) => {
    try {
      await updateDoc(doc(db, 'requests', id), { [field]: value });
    } catch (err) {
      console.error('Error updating payment:', err);
    }
  };

  const deleteRequest = async (id) => {
    if (window.confirm('WARNING: Are you sure you want to permanently delete this request? This action cannot be undone.')) {
      try {
        await deleteDoc(doc(db, 'requests', id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const exportToExcel = () => {
    const dataToExport = filteredRequests.map(r => ({
      'ID': r.id,
      'Date': r.createdAt?.toDate().toLocaleDateString(),
      'Time': r.createdAt?.toDate().toLocaleTimeString(),
      'Client Name': r.fullName,
      'Email': r.email,
      'Phone': r.phone,
      'WhatsApp': r.whatsapp,
      'Company/College': r.companyCollege,
      'Project Type': r.projectType,
      'Budget': r.budget,
      'Deadline': r.deadline,
      'Status': r.status,
      'Payment Amount': r.paymentAmount || '0',
      'Payment Status': r.paymentStatus || 'Unpaid',
      'Description': r.description,
      'Required Features': r.features,
      'Notes': r.notes,
      'Reference Link': r.referenceLink
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Client Requests");
    XLSX.writeFile(workbook, `Alpha_Digitronix_Requests_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input 
              type="text" 
              placeholder="Search clients, companies, emails..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 rounded-2xl pl-12 pr-6 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-full md:w-80 shadow-sm"
            />
          </div>
          <div className="flex items-center gap-3">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-3.5 text-sm font-bold focus:outline-none shadow-sm"
            >
              <option value="All">All Status</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-3.5 text-sm font-bold focus:outline-none shadow-sm"
            >
              <option value="All">All Types</option>
              <option value="website">Websites</option>
              <option value="pcb">PCB</option>
              <option value="embedded">Embedded</option>
              <option value="iot">IoT</option>
              <option value="software">Software</option>
            </select>
          </div>
        </div>

        {isSuperAdmin && (
          <button 
            onClick={exportToExcel}
            className="flex items-center justify-center space-x-3 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-2xl font-extrabold transition-all shadow-xl shadow-emerald-500/20 group"
          >
            <Download size={20} className="group-hover:-translate-y-1 transition-transform" />
            <span>Export Database to Excel</span>
          </button>
        )}
      </div>

      <div className="glass-card rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/5 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                <th className="px-8 py-6">Client & Company</th>
                <th className="px-8 py-6">Project Info</th>
                <th className="px-8 py-6">Timeline & Budget</th>
                <th className="px-8 py-6">Payments (Admin)</th>
                <th className="px-8 py-6">Status Control</th>
                <th className="px-8 py-6 text-right">Secure Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-8 py-24 text-center">
                    <Loader2 className="animate-spin mx-auto h-12 w-12 text-blue-600" />
                    <p className="mt-4 text-slate-500 font-bold uppercase tracking-widest text-xs">Deciphering database...</p>
                  </td>
                </tr>
              ) : filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-8 py-24 text-center text-slate-500 font-bold">
                    No requests found matching your filters.
                  </td>
                </tr>
              ) : filteredRequests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-7">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center font-black text-lg">
                        {req.fullName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black dark:text-white">{req.fullName}</p>
                        <p className="text-xs text-slate-500 font-medium">{req.email}</p>
                        <p className="text-[10px] text-blue-600 dark:text-blue-400 font-bold mt-1 uppercase tracking-wider">{req.companyCollege}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-7">
                    <span className="text-[10px] font-black px-3 py-1.5 rounded-lg bg-blue-600/10 text-blue-600 dark:text-blue-400 uppercase tracking-widest block w-fit mb-2">
                      {req.projectType}
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 max-w-[250px] leading-relaxed italic">
                      "{req.description}"
                    </p>
                  </td>
                  <td className="px-8 py-7">
                    <div className="space-y-2">
                      <div className="flex items-center text-xs font-bold text-slate-600 dark:text-slate-300">
                        <Calendar size={14} className="mr-2 text-blue-500" />
                        {req.deadline}
                      </div>
                      <div className="flex items-center text-xs font-black text-emerald-600 dark:text-emerald-400">
                        <TrendingUp size={14} className="mr-2" />
                        {req.budget}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-7">
                    <div className="space-y-3">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">₹</span>
                        <input 
                          type="text"
                          placeholder="0.00"
                          value={req.paymentAmount || ''}
                          onChange={(e) => updatePayment(req.id, 'paymentAmount', e.target.value)}
                          className="w-24 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg pl-6 pr-2 py-1.5 text-xs font-bold focus:outline-none focus:border-blue-500 transition-all"
                        />
                      </div>
                      <select 
                        value={req.paymentStatus || 'Unpaid'}
                        onChange={(e) => updatePayment(req.id, 'paymentStatus', e.target.value)}
                        className={`text-[10px] font-black px-3 py-1.5 rounded-lg border-none focus:ring-0 cursor-pointer uppercase tracking-widest ${
                          req.paymentStatus === 'Paid' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'
                        }`}
                      >
                        <option value="Unpaid">Unpaid</option>
                        <option value="Partial">Partial</option>
                        <option value="Paid">Paid</option>
                      </select>
                    </div>
                  </td>
                  <td className="px-8 py-7">
                    <select 
                      value={req.status}
                      onChange={(e) => updateStatus(req.id, e.target.value)}
                      className={`text-[10px] font-black px-4 py-2 rounded-xl border-none focus:ring-0 cursor-pointer uppercase tracking-widest shadow-sm ${
                        req.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 
                        req.status === 'In Progress' ? 'bg-blue-600/10 text-blue-600 dark:text-blue-400' :
                        req.status === 'Contacted' ? 'bg-purple-600/10 text-purple-600 dark:text-purple-400' : 
                        'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td className="px-8 py-7 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-3 hover:bg-blue-600/10 rounded-2xl text-slate-400 hover:text-blue-600 transition-all">
                        <MessageSquare size={18} />
                      </button>
                      {req.files && req.files.length > 0 && (
                        <div className="relative group/files">
                          <button className="p-3 bg-blue-600/5 hover:bg-blue-600/10 rounded-2xl text-blue-600 transition-all">
                            <ExternalLink size={18} />
                          </button>
                          <div className="absolute right-0 top-full mt-2 w-64 glass-card p-4 rounded-3xl opacity-0 translate-y-4 pointer-events-none group-hover/files:opacity-100 group-hover/files:translate-y-0 group-hover/files:pointer-events-auto transition-all z-50 shadow-2xl">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Project Assets</p>
                            <div className="space-y-2">
                              {req.files.map((file, i) => (
                                <a key={i} href={file.url} target="_blank" rel="noreferrer" className="flex items-center p-2 hover:bg-blue-500/10 rounded-xl text-xs font-bold text-blue-600 truncate">
                                  <FileText size={14} className="mr-2" />
                                  {file.name}
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      {isSuperAdmin && (
                        <button 
                          onClick={() => deleteRequest(req.id)}
                          className="p-3 hover:bg-red-500/10 rounded-2xl text-slate-400 hover:text-red-500 transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AdminManagement = () => {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <div className="bg-blue-600/10 p-10 rounded-[2.5rem] mb-8 relative">
        <div className="absolute -top-4 -right-4 bg-emerald-500 text-white p-2 rounded-xl shadow-lg">
          <Shield size={24} />
        </div>
        <Users className="h-20 w-20 text-blue-600" />
      </div>
      <h2 className="text-3xl font-black dark:text-white mb-4 tracking-tight">Admin Management</h2>
      <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed font-medium">
        Control who can access the Alpha Digitronix database. Add, remove, or modify administrative roles.
      </p>
      <button className="mt-10 flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-[1.5rem] font-black transition-all shadow-2xl shadow-blue-500/40 group">
        <Plus size={24} className="group-hover:rotate-90 transition-transform" />
        <span>Register New Admin Account</span>
      </button>
    </div>
  );
};

const SettingsPage = () => {
  return (
    <div className="max-w-4xl space-y-10">
      <div className="glass-card p-10 rounded-[2.5rem] border border-slate-200 dark:border-white/5">
        <h3 className="text-xl font-extrabold dark:text-white mb-8 flex items-center">
          <Shield size={24} className="mr-3 text-blue-600" />
          Security Settings
        </h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-white/5 rounded-3xl">
            <div>
              <p className="font-bold dark:text-white">Two-Factor Authentication</p>
              <p className="text-sm text-slate-500">Secure admin login with OTP</p>
            </div>
            <div className="w-14 h-7 bg-blue-600 rounded-full relative px-1 flex items-center cursor-pointer">
              <div className="w-5 h-5 bg-white rounded-full shadow-md ml-auto"></div>
            </div>
          </div>
          <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-white/5 rounded-3xl">
            <div>
              <p className="font-bold dark:text-white">Session Timeout</p>
              <p className="text-sm text-slate-500">Automatically logout after 30 mins</p>
            </div>
            <div className="w-14 h-7 bg-slate-300 dark:bg-slate-700 rounded-full relative px-1 flex items-center cursor-pointer">
              <div className="w-5 h-5 bg-white rounded-full shadow-md"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
