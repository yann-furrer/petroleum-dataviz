// lib/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './reducers/slice';
import newsSlice from './reducers/newsSlice'
import pipelineSlice from './reducers/pipelineSlice';
export const makeStore = () => {
  return configureStore({
    reducer: {counter : counterSlice.reducer, 
      newsapi :newsSlice, 
      pipelineapi : pipelineSlice
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
      
        serializableCheck: false,
      }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
