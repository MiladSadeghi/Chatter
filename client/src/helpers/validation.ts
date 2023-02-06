import * as Yup from 'yup';

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  userName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "too short - should be 6 chars minimum"),
  repeatPassword: Yup.string()
    .required("You should repeat the password")
    .oneOf([Yup.ref('password'), null], 'Type the correct password'),
});

export { SignUpSchema };