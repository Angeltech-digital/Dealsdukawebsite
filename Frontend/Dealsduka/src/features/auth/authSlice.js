import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

export const login = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/login/`, { email, password });
    // persist tokens
    localStorage.setItem('token', response.data.access);
    localStorage.setItem('refreshToken', response.data.refresh);
    // set default header for subsequent requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
    return response.data;
  } catch (error) {
    // Normalize error shape: could be {detail: '...'} or {field: ['...']} or other
    if (!error.response) return rejectWithValue({ detail: 'Network error' });
    const data = error.response.data;
    if (data.detail) return rejectWithValue({ detail: data.detail });
    return rejectWithValue(data);
  }
});

export const register = createAsyncThunk('auth/register', async ({ email, password, password_confirm, username }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/register/`, { 
      email, 
      password, 
      password_confirm,
      username
    });
    localStorage.setItem('token', response.data.access);
    localStorage.setItem('refreshToken', response.data.refresh);
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
    return response.data;
  } catch (error) {
    if (!error.response) return rejectWithValue({ detail: 'Network error' });
    const data = error.response.data;
    if (data.detail) return rejectWithValue({ detail: data.detail });
    return rejectWithValue(data);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    
    await axios.post(
      `${API_BASE_URL}/api/auth/logout/`, 
      { refresh: refreshToken },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    return {};
  } catch (error) {
    if (!error.response) {
      return rejectWithValue({ detail: 'Network error' });
    }
    // Still remove tokens even if the request fails
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    return rejectWithValue(error.response.data);
  }
});

export const fetchProfile = createAsyncThunk('auth/fetchProfile', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_BASE_URL}/api/auth/profile/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  refreshToken: localStorage.getItem('refreshToken'),
  isLoading: false,
  error: null,
  isAdmin: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.isAdmin = action.payload.user?.is_staff || action.payload.user?.is_superuser;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.isAdmin = action.payload.user?.is_staff || action.payload.user?.is_superuser;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAdmin = false;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAdmin = action.payload.is_staff || action.payload.is_superuser;
      });
  },
});

export const { clearError } = authSlice.actions;

// Export the reducer as both default and named export
const authReducer = authSlice.reducer;
export { authReducer };
export default authReducer;
