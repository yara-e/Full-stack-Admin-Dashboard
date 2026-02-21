import { Button } from  "../../../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Order } from "../orders.types";
import EditOrderModal from "./EditOrderModal";
import { useState } from "react";

export default function OrderActionsDropdown({ order }: { order: Order }) {
  const navigate = useNavigate();
  const [openEdit, setOpenEdit] = useState(false);

  const handleViewOrder = (id: number) => {
     navigate(`/orders/${id}`);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => setOpenEdit(true)}
          >
            <Button>Edit</Button>
            
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => handleViewOrder(order.id)}
          >
            View details
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      
      <EditOrderModal
        id={order.id}
        status={order.status}
        open={openEdit}
        onOpenChange={setOpenEdit}
      />
    </>
  );
}
