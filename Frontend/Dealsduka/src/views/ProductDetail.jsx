import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductById } from '../features/products/productsSlice';
import { addToCart } from '../features/cart/cartSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, isLoading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (selectedProduct) {
      dispatch(addToCart(selectedProduct));
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-deals-orange mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <p>Error loading product: {error.message}</p>
        </div>
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600">
          <p>Product not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="relative">
          <img
            src={selectedProduct.image || '/placeholder-image.jpg'}
            alt={selectedProduct.name}
            className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl border-4 border-white"
          />
          <div className="absolute -bottom-4 -right-4 bg-deals-orange text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
            ⭐ Featured
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-deals-purple via-deals-orange to-deals-cyan bg-clip-text text-transparent mb-4">
              {selectedProduct.name}
            </h1>
            <p className="text-gray-700 text-lg leading-relaxed">{selectedProduct.description}</p>
          </div>

          <div className="bg-gradient-to-r from-deals-orange to-deals-purple p-6 rounded-2xl text-white">
            <div className="text-5xl font-bold mb-2">${selectedProduct.price}</div>
            <div className="text-deals-yellow text-sm">Limited time offer!</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
              <div className="text-deals-purple font-semibold text-sm mb-1">Category</div>
              <div className="text-gray-800 font-medium">{selectedProduct.category}</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
              <div className="text-deals-purple font-semibold text-sm mb-1">Stock</div>
              <div className="text-gray-800 font-medium">{selectedProduct.stock} available</div>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-deals-green to-deals-yellow hover:from-green-500 hover:to-yellow-500 text-white px-8 py-4 rounded-2xl text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            🛒 Add to Cart - ${selectedProduct.price}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
