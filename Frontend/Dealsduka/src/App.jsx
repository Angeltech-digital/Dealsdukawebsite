import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './views/Home';
import Products from './views/Products';
import ProductDetail from './views/ProductDetail';
import Cart from './views/Cart';
import Checkout from './views/Checkout';
import OrderSummary from './views/OrderSummary';
import Login from './views/Login';
import Register from './views/Register';
import Orders from './views/Orders';
import AdminDashboard from './views/AdminDashboard';
import AdminProducts from './views/AdminProducts';
import AdminOrders from './views/AdminOrders';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-deals-purple via-deals-orange to-deals-cyan">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/order-summary" element={<ProtectedRoute><OrderSummary /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute adminOnly><AdminProducts /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute adminOnly><AdminOrders /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
