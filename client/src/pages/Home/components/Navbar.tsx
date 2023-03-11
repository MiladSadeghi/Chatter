import React from "react";
import { Oval } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  userAuthLoading,
  userIsAuthenticated,
} from "src/core/features/auth/authSlice";
import tw from "twin.macro";

const Navbar = () => {
  const authLoading = useSelector(userAuthLoading);
  const isAuthenticated = useSelector(userIsAuthenticated);
  return (
    <Wrapper>
      <Chatter className="">Chatter</Chatter>
      {authLoading ? (
        <Loading width="30px" height="30px" color="#fff" />
      ) : isAuthenticated ? (
        <LoginButton to={"/chat"}>Chat</LoginButton>
      ) : (
        <LoginButton to={"/sign-in"}>Login / Sign up</LoginButton>
      )}
    </Wrapper>
  );
};

const Wrapper = tw.div`container mx-auto flex justify-between items-center h-24 `;
const Chatter = tw.h1`font-DMSans text-3xl text-my-blue font-bold tracking-tight`;
const LoginButton = tw(
  Link
)`py-3 px-10 bg-transparent border-2 border-slate-400 rounded-lg text-white font-DMSans text-base`;
const Loading = tw(
  Oval
)`py-3 px-10 bg-transparent border-2 border-slate-400 rounded-lg text-white font-DMSans text-base`;

export default Navbar;
