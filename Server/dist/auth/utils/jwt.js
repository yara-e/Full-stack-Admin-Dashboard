"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = exports.createAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET;
if (!ACCESS_TOKEN_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}
const createAccessToken = (user) => {
    return jsonwebtoken_1.default.sign({
        id: user.id,
        role: user.role,
    }, ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
    });
};
exports.createAccessToken = createAccessToken;
const verifyAccessToken = (token) => {
    return jsonwebtoken_1.default.verify(token, ACCESS_TOKEN_SECRET);
};
exports.verifyAccessToken = verifyAccessToken;
