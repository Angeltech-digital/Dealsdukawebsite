import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../features/cart/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleAddToCart = () => {
    if (user) {
      dispatch(addToCart({ product: product.id, quantity: 1 }));
    } else {
      // Handle unauthenticated user, perhaps redirect to login
      alert('Please log in to add items to cart.');
    }
  };

  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20 group">
      <div className="relative overflow-hidden">
        <img
          src={product.image || '/placeholder-image.jpg'}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-deals-orange text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
          HOT
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-deals-yellow transition-colors">{product.name}</h3>
        <p className="text-white/80 text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-3xl font-bold text-deals-yellow">
            ${product.price}
          </span>
        </div>
        <div className="flex gap-3">
          <Link
            to={`/products/${product.id}`}
            className="flex-1 bg-gradient-to-r from-deals-purple to-deals-cyan hover:from-purple-600 hover:to-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 text-center shadow-lg"
          >
            View Details
          </Link>
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-gradient-to-r from-deals-green to-deals-yellow hover:from-green-500 hover:to-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
