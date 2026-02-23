"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cachedService = void 0;
const cache_1 = require("./cache");
const cachedService = async ({ key, ttl = 300, fetcher, }) => {
    const cached = await (0, cache_1.getCache)(key);
    if (cached) {
        console.log("Cache HIT:", key);
        return cached;
    }
    console.log("Cache MISS:", key);
    const freshData = await fetcher();
    await (0, cache_1.setCache)(key, freshData, ttl);
    return freshData;
};
exports.cachedService = cachedService;
