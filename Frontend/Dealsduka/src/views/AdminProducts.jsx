import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, deleteProduct } from '../features/products/productsSlice';
import ProductForm from '../components/ProductForm';

const AdminProducts = () => {
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector((state) => state.products);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
        <button
          onClick={handleAddProduct}
          className="bg-gradient-to-r from-deals-green to-deals-cyan hover:from-green-500 hover:to-cyan-500 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Add New Product
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-deals-purple to-deals-orange text-white">
            <tr>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                </td>
                <td className="py-3 px-4 font-medium">{product.name}</td>
                <td className="py-3 px-4">{product.category}</td>
                <td className="py-3 px-4">${product.price}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2 transition-all duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded transition-all duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <ProductForm product={editingProduct} onClose={handleCloseForm} />
      )}
    </div>
  );
};

export default AdminProducts;
