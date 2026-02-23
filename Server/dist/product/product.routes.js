"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/product/product.routes.ts
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const auth_middleware_1 = require("../common/middleware/auth.middleware");
const role_middleware_1 = require("../common/middleware/role.middleware");
const Productrouter = (0, express_1.Router)();
Productrouter.get("/", auth_middleware_1.authenticate, (0, role_middleware_1.allowRoles)("ADMIN", "MANAGER"), product_controller_1.getProductsHandler);
Productrouter.post("/", auth_middleware_1.authenticate, (0, role_middleware_1.allowRoles)("ADMIN", "MANAGER"), product_controller_1.createProductHandler);
Productrouter.patch("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.allowRoles)("ADMIN", "MANAGER"), product_controller_1.updateProductHandler);
Productrouter.delete("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.allowRoles)("ADMIN", "MANAGER"), product_controller_1.deleteProductHandler);
exports.default = Productrouter;
