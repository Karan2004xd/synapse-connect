const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="group">
      <input className="form-input" {...otherProps}/>
      {label && (
        <label>{label}</label>
      )}
    </div>
  );
}

export default FormInput;
