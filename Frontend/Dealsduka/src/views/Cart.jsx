import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchCart, removeFromCart, updateCartItem } from '../features/cart/cartSlice';
import { placeOrder } from '../features/orders/ordersSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, isLoading: cartLoading } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.orders);

  useEffect(() => {
    if (user) {
      dispatch(fetchCart());
    }
  }, [dispatch, user]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateCartItem({ id, quantity }));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  const handleCheckout = () => {
    if (user && items.length > 0) {
      navigate('/checkout');
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-deals-purple mb-6">Your Cart</h1>
        <div className="text-center">
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <Link
            to="/products"
            className="bg-deals-orange hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 bg-white/10 backdrop-blur-sm rounded-3xl m-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
          Your Shopping Cart
        </h1>
        <p className="text-xl text-white/90">Review your items and proceed to checkout</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-6 border border-white/20 hover:shadow-xl transition-all duration-300">
              <img
                src={item.image || '/placeholder-image.jpg'}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-xl mr-6 shadow-md"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
                <p className="text-deals-yellow font-semibold text-lg">${item.price}</p>
              </div>
              <div className="flex items-center mr-6">
                <button
                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                  className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-l-xl font-bold text-lg transition-all duration-300 text-white"
                >
                  −
                </button>
                <span className="px-4 py-2 bg-gradient-to-r from-deals-cyan to-deals-purple text-white font-bold text-lg">{item.quantity}</span>
                <button
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                  className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-r-xl font-bold text-lg transition-all duration-300 text-white"
                >
                  +
                </button>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-deals-yellow mb-2">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                >
                  🗑️ Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">
            Order Summary
          </h2>
          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span className="text-white/90">Subtotal:</span>
              <span className="font-semibold text-white">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/90">Shipping:</span>
              <span className="text-deals-green font-semibold">Free</span>
            </div>
            <div className="flex justify-between text-xl font-bold border-t-2 border-white/30 pt-4">
              <span className="text-white">Total:</span>
              <span className="text-deals-yellow">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          {user ? (
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-deals-green to-deals-yellow hover:from-green-500 hover:to-yellow-500 text-white py-4 rounded-2xl text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-xl disabled:opacity-50"
            >
              {isLoading ? '🔄 Processing...' : '🚀 Checkout Now'}
            </button>
          ) : (
            <Link
              to="/login"
              className="w-full bg-gradient-to-r from-deals-orange to-deals-purple hover:from-orange-600 hover:to-purple-600 text-white py-4 rounded-2xl text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-xl block text-center"
            >
              🔐 Login to Checkout
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
