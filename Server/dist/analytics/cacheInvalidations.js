"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidateAnalyticsCache = void 0;
const cacheInvalidation_1 = require("../common/cache/cacheInvalidation");
const invalidateAnalyticsCache = async () => {
    await Promise.all([
        (0, cacheInvalidation_1.invalidatePattern)("analytics:*"),
    ]);
};
exports.invalidateAnalyticsCache = invalidateAnalyticsCache;
