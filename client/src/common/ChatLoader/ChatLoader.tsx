import React from "react";
import { Triangle } from "react-loader-spinner";
import tw from "twin.macro";

const ChatLoader = () => {
  return (
    <Wrapper>
      <Triangle
        height="100"
        width="100"
        color="#5bf7db"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </Wrapper>
  );
};

const Wrapper = tw.div`min-h-screen w-full flex items-center justify-center bg-my-blue-gray`;

export default ChatLoader;
