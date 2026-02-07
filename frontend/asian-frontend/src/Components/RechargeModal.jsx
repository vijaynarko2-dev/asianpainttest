import React, { useState, useEffect } from 'react';
import { ChevronLeft, ArrowRight, Upload } from 'lucide-react';
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

// Helper to copy UPI ID (Mock)
const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
};

const RechargeModal = ({ isOpen, onClose, initialAmount }) => {
    const [amount, setAmount] = useState(initialAmount || 750);
    const [step, setStep] = useState(1); // 1: Amount, 2: Payment (QR + UTR)
    const [qrData, setQrData] = useState(null);
    const [utr, setUtr] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        if (initialAmount) setAmount(initialAmount);
    }, [initialAmount]);

    useEffect(() => {
        if (!isOpen) {
            setStep(1);
            setUtr("");
        }
    }, [isOpen]);

    // Fetch QR Code when step 2 opens
    useEffect(() => {
        if (step === 2 && !qrData) {
            fetchQrCode();
        }
    }, [step]);

    const fetchQrCode = async () => {
        try {
            const { data } = await axios.get("http://localhost:3000/api/payment/v1/qr", { withCredentials: true });
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
            await axios.post("http://localhost:3000/api/payment/v1/submit", {
                amount,
                utr,
            }, { withCredentials: true });

            alert("Payment Submitted! Verification Pending.");
            onClose();
        } catch (error) {
            alert(error.response?.data?.message || "Submission Failed");
        } finally {
            setLoading(false);
        }
    };

    const presets = [750, 290, 650, 1000, 1200, 3500];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] px-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="bg-[#8b31de] p-4 text-white flex items-center relative shrink-0">
                    <button
                        onClick={step === 1 ? onClose : () => setStep(1)}
                        className="absolute left-4 p-1 hover:bg-white/10 rounded-full"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <h2 className="text-lg font-bold w-full text-center">
                        {step === 1 ? "Recharge" : "Scan & Pay"}
                    </h2>
                </div>

                <div className="p-6 space-y-6 overflow-y-auto">

                    {step === 1 && (
                        <>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Enter Amount (₹)</label>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    className="w-full border-2 border-[#8b31de] rounded-lg p-3 text-center text-lg font-bold outline-none focus:ring-2 focus:ring-purple-300"
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                {presets.map((preset) => (
                                    <button
                                        key={preset}
                                        onClick={() => setAmount(preset)}
                                        className="bg-[#8b31de] text-white font-bold py-3 rounded-lg hover:bg-[#7a2bc5] active:scale-95 transition-all text-sm"
                                    >
                                        +₹{preset}
                                    </button>
                                ))}
                            </div>

                            <button
                                className="w-full bg-[#8b31de] text-white font-bold py-3.5 rounded-lg shadow-lg hover:bg-[#7a2bc5] transition-transform active:scale-95 text-base flex justify-center items-center gap-2"
                                onClick={() => setStep(2)}
                            >
                                Next <ArrowRight className="w-5 h-5" />
                            </button>
                        </>
                    )}

                    {step === 2 && (
                        <div className="flex flex-col items-center space-y-6">
                            {/* QR Display */}
                            <div className="bg-gray-100 p-4 rounded-xl border-2 border-dashed border-gray-300 w-full flex flex-col items-center">
                                <p className="text-sm font-semibold text-gray-500 mb-2">Scan this QR Code to Pay</p>

                                {qrData?.upiId ? (
                                    <div className="w-48 h-48 bg-white p-2 rounded-lg shadow-sm">
                                        <img
                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`upi://pay?pa=${qrData.upiId}&pn=AsianPaints&am=${amount}&cu=INR`)}`}
                                            alt="Dynamic UPI QR"
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                ) : qrData?.imageUrl ? (
                                    <div className="w-48 h-48 bg-white p-2 rounded-lg shadow-sm">
                                        <img
                                            src={`http://localhost:3000/${qrData.imageUrl.replace(/\\/g, '/')}`}
                                            alt="Static QR"
                                            className="w-full h-full object-contain"
                                            onError={(e) => e.target.src = "https://via.placeholder.com/200?text=QR+Not+Found"}
                                        />
                                    </div>
                                ) : (
                                    <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                                        Loading QR...
                                    </div>
                                )}

                                <div className="mt-4 flex flex-col items-center">
                                    <p className="text-lg font-bold text-[#8b31de] mb-1">₹ {amount}</p>

                                    {qrData?.upiId && (
                                        <div className="flex flex-col items-center gap-2 mt-2">
                                            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-purple-100">
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">UPI ID:</span>
                                                <span className="text-sm font-bold text-gray-800">{qrData.upiId}</span>
                                            </div>
                                            <button
                                                onClick={() => copyToClipboard(qrData.upiId)}
                                                className="text-[10px] uppercase font-bold text-[#8b31de] bg-purple-50 px-3 py-1 rounded-full hover:bg-purple-100 transition-colors"
                                            >
                                                Copy UPI ID
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* UTR Input */}
                            <div className="w-full space-y-2">
                                <label className="text-sm font-bold text-gray-700">Enter Transaction ID / UTR</label>
                                <input
                                    type="text"
                                    value={utr}
                                    onChange={(e) => setUtr(e.target.value)}
                                    className="w-full border-2 border-gray-300 rounded-lg p-3 outline-none focus:border-[#8b31de] transition-colors"
                                    placeholder="e.g. 345281XXXXXX"
                                />
                                <p className="text-xs text-gray-500">
                                    * Please transfer the exact amount and enter the correct UTR for verification.
                                </p>
                            </div>

                            <button
                                className="w-full bg-green-600 text-white font-bold py-3.5 rounded-lg shadow-lg hover:bg-green-700 transition-transform active:scale-95 disabled:opacity-50"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? "Submitting..." : "Submit Payment Details"}
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default RechargeModal;
