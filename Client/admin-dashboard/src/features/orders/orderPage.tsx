import OrderTable from "./components/orderTable"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UsersSkeleton from "../users/components/UsersSkeleton";
import { useOrders } from "./hooks/useOrders";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { OrderStatus } from "./orders.types";
export default function OrderPage  ()  {
 const [after, setAfter] = useState<string>();
  const [before, setBefore] = useState<string>();
const [status , setStatus] = useState<OrderStatus>();
  const { data, isLoading } = useOrders({
      limit: 5,
  status,
      after,
      before,
    });

     const resetCursor = () => {
    setAfter(undefined);
    setBefore(undefined);
  };
  return (
    <div className="space-y-6 overflow-x-auto">

       

<Card className="bg-white relative z-50">
   <CardHeader>
    <h1 className="text-2xl font-semibold mb-5">Orders Management</h1>
          <CardTitle>Orders List</CardTitle>
        </CardHeader>
<CardContent className="space-y-6">
<Select
 
        value={status}
        onValueChange={(value) => {
          setStatus(value === "ALL" ? undefined : value);
          resetCursor();
        }}
        
      >
              <SelectTrigger className="md:w-72">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ALL">All</SelectItem>
                <SelectItem value="COMPLETED">	COMPLETED</SelectItem>
                <SelectItem value="PENDING">PENDING</SelectItem>
                <SelectItem value="CANCELLED">CANCELLED</SelectItem>
              </SelectContent>
            </Select>
  
 
      {isLoading ? (
        <UsersSkeleton />
      ) : (
        <>
          <OrderTable orders={data?.data ?? []} />

          <div className="flex justify-between">
            <Button
              disabled={!data?.meta.prevCursor}
              onClick={() => {
                setBefore(data?.meta.prevCursor ?? undefined);
                setAfter(undefined);
              }}
            >
              Previous
            </Button>

            <Button
              disabled={!data?.meta.nextCursor}
              onClick={() => {
                setAfter(data?.meta.nextCursor ?? undefined);
                setBefore(undefined);
              }}
            >
              Next
            </Button>
          </div>
        </>
      )}

</CardContent>


</Card>
     
    </div>
  )
}
 
