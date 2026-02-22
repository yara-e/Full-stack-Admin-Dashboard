import { useState } from "react";
import {
  useOrdersTrend,
  useOrdersStatus,
  useUserRoles,
  useBestSellers,
  useRevenuByPayment,
} from "./hooks/useAnalytics";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#ef4444"];

export default function AnalyticsPage() {
  const [days, setDays] = useState<number>(30);

  const { data: trend } = useOrdersTrend(days);
  const { data: status } = useOrdersStatus();
  const { data: roles } = useUserRoles();
  const { data: best } = useBestSellers();
  const {data: revenue} = useRevenuByPayment();

  // -------------------------
  // Transform Orders Trend
  // -------------------------
  const trendData =
    trend?.labels.map((label, index) => ({
      date: new Date(label).toLocaleDateString(),
      Orders: trend.datasets[0].data[index],
      Revenue: trend.datasets[1].data[index],
    })) ?? [];

  // -------------------------
  // Transform Orders Status
  // -------------------------
  const statusData =
    status?.labels.map((label, index) => ({
      name: label,
      value: status.datasets[0].data[index],
    })) ?? [];

  // -------------------------
  // Transform User Roles
  // -------------------------
  const rolesData =
    roles?.labels.map((label, index) => ({
      name: label,
      value: roles.datasets[0].data[index],
    })) ?? [];

     // -------------------------
  // Transform Revenue By Payment
  // -------------------------
const Payment =
    revenue?.labels.map((label, index) => ({
      name: label,
      value:revenue.datasets[0].data[index],
    })) ?? [];


  // -------------------------
  // Transform Best Sellers
  // -------------------------
  const bestData =
    best?.labels.map((label, index) => ({
      name: label,
      quantity: best.datasets[0].data[index],
    })) ?? [];

  return (
    <div className="min-h-screen bg-slate-50 relative z-50 rounded-2xl p-8 ">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* ================= HEADER ================= */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Analytics
              </h1>
              <p className="text-slate-500 mt-1">
                Deep insights into performance and user behavior.
              </p>
            </div>
          </div>

          {/* Range Selector */}
          <div className="flex bg-white border border-slate-200 rounded-xl p-1 w-fit  ">
            {[7, 30, 90].map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                  days === d
                    ? "bg-black text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {d} Days
              </button>
            ))}
          </div>
        </div>

        {/* ================= ORDERS TREND ================= */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold">
            Orders & Revenue Trend
          </h2>

          <div className="bg-white rounded-2xl p-8 border border-slate-200">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={trendData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="Orders"
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  dot={false}
                />

                <Line
                  type="monotone"
                  dataKey="Revenue"
                  stroke="#16a34a"
                  strokeWidth={2.5}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* ================= DISTRIBUTION ================= */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold">
            Distribution Insights
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Orders by Status */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <h3 className="text-base font-medium mb-6">
                Orders by Status
              </h3>

              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                  >
                    {statusData.map((_, index) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[index % COLORS.length]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Users by Role */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <h3 className="text-base font-medium mb-6">
                Users by Role
              </h3>

              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={rolesData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                  >
                    {rolesData.map((_, index) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[index % COLORS.length]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>


            {/*Revenu by payment*/}

            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <h3 className="text-base font-medium mb-6">
                Revenue By Paymeny
              </h3>

              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={Payment}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                  >
                    {statusData.map((_, index) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[index % COLORS.length]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* ================= BEST SELLERS ================= */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold">
            Product Performance
          </h2>

          <div className="bg-white rounded-2xl p-8 border border-slate-200">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={bestData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar
                  dataKey="quantity"
                  fill="#2563eb"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  );
}