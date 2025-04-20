import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['product/set3DModel'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 