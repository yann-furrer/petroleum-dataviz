// app/page.tsx
'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store/store';
import { increment, decrement, incrementByAmount } from './store/reducers/slice';

export default function HomePage() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <p>Compteur : {count}</p>
      <button onClick={() => dispatch(increment())}>Incrémenter</button>
      <p> -- </p>
      <button onClick={() => dispatch(decrement())}>Dnécrémenter</button>
      <p> -- </p>
      <button onClick={() => dispatch(incrementByAmount(-6))}>Dnécrémenter -6</button>
      
    </div>
  );
}
