import './button.styles.css'

const BUTTON_TYPE_CLASSES = {
  google: 'google-sign-in',
  email: 'email-sign-in'
};

const Button = ({ buttonType, children, ...otherProps}) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherProps}
    >
     {children}
    </button>
  );
};

export default Button;
