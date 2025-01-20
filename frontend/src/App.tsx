import React, { useState, useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Welcome from "./pages/welcome";
import Homepage from "./pages/customerPage/homepage";
import CustomerLayout from "./layout/CustomerLayout";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index element={<Welcome />} />
        <Route path="shop" element={<CustomerLayout />}>
          <Route index element={<Homepage />} />{" "}
          {/* Display Homepage when at /shop */}
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
