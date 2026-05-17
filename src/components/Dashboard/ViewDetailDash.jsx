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

const ViewdetailDash = () => {
  const stats = [
    { name: "Dogs", count: 30, img: "/image/Dog/Dog.jpg" },
    { name: "Cats", count: 18, img: "/image/Dog/Cat.jpg" },
    { name: "Birds", count: 10, img: "/image/Dog/bird.png" },
    { name: "Fish", count: 25, img: "/image/Dog/Fish.jpg" },
    { name: "Small Pets", count: 12, img: "/image/Dog/smallPet.png" },
  ];

  const monthlyOrders = [
    { month: "Jan", orders: 42 },
    { month: "Feb", orders: 38 },
    { month: "Mar", orders: 51 },
    { month: "Apr", orders: 47 },
    { month: "May", orders: 58 },
    { month: "Jun", orders: 64 },
  ];

  const totalStock = stats.reduce((sum, item) => sum + item.count, 0);
  const topCategory = [...stats].sort((a, b) => b.count - a.count)[0];

  const chartColors = ["#0d9488", "#0891b2", "#0ea5e9", "#14b8a6", "#38bdf8"];

  return (
    <div className="space-y-6 p-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-2xl font-bold text-slate-900">Products Store</p>
        <span className="rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700">
          Analytics Snapshot
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-cyan-100 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Total Categories</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">
            {stats.length}
          </p>
        </div>
        <div className="rounded-2xl border border-cyan-100 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Total Stock</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">{totalStock}</p>
        </div>
        <div className="rounded-2xl border border-cyan-100 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Top Category</p>
          <p className="mt-1 text-xl font-bold text-slate-900">
            {topCategory.name}
          </p>
        </div>
        <div className="rounded-2xl border border-cyan-100 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Monthly Orders</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">
            {monthlyOrders[5].orders}
          </p>
        </div>
      </div>

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
              <p className="mt-1 text-sm text-slate-500">Items: {item.count}</p>
              <span className="mt-2 inline-block rounded-full bg-teal-50 px-2 py-1 text-xs font-semibold text-teal-700">
                Active category
              </span>
            </div>
          </div>
        ))}
      </div>

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
            <p className="text-sm text-slate-500">Monthly order performance.</p>
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


    </div>
  );
};

export default ViewdetailDash;
