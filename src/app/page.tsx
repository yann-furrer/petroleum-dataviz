// app/page.tsx
'use client';
import dotenv  from 'dotenv'
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store/store';
import { increment, decrement, incrementByAmount } from './store/reducers/slice';
import { fetchData } from './store/reducers/newsSlice';
import { useEffect } from 'react';

export default function HomePage() {
  dotenv.config();
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.newsapi);


 useEffect(() => {
  dispatch(fetchData());
}, [dispatch]);

if (loading) return <p>Chargement...</p>;
if (error) return <p>Erreur : {error}</p>;




  return (
    <div>
      <p>Compteur : {count}</p>
      <button onClick={() => dispatch(increment())}>Incrémenter</button>
      <p> -- </p>
      <button onClick={() => dispatch(decrement())}>Dnécrémenter</button>
      <p> -- </p>
      <button onClick={() => dispatch(incrementByAmount(-6))}>Dnécrémenter -6</button>
      
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
