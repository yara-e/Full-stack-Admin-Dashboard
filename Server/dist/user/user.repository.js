"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.softDeleteUser = exports.updateUser = exports.findUsers = void 0;
const client_1 = require("../common/db/client");
const findUsers = async ({ limit, after, before, search, role, }) => {
    const isBackward = Boolean(before);
    const cursor = after ?? before;
    const where = { isDeleted: false };
    if (search) {
        where.OR = [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
        ];
    }
    if (role)
        where.role = role;
    // CURSOR LOGIC
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
    const users = await client_1.prisma.user.findMany({
        where,
        take: limit,
        orderBy: [
            { createdAt: isBackward ? "asc" : "desc" },
            { id: isBackward ? "asc" : "desc" },
        ],
    });
    return isBackward ? users.reverse() : users;
};
exports.findUsers = findUsers;
const updateUser = async (id, data) => {
    return client_1.prisma.user.update({
        where: { id },
        data,
    });
};
exports.updateUser = updateUser;
const softDeleteUser = async (id) => {
    return client_1.prisma.user.update({
        where: { id },
        data: { isDeleted: true },
    });
};
exports.softDeleteUser = softDeleteUser;
