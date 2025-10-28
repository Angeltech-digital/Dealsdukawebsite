import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../features/orders/ordersSlice';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchOrders());
    }
  }, [dispatch, user]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600">Please log in to view your orders.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-deals-orange mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <p>Error loading orders: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-deals-purple via-deals-orange to-deals-cyan bg-clip-text text-transparent mb-4">
          Your Orders
        </h1>
        <p className="text-xl text-gray-700">Track your purchases and order history</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center bg-gradient-to-r from-gray-50 to-deals-cyan/10 rounded-2xl p-12 border border-deals-cyan/20">
          <div className="text-6xl mb-4">📦</div>
          <p className="text-deals-purple text-xl font-medium">You haven't placed any orders yet.</p>
          <p className="text-gray-600 mt-2">Start shopping to see your orders here!</p>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-deals-black mb-2">
                    Order #{order.id}
                  </h2>
                  <p className="text-gray-600 flex items-center">
                    📅 Placed on {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold bg-gradient-to-r from-deals-orange to-deals-purple bg-clip-text text-transparent mb-2">
                    ${order.total_amount}
                  </p>
                  <p className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
                    order.status === 'completed' ? 'bg-deals-green text-white' :
                    order.status === 'pending' ? 'bg-deals-yellow text-deals-black' :
                    'bg-gray-200 text-gray-700'
                  }`}>
                    {order.status === 'completed' ? '✅' :
                     order.status === 'pending' ? '⏳' : '❓'} {order.status}
                  </p>
                </div>
              </div>

              <div className="border-t-2 border-deals-orange/20 pt-6">
                <h3 className="text-xl font-bold mb-4 text-deals-purple">📋 Order Items:</h3>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-deals-cyan/5 p-4 rounded-xl">
                      <div className="flex items-center">
                        <span className="font-bold text-lg text-deals-black mr-3">{item.product_name}</span>
                        <span className="bg-deals-purple text-white px-3 py-1 rounded-full text-sm font-bold">
                          x{item.quantity}
                        </span>
                      </div>
                      <span className="text-2xl font-bold text-deals-orange">${item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
