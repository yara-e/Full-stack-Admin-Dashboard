"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeCursor = exports.encodeCursor = void 0;
const encodeCursor = (data) => {
    return Buffer.from(JSON.stringify({ id: data.id, createdAt: data.createdAt.toISOString() })).toString("base64");
};
exports.encodeCursor = encodeCursor;
const decodeCursor = (cursor) => {
    const decoded = JSON.parse(Buffer.from(cursor, "base64").toString("utf-8"));
    if (!decoded.id || !decoded.createdAt)
        throw new Error("Invalid cursor");
    return { id: Number(decoded.id), createdAt: new Date(decoded.createdAt) };
};
exports.decodeCursor = decodeCursor;
