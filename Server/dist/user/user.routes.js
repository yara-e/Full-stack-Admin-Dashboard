"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/user/user.routes.ts
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const auth_middleware_1 = require("../common/middleware/auth.middleware");
const role_middleware_1 = require("../common/middleware/role.middleware");
const userRouter = (0, express_1.Router)();
userRouter.get("/", auth_middleware_1.authenticate, (0, role_middleware_1.allowRoles)("ADMIN"), user_controller_1.getUsersHandler);
userRouter.patch("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.allowRoles)("ADMIN"), user_controller_1.updateUserHandler);
userRouter.delete("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.allowRoles)("ADMIN"), user_controller_1.deleteUserHandler);
exports.default = userRouter;
