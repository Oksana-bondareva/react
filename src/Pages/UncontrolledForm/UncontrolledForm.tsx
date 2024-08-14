import "./UncontrolledForm.css";

const UncontrolledForm = () => {
  return (
    <form className="uncontrolled-form">
      <input className="uncontrolled-form__input" type="text" />
      <button className="uncontrolled-form__button" type="submit">
        Submit
      </button>
    </form>
  );
};

export default UncontrolledForm;
