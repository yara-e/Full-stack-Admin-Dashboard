export const cacheKeys = {
  // ---------- Overview ----------
  dashboardSummary: () =>
    `analytics:dashboard-summary`,

  // ---------- Orders Trend ----------
  ordersTrend: (days: number, groupBy: "day" | "week" | "month") =>
    `analytics:orders-trend:${days}:${groupBy}`,

  // ---------- Orders Status ----------
  ordersStatus: () =>
    `analytics:orders-status`,

  // ---------- User Roles ----------
  userRoles: () =>
    `analytics:user-roles`,

  // ---------- Best Sellers ----------
  bestSellers: () =>
    `analytics:best-sellers`,

  // ---------- Revenue by Payment ----------
  revenueByPaymentMethod: () =>
    `analytics:revenue-by-payment`,

  // ---------- Orders Per Hour ----------
  ordersPerHour: (days: number) =>
    `analytics:orders-per-hour:${days}`,

  // ---------- Top Customers ----------
  topCustomers: (limit: number) =>
    `analytics:top-customers:${limit}`,

  // ---------- Low Stock Products ----------
  lowStockProducts: (threshold: number) =>
    `analytics:low-stock:${threshold}`,

  // ---------- Order Completion Rate ----------
  orderCompletionRate: () =>
    `analytics:order-completion-rate`,
};