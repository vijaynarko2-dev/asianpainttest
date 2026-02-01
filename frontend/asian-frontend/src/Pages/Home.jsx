import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, Shield, Users, Gift, Send, ArrowRight, CheckCircle } from 'lucide-react';
import PaymentModal from '../components/Paymentmodel';
import AnnouncementPopup from '../components/AnnouncementPopup';

export default function AsianPaintsLanding() {
  const [activeTab, setActiveTab] = useState('normal');

  const [open, setOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(false);

  useEffect(() => {
    setShowAnnouncement(true);
  }, []);

  const [selectedPlan, setSelectedPlan] = useState(null);

  // Placeholder data - replace with actual API calls in production
  const normalPlans = [
    { id: 1, name: 'Asian Paints Apex', eachPrice: 750, dailyEarnings: 155, totalGain: 8935, duration: '58 Days', gradient: 'from-purple-500 to-indigo-500', hot: true, badge: 'Popular', image: '/assets/product1.png' },
    { id: 2, name: 'Asian Paints Royale', eachPrice: 2300, dailyEarnings: 550, totalGain: 31900, duration: '58 Days', gradient: 'from-pink-500 to-rose-500', hot: true, badge: 'Best Seller', image: '/assets/product2.png' },
    { id: 3, name: 'Asian Paint Ultima', eachPrice: 5300, dailyEarnings: 1350, totalGain: 78300, duration: '58 Days', gradient: 'from-amber-500 to-orange-500', image: '/assets/product3.png' },
    { id: 4, name: 'Asian Paint Smart', eachPrice: 13500, dailyEarnings: 3600, totalGain: 208800, duration: '58 Days', gradient: 'from-blue-500 to-cyan-500', image: '/assets/product4.png' },
    { id: 5, name: 'Asian Paint Advance', eachPrice: 28000, dailyEarnings: 7800, totalGain: 452400, duration: '58 Days', gradient: 'from-emerald-500 to-teal-500', image: '/assets/product1.png' },
    { id: 6, name: 'Asian Paint Pro', eachPrice: 58000, dailyEarnings: 17000, totalGain: 986000, duration: '58 Days', gradient: 'from-violet-500 to-purple-500', image: '/assets/product2.png' },
  ];

  /* 
   * We'll simulate different "types" of plans (Normal/Welfare/Offers) for the tabs.
   * In a real app, this might come from different API endpoints or filtered list.
   */

  // Mock data for other tabs
  const welfarePlans = [
    { id: 101, name: 'Product 1', eachPrice: 400, dailyEarnings: 200, totalGain: 800, duration: '58 Days', gradient: 'from-lime-500 to-green-500', image: '/assets/product3.png' },
    { id: 102, name: 'Product 2', eachPrice: 1800, dailyEarnings: 800, totalGain: 3200, duration: '58 Days', gradient: 'from-cyan-500 to-blue-500', image: '/assets/product4.png' },
  ];

  const offerPlans = [
    { id: 201, name: 'Activity Plan 1', eachPrice: 1500, dailyEarnings: 888, totalGain: 3000, duration: '20 Days', gradient: 'from-red-500 to-pink-500', image: '/assets/product1.png' },
  ];

  const getDisplayPlans = () => {
    switch (activeTab) {
      case 'welfare': return welfarePlans;
      case 'offers': return offerPlans;
      default: return normalPlans;
    }
  };

  return (
    <div className="min-h-screen bg-[#a855f7] pb-20 font-sans">
      {/* Header */}
      <header className="pt-6 pb-2 px-4 text-white">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-800 to-black rounded-2xl flex items-center justify-center shadow-lg border-2 border-purple-400/30">
            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">ap</span>
          </div>
          <div>
            <p className="text-sm font-semibold opacity-90">Ayan</p>
            <p className="text-lg font-bold">9111665149</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8 px-2">
          <div>
            <p className="text-sm font-medium opacity-80 mb-1">Your Balnace</p>
            <p className="text-3xl font-bold">₹12</p>
          </div>
          <div className="text-right flex flex-col items-end">
            <div className="flex items-center space-x-2 mb-1">
              <p className="text-sm font-medium opacity-80">Total Income</p>
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <Users className="w-3 h-3 text-purple-600" />
              </div>
            </div>
            <p className="text-xl font-bold">₹0.00</p>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-4 gap-4 px-2">
          {[
            { icon: Wallet, label: 'Recharge', link: null },
            { icon: TrendingUp, label: 'Withdraw', link: null },
            { icon: Gift, label: 'Orders', link: null },
            { icon: Send, label: 'Telegram', link: 'https://t.me/+jTPKAkv8_DljM2Fl' }
          ].map((action, idx) => {
            const Content = () => (
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-sm">
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-xs font-medium text-white">{action.label}</p>
              </div>
            );

            return action.link ? (
              <a key={idx} href={action.link} target="_blank" rel="noopener noreferrer">{Content()}</a>
            ) : (
              <button key={idx}>{Content()}</button>
            );
          })}
        </div>
      </header>

      {/* Tabs matching screenshot */}
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

      {/* Plans List - Horizontal Card matching screenshot */}
      <div className="px-4 mt-6 space-y-4">
        {getDisplayPlans().map((plan) => (
          <div key={plan.id} className="bg-white rounded-xl p-3 shadow-lg relative overflow-hidden flex flex-col">
            {/* Duration Tag - Top Left */}
            <div className="absolute top-0 left-0">
              <div className="bg-[#8b31de] text-white text-[10px] font-bold px-3 py-1 rounded-br-lg z-10">
                {plan.duration}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              {/* Left: Image Area */}
              <div className="w-[45%] flex-shrink-0">
                <div className="aspect-[4/3] bg-gray-100 rounded-lg relative overflow-hidden flex items-center justify-center">
                  <img
                    src={plan.image}
                    alt={plan.name}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/150?text=No+Image"; // Fallback
                    }}
                  />
                </div>
              </div>

              {/* Right: Content Area */}
              <div className="w-[55%] flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#003049] mb-3">{plan.name}</h3>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500">Each Price</span>
                      <span className="font-bold text-gray-900">₹ {plan.eachPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500">Daily Earnings</span>
                      <span className="font-bold text-gray-900">₹ {plan.dailyEarnings.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500">Total Gain</span>
                      <span className="font-bold text-gray-900">₹ {plan.totalGain.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedPlan(plan);
                    setOpen(true);
                  }}
                  className="w-full bg-[#8b31de] text-white text-sm font-bold py-2.5 rounded-lg mt-3 shadow-md active:scale-95 transition-transform"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <PaymentModal
        open={open}
        plan={selectedPlan}
        onClose={() => setOpen(false)}
      />

      {showAnnouncement && (
        <AnnouncementPopup onClose={() => setShowAnnouncement(false)} />
      )}
    </div>
  );
}