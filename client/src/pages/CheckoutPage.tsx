import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

import { useCartStore } from "../store/cartStore"

import api from "../services/api"

const CheckoutPage = () => {
  const navigate = useNavigate()

  const { cart, clearCart } = useCartStore()

  const [name, setName] = useState("")

  const [address, setAddress] = useState("")

  const [phone, setPhone] = useState("")

  const [errors, setErrors] = useState({
    name: "",
    address: "",
    phone: "",
  })

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  )

  const handlePlaceOrder = async () => {
    
    const newErrors = {
      name: "",
      address: "",
      phone: "",
    }

    let hasError = false

    if (!name.trim()) {
      newErrors.name = "Name is required"
      hasError = true
    }

    if (!address.trim()) {
      newErrors.address =
        "Address is required"
      hasError = true
    }

    if (!phone.trim()) {
      newErrors.phone =
        "Phone number is required"
      hasError = true
    } else if (phone.length < 10) {
      newErrors.phone =
        "Enter valid phone number"
      hasError = true
    }

    setErrors(newErrors)

    if (hasError) return

    
    if (cart.length === 0) {
      toast.error("Your cart is empty")
      return
    }

    try {
      const response = await api.post(
        "/orders",
        {
          customerName: name,
          address,
          phone,
          items: cart,
        }
      )

      toast.success(
        "Order placed successfully!"
      )

      clearCart()

      localStorage.removeItem(
        "orderCompleted"
      )

      localStorage.setItem(
        "latestOrderId",
        response.data.id
      )

      navigate(
        `/track/${response.data.id}`
      )
    } catch (error) {
      toast.error("Failed to place order")

      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        
        <h1 className="text-4xl font-bold mb-8">
          Checkout
        </h1>

        
        <div className="grid md:grid-cols-2 gap-6">
          
          
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-semibold mb-6">
              Delivery Details
            </h2>

            <div className="space-y-4">
              
              
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className="w-full border p-3 rounded-lg"
                />

                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name}
                  </p>
                )}
              </div>

              
              
              <div>
                <textarea
                  placeholder="Delivery Address"
                  value={address}
                  onChange={(e) =>
                    setAddress(
                      e.target.value
                    )
                  }
                  className="w-full border p-3 rounded-lg"
                  rows={4}
                />

                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.address}
                  </p>
                )}
              </div>

              
              
              <div>
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  className="w-full border p-3 rounded-lg"
                />

                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>
          </div>

          
          
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-semibold mb-6">
              Order Summary
            </h2>

            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between"
                >
                  <span>
                    {item.name} ×{" "}
                    {item.quantity}
                  </span>

                  <span>
                    ₹
                    {item.price *
                      item.quantity}
                  </span>
                </div>
              ))}
            </div>

            
            <div className="border-t mt-6 pt-6 space-y-3">
              <div className="flex justify-between">
                <span>Items Total</span>

                <span>₹{total}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Fee</span>

                <span>₹40</span>
              </div>

              <div className="flex justify-between text-2xl font-bold">
                <span>Grand Total</span>

                <span>₹{total + 40}</span>
              </div>
            </div>

            
            <button
              onClick={handlePlaceOrder}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-lg transition"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage