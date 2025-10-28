import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import productsReducer from './features/products/productsSlice';
import cartReducer from './features/cart/cartSlice';
import ordersReducer from './features/orders/ordersSlice';
import usersReducer from './features/users/usersSlice';
import categoriesReducer from './features/categories/categoriesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
    users: usersReducer,
    categories: categoriesReducer,
  },
});

export default store;
