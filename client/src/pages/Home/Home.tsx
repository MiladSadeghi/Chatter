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

const Wrapper = tw.div`h-full bg-cover bg-no-repeat pb-[400px] mb-[580px] h-[1280px]`;

export default Home;
