import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [qrFile, setQrFile] = useState(null);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/api/payment/v1/admin/requests', { withCredentials: true });
            if (data.success) {
                setRequests(data.requests);
            }
        } catch (error) {
            console.error("Failed to fetch requests", error);
        }
    };

    const handleUploadQr = async (e) => {
        e.preventDefault();
        if (!qrFile) return alert("Select a file first");

        const formData = new FormData();
        formData.append('qrImage', qrFile);

        try {
            await axios.post('http://localhost:3000/api/payment/v1/admin/upload-qr', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });
            alert("QR Code Uploaded Successfully");
        } catch (error) {
            alert("Upload Failed");
            console.error(error);
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            await axios.patch('http://localhost:3000/api/payment/v1/admin/request-status', { id, status }, { withCredentials: true });
            alert(`Request ${status}`);
            fetchRequests(); // Refresh list
        } catch (error) {
            alert("Update Failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-8 text-purple-800">Admin Dashboard</h1>

            {/* QR Upload Section */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                <h2 className="text-xl font-bold mb-4">Manage QR Code</h2>
                <form onSubmit={handleUploadQr} className="flex gap-4 items-center">
                    <input
                        type="file"
                        onChange={(e) => setQrFile(e.target.files[0])}
                        accept="image/*"
                        className="border p-2 rounded"
                    />
                    <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded font-bold hover:bg-purple-700">
                        Upload New QR
                    </button>
                </form>
            </div>

            {/* Payment Requests Section */}
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-bold mb-4">Payment Requests</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="p-3">User</th>
                                <th className="p-3">Amount</th>
                                <th className="p-3">UTR / Ref No</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req) => (
                                <tr key={req._id} className="border-b hover:bg-gray-50 text-sm">
                                    <td className="p-3">
                                        <div className="font-bold">{req.userId?.name || 'Unknown'}</div>
                                        <div className="text-xs text-gray-500">{req.userId?.email}</div>
                                    </td>
                                    <td className="p-3 font-bold text-green-600">₹{req.amount}</td>
                                    <td className="p-3 font-mono bg-gray-100 rounded px-2 w-fit">{req.utr}</td>
                                    <td className="p-3">{new Date(req.createdAt).toLocaleDateString()}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${req.status === 'approved' ? 'bg-green-100 text-green-700' :
                                            req.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                                'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {req.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="p-3 flex gap-2">
                                        {req.status === 'pending' && (
                                            <>
                                                <button
                                                    onClick={() => handleStatusUpdate(req._id, 'approved')}
                                                    className="bg-green-500 text-white px-3 py-1 rounded text-xs font-bold hover:bg-green-600"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(req._id, 'rejected')}
                                                    className="bg-red-500 text-white px-3 py-1 rounded text-xs font-bold hover:bg-red-600"
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {requests.length === 0 && <p className="text-center py-8 text-gray-500">No requests found</p>}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
