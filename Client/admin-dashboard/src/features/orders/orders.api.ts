import { api } from "@/services/api/axios"
import type { OrdersParams, OrderStatus } from "./orders.types";

export const getUserOrders = async (userId?: number) => {

  const res = await api.get(`/orders/user/${userId}`);
  return res.data;
}

export const getOrders = async (params: OrdersParams) => {
  const res = await api.get("/orders", { params })
  return res.data
}

export const updateOrderStatus = async (id: number, status: OrderStatus) => {
  const res = await api.patch(`/orders/${id}`, status);
  return res.data;
}

export const getOrder = async (orderId?: number) => {

  const res = await api.get(`/orders/${orderId}`);
  return res.data;
}