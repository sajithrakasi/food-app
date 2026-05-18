import express from "express"
import { menu } from "../data/menu"

const router = express.Router()


router.get("/", (req, res) => {
  res.json(menu)
})


router.post("/", (req, res) => {
  const { name, description, price, image } =
    req.body

  if (!name || !description || !price || !image) {
    return res.status(400).json({
      message: "All fields are required",
    })
  }

  const newItem = {
    id: menu.length + 1,
    name,
    description,
    price,
    image,
  }

  menu.push(newItem)

  res.status(201).json(newItem)
})

export default router