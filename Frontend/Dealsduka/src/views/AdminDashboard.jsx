import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchOrders } from '../features/orders/ordersSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.total_amount || 0), 0);
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const completedOrders = orders.filter(order => order.status === 'delivered').length;
  const totalUsers = new Set(orders.map(order => order.shipping_info?.email)).size;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-deals-purple to-deals-orange text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Total Products</h2>
          <p className="text-3xl font-bold">{products.length}</p>
          <div className="mt-2 bg-white/20 rounded-full h-2">
            <div className="bg-white h-2 rounded-full" style={{width: '100%'}}></div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-deals-green to-deals-cyan text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
          <p className="text-3xl font-bold">{orders.length}</p>
          <div className="mt-2 bg-white/20 rounded-full h-2">
            <div className="bg-white h-2 rounded-full" style={{width: `${Math.min((orders.length / 100) * 100, 100)}%`}}></div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-deals-yellow to-deals-orange text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Revenue</h2>
          <p className="text-3xl font-bold">${totalRevenue.toFixed(2)}</p>
          <div className="mt-2 bg-white/20 rounded-full h-2">
            <div className="bg-white h-2 rounded-full" style={{width: `${Math.min((totalRevenue / 10000) * 100, 100)}%`}}></div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-deals-cyan to-deals-purple text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Total Users</h2>
          <p className="text-3xl font-bold">{totalUsers}</p>
          <div className="mt-2 bg-white/20 rounded-full h-2">
            <div className="bg-white h-2 rounded-full" style={{width: `${Math.min((totalUsers / 100) * 100, 100)}%`}}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to="/admin/products"
              className="block bg-gradient-to-r from-deals-purple to-deals-orange hover:from-purple-600 hover:to-orange-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
            >
              📦 Manage Products
            </Link>
            <Link
              to="/admin/orders"
              className="block bg-gradient-to-r from-deals-green to-deals-cyan hover:from-green-500 hover:to-cyan-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
            >
              📋 Manage Orders ({pendingOrders} pending)
            </Link>
            <button className="w-full bg-gradient-to-r from-deals-yellow to-deals-orange hover:from-yellow-500 hover:to-orange-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              📊 Advanced Analytics
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h2>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    order.status === 'pending' ? 'bg-yellow-400' :
                    order.status === 'processing' ? 'bg-blue-400' :
                    order.status === 'shipped' ? 'bg-purple-400' :
                    order.status === 'delivered' ? 'bg-green-400' : 'bg-red-400'
                  }`}></div>
                  <div>
                    <p className="font-medium text-sm">Order #{order.id}</p>
                    <p className="text-xs text-gray-600">{order.shipping_info?.firstName} {order.shipping_info?.lastName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">${order.total_amount}</p>
                  <p className="text-xs text-gray-600">{new Date(order.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
            {orders.length === 0 && (
              <p className="text-gray-600 text-center py-4">No orders yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
