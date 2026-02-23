"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getuserOrdersHandler = exports.updateOrderStatusHandler = exports.getOrdersHandler = exports.getOrderDetailsHandler = void 0;
const order_service_1 = require("./order.service");
const getOrderDetailsHandler = async (req, res) => {
    const orderId = Number(req.params.id);
    const order = await (0, order_service_1.getOrderByIdService)(orderId);
    res.json({ order });
};
exports.getOrderDetailsHandler = getOrderDetailsHandler;
const getOrdersHandler = async (req, res) => {
    const result = await (0, order_service_1.findOrdersService)(req.query);
    res.json(result);
};
exports.getOrdersHandler = getOrdersHandler;
const updateOrderStatusHandler = async (req, res) => {
    const order = await (0, order_service_1.updateOrderStatusService)(Number(req.params.id), req.body.status);
    res.json(order);
};
exports.updateOrderStatusHandler = updateOrderStatusHandler;
const getuserOrdersHandler = async (req, res) => {
    const orders = await (0, order_service_1.getuserOrdersService)(Number(req.params.id));
    res.json(orders);
};
exports.getuserOrdersHandler = getuserOrdersHandler;
