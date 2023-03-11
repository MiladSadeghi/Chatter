import Home from "../pages/Home";
import { AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import { useLocation, Routes as RouterRoutes, Route } from "react-router-dom";
import Account from "../common/Account";
import SignIn from "src/pages/Sign in";
import SignUp from "src/pages/Sign up";
import Prefetch from "src/core/features/auth/Prefetch";
import Layout from "src/common/Layout";
import PersistLogin from "src/core/features/auth/PersistLogin";
import Chat from "src/pages/Chat";
import { useSelector } from "react-redux";
import { userIsAuthenticated } from "src/core/features/auth/authSlice";

const Routes = () => {
  const location = useLocation();
  const isAuthenticated = useSelector(userIsAuthenticated);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location]);

  return (
    <AnimatePresence mode="wait">
      <RouterRoutes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route element={<PersistLogin />}>
            <Route index element={<Home />} />
            <Route
              path="sign-in"
              element={
                <Account>
                  <SignIn />
                </Account>
              }
            />
            <Route
              path="sign-up"
              element={
                <Account>
                  <SignUp />
                </Account>
              }
            />
            <Route element={<Prefetch />}>
              <Route path="/chat" element={<Chat />} />
            </Route>
          </Route>
        </Route>
      </RouterRoutes>
    </AnimatePresence>
  );
};

export default Routes;
