import Layout from "../common/Layout";
import Home from "../pages/Home";
import { AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import { useLocation, Routes as RouterRoutes, Route } from "react-router-dom";

const Routes = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location]);

  return (
    <AnimatePresence mode="wait">
      <RouterRoutes location={location} key={location.pathname}>
        <Route path="/">
          <Route index element={<Home />} />
        </Route>
      </RouterRoutes>
    </AnimatePresence>
  );
};

export default Routes;
