import { useQuery } from "@tanstack/react-query"
import { getOrders } from "../orders.api"
import type { OrdersParams , OrdersResponse } from "../orders.types" 

export const useOrders = (params : OrdersParams)=>{
    return useQuery<OrdersResponse>({
        queryKey:["orders" ,params],
        queryFn:()=> getOrders(params),
        placeholderData: (previousData) => previousData,
    
    })
}