// lib/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './reducers/slice';

export const makeStore = () => {
  return configureStore({
    reducer: {counter : counterSlice.reducer},
  
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
