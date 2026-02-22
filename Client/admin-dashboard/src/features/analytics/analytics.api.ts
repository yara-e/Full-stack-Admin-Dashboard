import { api } from "@/services/api/axios"
import type {
  OverviewResponse,
  TrendResponse,
  StatusResponse,
  UserRolesResponse,
  BestSellersResponse,
  Revenue,

} from "./analytics.types";


export const getOverview = async (): Promise<OverviewResponse> => {
  const { data } = await api.get('analytics/overview');
  return data;
};

export const getOrdersTrend = async (
  days: number
): Promise<TrendResponse> => {
  const { data } = await api.get(
    `analytics/charts/orders-trend`,
    { params: { days } }
  );
  return data;
};

export const getOrdersStatus =
  async (): Promise<StatusResponse> => {
    const { data } = await api.get(
      `analytics/charts/orders-status`
    );
    return data;
  };

export const getUserRoles =
  async (): Promise<UserRolesResponse> => {
    const { data } = await api.get(
      `analytics/charts/user-roles`
    );
    return data;
  };

export const getBestSellers =
  async (): Promise<BestSellersResponse> => {
    const { data } = await api.get(
      `analytics/charts/best-sellers`
    );
    return data;
  };


export const getRevenueByPayment = async (): Promise<Revenue> => {
  const { data } = await api.get(`analytics/charts/revenue-by-payment`);
  return data;
}