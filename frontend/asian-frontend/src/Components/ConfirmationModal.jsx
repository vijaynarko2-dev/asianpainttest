import React from 'react';
import { X, CheckCircle, ShieldCheck, TrendingUp, Clock, Info } from 'lucide-react';

const ConfirmationModal = ({ open, plan, onClose, onConfirm }) => {
    if (!open || !plan) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <div className="bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] w-full max-w-[420px] relative overflow-hidden animate-in fade-in zoom-in duration-300">

                {/* Header Section */}
                <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 p-10 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>

                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-2xl flex items-center justify-center text-white transition-all z-20 backdrop-blur-md"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-[2.5rem] flex items-center justify-center mb-6 border border-white/30 shadow-2xl">
                            <span className="text-3xl font-black text-white">ap</span>
                        </div>
                        <h2 className="text-2xl font-black text-white tracking-tight leading-tight">{plan.name}</h2>
                        <div className="mt-3 inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/20">
                            <Clock className="w-3.5 h-3.5 text-white/80" />
                            <span className="text-white text-[10px] font-black uppercase tracking-widest">{plan.duration} Investment</span>
                        </div>
                    </div>
                </div>

                {/* Details Section */}
                <div className="p-8 pb-10">
                    <div className="bg-slate-50 rounded-[2.5rem] p-6 mb-8 border border-slate-100">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-5 bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Entry Price</p>
                                <p className="text-xl font-black text-slate-900 tracking-tighter">₹{plan.eachPrice.toLocaleString()}</p>
                            </div>
                            <div className="p-5 bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Daily ROI</p>
                                <p className="text-xl font-black text-emerald-500 tracking-tighter">₹{plan.dailyEarnings.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="mt-4 p-5 bg-indigo-600 rounded-3xl flex items-center justify-between text-white shadow-lg shadow-indigo-100">
                            <div>
                                <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest leading-none mb-1">Total Predicted Return</p>
                                <p className="text-2xl font-black tracking-tight">₹{plan.totalGain.toLocaleString()}</p>
                            </div>
                            <ShieldCheck className="w-8 h-8 opacity-40" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={onConfirm}
                            className="w-full bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white font-black py-5 rounded-[2rem] shadow-xl shadow-indigo-100 active:scale-95 transition-all text-lg flex items-center justify-center gap-2 group"
                        >
                            Proceed to Invest
                            <TrendingUp className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform" />
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full text-slate-400 font-bold py-3 hover:text-slate-600 transition-colors"
                        >
                            Review Details Again
                        </button>
                    </div>

                    <div className="mt-6 flex items-start gap-3 px-2 py-3 bg-amber-50 rounded-2xl border border-amber-100/50">
                        <Info className="w-4 h-4 text-amber-600 mt-0.5" />
                        <p className="text-[10px] text-amber-800 font-bold leading-relaxed">
                            By proceeding, you agree to the investment terms. Profits are credited daily to your account.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
