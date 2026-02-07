import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Package, Clock, CheckCircle, XCircle, ChevronLeft, TrendingUp, Calendar, ArrowRight } from 'lucide-react';

export default function Orders() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, active, completed, cancelled

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/api/orders/my-orders', {
                withCredentials: true
            });

            if (response.data.success) {
                setOrders(response.data.orders);
            }
        } catch (error) {
            console.error('Orders fetch error:', error);
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

    const getFilteredOrders = () => {
        if (filter === 'all') return orders;
        return orders.filter(order => order.status === filter);
    };

    const filteredOrders = getFilteredOrders();

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading orders...</p>
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
                    <div className="flex items-center gap-4 mb-6">
                        <button
                            onClick={() => navigate('/home')}
                            className="w-10 h-10 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white active:scale-95 transition-transform border border-white/20"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-black text-white">My Orders</h1>
                            <p className="text-white/80 text-sm">Track your investments</p>
                        </div>
                    </div>

                    {/* Stats Summary */}
                    <div className="grid grid-cols-3 gap-3 mt-6">
                        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
                            <p className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1">Total</p>
                            <p className="text-2xl font-black text-white">{orders.length}</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
                            <p className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1">Active</p>
                            <p className="text-2xl font-black text-emerald-300">{orders.filter(o => o.status === 'active').length}</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
                            <p className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1">Done</p>
                            <p className="text-2xl font-black text-blue-300">{orders.filter(o => o.status === 'completed').length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="px-6 -mt-8 relative z-10 mb-6">
                <div className="bg-white rounded-2xl p-2 shadow-lg flex gap-2">
                    {['all', 'active', 'completed', 'cancelled'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`flex-1 py-2 px-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${filter === status
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'text-slate-500 hover:bg-slate-50'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Orders List */}
            <div className="px-6">
                {filteredOrders.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center shadow-lg">
                        <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500 font-semibold">No {filter !== 'all' ? filter : ''} orders found</p>
                        <p className="text-slate-400 text-sm mt-2">Start investing to see your orders here</p>
                        <button
                            onClick={() => navigate('/home')}
                            className="mt-6 bg-indigo-600 text-white font-black px-8 py-3 rounded-2xl shadow-lg active:scale-95 transition-all inline-flex items-center gap-2"
                        >
                            Browse Plans <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredOrders.map((order) => (
                            <div key={order._id} className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                                {/* Order Header */}
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <h3 className="font-black text-slate-900 text-lg mb-1">{order.planName}</h3>
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <Calendar className="w-3 h-3" />
                                            <span>{new Date(order.purchaseDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}</span>
                                        </div>
                                    </div>
                                    {getStatusBadge(order.status)}
                                </div>

                                {/* Order Details Grid */}
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="bg-slate-50 rounded-2xl p-4">
                                        <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1">Investment</p>
                                        <p className="text-xl font-black text-slate-900">₹{order.investmentAmount.toLocaleString()}</p>
                                    </div>
                                    <div className="bg-slate-50 rounded-2xl p-4">
                                        <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1">Duration</p>
                                        <p className="text-xl font-black text-slate-900">{order.duration}</p>
                                    </div>
                                    <div className="bg-emerald-50 rounded-2xl p-4">
                                        <p className="text-[10px] text-emerald-600 uppercase tracking-wider font-bold mb-1">Daily ROI</p>
                                        <p className="text-xl font-black text-emerald-600">₹{order.dailyEarnings.toLocaleString()}</p>
                                    </div>
                                    <div className="bg-indigo-50 rounded-2xl p-4">
                                        <p className="text-[10px] text-indigo-600 uppercase tracking-wider font-bold mb-1">Total Gain</p>
                                        <p className="text-xl font-black text-indigo-600">₹{order.totalGain.toLocaleString()}</p>
                                    </div>
                                </div>

                                {/* Progress Bar for Active Orders */}
                                {order.status === 'active' && (
                                    <div className="mt-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs font-bold text-slate-500">Progress</span>
                                            <span className="text-xs font-black text-amber-600">{order.daysRemaining} days remaining</span>
                                        </div>
                                        <div className="w-full bg-slate-200 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full transition-all"
                                                style={{
                                                    width: `${Math.max(0, 100 - (order.daysRemaining / parseInt(order.duration) * 100))}%`
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
