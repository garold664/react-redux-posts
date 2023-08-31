// import store from './store/Store'; // with the use of useSelector and useDispatch hooks we don't need to import the store anymore
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  increment,
  decrement,
  incrementByAmount,
  selectCount,
} from './store/counterSlice';

import './App.css';

// const increment = () => {
//   return {
//     type: 'counter/increment',
//   };
// };

// console.log(increment());

function App() {
  // console.log(selectCount(store.getState()));
  // console.log(store.getState());
  const count = useSelector(selectCount);
  const [amount, setAmount] = useState(5);

  const dispatch = useDispatch();
  return (
    <div className="App">
      <button
        onClick={() => {
          // store.dispatch(decrement());
          dispatch(decrement());
          // console.log(store.getState().value);
        }}
      >
        -
      </button>
      <span style={{ color: 'white', fontSize: '40px' }}>
        {/* {store.getState().value} */}
        {count}
      </span>
      <button
        onClick={() => {
          // store.dispatch(increment());
          dispatch(increment());
          // console.log(store.getState().value);
        }}
      >
        +
      </button>
      <br />
      <button
        onClick={() => {
          // store.dispatch(incrementByAmount(amount));
          dispatch(incrementByAmount(amount));
          // console.log(store.getState().value);
        }}
      >
        increment by
      </button>
      <input value={amount} onChange={(e) => setAmount(+e.target.value)} />
    </div>
  );
}

export default App;
