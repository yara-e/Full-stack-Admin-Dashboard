"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = correlationId;
const crypto_1 = __importDefault(require("crypto"));
function correlationId(req, res, next) {
    const id = crypto_1.default.randomUUID();
    req.correlationId = id;
    res.setHeader("X-Correlation-Id", id);
    next();
}
