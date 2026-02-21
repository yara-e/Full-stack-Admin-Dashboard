export type OrderStatus = "PENDING" | "COMPLETED" | "CANCELLED";

export interface OrderUser {
    id: number;
    name: string;
}

export interface Payment {
    status: string;
    method: string;
}

export interface Order {
    id: number;
    amount: number;
    status: OrderStatus;
    createdAt: string;
    User: OrderUser;
    Payment: Payment | null;
}

export interface OrdersMeta {
    limit: number;
    nextCursor: string | null;
    prevCursor: string | null;
    hasMore: boolean;
}

export interface OrdersResponse {
    data: Order[];
    meta: OrdersMeta;
}

export interface OrdersParams {
    limit?: number;
    after?: string;
    before?: string;
    status?: OrderStatus;
}
