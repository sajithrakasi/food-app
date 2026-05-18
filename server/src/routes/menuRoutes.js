"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const menu_1 = require("../data/menu");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.json(menu_1.menu);
});
router.post("/", (req, res) => {
    const { name, description, price, image } = req.body;
    if (!name || !description || !price || !image) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }
    const newItem = {
        id: menu_1.menu.length + 1,
        name,
        description,
        price,
        image,
    };
    menu_1.menu.push(newItem);
    res.status(201).json(newItem);
});
exports.default = router;
