import { useEffect, useMemo, useState } from "react";
import { userStore } from "../store/RegisterStore";
import { useToast } from "../components/Base/BaseToast";
import { fetchUserProfile, fetchAdminUserPurchases } from "../API/api";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const Admin = () => {
  const { showSuccess, showError, showInfo } = useToast();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  
  const [isSuperAdmin, setIsSuperAdmin] = useState(null);
  const loggedInUserId = localStorage.getItem("tokenPet");

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await userStore.getUser();
      setUsers(data || []);
    } catch (error) {
      console.error(error);
      showError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAccessAndLoad = async () => {
      try {
        const user = await fetchUserProfile();
        if (user && (user.role_id === 1 || (user.email || "").toLowerCase() === "admin@petstore.com")) {
          setIsSuperAdmin(true);
          loadUsers();
        } else {
          setIsSuperAdmin(false);
          setLoading(false);
        }
      } catch (e) {
        setIsSuperAdmin(false);
        setLoading(false);
      }
    };
    checkAccessAndLoad();
  }, []);

  const filteredUsers = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();
    if (!keyword) return users;

    return users.filter(
      (user) =>
        (user.name || "").toLowerCase().includes(keyword) ||
        (user.email || "").toLowerCase().includes(keyword) ||
        (user.id || "").toString().includes(keyword),
    );
  }, [users, searchKeyword]);

  const totalUsers = users.length;
  const visibleUsers = filteredUsers.length;
  const hiddenUsers = Math.max(totalUsers - visibleUsers, 0);

  const isAdminUser = (user) =>
    (user.role || "").toLowerCase() === "admin" ||
    (user.role_id === 1) ||
    (user.email || "").trim().toLowerCase() === "admin@petstore.com";

  // Chart Data
  const chartData = useMemo(() => {
    const adminCount = users.filter(isAdminUser).length;
    const userCount = users.length - adminCount;
    return [
      { name: 'Admins', value: adminCount, color: '#0d9488' },
      { name: 'Regular Users', value: userCount, color: '#06b6d4' }
    ];
  }, [users]);

  const getUserInitials = (user) => {
    const source = (user?.name || user?.email || "").trim();
    if (!source) return "U";

    const parts = source.split(/\s+/).filter(Boolean);
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }

    return `${parts[0][0] || ""}${parts[1][0] || ""}`.toUpperCase();
  };

  const handleDelete = async (user) => {
    if (isAdminUser(user)) {
      showInfo("The admin account is protected and cannot be deleted.");
      return;
    }

    if (user.id.toString() === loggedInUserId) {
      showInfo("You cannot delete the currently logged in user.");
      return;
    }

    const confirmed = window.confirm(
      `Delete user "${user.name || user.email}" permanently?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      const deleted = await userStore.deleteUser(user.id);
      if (!deleted) {
        showError("User not found.");
        return;
      }

      showSuccess("User deleted successfully.");
      await loadUsers();
    } catch (error) {
      console.error(error);
      showError("Failed to delete user.");
    }
  };

  const handleSelectUser = async (user) => {
    setSelectedUser(user);
    setOrdersLoading(true);
    setUserOrders([]);
    try {
      const orders = await fetchAdminUserPurchases(user.id);
      setUserOrders(orders || []);
    } catch (err) {
      console.warn("Failed to fetch user orders", err);
    } finally {
      setOrdersLoading(false);
    }
  };

  if (isSuperAdmin === false) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <i className="bi bi-shield-lock text-6xl text-rose-400 mb-4" />
        <h2 className="text-2xl font-bold text-slate-800">Access Denied</h2>
        <p className="text-slate-500 mt-2">Only Super Administrators can manage users.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">User Management</h1>
          <p className="text-slate-500 mt-1">Review and delete website users, and monitor overall statistics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Statistics Chart */}
        <div className="col-span-1 rounded-3xl border border-cyan-100 bg-white p-6 shadow-sm flex flex-col items-center">
          <h2 className="text-lg font-bold text-slate-800 self-start mb-2">User Roles</h2>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-cyan-100 bg-linear-to-br from-teal-50 to-cyan-50 p-5 flex flex-col justify-center shadow-sm">
            <p className="text-xs uppercase tracking-widest text-teal-700 font-bold mb-1">
              Registered Users
            </p>
            <p className="text-4xl font-black text-teal-900">
              {totalUsers}
            </p>
          </div>
          <div className="rounded-2xl border border-cyan-100 bg-white p-5 flex flex-col justify-center shadow-sm">
            <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">
              Matching Search
            </p>
            <p className="text-4xl font-black text-slate-800">
              {visibleUsers}
            </p>
          </div>
          <div className="rounded-2xl border border-cyan-100 bg-white p-5 flex flex-col justify-center shadow-sm">
            <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">
              Filtered Out
            </p>
            <p className="text-4xl font-black text-slate-800">
              {hiddenUsers}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-cyan-100 bg-white shadow-sm overflow-hidden">
        <div className="p-5 md:p-6 border-b border-cyan-50 flex flex-wrap items-center justify-between gap-4 bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-900">
            Users Directory
          </h2>
          <div className="relative w-full max-w-sm">
            <i className="bi bi-search pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(event) => setSearchKeyword(event.target.value)}
              placeholder="Search by name, email..."
              className="w-full rounded-xl border border-cyan-200 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 bg-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-slate-50 border-b border-cyan-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Name</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Email</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Role</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">User ID</th>
                <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-cyan-50">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-sm text-slate-500">
                    <i className="bi bi-arrow-repeat inline-block animate-spin text-2xl mb-2 text-teal-600" />
                    <p>Loading users...</p>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-sm text-slate-500">
                    <i className="bi bi-search text-3xl mb-2 text-slate-300 block" />
                    No users found matching your search.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="transition-colors hover:bg-cyan-50/40 group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full border border-cyan-200 object-cover" />
                        ) : (
                          <div className="grid h-10 w-10 place-items-center rounded-full bg-linear-to-br from-teal-500 to-cyan-500 text-sm font-bold text-white shadow-sm">
                            {getUserInitials(user)}
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-slate-800">{user.name || "Unnamed User"}</p>
                          <p className="text-xs font-medium text-slate-400 group-hover:text-teal-600 transition">View profile →</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border ${
                        isAdminUser(user)
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-cyan-50 text-cyan-700 border-cyan-200"
                      }`}>
                        {isAdminUser(user) && <i className="bi bi-shield-lock-fill" />}
                        {isAdminUser(user) ? "Admin" : "User"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-slate-500">
                      {user.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleSelectUser(user)}
                          className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-teal-50 text-teal-600 hover:bg-teal-600 hover:text-white transition"
                          title="View Details">
                          <i className="bi bi-eye-fill" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(user)}
                          disabled={user.id.toString() === loggedInUserId || isAdminUser(user)}
                          className={`inline-flex items-center justify-center h-8 w-8 rounded-lg transition ${
                            user.id.toString() === loggedInUserId || isAdminUser(user)
                              ? "cursor-not-allowed bg-slate-100 text-slate-300"
                              : "bg-rose-50 text-rose-500 hover:bg-rose-600 hover:text-white"
                          }`}
                          title="Delete User">
                          <i className="bi bi-trash3-fill" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Profile Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedUser(null)}
              className="absolute top-5 right-5 h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-rose-100 hover:text-rose-600 transition"
            >
              <i className="bi bi-x-lg" />
            </button>
            <div className="flex flex-col items-center mb-6 text-center">
              <div className="h-28 w-28 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg relative">
                {selectedUser.avatar ? (
                  <img src={selectedUser.avatar} alt={selectedUser.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full bg-linear-to-br from-teal-500 to-cyan-500 text-white flex items-center justify-center text-4xl font-bold">
                    {getUserInitials(selectedUser)}
                  </div>
                )}
                {isAdminUser(selectedUser) && (
                  <div className="absolute bottom-0 right-0 h-8 w-8 bg-amber-500 rounded-full border-2 border-white flex items-center justify-center text-white" title="Admin">
                    <i className="bi bi-shield-check" />
                  </div>
                )}
              </div>
              <h3 className="text-2xl font-black text-slate-900">{selectedUser.name || "Unnamed User"}</h3>
              <p className="text-slate-500 font-medium">{selectedUser.email}</p>
            </div>
            
            <div className="space-y-3 mt-8 pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">User ID</span>
                <span className="text-sm font-mono text-slate-700 bg-slate-100 px-2 py-1 rounded">{selectedUser.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Company</span>
                <span className="text-sm font-semibold text-slate-700">{selectedUser.company_name || "-"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Location</span>
                <span className="text-sm font-semibold text-slate-700">{selectedUser.location || "-"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Phone</span>
                <span className="text-sm font-semibold text-slate-700">{selectedUser.phone || "-"}</span>
              </div>
            </div>

            {/* User Orders Table */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <h4 className="text-sm font-bold text-slate-800 mb-3">Order History</h4>
              {ordersLoading ? (
                <div className="text-center py-4">
                  <i className="bi bi-arrow-repeat animate-spin text-teal-500 text-xl inline-block" />
                  <p className="text-xs text-slate-500 mt-1">Loading orders...</p>
                </div>
              ) : userOrders.length === 0 ? (
                <div className="text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <p className="text-sm text-slate-500 font-medium">No orders found.</p>
                </div>
              ) : (
                <div className="max-h-48 overflow-y-auto pr-2 rounded-xl border border-slate-100">
                  <table className="min-w-full text-left text-sm">
                    <thead className="bg-slate-50 sticky top-0 z-10">
                      <tr>
                        <th className="px-3 py-2 font-bold text-slate-500 text-xs uppercase tracking-wider">Product</th>
                        <th className="px-3 py-2 font-bold text-slate-500 text-xs uppercase tracking-wider text-center">Qty</th>
                        <th className="px-3 py-2 font-bold text-slate-500 text-xs uppercase tracking-wider text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {userOrders.map(order => (
                        <tr key={order.id} className="hover:bg-slate-50">
                          <td className="px-3 py-2 text-slate-700 truncate max-w-[120px]" title={order.product?.title || `ID: ${order.product_id}`}>
                            {order.product?.title || `Product #${order.product_id}`}
                          </td>
                          <td className="px-3 py-2 text-slate-600 text-center font-medium">{order.quantity}</td>
                          <td className="px-3 py-2 text-teal-600 font-bold text-right">${Number(order.total_price).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
