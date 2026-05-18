import { useEffect, useState } from "react"
import toast from "react-hot-toast"

import api from "../services/api"

import type { MenuItem } from "../types/menu"

import { useCartStore } from "../store/cartStore"

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])

  const [loading, setLoading] = useState(true)

  const addToCart = useCartStore(
    (state) => state.addToCart
  )

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await api.get("/menu")

        setMenuItems(response.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchMenu()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold">
        Loading menu...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Food Menu
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl font-semibold">
                {item.name}
              </h2>

              <p className="text-gray-600 mt-2">
                {item.description}
              </p>

              <div className="flex items-center justify-between mt-4">
                <span className="text-lg font-bold text-green-600">
                  ₹{item.price}
                </span>

                <button
                  onClick={() => {
                    addToCart(item)

                    toast.success(
                      `${item.name} added to cart`
                    )
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MenuPage