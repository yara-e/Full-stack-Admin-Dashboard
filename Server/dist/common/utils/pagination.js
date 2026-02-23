"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCursorPagination = exports.getPagination = void 0;
const getPagination = (page, limit) => {
    const pageNumber = Math.max(Number(page) || 1, 1);
    const pageSize = Math.min(Number(limit) || 10, 100);
    return {
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        page: pageNumber,
        limit: pageSize
    };
};
exports.getPagination = getPagination;
const getCursorPagination = (query) => {
    const limit = Math.min(Number(query.limit) || 10, 100);
    return { limit, after: query.after, before: query.before };
};
exports.getCursorPagination = getCursorPagination;
