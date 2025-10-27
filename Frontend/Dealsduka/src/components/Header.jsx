import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="bg-gradient-to-r from-deals-purple via-deals-purple to-deals-orange text-white shadow-xl">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white hover:text-deals-cyan transition-all duration-300 transform hover:scale-105">
          DealsDuka
        </Link>
        <nav className="flex items-center space-x-6">
          <Link to="/products" className="hover:text-deals-yellow transition-all duration-300 transform hover:scale-105">
            Products
          </Link>
          <Link to="/cart" className="hover:text-deals-yellow transition-all duration-300 transform hover:scale-105">
            Cart
          </Link>
          {user ? (
            <>
              <Link to="/orders" className="hover:text-deals-yellow transition-all duration-300 transform hover:scale-105">
                Orders
              </Link>
              <span className="text-deals-green font-medium bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                Welcome, {user.first_name}!
              </span>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-deals-orange to-deals-yellow hover:from-orange-600 hover:to-yellow-500 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-deals-cyan transition-all duration-300 transform hover:scale-105">
                Login
              </Link>
              <Link to="/register" className="bg-gradient-to-r from-deals-green to-deals-cyan hover:from-green-500 hover:to-cyan-500 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
