import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom"

import { Toaster } from "react-hot-toast"

import MenuPage from "./pages/MenuPage"
import CartPage from "./pages/CartPage"
import CheckoutPage from "./pages/CheckoutPage"
import OrderTrackingPage from "./pages/OrderTrackingPage"
import { useEffect, useState } from "react"
import { useCartStore } from "./store/cartStore"


function App() {

  useEffect(() => {
  const handleOrderDelivered = () => {
    setLatestOrderId(
      localStorage.getItem("latestOrderId")
    )
  }

  window.addEventListener(
    "orderDelivered",
    handleOrderDelivered
  )

  return () => {
    window.removeEventListener(
      "orderDelivered",
      handleOrderDelivered
    )
  }
}, [])

 const [latestOrderId, setLatestOrderId] =useState(
    localStorage.getItem("latestOrderId")
  )

  const cart = useCartStore((state) => state.cart)

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  return (
    <BrowserRouter>
      <Toaster position="bottom-center" />

      <div className="min-h-screen flex flex-col bg-gray-100">
        
        <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600"
          >
            Food Order App
          </Link>

          <div className="flex items-center gap-6 text-lg font-medium">
            <Link
              to="/"
              className="hover:text-blue-600 transition"
            >
              Menu
            </Link>

            <Link
              to="/cart"
              className="hover:text-blue-600 transition"
            >
              Cart ({totalItems})
            </Link>

            <Link
              to="/checkout"
              className="hover:text-blue-600 transition"
            >
              Checkout
            </Link>

           
        {latestOrderId && (
  <Link to={`/track/${latestOrderId}`}>
    Track Order
  </Link>
)}

          </div>
        </nav>

        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<MenuPage />} />

            <Route path="/cart" element={<CartPage />} />

            <Route
              path="/checkout"
              element={<CheckoutPage />}
            />

            <Route
              path="/track/:id"
              element={<OrderTrackingPage />}
            />
          </Routes>
        </main>

        
        <footer className="bg-white text-center py-4 text-gray-500 shadow-inner">
          Food Order App © 2026
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App