import { useQuery } from "@tanstack/react-query";
import { getUserOrders } from "../orders.api";

export const useUserOrders = (userId?: number , options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["userOrders", userId],
    queryFn: () => getUserOrders(userId!),
     enabled: options?.enabled ?? true,
  });
};
