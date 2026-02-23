"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidatePattern = void 0;
const redis_1 = require("../../config/redis");
const invalidatePattern = async (pattern) => {
    const keys = await redis_1.redis.keys(pattern);
    if (!keys.length)
        return;
    if (keys.length) {
        await redis_1.redis.del(...keys);
    }
};
exports.invalidatePattern = invalidatePattern;
