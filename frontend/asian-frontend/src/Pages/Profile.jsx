import React, { useState, useEffect } from 'react';
import { User, Phone, Mail, ChevronLeft, Save, CheckCircle, AlertCircle, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
    const { user, updateProfile } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        email: user?.email || user?.username || ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                phone: user.phone || '',
                email: user.email || user.username || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setMessage({ type: '', text: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage({ type: '', text: '' });

        try {
            await updateProfile({ name: formData.name, phone: formData.phone });
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            setTimeout(() => navigate('/home'), 1500);
        } catch (err) {
            setMessage({ type: 'error', text: err.message || 'Failed to update profile' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-24 font-sans">
            {/* Premium Header Area */}
            <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 pt-8 pb-32 px-6 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-80 h-80 bg-black/10 rounded-full blur-3xl"></div>

                <header className="flex items-center gap-4 relative z-10 mb-8">
                    <button
                        onClick={() => navigate('/home')}
                        className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white active:scale-95 transition-transform border border-white/20 hover:bg-white/20"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-3xl font-black text-white tracking-tight">Edit Profile</h1>
                </header>

                {/* Profile Avatar Section */}
                <div className="relative z-10 flex flex-col items-center">
                    <div className="relative">
                        <div className="w-28 h-28 bg-white/20 backdrop-blur-xl rounded-[2.5rem] flex items-center justify-center border-2 border-white/30 shadow-2xl overflow-hidden">
                            <User className="w-16 h-16 text-white" />
                        </div>
                        <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center border-2 border-white text-white shadow-lg active:scale-95 transition-all">
                            <Camera className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="mt-4 text-center">
                        <h2 className="text-2xl font-black text-white">{user?.name}</h2>
                        <p className="text-white/60 text-sm font-bold uppercase tracking-widest">{user?.role || 'Investor'}</p>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div className="px-6 -mt-10 relative z-20">
                <div className="bg-white rounded-[3rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-50">

                    {message.text && (
                        <div className={`mb-8 p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
                            }`}>
                            {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                            <p className="text-sm font-bold">{message.text}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Input */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Name</label>
                            <div className="relative group">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors">
                                    <User className="w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-[1.8rem] p-5 pl-14 font-bold text-slate-900 outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email Input (Read Only) */}
                        <div className="space-y-2 opacity-60">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Email Address (Locked)</label>
                            <div className="relative">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <input
                                    type="email"
                                    value={formData.email}
                                    readOnly
                                    className="w-full bg-slate-100 border-2 border-transparent rounded-[1.8rem] p-5 pl-14 font-bold text-slate-500 outline-none cursor-not-allowed"
                                />
                            </div>
                        </div>

                        {/* Phone Input */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Phone Number</label>
                            <div className="relative group">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter your phone number"
                                    className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-[1.8rem] p-5 pl-14 font-bold text-slate-900 outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white font-black py-6 rounded-[2.2rem] shadow-2xl shadow-indigo-100 hover:scale-[1.02] active:scale-[0.98] transition-all flex justify-center items-center gap-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        Save Changes
                                        <Save className="w-6 h-6" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Decorative Background Elements */}
            <div className="fixed top-0 right-0 w-full h-full pointer-events-none z-[-1] opacity-[0.03]">
                <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] bg-purple-600 rounded-full blur-[100px]"></div>
            </div>
        </div>
    );
}
