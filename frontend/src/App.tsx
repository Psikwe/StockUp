import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/_page";
import Signup from "./pages/signup/_page";
import { PageLayout } from "./components/_layout/_component";
import Dashboard from "./pages/dashboard/_page";
import { getUserSession } from "./core/utilities";
import MangeProducts from "./pages/manage_products/_page";
import Overview from "./pages/overview/_page";
import Analytics from "./pages/analytics/_page";

function App() {
  const [userSession] = React.useState(getUserSession());

  if (
    typeof process !== "undefined" &&
    process.env.REACT_APP_KENDO_UI_LICENSE
  ) {
    const kendoUILicensePath = process.env.KENDO_UI_LICENSE;
    console.log("Kendo UI License Path:", kendoUILicensePath);
  }
  return (
    <>
      <ToastContainer progressClassName="toast-progress" />
      <BrowserRouter>
        <Routes>
          {!userSession ? (
            <>
              <Route path="*" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          ) : (
            <Route element={<PageLayout />}>
              <Route path="/" element={<Overview />} />
              <Route path="/manage-products" element={<MangeProducts />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/analytics" element={<Analytics />} />
            </Route>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
