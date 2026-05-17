import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { userStore } from "../store/RegisterStore";
import { useToast } from "../components/Base/BaseToast";

const Admin = () => {
  const { showSuccess, showError, showInfo } = useToast();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");

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
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();
    if (!keyword) return users;

    return users.filter(
      (user) =>
        (user.name || "").toLowerCase().includes(keyword) ||
        (user.email || "").toLowerCase().includes(keyword) ||
        (user.id || "").toLowerCase().includes(keyword),
    );
  }, [users, searchKeyword]);

  const totalUsers = users.length;
  const visibleUsers = filteredUsers.length;
  const hiddenUsers = Math.max(totalUsers - visibleUsers, 0);

  const isAdminUser = (user) =>
    (user.role || "").toLowerCase() === "admin" ||
    (user.email || "").trim().toLowerCase() === "admin@petstore.com";

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

    if (user.id === loggedInUserId) {
      showInfo("You cannot delete the currently logged in user.");
      return;
    }

    const confirmed = window.confirm(
      `Delete user \"${user.name || user.email}\" permanently?`,
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

  return (
    <div className="site-shell min-h-screen px-4 py-6 md:p-8">
      <div className="mx-auto w-full max-w-7xl space-y-6">
        <header className="rounded-3xl border border-cyan-100 bg-linear-to-r from-teal-600 via-teal-700 to-slate-900 px-5 py-6 text-white shadow-[0_22px_48px_rgba(15,118,110,0.22)] md:px-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-teal-100">
                Admin Console
              </p>
              <h1 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">
                User Management
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-teal-50 md:text-base">
                Review and delete website users from one dashboard. The admin
                account is protected so you can always manage users safely.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-xl border border-teal-200/40 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20">
                <i className="bi bi-house-door" />
                Home
              </Link>
              <Link
                to="/DashboardView"
                className="inline-flex items-center gap-2 rounded-xl border border-teal-200/40 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20">
                <i className="bi bi-grid" />
                Dashboard
              </Link>
            </div>
          </div>
        </header>

        <section>
          <article className="rounded-3xl border border-cyan-100 bg-white p-5 shadow-sm md:p-6">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Users List
                </h2>
                <p className="text-sm text-slate-500">
                  Search by name, email, or user id.
                </p>
              </div>

              <div className="w-full max-w-sm">
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Search User
                </label>
                <div className="relative">
                  <i className="bi bi-search pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchKeyword}
                    onChange={(event) => setSearchKeyword(event.target.value)}
                    placeholder="Search users..."
                    className="w-full rounded-xl border border-cyan-200 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                  />
                </div>
              </div>
            </div>

            <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-cyan-100 bg-cyan-50/50 p-3">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500">
                  Registered Users
                </p>
                <p className="mt-1 text-lg font-bold text-slate-900">
                  {totalUsers}
                </p>
              </div>
              <div className="rounded-xl border border-cyan-100 bg-cyan-50/50 p-3">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500">
                  Matching Search
                </p>
                <p className="mt-1 text-lg font-bold text-slate-900">
                  {visibleUsers}
                </p>
              </div>
              <div className="rounded-xl border border-cyan-100 bg-cyan-50/50 p-3">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500">
                  Filtered Out
                </p>
                <p className="mt-1 text-lg font-bold text-slate-900">
                  {hiddenUsers}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-cyan-100">
              <table className="min-w-full bg-white">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.13em] text-slate-500">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.13em] text-slate-500">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.13em] text-slate-500">
                      Role
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.13em] text-slate-500">
                      User ID
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.13em] text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-cyan-100">
                  {loading ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-4 py-8 text-center text-sm text-slate-500">
                        Loading users...
                      </td>
                    </tr>
                  ) : filteredUsers.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-4 py-8 text-center text-sm text-slate-500">
                        No users found.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="transition-colors odd:bg-white even:bg-slate-50/40 hover:bg-cyan-50/60">
                        <td className="px-4 py-3 text-sm font-semibold text-slate-800">
                          <div className="flex items-center gap-3">
                            {user.avatar ? (
                              <img
                                src={user.avatar}
                                alt={user.name || "User avatar"}
                                className="h-9 w-9 rounded-full border border-cyan-200 object-cover"
                              />
                            ) : (
                              <div className="grid h-9 w-9 place-items-center rounded-full border border-cyan-200 bg-cyan-100 text-xs font-bold text-cyan-700">
                                {getUserInitials(user)}
                              </div>
                            )}

                            <div>
                              <p className="font-semibold text-slate-800">
                                {user.name || "Unnamed User"}
                              </p>
                              <p className="text-xs font-medium text-slate-500">
                                Profile posted
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-700">
                          {user.email}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                              isAdminUser(user)
                                ? "bg-amber-100 text-amber-700"
                                : "bg-cyan-100 text-cyan-700"
                            }`}>
                            {isAdminUser(user) ? "Admin" : "User"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs font-medium text-slate-500">
                          {user.id}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleDelete(user)}
                              disabled={
                                user.id === loggedInUserId || isAdminUser(user)
                              }
                              className={`inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                                user.id === loggedInUserId || isAdminUser(user)
                                  ? "cursor-not-allowed border-rose-300 bg-rose-300 text-white"
                                  : "border-rose-500 bg-rose-500 text-white hover:bg-rose-600"
                              }`}>
                              <i className="bi bi-trash3" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};

export default Admin;
