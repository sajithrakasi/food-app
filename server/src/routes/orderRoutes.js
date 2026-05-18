"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const orders_1 = require("../data/orders");
const router = express_1.default.Router();
router.post("/", (req, res) => {
    const { customerName, address, phone, items } = req.body;
    if (!customerName ||
        !address ||
        !phone ||
        !items ||
        items.length === 0) {
        return res.status(400).json({
            message: "Invalid order data",
        });
    }
    const order = {
        id: (0, uuid_1.v4)(),
        customerName,
        address,
        phone,
        items,
        status: "Order Received",
        createdAt: new Date(),
    };
    orders_1.orders.push(order);
    setTimeout(() => {
        order.status = "Preparing";
    }, 5000);
    setTimeout(() => {
        order.status = "Out for Delivery";
    }, 10000);
    setTimeout(() => {
        order.status = "Delivered";
    }, 15000);
    res.status(201).json(order);
});
router.get("/:id", (req, res) => {
    const order = orders_1.orders.find((o) => o.id === req.params.id);
    if (!order) {
        return res.status(404).json({
            message: "Order not found",
        });
    }
    res.json(order);
});
exports.default = router;
