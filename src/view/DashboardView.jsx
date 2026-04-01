import { useMemo } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Slidebar from "../components/Dashboard/slidebar";

const DashboardView = () => {
  const location = useLocation();

  const pageTitle = useMemo(() => {
    const map = {
      "/DashboardView": "Dashboard Overview",
      "/DashboardView/tableview": "Inventory Table",
      "/DashboardView/insertStore": "Insert Product",
      "/DashboardView/UpdateStore": "Update Product",
    };

    return map[location.pathname] || "Dashboard";
  }, [location.pathname]);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="site-shell min-h-screen">
      <div className="mx-auto flex w-full max-w-screen-2xl gap-5 p-4 lg:p-6">
        <Slidebar />

        <main className="flex-1 overflow-hidden rounded-3xl border border-cyan-100 bg-white/80 p-4 shadow-[0_18px_46px_rgba(15,118,110,0.14)] backdrop-blur-sm md:p-6">
          <div className="mb-5 rounded-2xl border border-cyan-100 bg-linear-to-r from-teal-600 to-slate-800 px-5 py-4 text-white">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-teal-100">
                  {today}
                </p>
                <h1 className="text-xl font-semibold md:text-2xl">
                  {pageTitle}
                </h1>
                <p className="mt-1 text-sm text-teal-50">
                  Manage products, categories, and updates from one clean panel.
                </p>
              </div>

              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-xl border border-teal-200/40 bg-white/10 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/20">
                <i className="bi bi-house-door" />
                Back to Website
              </Link>
            </div>
          </div>

          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardView;
