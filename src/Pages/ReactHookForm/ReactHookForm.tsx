import "./ReactHookForm.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch, addData } from "../../Store/Store";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../utils/Validation";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { convertBase64 } from "../../utils/ConvertPicture";

type FieldData = yup.InferType<typeof schema>;
const ReactHookForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const countries = useSelector((state: RootState) => state.form.countries);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FieldData>({
    resolver: yupResolver<FieldData>(schema, { abortEarly: false }),
    criteriaMode: "all",
    reValidateMode: "onChange",
    mode: "all",
  });

  const onSubmit: SubmitHandler<FieldData> = async (data) => {
    const file = getValues().picture as unknown as FileList;
    const base64 = await convertBase64(file[0]);
    const picture = base64 ? base64.toString() : "";
    const formData = { ...data, picture };
    dispatch(addData(formData));
    navigate("/");
  };

  return (
    <div className="form-wrapper">
      <h1 className="form-title">Please fill out the form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form" noValidate>
        <div className="input-wrapper">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="input"
          />
          {errors.name && <p className="error-text">{errors.name.message}</p>}
        </div>
        <div className="input-wrapper">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            {...register("age")}
            className="input"
          />
          {errors.age && <p className="error-text">{errors.age.message}</p>}
        </div>
        <div className="input-wrapper">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="input"
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="input"
          />
          {errors.password && (
            <p className="error-text">{errors.password.message}</p>
          )}
        </div>
        <div className="input-wrapper">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword")}
            className="input"
          />
          {errors.confirmPassword && (
            <p className="error-text">{errors.confirmPassword.message}</p>
          )}
        </div>
        <div className="input-wrapper">
          <label htmlFor="gender">Gender:</label>
          <select id="gender" {...register("gender")} className="input">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && (
            <p className="error-text">{errors.gender.message}</p>
          )}
        </div>
        <div className="input-wrapper">
          <div className="input-terms-wrapper">
            <input type="checkbox" id="terms" {...register("terms")} />
            <label htmlFor="terms">Accept Terms and Conditions</label>
          </div>
          {errors.terms && <p className="error-text">{errors.terms.message}</p>}
        </div>
        <div className="input-wrapper">
          <label htmlFor="picture">Upload Picture:</label>
          <input type="file" id="picture" {...register("picture")} />
          {errors.picture && (
            <p className="error-text">{errors.picture.message}</p>
          )}
        </div>
        <div className="input-wrapper">
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            list="countryList"
            id="country"
            autoComplete="off"
            {...register("country")}
            className="input"
          />
          <datalist id="countryList">
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </datalist>
          {errors.country && (
            <p className="error-text">{errors.country.message}</p>
          )}
        </div>
        <button type="submit" className="form-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReactHookForm;
