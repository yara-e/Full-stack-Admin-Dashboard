import { useQuery } from "@tanstack/react-query";
import {
  getOverview,
  getOrdersTrend,
  getOrdersStatus,
  getUserRoles,
  getBestSellers,
  getRevenueByPayment,
  
} from "../analytics.api";

export const useOverview = () =>
  useQuery({
    queryKey: ["overview"],
    queryFn: getOverview,
  });

export const useOrdersTrend = (days: number) =>
  useQuery({
    queryKey: ["ordersTrend", days],
    queryFn: () => getOrdersTrend(days),
  });

export const useOrdersStatus = () =>
  useQuery({
    queryKey: ["ordersStatus"],
    queryFn: getOrdersStatus,
  });

export const useUserRoles = () =>
  useQuery({
    queryKey: ["userRoles"],
    queryFn: getUserRoles,
  });

export const useBestSellers = () =>
  useQuery({
    queryKey: ["bestSellers"],
    queryFn: getBestSellers,
  });

  export const useRevenuByPayment = ()=>
    useQuery({
      queryKey: ["RevenuPayment"],
      queryFn: getRevenueByPayment
    })