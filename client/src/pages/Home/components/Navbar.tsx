import React from "react";
import { Link } from "react-router-dom";
import tw from "twin.macro";

const Navbar = () => {
  return (
    <Wrapper>
      <Chatter className="">Chatter</Chatter>
      <LoginButton>
        <Link to={"/sign-in"}>Login / Sign up</Link>
      </LoginButton>
    </Wrapper>
  );
};

const Wrapper = tw.div`container mx-auto flex justify-between items-center h-24 `;
const Chatter = tw.h1`font-DMSans text-3xl text-my-blue font-bold tracking-tight`;
const LoginButton = tw.div`py-3 px-10 bg-transparent border-2 border-slate-400 rounded-lg text-white font-DMSans text-xl`;

export default Navbar;
