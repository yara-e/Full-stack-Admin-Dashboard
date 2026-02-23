"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getuserOrdersService = exports.getOrderByIdService = exports.updateOrderStatusService = exports.findOrdersService = void 0;
const cacheInvalidations_1 = require("../analytics/cacheInvalidations");
const appError_1 = __importDefault(require("../common/error/appError"));
const cursor_1 = require("../common/utils/cursor");
const order_repository_1 = require("./order.repository");
const findOrdersService = async (query) => {
    const limit = Math.min(Number(query.limit) || 10, 100);
    const after = query.after ? (0, cursor_1.decodeCursor)(query.after) : undefined;
    const before = query.before ? (0, cursor_1.decodeCursor)(query.before) : undefined;
    if (after && before) {
        throw new appError_1.default("Cannot use both 'after' and 'before'");
    }
    const orders = await (0, order_repository_1.findOrders)({
        limit: limit + 1,
        after,
        before,
        status: query.status,
        userId: Number(query.userId),
    });
    const hasMore = orders.length > limit;
    if (hasMore) {
        if (before) {
            // backward pagination → remove first item
            orders.shift();
        }
        else {
            // forward pagination → remove last item
            orders.pop();
        }
    }
    let nextCursor = null;
    let prevCursor = null;
    if (after) {
        nextCursor = hasMore ? (0, cursor_1.encodeCursor)(orders[orders.length - 1]) : null;
        prevCursor = orders.length ? (0, cursor_1.encodeCursor)(orders[0]) : null;
    }
    else if (before) {
        nextCursor = orders.length ? (0, cursor_1.encodeCursor)(orders[orders.length - 1]) : null;
        prevCursor = hasMore ? (0, cursor_1.encodeCursor)(orders[0]) : null;
    }
    else {
        // first page
        nextCursor = hasMore ? (0, cursor_1.encodeCursor)(orders[orders.length - 1]) : null;
        prevCursor = null;
    }
    return {
        data: orders,
        meta: {
            limit,
            nextCursor,
            prevCursor,
            hasMore,
        },
    };
};
exports.findOrdersService = findOrdersService;
const updateOrderStatusService = async (orderId, status) => {
    const update = await (0, order_repository_1.updateOrderStatus)(orderId, status);
    await (0, cacheInvalidations_1.invalidateAnalyticsCache)();
    return update;
};
exports.updateOrderStatusService = updateOrderStatusService;
const getOrderByIdService = (orderId) => {
    return (0, order_repository_1.findOrderById)(orderId);
};
exports.getOrderByIdService = getOrderByIdService;
const getuserOrdersService = (userId) => {
    return (0, order_repository_1.findUsersOrder)(userId);
};
exports.getuserOrdersService = getuserOrdersService;
