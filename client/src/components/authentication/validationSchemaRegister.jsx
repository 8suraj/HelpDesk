import * as Yup from "yup";
import YupPassword from "yup-password";
import validator from "validator";

YupPassword(Yup);

Yup.addMethod(Yup.string, "emailCheck", function (errorMessage) {
  return this.test(` `, errorMessage, function (value) {
    const { path, createError } = this;

    return (
      validator.isEmail(value) || createError({ path, message: errorMessage })
    );
  });
});
Yup.addMethod(Yup.string, "mobileCheck", function (errorMessage) {
  return this.test(``, errorMessage, function (value) {
    const { path, createError } = this;

    return (
      validator.isMobilePhone(value) ||
      createError({ path, message: errorMessage })
    );
  });
});
const ValidationSchemaRegistar = Yup.object().shape({
  username: Yup.string().required("Name is required"),
  email: Yup.string().emailCheck("Invalid email").required("Required"),
  // mobile: Yup.string()
  //   .mobileCheck('Invalid mobile number')
  //   .required('Required')
  //   .min(10, 'Mobile number is of length 10'),
  password: Yup.string()
    .required("required")
    .min(
      8,
      "password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
    )
    .minLowercase(1, "password must contain at least 1 lower case letter")
    .minUppercase(1, "password must contain at least 1 upper case letter")
    .minNumbers(1, "password must contain at least 1 number")
    .minSymbols(1, "password must contain at least 1 special character"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

export default ValidationSchemaRegistar;
