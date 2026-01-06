# DealsDuka Frontend-Backend Integration Setup Guide

## Overview
Your frontend and backend are now properly connected! The registration form will send user details (username, email, password, phone number, and address) to your Django backend.

## What Was Updated

### Frontend Changes
1. **Register.jsx** - Enhanced registration form:
   - Added `phone_number` field to the form
   - Added `address` field to the form
   - Updated form submission to send all fields to the backend

2. **authSlice.js** - Updated Redux auth slice:
   - Modified the `register` async thunk to send `phone_number` and `address` to the backend
   - These fields are optional and default to empty strings if not provided

### Backend Setup
Your backend was already properly configured:
- ✅ Django REST Framework installed
- ✅ JWT authentication set up with `djangorestframework-simplejwt`
- ✅ CORS enabled (`CORS_ALLOW_ALL_ORIGINS = True`)
- ✅ RegisterView properly configured to accept and process registration data
- ✅ User model has all required fields: username, email, phone_number, address

## Running the Application

### 1. Start the Backend (Django)

```bash
cd /home/angela/Dealsdukawebsite/Backend/dealsduka

# Activate virtual environment (if needed)
source env/bin/activate

# Run migrations (first time only, if not already done)
python manage.py migrate

# Start the development server
python manage.py runserver
```

The backend will be running at: `http://127.0.0.1:8000`

### 2. Start the Frontend (React/Vite)

In a new terminal:

```bash
cd /home/angela/Dealsdukawebsite/Frontend/Dealsduka

# Install dependencies (first time only)
npm install

# Start the development server
npm run dev
```

The frontend will be running at: `http://localhost:5173` (or another port if 5173 is occupied)

## Testing the Registration Flow

1. Open your browser and navigate to `http://localhost:5173` (your frontend)
2. Click on "Create Account" or navigate to the Register page
3. Fill in the registration form:
   - **Username**: Choose a unique username
   - **Email**: Enter a valid email address
   - **Password**: Create a strong password
   - **Confirm Password**: Re-enter your password
   - **Phone Number**: (Optional) Enter your phone number
   - **Address**: (Optional) Enter your address

4. Click "Create account"
5. The form will send a POST request to: `http://127.0.0.1:8000/api/auth/register/`
6. If successful, you'll be logged in automatically and redirected to the home page
7. Your JWT tokens will be stored in localStorage for future authenticated requests

## API Endpoint Details

### Registration Endpoint
- **URL**: `http://127.0.0.1:8000/api/auth/register/`
- **Method**: `POST`
- **Request Body**:
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePassword123!",
  "password_confirm": "SecurePassword123!",
  "phone_number": "+1234567890",
  "address": "123 Main St, City, Country"
}
```

- **Success Response** (201 Created):
```json
{
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "role": "BUYER",
    "phone_number": "+1234567890",
    "address": "123 Main St, City, Country",
    "bio": "",
    "profile_picture": null
  },
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

## How It Works

1. **Frontend Registration Form** submits data to the Redux `register` action
2. **Redux Thunk** makes an API call to the Django backend
3. **Django Backend** receives the request, validates the data, and creates a new user
4. **Database** stores the user with all provided information
5. **JWT Tokens** are generated and returned to the frontend
6. **Frontend** stores tokens in localStorage for authenticated requests
7. **User** is automatically logged in and redirected

## Troubleshooting

### Issue: "Network error" when registering
- **Solution**: Ensure the Django backend is running on `http://127.0.0.1:8000`
- Check that CORS is enabled in settings.py (it is by default)

### Issue: "Passwords do not match"
- **Solution**: Make sure both password fields contain the same password

### Issue: "Email already exists"
- **Solution**: Use a different email address that hasn't been registered yet

### Issue: Registration succeeds but user isn't logged in
- **Solution**: Check that localStorage is enabled in your browser
- Verify JWT tokens are being returned from the backend

### Issue: Backend migrations not applied
- **Solution**: Run `python manage.py migrate` before starting the server

## Additional Resources

- Django REST Framework docs: https://www.django-rest-framework.org/
- JWT Authentication: https://django-rest-framework-simplejwt.readthedocs.io/
- React Redux docs: https://redux.js.org/

## Next Steps

1. Test the registration flow thoroughly
2. Set up email verification (optional)
3. Implement password reset functionality
4. Add email confirmation for security
5. Customize user profile fields as needed
