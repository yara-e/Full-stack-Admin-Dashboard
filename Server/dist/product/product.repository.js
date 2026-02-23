"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.softDeleteProduct = exports.updateProduct = exports.createProduct = exports.findProducts = void 0;
const client_1 = require("../common/db/client");
const findProducts = async ({ limit, after, before, search, minPrice, maxPrice, isActive, }) => {
    const isBackward = Boolean(before);
    const cursor = after ?? before; // asign var to first value that is not null or undefined.
    const where = {
        isDeleted: false,
    };
    if (search) {
        where.name = { contains: search, mode: "insensitive" };
    }
    if (minPrice !== undefined || maxPrice !== undefined) {
        where.price = {};
        if (minPrice !== undefined)
            where.price.gte = minPrice;
        if (maxPrice !== undefined)
            where.price.lte = maxPrice;
    }
    if (isActive !== undefined) {
        where.isActive = isActive;
    }
    if (cursor) {
        if (isBackward) {
            // backward: get items newer than cursor
            where.AND = [
                {
                    OR: [
                        { createdAt: { gt: cursor.createdAt } },
                        { createdAt: cursor.createdAt, id: { gt: cursor.id } },
                    ],
                },
            ];
        }
        else {
            // forward: get items older than cursor
            where.AND = [
                {
                    OR: [
                        { createdAt: { lt: cursor.createdAt } },
                        { createdAt: cursor.createdAt, id: { lt: cursor.id } },
                    ],
                },
            ];
        }
    }
    const products = await client_1.prisma.product.findMany({
        where,
        take: limit,
        orderBy: [
            { createdAt: isBackward ? "asc" : "desc" },
            { id: isBackward ? "asc" : "desc" },
        ],
    });
    // Normalize response order
    return isBackward ? products.reverse() : products;
};
exports.findProducts = findProducts;
const createProduct = async (data) => {
    return client_1.prisma.product.create({ data });
};
exports.createProduct = createProduct;
const updateProduct = async (id, data) => {
    return client_1.prisma.product.update({
        where: { id },
        data
    });
};
exports.updateProduct = updateProduct;
const softDeleteProduct = async (id) => {
    return client_1.prisma.product.update({
        where: { id },
        data: { isDeleted: true },
    });
};
exports.softDeleteProduct = softDeleteProduct;
