import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../features/products/productsSlice';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-deals-orange mx-auto shadow-lg"></div>
          <p className="mt-4 text-deals-purple font-medium">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-600 font-medium">Error loading products: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-block bg-gradient-to-r from-deals-orange to-deals-purple text-white px-6 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
          ✨ Welcome to DealsDuka
        </div>
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-deals-purple via-deals-orange to-deals-cyan bg-clip-text text-transparent mb-6 leading-tight">
          Discover Amazing Deals
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Explore our curated collection of tech accessories at unbeatable prices.
          Quality products, amazing deals, delivered to your door.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center bg-gradient-to-r from-gray-50 to-deals-cyan/10 rounded-2xl p-12 border border-deals-cyan/20">
          <div className="text-6xl mb-4">🛍️</div>
          <p className="text-deals-purple text-xl font-medium">No products available at the moment.</p>
          <p className="text-gray-600 mt-2">Check back soon for amazing deals!</p>
        </div>
      )}
    </div>
  );
};

export default Home;
