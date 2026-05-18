import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import api from "../services/api"

const statuses = [
  "Order Received",
  "Preparing",
  "Out for Delivery",
  "Delivered",
]

const OrderTrackingPage = () => {
  const { id } = useParams()

  const [order, setOrder] = useState<any>(null)

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState("")

  
  useEffect(() => {
    const completed =
      localStorage.getItem("orderCompleted")

    if (completed === "true") {
      setLoading(false)

      setOrder(null)

      setError("No orders to track")

      return
    }

    const fetchOrder = async () => {
      try {
        const response = await api.get(
          `/orders/${id}`
        )

        setOrder(response.data)

        setError("")
      } catch {
        setError("Please place an order first")
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()

    const interval = setInterval(fetchOrder, 3000)

    return () => clearInterval(interval)
  }, [id])

  
  useEffect(() => {
    if (order?.status === "Delivered") {
      const timer = setTimeout(() => {
        localStorage.setItem(
          "orderCompleted",
          "true"
        )

        setOrder(null)

        setError("No orders to track")
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [order])

  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading order...
      </div>
    )
  }

  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white shadow rounded-xl p-8 text-center max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4">
            No Orders To Track
          </h1>

          <p className="text-gray-600 mb-6">
             Your completed orders will appear here.
          </p>

          <Link to="/">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition">
              Go To Menu
            </button>
          </Link>
        </div>
      </div>
    )
  }

  const currentStatusIndex = statuses.indexOf(
    order.status
  )

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow p-8 w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-4">
          Track Your Order
        </h1>

        <p className="text-gray-600 mb-8">
          Order ID: {order.id}
        </p>

        <div className="space-y-4">
          {statuses.map((status, index) => (
            <div
              key={status}
              className={`p-4 rounded-lg border ${
                index <= currentStatusIndex
                  ? "bg-green-100 border-green-500"
                  : "bg-gray-100"
              }`}
            >
              {status}
            </div>
          ))}
        </div>

      {order.status === "Delivered" && (
  <div className="mt-8 text-center">
    <h2 className="text-2xl font-bold text-green-600 mb-4">
      Order Delivered Successfully!
    </h2>

    <Link to="/">
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition">
        Go To Menu
      </button>
    </Link>
  </div>
)}
      </div>
    </div>
  )
}

export default OrderTrackingPage