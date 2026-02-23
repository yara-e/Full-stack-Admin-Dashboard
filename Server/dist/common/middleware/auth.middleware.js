"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const appError_1 = __importDefault(require("../error/appError"));
const jwt_1 = require("../../auth/utils/jwt");
const authenticate = (req, _res, next) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
        return next(new appError_1.default("Unauthorized", 401));
    }
    const token = header.split(" ")[1];
    if (!token) {
        return next(new appError_1.default("Unauthorized", 401));
    }
    try {
        const payload = (0, jwt_1.verifyAccessToken)(token);
        req.user = payload;
        next();
    }
    catch (err) {
        return next(new appError_1.default("Invalid token", 401));
    }
};
exports.authenticate = authenticate;
