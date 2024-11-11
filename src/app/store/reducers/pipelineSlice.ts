import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
interface DataState {
  data: any;
  filteredData: any;
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  data: null,
  filteredData: null,
  loading: false,
  error: null,
};

// Thunk pour appeler l'API
export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (_, { getState }) => {
    const state = getState() as RootState;
    if (state.data) {
      console.log("passe dans le if")
      // Si les données existent déjà, retourne-les sans faire de nouvel appel
      return state.data;
    }
    else{
      console.log("passe dans le else")
      const response = await fetch('https://petroleum-dataviz-api-recette.up.railway.app/api/pipeline');
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }
      return await response.json();

    }
  }
); 


 

// Slice Redux
const pipelineSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {filterByCountry: (state, action: PayloadAction<string | null>) => {

    const country = action.payload;
    if (country) {
      // Filtrer par pays
      state.filteredData = state.data?.features.filter((feature: any) => feature.properties.Countries === country) || null;
    } else {
      // Réinitialiser avec toutes les données si aucun pays n'est sélectionné
      state.filteredData = state.data;
    }
  },},
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
export const {filterByCountry} = pipelineSlice.actions
export default pipelineSlice.reducer;