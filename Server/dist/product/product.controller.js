"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductHandler = exports.updateProductHandler = exports.createProductHandler = exports.getProductsHandler = void 0;
// src/product/product.controller.ts
const product_service_1 = require("./product.service");
const getProductsHandler = async (req, res) => {
    const result = await (0, product_service_1.getProductService)(req.query);
    res.json(result);
};
exports.getProductsHandler = getProductsHandler;
const createProductHandler = async (req, res) => {
    const product = await (0, product_service_1.createProductService)(req.body);
    res.status(201).json(product);
};
exports.createProductHandler = createProductHandler;
const updateProductHandler = async (req, res) => {
    const id = Number(req.params.id);
    const product = await (0, product_service_1.updateProductService)(id, req.body);
    res.json(product);
};
exports.updateProductHandler = updateProductHandler;
const deleteProductHandler = async (req, res) => {
    const id = Number(req.params.id);
    await (0, product_service_1.deleteProductService)(id);
    res.status(204).send();
};
exports.deleteProductHandler = deleteProductHandler;
