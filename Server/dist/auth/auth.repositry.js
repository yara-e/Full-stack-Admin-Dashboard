"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = void 0;
const client_1 = require("../common/db/client");
const findUserByEmail = async (email) => {
    return await client_1.prisma.user.findUnique({
        where: { email,
            isDeleted: false
        }
    });
};
exports.findUserByEmail = findUserByEmail;
