import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../features/products/productsSlice';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) => !selectedCategory || product.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0;
    });

  const categories = [...new Set(products.map((product) => product.category))];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-deals-orange mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <p>Error loading products: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 bg-white/10 backdrop-blur-sm rounded-3xl m-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
          Our Products
        </h1>
        <p className="text-xl text-white/90 max-w-2xl mx-auto">
          Discover our amazing collection of tech accessories and gadgets
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-4 bg-white/20 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 min-w-64 px-4 py-3 border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-deals-orange focus:border-transparent transition-all duration-300 bg-white/10 text-white placeholder-white/70"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-3 border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-deals-purple focus:border-transparent transition-all duration-300 bg-white/10 text-white"
        >
          <option value="">📂 All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-3 border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-deals-cyan focus:border-transparent transition-all duration-300 bg-white/10 text-white"
        >
          <option value="name">📝 Sort by Name</option>
          <option value="price-low">💰 Price: Low to High</option>
          <option value="price-high">💎 Price: High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center bg-white/20 backdrop-blur-sm rounded-2xl p-12 border border-white/30">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-white text-xl font-medium">No products match your search criteria.</p>
          <p className="text-white/80 mt-2">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  );
};

export default Products;
