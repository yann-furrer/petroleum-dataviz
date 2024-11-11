import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface DataState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  data: null,
  loading: false,
  error: null,
};

// Thunk pour appeler l'API
export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const response = await fetch('https://petroleum-dataviz-api-recette.up.railway.app/api/news');
 // const response = await fetch('https://672b4177976a834dd026461a.mockapi.io/redux_test_endpoint');
  // petroleum-dataviz-api-recette.up.railway.apppetroleum-dataviz-api-recette.up.railway.app
  
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des données');
  }
  const data = await response.json();
  console.log(response.json)
  return data;
});

// Slice Redux
const newsSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Une erreur est survenue';
      });
  },
});

export default newsSlice.reducer;