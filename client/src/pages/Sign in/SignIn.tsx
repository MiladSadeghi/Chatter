import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import RouteWrapper from "src/common/RouteWrapper";
import tw from "twin.macro";
import { useFormik } from "formik";
import { SignInSchema } from "src/helpers/validation";
import { Oval } from "react-loader-spinner";
import { useSignInMutation } from "src/core/features/auth/authApiSlice";
import { toast } from "react-toastify";
import { setToken } from "src/core/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/core/store";

const SignIn = () => {
  document.title = "Sign in";
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const initialValues: Record<string, string> = {
    email: "",
    password: "",
  };

  const [signIn, { isLoading }] = useSignInMutation();

  const submitForm = async () => {
    try {
      const result = await signIn({
        email: values.email,
        password: values.password,
      }).unwrap();
      toast.success("Thanks for create account, please login to your account.");
      dispatch(setToken(result));
      navigate("/");
    } catch (error: any) {
      if (error?.data?.data?.userName) {
        errors.userName = error?.data?.data?.userName;
      }
      if (error?.data?.data?.email) {
        errors.email = error?.data?.data?.email;
      }
      if (error?.data?.data?.password) {
        errors.password = error?.data?.data?.password;
      }
      if (error?.status === "FETCH_ERROR") {
        toast.error("Try again later!");
      }
      if (error?.status === 401) {
        toast.error(error?.data?.message);
      }
    }
  };

  const {
    values,
    errors,
    touched,
    isValid,
    dirty,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: SignInSchema,
    onSubmit: submitForm,
  });

  return (
    <RouteWrapper>
      <Wrapper>
        <div className="w-[454px] bg-white px-8 py-12 font-Mulish drop-shadow-md">
          <p className="text-sm font-light text-my-dark-gray">
            Welcome back! 👋
          </p>
          <h5 className="mb-7 text-2xl font-bold">Sign in to your account</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <div className="mb-3 flex justify-between">
                <label className="text-sm font-medium" htmlFor="email">
                  Your email
                </label>
                <ErrorMessage>{errors.email || touched.email}</ErrorMessage>
              </div>
              <Input
                type="text"
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="mb-7">
              <div className="mb-3 flex justify-between">
                <label className="text-sm font-medium" htmlFor="password">
                  Password
                </label>
                <ErrorMessage>
                  {errors.password || touched.password}
                </ErrorMessage>
              </div>
              <Input
                type="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <SubmitButton
              disabled={!(dirty && isValid) || isLoading}
              className={`${!isValid || isLoading ? "opacity-60" : ""}`}
              type="submit"
            >
              {isLoading ? (
                <Oval width="30px" height="30px" color="#fff" />
              ) : (
                "CONTINUE"
              )}
            </SubmitButton>
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
const SubmitButton = tw.button`h-[45px] bg-gradient-to-b from-[#625BF7] to-[#463EEA] w-full font-extrabold text-base text-white rounded-md flex justify-center items-center`;
const ErrorMessage = tw.p`text-red-600`;
export default SignIn;
