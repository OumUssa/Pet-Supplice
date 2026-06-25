import React, { useEffect, useState } from "react";
import { fetchPurchaseHistory, updatePurchaseStatus } from "../../API/api";
import { useToast } from "../Base/BaseToast";

const AdminOrders = () => {
  const { showSuccess, showError } = useToast();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    setLoading(true);
    try {
      // Fetching purchase history; assumed backend returns all orders for Admin
      const data = await fetchPurchaseHistory();
      setOrders(data || []);
    } catch (error) {
      console.error(error);
      showError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updatePurchaseStatus(orderId, newStatus);
      showSuccess(`Order status updated to ${newStatus}`);
      loadOrders();
    } catch (error) {
      console.error(error);
      showError("Failed to update order status.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-amber-100 text-amber-800 border-amber-200";
      case "processing": return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "cancelled": return "bg-rose-100 text-rose-800 border-rose-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6 p-2 md:p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Order Management</h1>
          <p className="text-slate-500 mt-1">Track and update the status of customer purchases.</p>
        </div>
      </div>

      <div className="rounded-3xl border border-cyan-100 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-slate-50 border-b border-cyan-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Order ID</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Product</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Quantity</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Total Price</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-50">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-sm text-slate-500">
                    <i className="bi bi-arrow-repeat inline-block animate-spin text-2xl mb-2 text-teal-600" />
                    <p>Loading orders...</p>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-sm text-slate-500">
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="transition-colors hover:bg-cyan-50/40">
                    <td className="px-6 py-4 text-sm font-mono text-slate-500">#{order.id}</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-800">
                      {order.product?.title || order.product_name || `Product ID: ${order.product_id}`}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{order.quantity}</td>
                    <td className="px-6 py-4 text-sm font-bold text-teal-600">
                      ${Number(order.total_price).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <select
                        value={order.status || "pending"}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`text-xs font-bold rounded-lg px-3 py-1 outline-none border transition-colors cursor-pointer ${getStatusColor(order.status || "pending")}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
