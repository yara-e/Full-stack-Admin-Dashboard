"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheKeys = void 0;
exports.cacheKeys = {
    // ---------- Overview ----------
    dashboardSummary: () => `analytics:dashboard-summary`,
    // ---------- Orders Trend ----------
    ordersTrend: (days, groupBy) => `analytics:orders-trend:${days}:${groupBy}`,
    // ---------- Orders Status ----------
    ordersStatus: () => `analytics:orders-status`,
    // ---------- User Roles ----------
    userRoles: () => `analytics:user-roles`,
    // ---------- Best Sellers ----------
    bestSellers: () => `analytics:best-sellers`,
    // ---------- Revenue by Payment ----------
    revenueByPaymentMethod: () => `analytics:revenue-by-payment`,
    // ---------- Orders Per Hour ----------
    ordersPerHour: (days) => `analytics:orders-per-hour:${days}`,
    // ---------- Top Customers ----------
    topCustomers: (limit) => `analytics:top-customers:${limit}`,
    // ---------- Low Stock Products ----------
    lowStockProducts: (threshold) => `analytics:low-stock:${threshold}`,
    // ---------- Order Completion Rate ----------
    orderCompletionRate: () => `analytics:order-completion-rate`,
};
