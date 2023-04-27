import React from 'react';
import { Provider } from "jotai";
import Navigation from './components/Navigation';

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Routes
} from "react-router-dom";
import FileUpload from './components/FileUpload';
import CredentialsPage from './pages/CredentialsPage';
import FilePage from './pages/FilePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
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
