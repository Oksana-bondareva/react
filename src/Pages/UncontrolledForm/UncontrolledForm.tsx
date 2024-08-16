import { useDispatch, useSelector } from "react-redux";
import {
  AppDispatch,
  RootState,
  setUncontrolledFormData,
} from "../../Store/Store";
import "./UncontrolledForm.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const UncontrolledForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const countries = useSelector((state: RootState) => state.form.countries);
  const [pictureBase64, setPictureBase64] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = {
      name: nameRef.current?.value as string,
      age: ageRef.current?.value as unknown as number,
      email: emailRef.current?.value as string,
      password: passwordRef.current?.value as string,
      confirmPassword: confirmPasswordRef.current?.value as string,
      gender: genderRef.current?.value as string,
      terms: termsRef.current?.checked as boolean,
      picture: pictureBase64 as string,
      country: countryRef.current?.value as string,
    };
    dispatch(setUncontrolledFormData(formData));
    navigate("/");
  };

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPictureBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="form-wrapper">
      <h1 className="form-title">Please fill out the form</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="input-wrapper">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" ref={nameRef} className="input" />
        </div>
        <div className="input-wrapper">
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" ref={ageRef} className="input" />
        </div>
        <div className="input-wrapper">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            className="input"
            autoComplete="new-password"
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            ref={passwordRef}
            className="input"
            autoComplete="new-password"
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            ref={confirmPasswordRef}
            className="input"
            autoComplete="new-password"
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="gender">Gender:</label>
          <select id="gender" ref={genderRef} className="input">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="input-terms-wrapper">
          <input type="checkbox" id="terms" ref={termsRef} className="input" />
          <label htmlFor="terms">Accept Terms and Conditions</label>
        </div>
        <div className="input-wrapper">
          <label htmlFor="picture">Upload Picture:</label>
          <input
            type="file"
            id="picture"
            ref={pictureRef}
            onChange={handlePictureChange}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="country">Country:</label>
          <select id="country" ref={countryRef} className="input">
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="form-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UncontrolledForm;
