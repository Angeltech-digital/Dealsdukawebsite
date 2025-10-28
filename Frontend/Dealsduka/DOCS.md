# DealsDuka Documentation

## Overview

DealsDuka is a modern, full-featured e-commerce frontend application built with React. It provides a seamless shopping experience with user authentication, product browsing, cart management, order processing, and an admin panel for managing products, orders, and users.

## Features

- **User Authentication**: Login, registration, and profile management
- **Product Management**: Browse, search, and view product details
- **Shopping Cart**: Add, update, and remove items from cart
- **Order Processing**: Place orders and track order history
- **Admin Panel**: Manage products, orders, users, and categories
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time Updates**: Redux Toolkit for state management

## Tech Stack

### Frontend
- **React 19.1.1**: UI library
- **Vite 7.1.7**: Build tool and development server
- **Redux Toolkit 2.9.2**: State management
- **React Router DOM 7.9.4**: Client-side routing
- **Axios 1.12.2**: HTTP client for API calls
- **Tailwind CSS 4.1.16**: Utility-first CSS framework
- **Lucide React 0.548.0**: Icon library
- **React Icons 5.5.0**: Additional icon set

### Development Tools
- **ESLint 9.36.0**: Code linting
- **PostCSS 8.5.6**: CSS processing
- **Autoprefixer 10.4.21**: CSS vendor prefixing

## Project Structure

```
Dealsduka/
├── public/
│   └── WhatsApp Image 2025-10-27 at 10.59.36.jpeg
├── src/
│   ├── assets/
│   │   └── icons.js
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── HeroSection.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductForm.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── Services.jsx
│   ├── features/
│   │   ├── auth/
│   │   │   └── authSlice.js
│   │   ├── cart/
│   │   │   └── cartSlice.js
│   │   ├── categories/
│   │   │   └── categoriesSlice.js
│   │   ├── orders/
│   │   │   └── ordersSlice.js
│   │   ├── products/
│   │   │   └── productsSlice.js
│   │   └── users/
│   │       └── usersSlice.js
│   ├── views/
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminOrders.jsx
│   │   ├── AdminProducts.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Orders.jsx
│   │   ├── OrderSummary.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Products.jsx
│   │   └── Register.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── store.js
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
└── README.md
```

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd Dealsduka
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

6. **Lint the code**:
   ```bash
   npm run lint
   ```

## Usage

### User Flow

1. **Browse Products**: Visit the home page or products page to browse available items
2. **Authentication**: Register or login to access full features
3. **Add to Cart**: Add products to cart from product detail pages
4. **Checkout**: Proceed to checkout to place orders
5. **Order History**: View past orders in the orders section

### Admin Features

1. **Dashboard**: Overview of products, orders, and users
2. **Product Management**: Create, update, and delete products
3. **Order Management**: View and update order statuses
4. **User Management**: Manage user accounts
5. **Category Management**: Organize products into categories

## API Integration

The application connects to a REST API hosted at `https://dealsdukawebsite.onrender.com/api`.

### Authentication Endpoints
- `POST /auth/login/` - User login
- `POST /auth/register/` - User registration
- `POST /auth/logout/` - User logout
- `GET /profile/` - Fetch user profile
- `PUT /profile/` - Update user profile

### Product Endpoints
- `GET /products/` - Fetch all products
- `GET /products/{id}/` - Fetch product by ID
- `POST /products/` - Create new product (Admin)
- `PUT /products/{id}/` - Update product (Admin)
- `DELETE /products/{id}/` - Delete product (Admin)

### Cart Endpoints
- `GET /carts/` - Fetch user's cart
- `POST /cart-items/` - Add item to cart
- `PUT /cart-items/{id}/` - Update cart item quantity
- `DELETE /cart-items/{id}/` - Remove item from cart
- `DELETE /carts/` - Clear entire cart

### Order Endpoints
- `POST /orders/` - Place new order
- `GET /orders/` - Fetch user's orders
- `PATCH /orders/{id}/` - Update order status (Admin)
- `POST /checkout/` - Process checkout

### User Management Endpoints (Admin)
- `GET /users/` - Fetch all users
- `POST /users/` - Create user
- `PUT /users/{id}/` - Update user
- `DELETE /users/{id}/` - Delete user

### Category Endpoints
- `GET /categories/` - Fetch all categories
- `POST /categories/` - Create category (Admin)
- `PUT /categories/{id}/` - Update category (Admin)
- `DELETE /categories/{id}/` - Delete category (Admin)

## State Management

The application uses Redux Toolkit for state management with the following slices:

### Auth Slice (`authSlice.js`)
Manages user authentication state:
- User data and token storage
- Login, register, logout actions
- Profile fetching and updating
- Admin role detection

### Products Slice (`productsSlice.js`)
Handles product-related state:
- Product listing and details
- CRUD operations for products
- Product search and filtering

### Cart Slice (`cartSlice.js`)
Manages shopping cart functionality:
- Cart items management
- Add, update, remove items
- Cart total calculations

### Orders Slice (`ordersSlice.js`)
Handles order processing:
- Order placement and history
- Order status updates
- Checkout process

### Users Slice (`usersSlice.js`)
Admin user management:
- User listing and CRUD operations
- User role management

### Categories Slice (`categoriesSlice.js`)
Product categorization:
- Category listing and management
- Product organization

## Components

### Layout Components
- **Header**: Navigation bar with authentication status and menu
- **Footer**: Site footer with links and information
- **ProtectedRoute**: Route guard for authenticated/admin-only pages

### UI Components
- **HeroSection**: Landing page hero banner
- **ProductCard**: Product display card
- **ProductForm**: Form for creating/editing products
- **Services**: Service highlights section

## Views/Pages

### Public Pages
- **Home**: Landing page with hero section and featured products
- **Products**: Product listing and browsing
- **ProductDetail**: Individual product information
- **Login**: User authentication
- **Register**: User registration

### Protected Pages
- **Cart**: Shopping cart management
- **Checkout**: Order placement process
- **OrderSummary**: Order confirmation
- **Orders**: User order history

### Admin Pages
- **AdminDashboard**: Admin overview
- **AdminProducts**: Product management interface
- **AdminOrders**: Order management interface

## Styling

The application uses Tailwind CSS with custom color scheme:
- **Primary Colors**: Purple gradient (`deals-purple`)
- **Accent Colors**: Orange (`deals-orange`), Cyan (`deals-cyan`), Yellow (`deals-yellow`), Green (`deals-green`)

Custom CSS classes are defined in `src/index.css` and Tailwind configuration in `tailwind.config.js`.

## Routing

React Router DOM handles client-side routing:

```jsx
<Route path="/" element={<Home />} />
<Route path="/products" element={<Products />} />
<Route path="/products/:id" element={<ProductDetail />} />
<Route path="/cart" element={<Cart />} />
<Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
<Route path="/order-summary" element={<ProtectedRoute><OrderSummary /></ProtectedRoute>} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
<Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
<Route path="/admin/products" element={<ProtectedRoute adminOnly><AdminProducts /></ProtectedRoute>} />
<Route path="/admin/orders" element={<ProtectedRoute adminOnly><AdminOrders /></ProtectedRoute>} />
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@dealsduka.com or create an issue in the repository.
