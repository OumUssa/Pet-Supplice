import React, { useEffect, useState } from "react";
import { fetchAllContacts, replyContact } from "../../API/api";
import { useToast } from "../Base/BaseToast";

const SupportTickets = () => {
  const { showSuccess, showError } = useToast();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const loadTickets = async () => {
    setLoading(true);
    try {
      const data = await fetchAllContacts();
      setTickets(data || []);
    } catch (error) {
      console.error(error);
      showError("Failed to load support tickets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    setIsUpdating(true);
    try {
      await replyContact(id, newStatus);
      showSuccess(`Ticket status updated to ${newStatus}`);
      if (selectedTicket && selectedTicket.id === id) {
        setSelectedTicket({ ...selectedTicket, status: newStatus });
      }
      loadTickets();
    } catch (error) {
      console.error(error);
      showError("Failed to update ticket status.");
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-rose-100 text-rose-800 border-rose-200";
      case "in_progress": return "bg-amber-100 text-amber-800 border-amber-200";
      case "resolved": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6 p-2 md:p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Support Tickets</h1>
          <p className="text-slate-500 mt-1">Review and manage customer messages from the Contact Us form.</p>
        </div>
        <button
          onClick={loadTickets}
          className="inline-flex items-center gap-2 rounded-xl bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700 hover:bg-teal-100 transition"
        >
          <i className="bi bi-arrow-clockwise" /> Refresh
        </button>
      </div>

      <div className="rounded-3xl border border-cyan-100 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-left text-sm">
            <thead className="bg-slate-50 border-b border-cyan-100">
              <tr>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-slate-500 text-xs">ID</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-slate-500 text-xs">Customer</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-slate-500 text-xs">Topic</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-slate-500 text-xs">Date</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-slate-500 text-xs">Status</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-slate-500 text-xs text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-50">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                    <i className="bi bi-arrow-repeat inline-block animate-spin text-2xl mb-2 text-teal-600" />
                    <p>Loading tickets...</p>
                  </td>
                </tr>
              ) : tickets.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                    No support tickets found.
                  </td>
                </tr>
              ) : (
                tickets.map((ticket) => (
                  <tr key={ticket.id} className="transition-colors hover:bg-cyan-50/40">
                    <td className="px-6 py-4 font-mono text-slate-500">#{ticket.id}</td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800">{ticket.full_name || ticket.name}</p>
                      <p className="text-xs text-slate-500">{ticket.email}</p>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700">{ticket.topic}</td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(ticket.created_at || Date.now()).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold border ${getStatusColor(ticket.status || "pending")}`}>
                        {ticket.status || "pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => setSelectedTicket(ticket)}
                        className="inline-flex items-center gap-1 rounded-lg bg-teal-50 px-3 py-1.5 text-sm font-medium text-teal-700 transition hover:bg-teal-600 hover:text-white"
                      >
                        <i className="bi bi-eye" /> View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl relative flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50 rounded-t-3xl">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Ticket #{selectedTicket.id}</h3>
                <p className="text-sm text-slate-500">Submitted on {new Date(selectedTicket.created_at || Date.now()).toLocaleString()}</p>
              </div>
              <button 
                onClick={() => setSelectedTicket(null)}
                className="h-8 w-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition"
              >
                <i className="bi bi-x-lg" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Customer Details</p>
                  <p className="font-semibold text-slate-800">{selectedTicket.full_name || selectedTicket.name}</p>
                  <p className="text-sm text-slate-600">{selectedTicket.email}</p>
                  {selectedTicket.phone && <p className="text-sm text-slate-600">{selectedTicket.phone}</p>}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Topic</p>
                  <p className="font-medium text-slate-800 bg-slate-100 inline-block px-3 py-1 rounded-lg">{selectedTicket.topic}</p>
                </div>
              </div>
              
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Message</p>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-slate-700 whitespace-pre-wrap leading-relaxed">
                  {selectedTicket.message}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-3xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-slate-700">Update Status:</span>
                <select
                  value={selectedTicket.status || "pending"}
                  onChange={(e) => handleStatusChange(selectedTicket.id, e.target.value)}
                  disabled={isUpdating}
                  className="rounded-xl border border-slate-300 px-4 py-2 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50"
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
                {isUpdating && <i className="bi bi-arrow-repeat animate-spin text-teal-600" />}
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="px-5 py-2 font-bold text-slate-600 hover:text-slate-900 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportTickets;
