import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Wallet, TrendingUp, Package, Clock, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch stats
      const statsResponse = await axios.get('http://localhost:3000/api/orders/stats', {
        withCredentials: true
      });

      // Fetch orders
      const ordersResponse = await axios.get('http://localhost:3000/api/orders/my-orders', {
        withCredentials: true
      });

      console.log('Stats Response:', statsResponse.data);
      console.log('Orders Response:', ordersResponse.data);

      if (statsResponse.data.success) {
        setStats(statsResponse.data.stats);
        console.log('Stats set:', statsResponse.data.stats);
      }

      if (ordersResponse.data.success) {
        setOrders(ordersResponse.data.orders);
      }
    } catch (error) {
      console.error('Dashboard data fetch error:', error);
      console.error('Error response:', error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full flex items-center gap-1">
          <Clock className="w-3 h-3" /> Active
        </span>;
      case 'completed':
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full flex items-center gap-1">
          <CheckCircle className="w-3 h-3" /> Completed
        </span>;
      case 'cancelled':
        return <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full flex items-center gap-1">
          <XCircle className="w-3 h-3" /> Cancelled
        </span>;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 pt-8 pb-24 px-6 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-80 h-80 bg-black/10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h1 className="text-3xl font-black text-white mb-2">Dashboard</h1>
              <p className="text-white/80 text-sm">Welcome back, <strong>{user?.name || user?.username}</strong></p>
            </div>
            <button
              onClick={fetchDashboardData}
              className="w-10 h-10 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white active:scale-95 transition-transform border border-white/20 hover:bg-white/20"
              title="Refresh data"
            >
              <ArrowRight className="w-5 h-5 rotate-90" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 -mt-16 relative z-10">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Balance Card */}
          <div className="bg-white rounded-2xl p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-5 h-5 text-emerald-600" />
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Balance</p>
            </div>
            <p className="text-2xl font-black text-slate-900">₹{stats?.balance?.toLocaleString() || 0}</p>
          </div>

          {/* Total Invested Card */}
          <div className="bg-white rounded-2xl p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Invested</p>
            </div>
            <p className="text-2xl font-black text-slate-900">₹{stats?.totalInvested?.toLocaleString() || 0}</p>
          </div>

          {/* Total Earnings Card */}
          <div className="bg-white rounded-2xl p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Earnings</p>
            </div>
            <p className="text-2xl font-black text-slate-900">₹{stats?.totalEarnings?.toLocaleString() || 0}</p>
          </div>

          {/* Active Orders Card */}
          <div className="bg-white rounded-2xl p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-5 h-5 text-amber-600" />
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active</p>
            </div>
            <p className="text-2xl font-black text-slate-900">{stats?.activeOrdersCount || 0}</p>
          </div>
        </div>

        {/* Order History Section */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
            <Package className="w-6 h-6 text-indigo-600" />
            Order History
          </h2>

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-semibold">No orders yet</p>
              <p className="text-slate-400 text-sm">Start investing to see your orders here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="border border-slate-200 rounded-2xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-black text-slate-900 text-sm">{order.planName}</h3>
                      <p className="text-xs text-slate-500">{order.duration}</p>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1">Investment</p>
                      <p className="text-sm font-black text-slate-900">₹{order.investmentAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1">Daily ROI</p>
                      <p className="text-sm font-black text-emerald-600">₹{order.dailyEarnings.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1">Total Gain</p>
                      <p className="text-sm font-black text-indigo-600">₹{order.totalGain.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs text-slate-500">
                    <span>Purchased: {new Date(order.purchaseDate).toLocaleDateString()}</span>
                    {order.status === 'active' && (
                      <span className="font-bold text-amber-600">{order.daysRemaining} days left</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="w-full mt-6 bg-slate-900 text-white font-black py-4 rounded-2xl shadow-xl active:scale-95 transition-all"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
