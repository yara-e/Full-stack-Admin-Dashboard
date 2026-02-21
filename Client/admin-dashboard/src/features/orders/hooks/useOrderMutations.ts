import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatus } from "../orders.api";
import type {OrderStatus } from "../orders.types";
import { toast } from "sonner";

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: number;
      status: OrderStatus;
    }) => updateOrderStatus(id, status),

    onSuccess: () => {
      toast.success("Order updated");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },

    onError: () => {
      toast.error("Failed to update order");
    },
  });
};