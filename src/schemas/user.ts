import * as yup from "yup";

export const userSchema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .min(5, "Username must be at least 5 characters long"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password must match"),
});
