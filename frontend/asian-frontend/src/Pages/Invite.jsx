import React from 'react';
import { Share2, HelpCircle, ChevronLeft, Gift, UserPlus, ArrowRight, Copy, Users, Trophy, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Invite = () => {
    const navigate = useNavigate();
    const referralCode = "user123";
    const referralUrl = window.location.origin + '/register?ref=' + referralCode;

    const handleShare = async () => {
        const shareData = {
            title: 'Join Asian Paints Investment',
            text: 'I\'m earning passive income with Asian Paints. Join using my referral link!',
            url: referralUrl
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(shareData.url);
                alert('Referral link copied to clipboard!');
            }
        } catch (err) {
            console.error('Error sharing:', err);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
    };

    const faqs = [
        {
            q: "How do I refer friends?",
            a: "Share your unique referral link or code with friends. When they sign up using your link/code and make an investment, you'll earn commissions."
        },
        {
            q: "When will I receive my referral earnings?",
            a: "Commissions are credited to your account immediately when your referrals make qualifying investments. You can withdraw these earnings anytime."
        },
        {
            q: "Is there any limit to how many people I can refer?",
            a: "No! You can refer unlimited friends and earn commissions from all of them, plus their network up to 3 levels deep."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 pb-32 font-sans overflow-x-hidden">
            {/* Dynamic Header Section */}
            <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 pt-12 pb-24 px-6 rounded-b-[4rem] relative overflow-hidden shadow-[0_20px_50px_rgba(139,49,222,0.3)]">
                {/* Decorative Blur Spheres */}
                <div className="absolute top-[-10%] right-[-5%] w-72 h-72 bg-white/20 rounded-full blur-[80px] animate-pulse"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-60 h-60 bg-indigo-400/30 rounded-full blur-[60px]"></div>

                <div className="relative z-10">
                    <button
                        onClick={() => navigate('/home')}
                        className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white mb-10 active:scale-90 transition-all hover:bg-white/20 border border-white/20"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <div className="flex items-end gap-5 mb-6">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-[2.5rem] flex items-center justify-center border border-white/30 shadow-2xl">
                            <UserPlus className="w-10 h-10 text-white" />
                        </div>
                        <div className="pb-2">
                            <span className="text-white/60 text-xs font-black uppercase tracking-[0.2em]">Affiliate Program</span>
                            <h1 className="text-4xl font-black text-white leading-tight">Invite & Earn</h1>
                        </div>
                    </div>
                    <p className="text-white/80 text-lg font-medium max-w-[280px] leading-relaxed">
                        Build your financial empire through our 3-tier network.
                    </p>
                </div>
            </div>

            <div className="px-6 -mt-12 space-y-8 relative z-20">
                {/* Referral Code Card */}
                <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-col items-center">
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">Your Invitation Code</p>
                    <div className="flex items-center gap-4 bg-slate-50 px-8 py-5 rounded-3xl border-2 border-dashed border-slate-200 w-full justify-between group">
                        <span className="text-2xl font-black text-slate-800 tracking-wider">{referralCode}</span>
                        <button
                            onClick={() => copyToClipboard(referralCode)}
                            className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 text-indigo-600 active:scale-90 transition-all hover:shadow-md"
                        >
                            <Copy className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Statistics Visualization */}
                <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-[0.03]">
                            <Trophy className="w-32 h-32 text-slate-900" />
                        </div>
                        <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
                            Commission Rates
                        </h2>

                        <div className="space-y-6">
                            {[
                                { level: "Level 1", rate: "15%", sub: "Direct Referrals", color: "bg-indigo-600" },
                                { level: "Level 2", rate: "5%", sub: "Network Growth", color: "bg-purple-500" },
                                { level: "Level 3", rate: "2%", sub: "Extended Reach", color: "bg-pink-500" }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-5">
                                    <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center text-white shadow-lg`}>
                                        <Users className="w-7 h-7" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-end mb-1.5">
                                            <p className="font-black text-slate-900">{item.level}</p>
                                            <p className="text-2xl font-black text-indigo-600">{item.rate}</p>
                                        </div>
                                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${item.color} rounded-full`}
                                                style={{ width: item.rate }}
                                            ></div>
                                        </div>
                                        <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">{item.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-2 px-2">
                        <div className="w-10 h-10 bg-indigo-100 rounded-2xl flex items-center justify-center">
                            <HelpCircle className="w-6 h-6 text-indigo-600" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-800">Learn More</h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white rounded-[2rem] p-7 shadow-sm border border-slate-100 hover:border-indigo-200 transition-all duration-300">
                                <h3 className="font-black text-slate-900 text-lg mb-3 flex items-start gap-3">
                                    <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2.5 flex-shrink-0"></span>
                                    {faq.q}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed font-medium pl-5 border-l-2 border-slate-50">
                                    {faq.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Sticky Container */}
                <div className="fixed bottom-0 left-0 right-0 p-6 z-50">
                    <div className="max-w-[420px] mx-auto">
                        <button
                            onClick={handleShare}
                            className="w-full bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white font-black py-6 rounded-[2.5rem] flex items-center justify-center gap-4 shadow-[0_15px_35px_rgba(139,49,222,0.4)] active:scale-95 transition-all text-lg group"
                        >
                            <span className="group-hover:translate-x-1 transition-transform">Invite Friends Now</span>
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Background Decorative Gradient */}
            <div className="fixed top-0 right-0 w-full h-full pointer-events-none z-[-1] opacity-[0.03]">
                <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] bg-purple-600 rounded-full blur-[100px]"></div>
            </div>
        </div>
    );
};

export default Invite;
