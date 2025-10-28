import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const { user, isAdmin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="bg-gradient-to-r from-deals-purple via-deals-purple to-deals-orange text-white shadow-xl sticky top-0 z-50 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand */}
        <Link
          to="/"
          className="text-2xl md:text-3xl font-heading font-bold text-white hover:text-deals-cyan transition-all duration-300 transform hover:scale-105"
        >
          DealsDuka
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 font-medium">
          <Link to="/products" className="hover:text-deals-yellow transition-all duration-300 hover:scale-105">
            Products
          </Link>
          <Link to="/cart" className="hover:text-deals-yellow transition-all duration-300 hover:scale-105">
            Cart
          </Link>

          {user ? (
            <>
              <Link to="/orders" className="hover:text-deals-yellow transition-all duration-300 hover:scale-105">
                Orders
              </Link>
              {isAdmin && (
                <Link to="/admin" className="hover:text-deals-yellow transition-all duration-300 hover:scale-105">
                  Admin
                </Link>
              )}
              <span className="text-deals-green font-semibold bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                Hi, {user.first_name}!
              </span>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-deals-orange to-deals-yellow hover:from-orange-600 hover:to-yellow-500 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-deals-cyan transition-all duration-300 hover:scale-105"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-deals-green to-deals-cyan hover:from-green-500 hover:to-cyan-500 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
              >
                Register
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white hover:text-deals-cyan transition-all duration-300"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/10 backdrop-blur-lg border-t border-white/10 text-center py-6 space-y-4 animate-fade-in">
          <Link to="/products" onClick={() => setMenuOpen(false)} className="block hover:text-deals-yellow transition-all duration-300">
            Products
          </Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)} className="block hover:text-deals-yellow transition-all duration-300">
            Cart
          </Link>

          {user ? (
            <>
              <Link to="/orders" onClick={() => setMenuOpen(false)} className="block hover:text-deals-yellow transition-all duration-300">
                Orders
              </Link>
              {isAdmin && (
                <Link to="/admin" onClick={() => setMenuOpen(false)} className="block hover:text-deals-yellow transition-all duration-300">
                  Admin
                </Link>
              )}
              <span className="block text-deals-green font-semibold bg-white/10 px-4 py-2 mx-6 rounded-full border border-white/10">
                Hi, {user.first_name}!
              </span>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-4/5 bg-gradient-to-r from-deals-orange to-deals-yellow px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-deals-cyan transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="inline-block bg-gradient-to-r from-deals-green to-deals-cyan px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
