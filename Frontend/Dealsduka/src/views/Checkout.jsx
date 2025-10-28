import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { checkout, clearCurrentOrder } from '../features/orders/ordersSlice';
import { clearCart } from '../features/cart/cartSlice';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { isLoading, currentOrder } = useSelector((state) => state.orders);

  const [shippingInfo, setShippingInfo] = useState({
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    email: user?.email || '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleShippingChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user && items.length > 0) {
      const orderData = {
        items: items.map(item => ({
          product: item.id,
          quantity: item.quantity,
        })),
        total_amount: total,
        shipping_info: shippingInfo,
        payment_info: paymentInfo,
      };
      try {
        await dispatch(checkout(orderData)).unwrap();
        dispatch(clearCart());
        navigate('/order-summary');
      } catch (error) {
        console.error('Order placement failed:', error);
      }
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
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
          Checkout
        </h1>
        <p className="text-xl text-white/90">Complete your purchase</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Information */}
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">📍 Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={shippingInfo.firstName}
                onChange={handleShippingChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-deals-cyan"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={shippingInfo.lastName}
                onChange={handleShippingChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-deals-cyan"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={shippingInfo.email}
                onChange={handleShippingChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-deals-cyan"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={shippingInfo.address}
                onChange={handleShippingChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-deals-cyan"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={shippingInfo.city}
                onChange={handleShippingChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-deals-cyan"
              />
              <input
                type="text"
                name="zipCode"
                placeholder="ZIP Code"
                value={shippingInfo.zipCode}
                onChange={handleShippingChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-deals-cyan"
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={shippingInfo.country}
                onChange={handleShippingChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-deals-cyan md:col-span-2"
              />
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">💳 Payment Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={paymentInfo.cardNumber}
                onChange={handlePaymentChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-deals-cyan md:col-span-2"
              />
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                value={paymentInfo.expiryDate}
                onChange={handlePaymentChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-deals-cyan"
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={paymentInfo.cvv}
                onChange={handlePaymentChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-deals-cyan"
              />
              <input
                type="text"
                name="nameOnCard"
                placeholder="Name on Card"
                value={paymentInfo.nameOnCard}
                onChange={handlePaymentChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-deals-cyan md:col-span-2"
              />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 h-fit">
          <h2 className="text-2xl font-bold text-white mb-6">📋 Order Summary</h2>

          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    src={item.image || '/placeholder-image.jpg'}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg mr-3"
                  />
                  <div>
                    <p className="text-white font-medium">{item.name}</p>
                    <p className="text-white/70 text-sm">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-deals-yellow font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t-2 border-white/30 pt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-white/90">Subtotal:</span>
              <span className="font-semibold text-white">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/90">Shipping:</span>
              <span className="font-semibold text-white">${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/90">Tax:</span>
              <span className="font-semibold text-white">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold border-t-2 border-white/30 pt-2">
              <span className="text-white">Total:</span>
              <span className="text-deals-yellow">${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-deals-green to-deals-yellow hover:from-green-500 hover:to-yellow-500 text-white py-4 rounded-2xl text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-xl disabled:opacity-50 mt-6"
          >
            {isLoading ? '🔄 Processing...' : '🚀 Place Order'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
