import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
 
import { useUpdateUser } from "../hooks/useUsersMutations";
import type { User } from "../users.types";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const schema = z.object({
  name: z.string().min(2),
  email: z.email(),
  role: z.enum(["ADMIN", "MANAGER", "USER"]),
});

type FormData = z.infer<typeof schema>;

export default function EditUserModal({ user  ,  open,
  onOpenChange}:{
    user:User,
    open:boolean,
   onOpenChange: (open: boolean) => void;
  }
) {
 
  const mutation = useUpdateUser();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(
      { id: user.id, data },
      {
        onSuccess: () => onOpenChange(false),
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
    

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <Input {...form.register("name")} placeholder="Name" />
          <Input {...form.register("email")} placeholder="Email" />

          <select
            {...form.register("role")}
            className="border p-2 rounded w-full"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="MANAGER">Manager</option>
          </select>

          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
 