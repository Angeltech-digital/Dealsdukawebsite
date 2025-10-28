import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register, clearError } from '../features/auth/authSlice';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-deals-cyan via-deals-purple to-deals-orange py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-deals-green to-deals-cyan rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">✨</span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-deals-purple to-deals-cyan bg-clip-text text-transparent">
            Join DealsDuka
          </h2>
          <p className="text-gray-600 mt-2">Create your account and start saving</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-deals-green focus:border-transparent transition-all duration-300"
                  placeholder="John"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-deals-green focus:border-transparent transition-all duration-300"
                  placeholder="Doe"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-deals-purple focus:border-transparent transition-all duration-300"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-deals-orange focus:border-transparent transition-all duration-300"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-red-600 text-sm text-center font-medium">
                {error.detail || 'Registration failed. Please try again.'}
              </p>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-deals-green to-deals-cyan hover:from-green-500 hover:to-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-deals-green disabled:opacity-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {isLoading ? '🔄 Creating account...' : '🎉 Create account'}
            </button>
          </div>

          <div className="text-center">
            <Link
              to="/login"
              className="font-medium text-deals-purple hover:text-deals-cyan transition-colors"
            >
              Already have an account? <span className="font-bold">Sign in</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
