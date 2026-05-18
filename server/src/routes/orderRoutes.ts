import express from "express"
import { v4 as uuidv4 } from "uuid"
import { orders } from "../data/orders"

const router = express.Router()

router.post("/", (req, res) => {
  const { customerName, address, phone, items } =
    req.body

  if (
    !customerName ||
    !address ||
    !phone ||
    !items ||
    items.length === 0
  ) {
    return res.status(400).json({
      message: "Invalid order data",
    })
  }

  const order = {
    id: uuidv4(),
    customerName,
    address,
    phone,
    items,
    status: "Order Received",
    createdAt: new Date(),
  }

  orders.push(order)

  setTimeout(() => {
  order.status = "Preparing"
}, 5000)

setTimeout(() => {
  order.status = "Out for Delivery"
}, 10000)

setTimeout(() => {
  order.status = "Delivered"
}, 15000)

  res.status(201).json(order)
})

router.get("/:id", (req, res) => {
  const order = orders.find(
    (o) => o.id === req.params.id
  )

  if (!order) {
    return res.status(404).json({
      message: "Order not found",
    })
  }

  res.json(order)
})

export default router