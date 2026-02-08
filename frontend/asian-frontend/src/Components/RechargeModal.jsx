import React, { useState, useEffect } from 'react';
import { ChevronLeft, ArrowRight, Upload, Wallet, Copy, Clock, ShieldCheck, Check } from 'lucide-react';
import { useAuth } from "../contexts/AuthContext";
import API_URL from '../config/api';

const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
};

const RechargeModal = ({ isOpen, onClose, initialAmount, planDetails }) => {
    const [amount, setAmount] = useState(initialAmount || 750);
    const [step, setStep] = useState(1); // 1: Amount, 2: Payment (QR + UTR)
    const [qrData, setQrData] = useState(null);
    const [utr, setUtr] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        if (planDetails) {
            setAmount(planDetails.investmentAmount);
        } else if (initialAmount) {
            setAmount(initialAmount);
        }
    }, [initialAmount, planDetails, isOpen]);

    useEffect(() => {
        if (!isOpen) {
            setStep(1);
            setUtr("");
        }
    }, [isOpen]);

    useEffect(() => {
        if (step === 2 && !qrData && isOpen) {
            fetchQrCode();
        }
    }, [step, isOpen]);

    const fetchQrCode = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/api/payment/v1/qr`, { withCredentials: true });
            if (data.success) {
                setQrData(data.qr);
            }
        } catch (error) {
            console.error("Failed to fetch QR", error);
        }
    };

    const handleSubmit = async () => {
        if (!utr) return alert("Please enter Transaction ID / UTR");
        setLoading(true);
        try {
            await axios.post(`${API_URL}/api/payment/v1/submit`, {
                amount,
                utr,
                planDetails: planDetails || null
            }, { withCredentials: true });

            alert("Payment Submitted! Verification Pending.");
            onClose();
        } catch (error) {
            alert(error.response?.data?.message || "Submission Failed");
        } finally {
            setLoading(false);
        }
    };

    const presets = [750, 2300, 5300, 13500, 28000, 58000];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <div className="bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] w-full max-w-[440px] relative overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col max-h-[95vh]">

                {/* Dynamic Header */}
                <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 p-8 text-white relative shrink-0">
                    <button
                        onClick={step === 1 ? onClose : () => setStep(1)}
                        className="absolute left-6 top-8 w-10 h-10 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center active:scale-90 transition-transform border border-white/20"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <div className="text-center mt-2">
                        <h2 className="text-2xl font-black">{step === 1 ? "Recharge Wallet" : "Secure Payment"}</h2>
                        <div className="flex items-center justify-center gap-2 mt-2 opacity-70">
                            <div className={`w-2 h-2 rounded-full ${step >= 1 ? 'bg-white' : 'bg-white/30'}`}></div>
                            <div className="w-8 h-[2px] bg-white/30 rounded-full overflow-hidden">
                                <div className={`h-full bg-white transition-all duration-500 ${step === 2 ? 'w-full' : 'w-0'}`}></div>
                            </div>
                            <div className={`w-2 h-2 rounded-full ${step === 2 ? 'bg-white' : 'bg-white/30'}`}></div>
                        </div>
                    </div>
                </div>

                <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar">

                    {step === 1 && (
                        <div className="animate-in slide-in-from-right-4 duration-300">
                            <div className="mb-8">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-2">Recharge Amount (INR)</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-6 flex items-center text-slate-300 font-black text-2xl">₹</div>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(Number(e.target.value))}
                                        className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-[2rem] p-6 pl-12 text-4xl font-black text-slate-900 outline-none transition-all shadow-inner"
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3 mb-10">
                                {presets.map((preset) => (
                                    <button
                                        key={preset}
                                        onClick={() => setAmount(preset)}
                                        className={`py-4 rounded-3xl text-[10px] font-black border-2 transition-all ${amount === preset ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-slate-50 border-transparent text-slate-500 hover:border-slate-200'}`}
                                    >
                                        +₹{preset}
                                    </button>
                                ))}
                            </div>

                            <button
                                className="w-full bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white font-black py-6 rounded-[2.5rem] shadow-2xl shadow-indigo-100 hover:scale-[1.02] active:scale-[0.98] transition-all flex justify-center items-center gap-3 text-lg"
                                onClick={() => setStep(2)}
                            >
                                Continue to Pay <ArrowRight className="w-6 h-6" />
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="flex flex-col animate-in slide-in-from-right-4 duration-300">
                            {/* QR & Amount Info */}
                            <div className="bg-slate-50 rounded-[3rem] p-8 mb-8 border border-slate-100 flex flex-col items-center">
                                <div className="text-center mb-6">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount Payable</p>
                                    <p className="text-4xl font-black text-slate-900 tracking-tighter">₹{amount.toLocaleString()}</p>
                                </div>

                                <div className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 mb-6 relative group">
                                    {qrData?.upiId ? (
                                        <img
                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(`upi://pay?pa=${qrData.upiId}&pn=AsianPaints&am=${amount}&cu=INR`)}`}
                                            alt="Dynamic UPI QR"
                                            className="w-48 h-48 object-contain"
                                        />
                                    ) : qrData?.imageUrl ? (
                                        <img
                                            src={`${API_URL}/${qrData.imageUrl.replace(/\\/g, '/')}`}
                                            alt="Static QR"
                                            className="w-48 h-48 object-contain"
                                            onError={(e) => e.target.src = "https://via.placeholder.com/200?text=QR+Not+Found"}
                                        />
                                    ) : (
                                        <div className="w-48 h-48 bg-slate-50 rounded-3xl flex items-center justify-center">
                                            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                    )}
                                </div>

                                {qrData?.upiId && (
                                    <button
                                        onClick={() => copyToClipboard(qrData.upiId)}
                                        className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-200 text-[10px] font-black text-slate-600 hover:bg-slate-50 active:scale-95 transition-all"
                                    >
                                        <Copy className="w-3.5 h-3.5" />
                                        {qrData.upiId}
                                    </button>
                                )}
                            </div>

                            {/* UTR Input */}
                            <div className="space-y-4 mb-10">
                                <div className="flex items-center justify-between px-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction UTR / ID</label>
                                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                </div>
                                <input
                                    type="text"
                                    value={utr}
                                    onChange={(e) => setUtr(e.target.value)}
                                    className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-[2rem] p-6 text-xl font-black text-slate-900 outline-none transition-all placeholder:text-slate-300"
                                    placeholder="Enter 12-digit UTR"
                                />
                                <div className="flex gap-3 items-center bg-blue-50/50 rounded-2xl p-4 border border-blue-100/50">
                                    <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                                    <p className="text-[10px] text-blue-700 font-bold leading-relaxed">
                                        Verification takes 2-5 minutes. Please ensure the UTR is correct to avoid delays.
                                    </p>
                                </div>
                            </div>

                            <button
                                className="w-full bg-slate-900 text-white font-black py-6 rounded-[2.5rem] shadow-2xl active:scale-95 transition-all disabled:opacity-50 text-lg flex items-center justify-center gap-3"
                                onClick={handleSubmit}
                                disabled={loading || !utr}
                            >
                                {loading ? "Verifying Transaction..." : "Submit for Approval"}
                                <Check className="w-6 h-6" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RechargeModal;
