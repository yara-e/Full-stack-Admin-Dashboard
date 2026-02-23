"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUsersOrder = exports.findOrderById = exports.updateOrderStatus = exports.findOrders = void 0;
const client_1 = require("../common/db/client");
const findOrders = async (params) => {
    const { limit, after, before, status, userId } = params;
    if (after && before) {
        throw new Error("Cannot use both 'after' and 'before'");
    }
    const isBackward = Boolean(before);
    const cursor = after ?? before;
    const where = {};
    if (status)
        where.status = status;
    if (userId)
        where.userId = userId;
    if (cursor) {
        const cursorFilter = isBackward
            ? {
                OR: [
                    { createdAt: { gt: cursor.createdAt } },
                    { createdAt: cursor.createdAt, id: { gt: cursor.id } },
                ],
            }
            : {
                OR: [
                    { createdAt: { lt: cursor.createdAt } },
                    { createdAt: cursor.createdAt, id: { lt: cursor.id } },
                ],
            };
        where.AND = [...(where.AND ?? []), cursorFilter];
    }
    const orders = await client_1.prisma.order.findMany({
        where,
        take: limit,
        orderBy: [
            { createdAt: isBackward ? "asc" : "desc" },
            { id: isBackward ? "asc" : "desc" },
        ],
        select: {
            id: true,
            amount: true,
            status: true,
            createdAt: true,
            User: { select: { id: true, name: true } },
            Payment: { select: { status: true, method: true } },
        },
    });
    return isBackward ? orders.reverse() : orders;
};
exports.findOrders = findOrders;
const updateOrderStatus = async (orderId, status) => {
    return client_1.prisma.order.update({
        where: { id: orderId },
        data: {
            status,
            Payment: status === "COMPLETED"
                ? {
                    update: {
                        status: "PAID",
                        paidAt: new Date(),
                    },
                }
                : undefined,
        },
    });
};
exports.updateOrderStatus = updateOrderStatus;
const findOrderById = async (orderId) => {
    const where = { id: orderId };
    const order = await client_1.prisma.order.findFirst({
        where,
        include: {
            User: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                },
            },
            OrderProduct: {
                include: {
                    Product: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
            Payment: true,
        },
    });
    if (!order) {
        throw new Error("Order not found");
    }
    return order;
};
exports.findOrderById = findOrderById;
const findUsersOrder = async (userId) => {
    const orders = await client_1.prisma.order.findMany({
        where: { userId: userId },
        include: {
            OrderProduct: {
                include: {
                    Product: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
            Payment: true
        }
    });
    return orders;
};
exports.findUsersOrder = findUsersOrder;
