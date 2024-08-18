import * as yup from "yup";

const validTypes = ["image/png", "image/jpeg"];
const validSize = 102400;

export const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z]/, "Name must start with an uppercase letter")
    .required("Name is required"),
  age: yup
    .number()
    .positive("Age must be a positive number")
    .integer("Age must be an integer")
    .required("Age is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character",
    )
    .required(
      "Password is required, must contain 1 number, 1 uppercase letter, 1 lowercased letter, 1 special character",
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  gender: yup.string().required("Gender is required"),
  terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
  picture: yup
    .mixed<File>()
    .test(
      "valid-size",
      "Max allowed size is 100KB",
      (value) =>
        value instanceof FileList && value[0] && value[0].size <= validSize,
    )
    .test(
      "valid-type",
      "You can only add .png and .jpg(.jpeg) files",
      (value) => {
        return (
          value instanceof FileList &&
          value[0] &&
          validTypes.includes(value[0].type)
        );
      },
    )
    .required("Picture is required"),
  country: yup.string().required("Country is required"),
});
