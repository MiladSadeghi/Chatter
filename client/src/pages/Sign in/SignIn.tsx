import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import RouteWrapper from "src/common/RouteWrapper";
import tw from "twin.macro";

const SignIn = () => {
  useEffect(() => {
    document.title = "Sign in";
  }, []);

  return (
    <RouteWrapper>
      <Wrapper>
        <div className="w-[454px] bg-white px-8 py-12 font-Mulish drop-shadow-md">
          <p className="text-sm font-light text-my-dark-gray">
            Welcome back! 👋
          </p>
          <h5 className="mb-7 text-2xl font-bold">Sign in to your account</h5>
          <form>
            <div className="mb-6">
              <div className="mb-3 flex justify-between">
                <label className="text-sm font-medium" htmlFor="email">
                  Your email
                </label>
                <p></p>
              </div>
              <Input type="text" id="email" />
            </div>
            <div className="mb-7">
              <div className="mb-3 flex justify-between">
                <label className="text-sm font-medium" htmlFor="password">
                  Password
                </label>
                <p></p>
              </div>
              <Input type="text" id="password" />
            </div>
            <SubmitButton>CONTINUE</SubmitButton>
          </form>
        </div>
        <p className="mt-12 text-center font-Mulish text-xs font-light">
          Don’t have an account?{" "}
          <Link to="/sign-up" className="text-xs text-my-light-purple">
            Sign up
          </Link>
        </p>
      </Wrapper>
    </RouteWrapper>
  );
};

const Wrapper = tw.div`container mx-auto`;
const Input = tw.input`h-[45px] w-full rounded-lg border border-solid border-my-gray px-4`;
const SubmitButton = tw.button`h-[45px] bg-gradient-to-b from-[#625BF7] to-[#463EEA] w-full font-extrabold text-base text-white rounded-md`;

export default SignIn;
