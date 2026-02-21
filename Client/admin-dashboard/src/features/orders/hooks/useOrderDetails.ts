import { useQuery } from "@tanstack/react-query";
import { getOrder } from "../orders.api";

export const useOrderDetails = (orderId?: number ) => {
  return useQuery({
    queryKey: ["userOrders", orderId],
    queryFn: () => getOrder(orderId),
     
  });
};
