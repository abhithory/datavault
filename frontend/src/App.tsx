import React from 'react';
import { Provider } from "jotai";

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import CredentialsPage from './pages/CredentialsPage';
import FilePage from './pages/FilePage';
import Root from './components/Root/Root';
import { MantineProvider } from '@mantine/core';

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
        element: <CredentialsPage />,
      },

    ],
  },
]);


function App() {
  return (
    <Provider>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colors: {
            // Add your color
            customWhite:["#FFF","#FFF","#FFF","#FFF","#FFF","#FFF","#FFF","#FFF","#FFF","#FFF",],
            customPrimary: ['#42047e','#42047e','#42047e','#42047e','#42047e','#42047e','#42047e','#42047e','#42047e','#42047e',],
          },
          primaryColor: "customPrimary"

    
        }}
      >

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

      </MantineProvider>
    </Provider>
  );
}

export default App;
