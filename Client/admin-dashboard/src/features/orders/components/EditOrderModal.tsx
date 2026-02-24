import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUpdateOrder } from "../hooks/useOrderMutations";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,

} from "@/components/ui/dialog";
 
import type { OrderStatus } from "../orders.types";

const schema= z.object({
    status: z.enum(["PENDING" , "COMPLETED" , "CANCELLED"])
}) 
type FormData = z.infer<typeof schema>;

export default function EditOrderModal({
  id,
  status,
  open,
  onOpenChange,
}: {
  id: number;
  status: OrderStatus;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const mutation = useUpdateOrder();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      status,
    },
  });

const onSubmit = (data: FormData) => {
  mutation.mutate(
    { id, status: data.status },
    {
      onSuccess: () => onOpenChange(false),
    }
  );
};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Status</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <select
            {...form.register("status")}
            className="border p-2 rounded w-full"
          >
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELLED">CANCELLED</option>
            <option value="PENDING">PENDING</option>
          </select>

          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
