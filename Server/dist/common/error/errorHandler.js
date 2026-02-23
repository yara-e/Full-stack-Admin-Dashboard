"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorHandler;
const logger_1 = __importDefault(require("../logger/logger"));
function errorHandler(err, req, res, next) {
    const operational = err.isOperational;
    logger_1.default.error(err.message, {
        statusCode: err.statusCode,
        stack: err.stack,
        operational: operational,
        body: req.body,
        correlationId: req.correlationId
    });
    if (operational) {
        return res.status(err.statusCode).json({
            error: err.message,
        });
    }
    return res.status(500).json({
        error: "something went wrong"
    });
}
