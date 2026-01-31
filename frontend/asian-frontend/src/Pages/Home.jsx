import React, { useState } from 'react';
import { Wallet, TrendingUp, Shield, Users, Gift, Send, ArrowRight, CheckCircle } from 'lucide-react';

export default function AsianPaintsLanding() {
  const [activeTab, setActiveTab] = useState('normal');

  const plans = [
    {
      id: 1,
      name: 'Special Offer',
      duration: '2 Days',
      badge: 'Limited',
      eachPrice: 750.00,
      dailyEarnings: 3499.00,
      totalGain: 6998.00,
      image: 'apex-ultima',
      hot: true,
      gradient: 'from-orange-400 to-red-500'
    },
    {
      id: 2,
      name: 'Plan A',
      duration: '45 Days',
      badge: 'Popular',
      eachPrice: 290.00,
      dailyEarnings: 265.00,
      totalGain: 11925.00,
      image: 'apcolite',
      gradient: 'from-blue-400 to-cyan-500'
    },
    {
      id: 3,
      name: 'Plan B',
      duration: '13 Days',
      badge: 'Best Value',
      eachPrice: 550.00,
      dailyEarnings: 1750.00,
      totalGain: 22750.00,
      image: 'apex-ultima',
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      id: 4,
      name: 'Plan C',
      duration: '30 Days',
      badge: 'Recommended',
      eachPrice: 1200.00,
      dailyEarnings: 850.00,
      totalGain: 25500.00,
      image: 'weatherproof',
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      id: 5,
      name: 'Plan D',
      duration: '60 Days',
      badge: 'Premium',
      eachPrice: 2500.00,
      dailyEarnings: 1800.00,
      totalGain: 108000.00,
      image: 'royale-luxury',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      id: 6,
      name: 'Plan E',
      duration: '90 Days',
      badge: 'Elite',
      eachPrice: 5000.00,
      dailyEarnings: 3500.00,
      totalGain: 315000.00,
      image: 'premium-emulsion',
      gradient: 'from-indigo-400 to-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 text-white shadow-2xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">AP</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">Asian Paints</h1>
                <p className="text-xs text-purple-200">Investment Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-sm font-bold">A</span>
              </div>
            </div>
          </div>

          {/* User Info Card */}
          <div className="mt-6 bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-purple-200 text-sm mb-1">Ayan</p>
                <p className="text-2xl font-bold">9111665149</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Balance Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-white/20 to-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/30">
                <p className="text-purple-200 text-xs mb-1">Your Balance</p>
                <p className="text-3xl font-bold">₹12</p>
              </div>
              <div className="bg-gradient-to-br from-white/20 to-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/30">
                <p className="text-purple-200 text-xs mb-1 flex items-center gap-1">
                  Total Income
                  <TrendingUp className="w-3 h-3" />
                </p>
                <p className="text-3xl font-bold">₹0.00</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-4 gap-3 mt-6">
            {[
              { icon: Wallet, label: 'Recharge', color: 'from-blue-500 to-cyan-500' },
              { icon: TrendingUp, label: 'Withdraw', color: 'from-green-500 to-emerald-500' },
              { icon: Gift, label: 'Orders', color: 'from-orange-500 to-red-500' },
              { icon: Send, label: 'Telegram', color: 'from-purple-500 to-pink-500' }
            ].map((action, idx) => (
              <button
                key={idx}
                className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:rotate-12 transition-transform`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-xs font-semibold text-gray-700">{action.label}</p>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="sticky top-0 z-10 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2 py-4">
            {['normal', 'welfare', 'offers'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeTab === tab
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {tab === 'offers' && (
                  <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full animate-pulse">HOT</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: Shield, label: 'Secure', desc: '100% Safe', color: 'from-green-500 to-emerald-600' },
            { icon: Users, label: 'Trusted', desc: '50K+ Users', color: 'from-blue-500 to-cyan-600' },
            { icon: TrendingUp, label: 'Profitable', desc: 'High Returns', color: 'from-purple-500 to-pink-600' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-4 shadow-lg text-center">
              <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs font-bold text-gray-800">{item.label}</p>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Plans Grid */}
        <div className="space-y-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border-2 border-transparent hover:border-purple-200"
            >
              <div className="relative">
                {/* Duration Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    {plan.duration}
                  </div>
                </div>

                {/* Badge */}
                {plan.badge && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className={`bg-gradient-to-r ${plan.gradient} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse`}>
                      {plan.badge}
                    </div>
                  </div>
                )}

                {/* Image Section */}
                <div className={`bg-gradient-to-br ${plan.gradient} p-8 relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                  </div>

                  <div className="relative flex items-center justify-center">
                    {/* Paint Can Illustration */}
                    <div className="relative">
                      <div className="w-40 h-48 bg-white/90 rounded-2xl shadow-2xl backdrop-blur-sm flex items-center justify-center border-4 border-white">
                        <div className="text-center">
                          <div className="w-24 h-24 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg">
                            <div className="text-white font-bold text-2xl">AP</div>
                          </div>
                          <div className="text-gray-700 font-bold text-sm">Asian Paints</div>
                          <div className="text-gray-500 text-xs">{plan.name}</div>
                        </div>
                      </div>
                      {/* Paint Roller */}
                      <div className="absolute -right-12 top-1/2 transform -translate-y-1/2">
                        <div className="w-20 h-6 bg-yellow-400 rounded-full shadow-lg transform rotate-45"></div>
                        <div className="w-2 h-16 bg-gray-600 absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full rounded-full"></div>
                      </div>
                      {/* Paint Splashes */}
                      <div className="absolute -left-8 top-0 w-12 h-12 bg-pink-400 rounded-full opacity-60 blur-sm"></div>
                      <div className="absolute -left-4 top-8 w-8 h-8 bg-blue-400 rounded-full opacity-60 blur-sm"></div>
                      <div className="absolute left-2 -top-4 w-10 h-10 bg-yellow-400 rounded-full opacity-60 blur-sm"></div>
                    </div>
                  </div>
                </div>

                {/* Plan Details */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      {plan.name}
                    </h3>
                    {plan.hot && (
                      <div className="flex items-center space-x-1 text-red-500 animate-bounce">
                        <TrendingUp className="w-5 h-5" />
                        <span className="text-sm font-bold">Trending</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
                      <span className="text-sm text-gray-600 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-purple-600" />
                        Each Price
                      </span>
                      <span className="font-bold text-gray-800">₹ {plan.eachPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                      <span className="text-sm text-gray-600 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2 text-green-600" />
                        Daily Earnings
                      </span>
                      <span className="font-bold text-green-600">₹ {plan.dailyEarnings.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                      <span className="text-sm text-gray-600 flex items-center">
                        <Gift className="w-4 h-4 mr-2 text-orange-600" />
                        Total Gain
                      </span>
                      <span className="font-bold text-xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        ₹ {plan.totalGain.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  <button className={`w-full bg-gradient-to-r ${plan.gradient} text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 group`}>
                    <span>Buy Now</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="mt-12 text-center pb-8">
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Why Choose Asian Paints Investment?</h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {[
                'Secure Platform',
                'Daily Returns',
                'Easy Withdrawal',
                'Trusted Brand'
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-sm text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-gray-500 text-sm">
            © 2024 Asian Paints Investment Platform. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}