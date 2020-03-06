import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

import './styles.scss';

const useLocalStorage = (initialState, key) => {
  const get = () => {
    const storage = localStorage.getItem(key);
    console.log(storage);
    if (storage) return JSON.parse(storage)[value];
    return initialState;
  };

  const [value, setValue] = useState(get());
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify({ value }));
  }, [value]);

  return [value, setValue];
};

const Counter = ({ max, step }) => {
  const [count, setCount] = useLocalStorage(0, 'count');

  useEffect(() => {
    document.title = `${count}`;
    setCount(count);
  }, [count]);

  const increment = () => {
    setCount(c => {
      if (c >= max) return c;
      return c + step;
    });
  };
  const decrement = () => {
    setCount(c => {
      if (c <= 0) return c;
      return c - step;
    });
  };
  const reset = () => setCount(0);

  useEffect(() => {
    document.title = `Counter: ${count}`;
  });
  return (
    <div className="Counter">
      <p className="count">{count}</p>
      <section className="controls">
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </section>
    </div>
  );
};

render(<Counter max={15} step={5} />, document.getElementById('root'));
