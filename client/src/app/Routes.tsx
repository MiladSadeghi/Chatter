import Home from "../pages/Home";
import { AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import { useLocation, Routes as RouterRoutes, Route } from "react-router-dom";
import Account from "../common/Account";
import SignIn from "src/pages/Sign in";
import SignUp from "src/pages/Sign up";

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
          <Route path="sign-in" element={<Account children={<SignIn />} />} />
          <Route path="sign-up" element={<Account children={<SignUp />} />} />
        </Route>
      </RouterRoutes>
    </AnimatePresence>
  );
};

export default Routes;
