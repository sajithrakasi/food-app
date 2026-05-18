import { Link } from "react-router-dom"
import { useCartStore } from "../store/cartStore"

const CartPage = () => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
  } = useCartStore()

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-8">
        Your Cart
      </h1>

     {cart.length === 0 ? (
  <div className="flex items-center justify-center mt-20">
    <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md w-full">
      <h2 className="text-3xl font-bold mb-4">
        Your Cart is Empty
      </h2>

      <p className="text-gray-600 mb-6">
        Add your favorite meals to continue ordering.
      </p>

      <Link to="/">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition">
          Browse Menu
        </button>
      </Link>
    </div>
  </div>
) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <div>
                  <h2 className="text-xl font-semibold">
                    {item.name}
                  </h2>

                  <p className="text-gray-600">
                    ₹{item.price}
                  </p>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                      className="bg-gray-200 px-3 py-1 rounded"
                    >
                      -
                    </button>

                    <span className="font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                      className="bg-gray-200 px-3 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold">
                  ₹{item.price * item.quantity}
                </p>

                {/* <button
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                  className="text-red-500 mt-2"
                >
                  Remove
                </button> */}
              </div>
            </div>
          ))}

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between text-2xl font-bold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <Link to="/checkout">
              <button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-lg transition">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage