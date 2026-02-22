import {
  useOverview,
  useOrdersTrend,
  useOrdersStatus,
} from "./hooks/useAnalytics";
import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#ef4444"];

export default function DashboardPage() {
  const { data: overview } = useOverview();
  const { data: trend } = useOrdersTrend(7);
  const { data: status } = useOrdersStatus();

  // -------------------------
  // Transform Trend Data
  // -------------------------
  const trendData =
    trend?.labels.map((label, index) => ({
      date: new Date(label).toLocaleDateString(),
      Orders: trend.datasets[0].data[index],
      Revenue: trend.datasets[1].data[index],
    })) ?? [];

  // -------------------------
  // Transform Status Data
  // -------------------------
  const statusData =
    status?.labels.map((label, index) => ({
      name: label,
      value: status.datasets[0].data[index],
    })) ?? [];

  return (
    
      <Card className="max-w-7xl mx-auto space-y-12 bg-slate-50 z-50 relative  p-6 ">
        {/* ================= HEADER ================= */}
        <div className="space-y-2 ">
          <h1 className="text-3xl font-semibold tracking-tight">
            Dashboard
          </h1>
          <p className="text-slate-500">
            Analytics summary of your platform performance.
          </p>
        </div>

        {/* ================= KPI CARDS ================= */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold">
            Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CardT
             
              title="Users"
              value={overview?.totalUsers}
               
            />
            <CardT
              title="Products"
              value={overview?.totalProducts}
            />
            <CardT
              title="Orders"
              value={overview?.totalOrders}
            />
            <CardT
              title="Revenue"
              value={`$${parseInt(overview?.totalRevenue) ?? 0}`}
            />
          </div>
        </section>

        {/* ================= ANALYTICS ================= */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold">
            Performance Insights
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Orders Trend (Primary) */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-slate-200 ">
              <h3 className="text-base font-medium mb-6">
                Orders & Revenue (Last 7 Days)
              </h3>

              <ResponsiveContainer width="100%" height={320}>
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

            {/* Orders Status */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <h3 className="text-base font-medium mb-6">
                Orders by Status
              </h3>

              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={4}
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
      </Card>
    
  );
}

/* ================= KPI CARD ================= */

const icons = {
  Users: Users,
  Products: Package,
  Orders: ShoppingCart,
  Revenue: DollarSign,
};

function CardT({
  title,
  value,
}: {
  title: string;
  value: number | string | undefined;
}) {
  const Icon = icons[title as keyof typeof icons];

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 transition hover:shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

        {Icon && (
          <Icon className="w-5 h-5 text-slate-400" />
        )}
      </div>

      <h2 className="text-3xl font-semibold mt-4">
        {value ?? 0}
      </h2>
    </div>
  );
}