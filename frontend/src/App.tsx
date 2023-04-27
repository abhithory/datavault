import React from 'react';
import { Provider } from "jotai";

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import CredentialsPage from './pages/CredentialsPage';
import FilePage from './pages/FilePage';
import Root from './components/Root/Root';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <FilePage />,
      },
      {
        path: "/credentials",
        element: <CredentialsPage/>,
      },

    ],
  },
]);


function App() {
  return (
    <Provider>
      {/* <Navigation /> */}
      <div>
        <RouterProvider router={router} />
      </div>

      {/* <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />

          <Route path="*" element={<h1>page not found</h1>} />
        </Route>
      </Routes> */}

    </Provider>
  );
}

export default App;
