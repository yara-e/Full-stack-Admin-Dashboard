"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.softDeleteUserService = exports.updateUserService = exports.getUsersService = void 0;
const user_repository_1 = require("./user.repository");
const cursor_1 = require("../common/utils/cursor");
const cacheInvalidations_1 = require("../analytics/cacheInvalidations");
const appError_1 = __importDefault(require("../common/error/appError"));
const getUsersService = async (query) => {
    const limit = Math.min(Number(query.limit) || 10, 100);
    // decode cursor
    const after = query.after ? (0, cursor_1.decodeCursor)(query.after) : undefined;
    const before = query.before ? (0, cursor_1.decodeCursor)(query.before) : undefined;
    if (after && before)
        throw new appError_1.default("Cannot use both 'after' and 'before'");
    // fetch limit + 1
    const users = await (0, user_repository_1.findUsers)({
        limit: limit + 1,
        after,
        before,
        search: query.search,
        role: query.role,
    });
    const hasMore = users.length > limit;
    if (hasMore) {
        if (before) {
            // backward pagination → remove first item
            users.shift();
        }
        else {
            // forward pagination → remove last item
            users.pop();
        }
    }
    // cursors
    let nextCursor = null;
    let prevCursor = null;
    if (after) {
        nextCursor = hasMore ? (0, cursor_1.encodeCursor)(users[users.length - 1]) : null;
        prevCursor = users.length ? (0, cursor_1.encodeCursor)(users[0]) : null;
    }
    else if (before) {
        nextCursor = users.length ? (0, cursor_1.encodeCursor)(users[users.length - 1]) : null;
        prevCursor = hasMore ? (0, cursor_1.encodeCursor)(users[0]) : null;
    }
    else {
        // first page
        nextCursor = hasMore ? (0, cursor_1.encodeCursor)(users[users.length - 1]) : null;
        prevCursor = null;
    }
    return {
        data: users,
        meta: { limit, nextCursor, prevCursor, hasMore },
    };
};
exports.getUsersService = getUsersService;
const updateUserService = async (id, data) => {
    const updatedUser = await (0, user_repository_1.updateUser)(id, data);
    await (0, cacheInvalidations_1.invalidateAnalyticsCache)();
    return updatedUser;
};
exports.updateUserService = updateUserService;
const softDeleteUserService = async (id) => {
    const deletedUser = await (0, user_repository_1.softDeleteUser)(id);
    await (0, cacheInvalidations_1.invalidateAnalyticsCache)();
    return deletedUser;
};
exports.softDeleteUserService = softDeleteUserService;
