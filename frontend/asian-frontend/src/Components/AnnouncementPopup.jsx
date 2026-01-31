import React from 'react';
import { X, Send, AlertCircle } from 'lucide-react';

const AnnouncementPopup = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="relative w-full max-w-sm bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl p-6 text-white shadow-2xl animate-in zoom-in-95 duration-300 border border-white/20">

                {/* Content */}
                <div className="space-y-4 mb-6">
                    <div className="flex items-center space-x-3">
                        <AlertCircle className="w-5 h-5 text-white shrink-0" />
                        <p className="font-semibold">SignUp Bonus - 12rs</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <AlertCircle className="w-5 h-5 text-white shrink-0" />
                        <p className="font-semibold">Minimum Recharge - 290rs</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <AlertCircle className="w-5 h-5 text-white shrink-0" />
                        <p className="font-semibold">Minimum withdrawal - 160rs</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <AlertCircle className="w-5 h-5 text-white shrink-0" />
                        <p className="font-semibold">Daily Income Daily withdrawal</p>
                    </div>
                </div>

                <div className="text-center mb-6">
                    <p className="text-sm font-medium leading-relaxed opacity-90">
                        Follow our official channel to receive the latest updates, news, and announcements in real-time, and be the first to know about new benefit products!
                    </p>
                </div>

                {/* Telegram Button */}
                <a
                    href="https://t.me/+jTPKAkv8_DljM2Fl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-white rounded-xl p-3 flex items-center justify-between hover:bg-gray-50 transition-colors mb-8 group"
                >
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                            <Send className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left">
                            <p className="text-black font-bold text-sm">Telegram</p>
                            <p className="text-gray-500 text-xs">Asian Pants Service</p>
                        </div>
                    </div>
                    <span className="text-gray-400 text-xs px-3 py-1 bg-gray-100 rounded-full group-hover:bg-gray-200 transition-colors">Follow</span>
                </a>

                {/* Close Button */}
                <div className="absolute -bottom-16 left-0 right-0 flex justify-center">
                    <button
                        onClick={onClose}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg"
                    >
                        <X className="w-6 h-6 text-gray-600" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementPopup;
