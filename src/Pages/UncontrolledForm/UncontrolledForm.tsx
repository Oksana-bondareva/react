import { useDispatch, useSelector } from "react-redux";
import { addData, AppDispatch, RootState } from "../../Store/Store";
import "./UncontrolledForm.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { schema } from "../../utils/Validation";
import * as yup from "yup";
import { ValidationErrors } from "../../Modal/Interfaces";
import { convertBase64 } from "../../utils/ConvertPicture";
import { HeaderForm } from "../../Components/HeaderForm/HeaderForm";
import PasswordStrength from "../../utils/PasswordStrength";

const UncontrolledForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const countries = useSelector((state: RootState) => state.form.countries);
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = {
      name: nameRef.current?.value as string,
      age: ageRef.current?.value as unknown as number,
      email: emailRef.current?.value as string,
      password: passwordRef.current?.value as string,
      confirmPassword: confirmPasswordRef.current?.value as string,
      gender: genderRef.current?.value as string,
      terms: termsRef.current?.checked as boolean,
      picture: pictureRef.current?.files,
      country: countryRef.current?.value as string,
    };
    try {
      await schema.validate(formData, { abortEarly: false });
      const file = pictureRef.current?.files as FileList;
      const base64 = await convertBase64(file[0]);
      const picture = base64 ? base64.toString() : "";
      const formsData = { ...formData, picture };
      dispatch(addData(formsData));
      setErrors({});
      navigate("/");
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const formattedErrors: ValidationErrors = {};
        error.inner.forEach((err) => {
          formattedErrors[err.path as keyof ValidationErrors] = err.message;
        });
        setErrors(formattedErrors);
      } else {
        console.error("Error:", error);
      }
    }
  };

  const handlePasswordChange = () => {
    if (passwordRef.current) {
      setPassword(passwordRef.current.value);
    }
  };

  return (
    <div className="form-wrapper">
      <HeaderForm />
      <form
        onSubmit={handleSubmit}
        className="form"
        noValidate
        autoComplete="off"
      >
        <div className="input-wrapper">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" ref={nameRef} className="input" />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>
        <div className="input-wrapper">
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" ref={ageRef} className="input" />
          {errors.age && <p className="error-text">{errors.age}</p>}
        </div>
        <div className="input-wrapper">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" ref={emailRef} className="input" />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            ref={passwordRef}
            className="input"
            onChange={handlePasswordChange}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
          <PasswordStrength password={password} />
        </div>
        <div className="input-wrapper">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            ref={confirmPasswordRef}
            className="input"
          />
          {errors.confirmPassword && (
            <p className="error-text">{errors.confirmPassword}</p>
          )}
        </div>
        <div className="input-wrapper">
          <label htmlFor="gender">Gender:</label>
          <select id="gender" ref={genderRef} className="input">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <p className="error-text">{errors.gender}</p>}
        </div>
        <div className="input-wrapper">
          <div className="input-terms-wrapper">
            <input
              type="checkbox"
              id="terms"
              ref={termsRef}
              className="input"
            />
            <label htmlFor="terms">Accept Terms and Conditions</label>
          </div>
          {errors.terms && <p className="error-text">{errors.terms}</p>}
        </div>
        <div className="input-wrapper">
          <label htmlFor="picture">Upload Picture:</label>
          <input type="file" id="picture" ref={pictureRef} />
          {errors.picture && <p className="error-text">{errors.picture}</p>}
        </div>
        <div className="input-wrapper">
          <label htmlFor="country">Country:</label>
          <datalist id="countryList">
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </datalist>
          <input
            type="text"
            list="countryList"
            id="country"
            name="country"
            autoComplete="off"
            ref={countryRef}
            className="input"
          />
          {errors.country && <p className="error-text">{errors.country}</p>}
        </div>
        <button type="submit" className="form-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UncontrolledForm;
