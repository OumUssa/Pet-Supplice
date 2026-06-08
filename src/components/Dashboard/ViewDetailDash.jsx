import React, { useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { fetchAllProducts } from "../../API/api";

const ViewdetailDash = () => {
  const [stats, setStats] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        console.log("📥 Fetching all products for dashboard...");
        const products = await fetchAllProducts();
        setAllProducts(products);

        // Group products by category
        const categoryMap = {};
        products.forEach((product) => {
          const category =
            product.pet_category_name || product.category || "Uncategorized";
          if (!categoryMap[category]) {
            categoryMap[category] = [];
          }
          categoryMap[category].push(product);
        });

        // Convert to stats format
        const statsData = Object.entries(categoryMap).map(
          ([category, items]) => ({
            name: category,
            count: items.length,
            img: items[0]?.image_url || "/image/Dog/Dog.jpg",
          }),
        );

        console.log("✅ Dashboard stats calculated:", statsData);
        setStats(statsData);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
        // Fallback to empty stats
        setStats([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const monthlyOrders = [
    { month: "Jan", orders: 42 },
    { month: "Feb", orders: 38 },
    { month: "Mar", orders: 51 },
    { month: "Apr", orders: 47 },
    { month: "May", orders: 58 },
    { month: "Jun", orders: 64 },
  ];

  const totalStock = stats.reduce((sum, item) => sum + item.count, 0);
  const topCategory =
    stats.length > 0 ? [...stats].sort((a, b) => b.count - a.count)[0] : null;

  const chartColors = ["#0d9488", "#0891b2", "#0ea5e9", "#14b8a6", "#38bdf8"];

  // Refresh data
  const handleRefresh = async () => {
    setLoading(true);
    try {
      console.log("🔄 Refreshing dashboard data...");
      const products = await fetchAllProducts();
      setAllProducts(products);

      const categoryMap = {};
      products.forEach((product) => {
        const category =
          product.pet_category_name || product.category || "Uncategorized";
        if (!categoryMap[category]) {
          categoryMap[category] = [];
        }
        categoryMap[category].push(product);
      });

      const statsData = Object.entries(categoryMap).map(
        ([category, items]) => ({
          name: category,
          count: items.length,
          img: items[0]?.image_url || "/image/Dog/Dog.jpg",
        }),
      );

      setStats(statsData);
      console.log("✅ Dashboard refreshed");
    } catch (error) {
      console.error("❌ Error refreshing:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && stats.length === 0) {
    return (
      <div className="space-y-6 p-2">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-teal-100 mb-4">
              <svg
                className="h-6 w-6 text-teal-600 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <p className="text-slate-600 font-medium">
              Loading your products...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-2xl font-bold text-slate-900">Products Store</p>
          <p className="text-sm text-slate-500 mt-1">
            {allProducts.length} total products
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-50 text-teal-700 font-semibold hover:bg-teal-100 transition disabled:opacity-50">
            <svg
              className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
          <span className="rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700">
            Real-Time
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-cyan-100 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Total Categories</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">
            {stats.length}
          </p>
        </div>
        <div className="rounded-2xl border border-cyan-100 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Total Products</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">{totalStock}</p>
        </div>
        <div className="rounded-2xl border border-cyan-100 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Top Category</p>
          <p className="mt-1 text-xl font-bold text-slate-900">
            {topCategory ? topCategory.name : "N/A"}
          </p>
        </div>
        <div className="rounded-2xl border border-cyan-100 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Top Category Count</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">
            {topCategory ? topCategory.count : 0}
          </p>
        </div>
      </div>

      {stats.length === 0 ? (
        <div className="rounded-2xl border border-cyan-100 bg-white p-8 text-center shadow-sm">
          <p className="text-slate-500 font-medium">
            No products yet. Start by adding products to see them here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map((item, index) => (
            <div
              key={item.name}
              className="card-animate flex items-center gap-3 rounded-2xl border border-cyan-100 bg-white p-4 shadow-sm">
              <img
                src={item.img}
                alt={item.name}
                className="h-20 w-20 rounded-xl object-cover"
              />

              <div>
                <p className="text-lg font-bold text-slate-900">{item.name}</p>
                <p className="mt-1 text-sm text-slate-500">
                  Items: {item.count}
                </p>
                <span className="mt-2 inline-block rounded-full bg-teal-50 px-2 py-1 text-xs font-semibold text-teal-700">
                  Active category
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {stats.length > 0 && (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <section className="rounded-2xl border border-cyan-100 bg-white p-4 shadow-sm">
            <div className="mb-3">
              <h3 className="text-lg font-semibold text-slate-900">
                Stock by Category
              </h3>
              <p className="text-sm text-slate-500">
                Quick compare inventory counts.
              </p>
            </div>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stats}
                  margin={{ top: 10, right: 15, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#334155", fontSize: 12 }}
                  />
                  <YAxis tick={{ fill: "#334155", fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                    {stats.map((entry, index) => (
                      <Cell
                        key={`bar-${entry.name}`}
                        fill={chartColors[index % chartColors.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="rounded-2xl border border-cyan-100 bg-white p-4 shadow-sm">
            <div className="mb-3">
              <h3 className="text-lg font-semibold text-slate-900">
                Orders Trend
              </h3>
              <p className="text-sm text-slate-500">
                Monthly order performance.
              </p>
            </div>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyOrders}
                  margin={{ top: 10, right: 15, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "#334155", fontSize: 12 }}
                  />
                  <YAxis tick={{ fill: "#334155", fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    name="Orders"
                    stroke="#0d9488"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default ViewdetailDash;
