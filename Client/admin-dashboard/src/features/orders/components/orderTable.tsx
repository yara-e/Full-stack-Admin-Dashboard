import type { Order } from "../orders.types";
import OrderActionsDropdown from "./OrderActionDropDown";

interface props{
    orders: Order[]
}
export default function OrderTable({orders}:props){
    return(
        <div className="rounded-md border overflow-x-auto">
    <table className="w-full text-sm">
      <thead className="bg-muted">
        <tr>
          <th className="p-3 text-left">User Name</th>
          <th className="p-3 text-left">Total Price</th>
          <th className="p-3 text-left">Status</th>
          <th className="p-3 text-left">Actions</th>
        </tr>
      </thead>

      <tbody>
        {orders.map((o : Order) => (
          <tr key={o.id} className="border-t">
            <td className="p-3">{o.User?.name}</td>
            <td className="p-3">${o.amount}</td>
            <td className="p-3">
              
              <StatusBadge status={o.status} />
              
              </td>
             

            <td className="p-3">
               
              <OrderActionsDropdown order={o}></OrderActionsDropdown>
                
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    )
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    COMPLETED: "bg-green-100 text-green-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1  text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-700"}`}
    >
      {status}
    </span>
  );
}