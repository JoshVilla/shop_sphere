import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Welcome from "./pages/welcome";
import Homepage from "./pages/customerPage/homepage";
import CustomerLayout from "./layout/CustomerLayout";
import Account from "./pages/customerPage/account";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Root Route */}
        <Route index element={<Welcome />} />

        {/* Customer Layout with Nested Routes */}
        <Route path="main" element={<CustomerLayout />}>
          <Route index element={<Homepage />} />
          <Route path="account" element={<Account />} />
          <Route path="shop" element={<Homepage />} /> {/* Route for /shop */}
        </Route>
      </>
    )
  );

  return (
    <React.Fragment>
      <RouterProvider router={router} />
    </React.Fragment>
  );
}

export default App;
