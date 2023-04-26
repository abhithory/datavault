import React from 'react';
import Home from './pages/Home';
import { Provider } from "jotai";


function App() {
  return (
    <Provider>
      <div>
        <Home />
      </div>
    </Provider>
  );
}

export default App;
