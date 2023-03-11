import React from "react";
import tw from "twin.macro";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import Apple from "src/assets/apple-icon.png";
import Android from "src/assets/android-icon.png";
import Windows from "src/assets/windows-icon.png";
import Chat from "src/assets/home-chat-application.jpg";
const Header = () => {
  return (
    <Wrapper>
      <div className="mt-32 text-center">
        <h2 className="mb-32 font-DMSans text-7xl font-bold text-my-gray">
          Connect With your mate easily
        </h2>
        <p className="text-center text-3xl font-normal text-white">
          Chatter is a communication application between friend, family and team
          at the same <br /> time wrapped in one use-friendly application
        </p>
      </div>
      <div className="offset- mt-24 flex items-center justify-center space-x-14">
        <Button className="border-2 border-solid border-slate-400 bg-transparent">
          Learn more
        </Button>
        <Button className="bg-my-blue">
          Try it now
          <ArrowLongRightIcon className="ml-4 w-7" />
        </Button>
      </div>
      <p className="mt-10 text-center font-DMSans text-2xl font-light text-my-gray">
        Compatible with all OS in the world
      </p>
      <div className="mt-12 flex items-center justify-center space-x-6 lg:mb-[90px]">
        <img src={Apple} alt="" />
        <img src={Android} alt="" />
        <img src={Windows} alt="" />
      </div>
      <div className="relative hidden lg:flex">
        <div className="absolute top-0 h-[800px] w-full rounded-xl bg-[url('/src/assets/home-chat-background.jpg')] bg-cover drop-shadow-2xl">
          <img
            className="mx-auto mt-[110px] h-[95%] w-[80%] rounded-xl drop-shadow-xl"
            src={Chat}
            alt=""
          />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = tw.div`container mx-auto`;
const Button = tw.button`py-3 flex items-center justify-center rounded-lg text-white font-DMSans text-xl w-48`;
export default Header;
