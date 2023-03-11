import React from "react";
import tw from "twin.macro";
import RouteWrapper from "src/common/RouteWrapper";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Main from "./components/Main";

const Home = () => {
  return (
    <RouteWrapper>
      <Wrapper className="bg-header">
        <Navbar />
        <Header />
      </Wrapper>
      <Main />
    </RouteWrapper>
  );
};

const Wrapper = tw.div`h-full bg-cover bg-no-repeat lg:pb-[400px] lg:mb-[580px] lg:bg-[0_-300px] pb-4 mb-4`;

export default Home;
