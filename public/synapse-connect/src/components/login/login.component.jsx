import { useContext, useState } from 'react';
import './login.styles.css'
import { getUsernameFromEmail, signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/user.context';

const defaultFromFields = {
  email: '',
  password: ''
};

const Login = () => {
  const [formFields, setFormFields] = useState(defaultFromFields);
  const { email, password } = formFields;

  const { setDisplayName, setEmail } = useContext(UserContext);

  const resetFormFields = () => {
    setFormFields(defaultFromFields);
  };

  const signInWithGoogle = async () => {
    const result = await signInWithGooglePopup();

    const { user } = result;
    const { displayName, email } = user;

    setDisplayName(displayName);
    setEmail(email);

    // console.log(user);
    // console.log(displayName, email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      const result = await getUsernameFromEmail(email);

      setDisplayName(result.displayName);
      setEmail(result.email);

      // console.log(result.displayName, result.email);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          alert('Provided user was not found');
          break;
        case 'auth/invalid-credential':
          alert('incorrect password for email');
          break;
        default:
          console.error(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({...formFields, [name]: value});
  };

  return (
    <div>
      <h1>Login Back To your account</h1>
      <p>Don't have a account yet?</p>
      <Link to='/signup'>Sign Up</Link>
      <form onSubmit={handleSubmit}>
        <FormInput 
          label={'Email'}
          type='email'
          required
          name="email"
          onChange={handleChange}
          value={email}
        />

        <FormInput 
          label={'Password'}
          type='password'
          required
          name="password"
          onChange={handleChange}
          value={password}
        />

        <div>
          <Button type="submit">Sign In</Button>

          <Button 
            type="button" 
            buttonType={'google'} 
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>

        </div>
      </form>
    </div>
  );
}

export default Login;
