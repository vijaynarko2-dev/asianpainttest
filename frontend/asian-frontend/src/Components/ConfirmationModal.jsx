import React from 'react';
import { X, CheckCircle } from 'lucide-react';

const ConfirmationModal = ({ open, plan, onClose, onConfirm }) => {
    if (!open || !plan) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200">

                {/* Header Ribbon */}
                <div className="absolute top-4 right-0 bg-[#00aaff] text-white px-3 py-1 font-bold text-xs rounded-l-md shadow-md">
                    Days: {parseInt(plan.duration) || 58}
                </div>

                <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-8 items-center">

                        {/* Left Image Section */}
                        <div className="w-full md:w-5/12 relative">
                            <div className="aspect-[4/4] bg-gray-100 rounded-xl overflow-hidden shadow-inner border border-gray-100">
                                <img
                                    src={plan.image}
                                    alt={plan.name}
                                    className="w-full h-full object-contain p-2"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://via.placeholder.com/300?text=Asian+Paints";
                                    }}
                                />
                                {/* Badge overlay if needed */}
                                <div className="absolute top-2 left-2 flex flex-col gap-1">
                                    <span className="bg-[#4a148c] text-white text-[10px] w-12 h-12 rounded-full flex items-center justify-center font-bold text-center leading-tight shadow-md">
                                        THE<br />MIDDLE<br />ANT
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right Content Section */}
                        <div className="w-full md:w-7/12 flex flex-col items-center md:items-start text-center md:text-left">

                            {/* Logo & Title */}
                            <div className="flex flex-col items-center w-full mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-700 to-indigo-900 rounded-lg flex items-center justify-center mb-2 shadow-lg">
                                    <span className="text-white font-bold text-2xl">ap</span>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Special Offer</h2>
                                <p className="text-gray-500 text-sm">Daily Income Daily Withdrawal</p>
                            </div>

                            {/* Pricing Cards */}
                            <div className="grid grid-cols-2 gap-4 w-full mb-8">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-green-800">₹ {plan.dailyEarnings}</p>
                                    <p className="text-gray-500 text-sm">Daily Income</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-green-800">₹ {plan.totalGain}</p>
                                    <p className="text-gray-500 text-sm">Total Income</p>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-4 w-full justify-center">
                                <button
                                    onClick={onClose}
                                    className="px-6 py-2 bg-red-100 text-red-500 font-medium rounded-lg hover:bg-red-200 transition-colors"
                                >
                                    Maybe later
                                </button>
                                <button
                                    onClick={onConfirm}
                                    className="px-6 py-2 bg-[#00aaff] text-white font-bold rounded-lg shadow-lg hover:bg-[#0099e6] transition-transform active:scale-95"
                                >
                                    Yes, Buy Now
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
