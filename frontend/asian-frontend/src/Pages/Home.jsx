import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, Shield, Users, User, Gift, Send, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RechargeModal from '../Components/RechargeModal';
import AnnouncementPopup from '../Components/AnnouncementPopup';
import { useAuth } from '../contexts/AuthContext';

export default function AsianPaintsLanding() {
  const { user, refreshUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('normal');

  const [isRechargeOpen, setIsRechargeOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(false);

  useEffect(() => {
    setShowAnnouncement(true);
    if (user) refreshUser();
  }, []);

  const [selectedPlan, setSelectedPlan] = useState(null);

  // Placeholder data
  const normalPlans = [
    { id: 1, name: 'Asian Paints Apex', eachPrice: 750, dailyEarnings: 350, totalGain: 20300, duration: '58 Days', gradient: 'from-purple-500 to-indigo-500', hot: true, badge: 'Popular', image: '/assets/product1.png' },
    { id: 2, name: 'Asian Paints Royale', eachPrice: 2300, dailyEarnings: 1200, totalGain: 69600, duration: '58 Days', gradient: 'from-pink-500 to-rose-500', hot: true, badge: 'Best Seller', image: '/assets/product2.png' },
    { id: 3, name: 'Asian Paint Ultima', eachPrice: 5300, dailyEarnings: 3000, totalGain: 174000, duration: '58 Days', gradient: 'from-amber-500 to-orange-500', image: '/assets/product3.png' },
    { id: 4, name: 'Asian Paint Smart', eachPrice: 13500, dailyEarnings: 8000, totalGain: 464000, duration: '58 Days', gradient: 'from-blue-500 to-cyan-500', image: '/assets/product4.png' },
    { id: 5, name: 'Asian Paint Advance', eachPrice: 28000, dailyEarnings: 18000, totalGain: 1044000, duration: '58 Days', gradient: 'from-emerald-500 to-teal-500', image: '/assets/product1.png' },
    { id: 6, name: 'Asian Paint Pro', eachPrice: 58000, dailyEarnings: 40000, totalGain: 2320000, duration: '58 Days', gradient: 'from-violet-500 to-purple-500', image: '/assets/product2.png' },
  ];

  const welfarePlans = [
    { id: 101, name: 'Product 1', eachPrice: 400, dailyEarnings: 500, totalGain: 2000, duration: '58 Days', gradient: 'from-lime-500 to-green-500', image: '/assets/product3.png' },
    { id: 102, name: 'Product 2', eachPrice: 1800, dailyEarnings: 1800, totalGain: 7200, duration: '58 Days', gradient: 'from-cyan-500 to-blue-500', image: '/assets/product4.png' },
  ];

  const offerPlans = [
    { id: 201, name: 'Activity Plan 1', eachPrice: 1500, dailyEarnings: 2000, totalGain: 6500, duration: '20 Days', gradient: 'from-red-500 to-pink-500', image: '/assets/product1.png' },
  ];

  const getDisplayPlans = () => {
    switch (activeTab) {
      case 'welfare': return welfarePlans;
      case 'offers': return offerPlans;
      default: return normalPlans;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 font-sans">
      {/* Premium Header Area */}
      <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 pt-8 pb-32 px-4 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-80 h-80 bg-black/10 rounded-full blur-3xl"></div>

        <header className="flex items-center justify-between mb-8 relative z-10 px-2">
          <Link to="/profile" className="flex items-center gap-3 active:scale-95 transition-transform">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30 shadow-inner text-white group-hover:bg-white/20 transition-all">
              <User className="w-6 h-6" />
            </div>
            <div>
              <p className="text-white/70 text-xs font-bold uppercase tracking-wider leading-tight">{user?.name || 'Investor'}</p>
              <h2 className="text-white font-black text-lg leading-tight tracking-tight">{user?.phone || 'Account Active'}</h2>
            </div>
          </Link>
          <button
            onClick={logout}
            className="w-10 h-10 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white active:scale-95 transition-transform border border-white/20 hover:bg-red-500/20"
            title="Logout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </header>

        {/* Balance Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-[2.5rem] p-8 text-white relative z-10 overflow-hidden border border-white/20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)]">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-white/60 text-xs font-black uppercase tracking-[0.2em] mb-2">Portfolio Balance</p>
              <h1 className="text-5xl font-black tracking-tighter">₹{(user?.balance || 0).toLocaleString()}</h1>
            </div>
            <div className="w-14 h-10 bg-white/20 rounded-2xl flex items-center justify-center border border-white/30 backdrop-blur-md">
              <Wallet className="w-7 h-7 text-white/80" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-6 pt-6 border-t border-white/10">
            <div>
              <p className="text-white/50 text-[10px] font-black uppercase tracking-widest mb-1.5">Total Earnings</p>
              <p className="text-2xl font-black tracking-tight">₹0.00</p>
            </div>
            <div className="text-right">
              <p className="text-white/50 text-[10px] font-black uppercase tracking-widest mb-1.5">Daily Earnings</p>
              <p className="text-2xl font-black text-emerald-300 tracking-tight">+₹0.00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 -mt-10 mb-12 relative z-20">
        <div className="bg-white rounded-[2.5rem] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex justify-between items-center border border-slate-50">
          {[
            { icon: Wallet, label: 'Recharge', action: () => setIsRechargeOpen(true) },
            { icon: TrendingUp, label: 'Withdraw', action: () => { } },
            { icon: Users, label: 'Invite', link: '/invite' },
            { icon: Gift, label: 'Orders', link: '/orders' },
            { icon: Send, label: 'Support', link: 'https://t.me/begegege' }
          ].map((item, idx) => {
            const Content = (
              <div key={idx} className="flex flex-col items-center gap-2.5 group cursor-pointer transition-all">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-xl group-hover:shadow-indigo-200 transition-all duration-300">
                  <item.icon className="w-6 h-6 text-slate-600 group-hover:text-white transition-colors" />
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-900">{item.label}</span>
              </div>
            );

            if (item.link) {
              if (item.link.startsWith('http')) {
                return <a href={item.link} key={idx} target="_blank" rel="noopener noreferrer">{Content}</a>;
              } else {
                return <Link to={item.link} key={idx}>{Content}</Link>;
              }
            }
            return <button onClick={item.action} key={idx}>{Content}</button>;
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 px-4">
        <div className="flex space-x-3">
          {['normal', 'welfare', 'offers'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 rounded-lg text-sm font-bold shadow-md relative overflow-hidden transition-all ${activeTab === tab
                ? 'bg-[#8b31de] text-white'
                : 'bg-white text-gray-500'
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === 'offers' && <span className="absolute top-0 right-0 bg-[#8b31de] text-white text-[9px] px-1 rounded-bl-lg">HOT</span>}
              {activeTab === tab && <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-white rounded-full"></div>}
            </button>
          ))}
        </div>
      </div>

      {/* Plans List */}
      <div className="px-6 mt-6 space-y-6">
        <div className="flex items-center justify-between px-2 mb-2">
          <h3 className="text-xl font-black text-slate-800 tracking-tight">Investment Plans</h3>
          <div className="px-3 py-1 bg-indigo-50 rounded-lg border border-indigo-100/50">
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Live Now</span>
          </div>
        </div>

        {getDisplayPlans().map((plan) => (
          <div key={plan.id} className="bg-white rounded-[2.5rem] p-6 shadow-xl shadow-slate-200/50 border border-slate-50 relative overflow-hidden flex flex-col group hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-500">
            <div className="absolute top-6 right-6 z-10">
              <div className="bg-indigo-600/10 backdrop-blur-md text-indigo-600 text-[10px] font-black px-4 py-1.5 rounded-full border border-indigo-200">
                {plan.duration}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-[40%] flex-shrink-0">
                <div className="aspect-[4/3] bg-slate-50 rounded-[2rem] relative overflow-hidden flex items-center justify-center border border-slate-100 group-hover:scale-[1.02] transition-transform duration-500">
                  <img
                    src={plan.image}
                    alt={plan.name}
                    className="w-full h-full object-contain p-4"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/150?text=Asian+Paints";
                    }}
                  />
                </div>
              </div>

              <div className="w-full md:w-[60%] flex flex-col justify-between pt-2">
                <div>
                  <h3 className="text-xl font-black text-slate-900 mb-4 leading-tight group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{plan.name}</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Entry Price</p>
                      <p className="text-lg font-black text-slate-900 tracking-tighter">₹{plan.eachPrice.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Daily Earning</p>
                      <p className="text-lg font-black text-emerald-500 tracking-tighter">₹{plan.dailyEarnings.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Gain</span>
                    <span className="text-xl font-black text-indigo-600 tracking-tighter">₹{plan.totalGain.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedPlan(plan);
                      setIsRechargeOpen(true);
                    }}
                    className="bg-slate-900 text-white text-sm font-black px-8 py-4 rounded-[1.5rem] shadow-xl active:scale-95 transition-all flex items-center gap-2 hover:bg-black"
                  >
                    Invest Now
                    <TrendingUp className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <RechargeModal
        isOpen={isRechargeOpen}
        initialAmount={selectedPlan?.eachPrice}
        planDetails={selectedPlan ? {
          planName: selectedPlan.name,
          planImage: selectedPlan.image,
          duration: selectedPlan.duration,
          investmentAmount: selectedPlan.eachPrice,
          dailyEarnings: selectedPlan.dailyEarnings,
          totalGain: selectedPlan.totalGain
        } : null}
        onClose={() => {
          setIsRechargeOpen(false);
          setSelectedPlan(null);
        }}
      />

      {showAnnouncement && (
        <AnnouncementPopup onClose={() => setShowAnnouncement(false)} />
      )}
    </div>
  );
}