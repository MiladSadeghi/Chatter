import { useFormik } from "formik";
import { Oval } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RouteWrapper from "src/common/RouteWrapper";
import { useSignUpMutation } from "src/core/features/auth/authApiSlice";
import { SignUpSchema } from "src/helpers/validation";
import tw from "twin.macro";

type FormValues = {
  email: string;
  userName: string;
  password: string;
  repeatPassword: string;
};

const SignUp = () => {
  document.title = "Sign up";
  const navigate = useNavigate();
  const initialValues: FormValues = {
    email: "",
    userName: "",
    password: "",
    repeatPassword: "",
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
    validationSchema: SignUpSchema,
    onSubmit: submitForm,
  });
  const [signUp, { isLoading }] = useSignUpMutation();

  async function submitForm(values: any) {
    try {
      await signUp({
        email: values.email,
        userName: values.userName,
        password: values.password,
      }).unwrap();
      toast.success("Thanks for create account, please login to your account.");
      navigate("/sign-in");
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
    }
  }

  return (
    <RouteWrapper className="overflow-hidden">
      <Wrapper>
        <div className="mx-auto w-full bg-white px-8 py-12 font-Mulish drop-shadow-md sm:w-[454px]">
          <p className="text-sm font-light text-my-dark-gray">Hi! 👋</p>
          <h5 className="mb-7 text-2xl font-bold">Create your account</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <div className="mb-3 flex justify-between">
                <label className="text-sm font-medium" htmlFor="email">
                  Email
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
                <label className="text-sm font-medium" htmlFor="userName">
                  Username
                </label>
                <ErrorMessage>
                  {errors.userName || touched.userName}
                </ErrorMessage>
              </div>
              <Input
                type="text"
                id="userName"
                value={values.userName}
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
            <div className="mb-7">
              <div className="mb-3 flex justify-between">
                <label className="text-sm font-medium" htmlFor="repeatPassword">
                  Repeat password
                </label>
                <ErrorMessage>
                  {errors.repeatPassword || touched.repeatPassword}
                </ErrorMessage>
              </div>
              <Input
                type="password"
                id="repeatPassword"
                value={values.repeatPassword}
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
          You have an account?{" "}
          <Link to="/sign-in" className="text-xs text-my-light-purple">
            Sign in
          </Link>
        </p>
      </Wrapper>
    </RouteWrapper>
  );
};

const Wrapper = tw.div`container mx-auto overflow-hidden`;
const Input = tw.input`h-[45px] w-full rounded-lg border border-solid border-my-gray px-4`;
const SubmitButton = tw.button`h-[45px] bg-gradient-to-b from-[#625BF7] to-[#463EEA] w-full font-extrabold text-base text-white rounded-md flex justify-center items-center`;
const ErrorMessage = tw.p`text-red-600`;

export default SignUp;
