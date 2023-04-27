import React from 'react';
import Home from './pages/Home';
import { Provider } from "jotai";
import Navigation from './components/Navigation';


function App() {
  return (
    <Provider>
      <Navigation />
      <div>
        <Home />
      </div>
    </Provider>
  );
}

export default App;
