"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserHandler = exports.updateUserHandler = exports.getUsersHandler = void 0;
// src/user/user.controller.ts
const user_service_1 = require("./user.service");
const getUsersHandler = async (req, res) => {
    const result = await (0, user_service_1.getUsersService)(req.query);
    res.json(result);
};
exports.getUsersHandler = getUsersHandler;
const updateUserHandler = async (req, res) => {
    const id = Number(req.params.id);
    const user = await (0, user_service_1.updateUserService)(id, req.body);
    res.json(user);
};
exports.updateUserHandler = updateUserHandler;
const deleteUserHandler = async (req, res) => {
    const id = Number(req.params.id);
    await (0, user_service_1.softDeleteUserService)(id);
    res.json("User deleted");
};
exports.deleteUserHandler = deleteUserHandler;
