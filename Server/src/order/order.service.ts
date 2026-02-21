
import { invalidateAnalyticsCache } from '../analytics/cacheInvalidations';
import AppError from '../common/error/appError';
import { encodeCursor, decodeCursor } from '../common/utils/cursor';
import { findOrderById, findOrders, findUsersOrder, updateOrderStatus } from './order.repository';
import { FindOrderQuery } from './order.types';

export const findOrdersService = async (query: FindOrderQuery) => {

  const limit = Math.min(Number(query.limit) || 10, 100);
  const after = query.after ? decodeCursor(query.after) : undefined;
  const before = query.before ? decodeCursor(query.before) : undefined;

  if (after && before) {
    throw new AppError("Cannot use both 'after' and 'before'");
  }

  const orders = await findOrders({
    limit: limit + 1,
    after,
    before,
    status: query.status,
    userId: Number(query.userId),
  })

  const hasMore = orders.length > limit;

  if (hasMore) {
    if (before) {
      // backward pagination → remove first item
      orders.shift();
    } else {
      // forward pagination → remove last item
      orders.pop();
    }
  }
  let nextCursor: string | null = null;
  let prevCursor: string | null = null;

  if (after) {
    nextCursor = hasMore ? encodeCursor(orders[orders.length - 1]) : null;
    prevCursor = orders.length ? encodeCursor(orders[0]) : null;
  } else if (before) {
    nextCursor = orders.length ? encodeCursor(orders[orders.length - 1]) : null;
    prevCursor = hasMore ? encodeCursor(orders[0]) : null;
  } else {
    // first page
    nextCursor = hasMore ? encodeCursor(orders[orders.length - 1]) : null;
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
}


export const updateOrderStatusService = async (
  orderId: number,
  status: "COMPLETED" | "CANCELLED"
) => {
  const update = await updateOrderStatus(orderId, status);
  await invalidateAnalyticsCache();
  return update
};

export const getOrderByIdService = (
  orderId: number,
) => {

  return findOrderById(orderId);

};

export const getuserOrdersService = (userId: number) => {
  return findUsersOrder(userId)
}


