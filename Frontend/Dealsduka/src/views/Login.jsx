import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login, clearError } from '../features/auth/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/20 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-deals-orange to-deals-purple rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">🔑</span>
          </div>
          <h2 className="text-3xl font-bold text-white">
            Welcome Back
          </h2>
          <p className="text-white/90 mt-2">Sign in to your DealsDuka account</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-white/30 rounded-xl placeholder-white/70 text-white bg-white/10 focus:outline-none focus:ring-2 focus:ring-deals-orange focus:border-transparent transition-all duration-300"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/90 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-white/30 rounded-xl placeholder-white/70 text-white bg-white/10 focus:outline-none focus:ring-2 focus:ring-deals-orange focus:border-transparent transition-all duration-300"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-4">
              <p className="text-red-300 text-sm text-center font-medium">
                {error.detail || 'Login failed. Please try again.'}
              </p>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-deals-orange to-deals-purple hover:from-orange-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-deals-orange disabled:opacity-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {isLoading ? '🔄 Signing in...' : '🚀 Sign in'}
            </button>
          </div>

          <div className="text-center">
            <Link
              to="/register"
              className="font-medium text-white/90 hover:text-deals-cyan transition-colors"
            >
              Don't have an account? <span className="font-bold">Sign up</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
