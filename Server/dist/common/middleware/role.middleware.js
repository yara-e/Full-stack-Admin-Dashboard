"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowRoles = void 0;
const appError_1 = __importDefault(require("../error/appError"));
const allowRoles = (...roles) => {
    return (req, _res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            throw new appError_1.default("Forbidden", 403);
        }
        next();
    };
};
exports.allowRoles = allowRoles;
