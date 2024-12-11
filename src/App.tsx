import React from "react";
import Auth from "./components/auth/Auth";
import Dashboard from "./components/home/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Transaction from "./components/breeds/Breed";
import Room from "./components/search/Search";

import { RecoilRoot } from "recoil";

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/dashboard",
      element: <PrivateRoute component={Dashboard} />,
      children: [
        { path: "/dashboard/breeds", element: <Transaction /> },
        { path: "/dashboard/search", element: <Room /> },
      ],
    },
    { path: "/", element: <Auth /> },
  ]);

  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
};

export default App;