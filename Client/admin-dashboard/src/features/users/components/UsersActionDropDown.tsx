import EditUserModal from "./EditUserModal";
import DeleteUserDialog from "./DeleteUserDialog";
import type { User } from "../users.types";
import { Button } from  "../../../components/ui/button"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function UsersActionsDropdown({ user }: { user: User }) {
  const currentUser = useSelector((s: RootState) => s.auth.user);
const navigate = useNavigate();
 const [openEdit, setOpenEdit] = useState(false);
const handleViewOrders = (user: User) => {
  navigate(`/users/${user.id}/orders`);
};
  return (
<>
    <DropdownMenu>

      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="space-y-2">

        {/* Edit */}
        <DropdownMenuItem  asChild onClick={() => setOpenEdit(true)}>
           <Button>Edit</Button>
        </DropdownMenuItem>

        {/* Delete */}
        <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
          
            <DeleteUserDialog
              id={user.id}
              disabled={currentUser?.id === user.id}
            />
          
        </DropdownMenuItem>
<DropdownMenuItem onClick={() => handleViewOrders(user)}>
  View Orders
</DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
 <EditUserModal user={user} 
  open={openEdit}
        onOpenChange={setOpenEdit}
 />
    </>
  );
}
