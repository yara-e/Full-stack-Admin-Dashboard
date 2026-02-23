"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginHandler = void 0;
const auth_service_1 = require("./auth.service");
const loginHandler = async (req, res) => {
    const { email, password } = req.body;
    const result = await (0, auth_service_1.login)(email, password);
    res.json(result);
};
exports.loginHandler = loginHandler;
