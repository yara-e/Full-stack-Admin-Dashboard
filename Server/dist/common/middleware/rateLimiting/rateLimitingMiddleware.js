"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimitMiddleware = void 0;
const rateLimiting_1 = __importDefault(require("./rateLimiting"));
const rateLimitMiddleware = async (req, res, next) => {
    const identifier = req.ip ?? "anonymous";
    if (identifier) {
    }
    const { success } = await rateLimiting_1.default.limit(identifier);
    if (!success) {
        return res.status(429).json({
            message: "Too many requests",
        });
    }
    next();
};
exports.rateLimitMiddleware = rateLimitMiddleware;
