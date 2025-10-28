import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearCurrentOrder } from '../features/orders/ordersSlice';

const OrderSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentOrder } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!currentOrder) {
      navigate('/cart');
    }
  }, [currentOrder, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearCurrentOrder());
    };
  }, [dispatch]);

  if (!currentOrder) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-deals-orange mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order summary...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 bg-white/10 backdrop-blur-sm rounded-3xl m-4">
      <div className="text-center mb-12">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
          Order Confirmed!
        </h1>
        <p className="text-xl text-white/90">Thank you for your purchase, {user?.first_name}!</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Order #{currentOrder.id}
              </h2>
              <p className="text-white/90 flex items-center">
                📅 Placed on {new Date(currentOrder.created_at).toLocaleDateString()} at {new Date(currentOrder.created_at).toLocaleTimeString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold bg-gradient-to-r from-deals-orange to-deals-purple bg-clip-text text-transparent mb-2">
                ${currentOrder.total_amount}
              </p>
              <p className="inline-block px-4 py-2 rounded-full text-sm font-bold bg-deals-green text-white">
                ✅ Confirmed
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">📍 Shipping Address</h3>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-white">{currentOrder.shipping_info?.firstName} {currentOrder.shipping_info?.lastName}</p>
                <p className="text-white/70">{currentOrder.shipping_info?.address}</p>
                <p className="text-white/70">{currentOrder.shipping_info?.city}, {currentOrder.shipping_info?.zipCode}</p>
                <p className="text-white/70">{currentOrder.shipping_info?.country}</p>
                <p className="text-white/70">{currentOrder.shipping_info?.email}</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">💳 Payment Method</h3>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-white">**** **** **** {currentOrder.payment_info?.cardNumber?.slice(-4)}</p>
                <p className="text-white/70">{currentOrder.payment_info?.nameOnCard}</p>
              </div>
            </div>
          </div>

          <div className="border-t-2 border-white/30 pt-6">
            <h3 className="text-2xl font-bold mb-6 text-white">📋 Order Items</h3>
            <div className="space-y-4">
              {currentOrder.items?.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-white/10 p-4 rounded-xl">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-deals-cyan to-deals-purple rounded-lg mr-4 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">📦</span>
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg">{item.product_name}</p>
                      <p className="text-white/70">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-deals-yellow">${item.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <p className="text-white/90 text-lg">
            A confirmation email has been sent to {user?.email}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/orders"
              className="bg-gradient-to-r from-deals-purple to-deals-orange hover:from-purple-600 hover:to-orange-500 text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              📋 View All Orders
            </Link>
            <Link
              to="/products"
              className="bg-gradient-to-r from-deals-cyan to-deals-green hover:from-cyan-500 hover:to-green-500 text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              🛍️ Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
