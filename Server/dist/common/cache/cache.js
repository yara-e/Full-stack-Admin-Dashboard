"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCache = exports.setCache = exports.getCache = void 0;
const redis_1 = require("../../config/redis");
const getCache = async (key) => {
    const data = await redis_1.redis.get(key);
    return data ?? null;
};
exports.getCache = getCache;
const setCache = async (key, value, ttlSeconds = 300) => {
    await redis_1.redis.set(key, value, { ex: ttlSeconds });
};
exports.setCache = setCache;
const deleteCache = async (key) => {
    await redis_1.redis.del(key);
};
exports.deleteCache = deleteCache;
