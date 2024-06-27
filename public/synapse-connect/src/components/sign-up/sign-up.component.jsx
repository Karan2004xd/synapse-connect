import { Link } from 'react-router-dom';
import './sign-up.styles.css'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromUser } from '../../utils/firebase/firebase.utils';
import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

const defaultFromFields = {
  email: '',
  password: '',
  confirmPassword: '',
  displayName: ''
};

const SignUp = () => {

  const [formFields, setFormFields] = useState(defaultFromFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFromFields);
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({...formFields, [name]: value});
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Passwords do not match');
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromUser(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        console.log('User account creation error', error);
      }
    }
  };

  return (
    <div>
      <h1>Create a new account</h1>
      <p>Already have an account?</p>

      <Link to='/login'>Login</Link>

      <form onSubmit={onSubmitHandler}>
        <FormInput 
          label={'Display Name'}
          type="text"
          onChange={onChangeHandler}
          required
          name="displayName"
          value={displayName}
        />

        <FormInput 
          label={'Email'}
          type="email"
          onChange={onChangeHandler}
          required
          name="email"
          value={email}
        />

        <FormInput 
          label={'Password'}
          type="password"
          onChange={onChangeHandler}
          required
          name="password"
          value={password}
        />

        <FormInput 
          label={'Confirm Password'}
          type="password"
          onChange={onChangeHandler}
          required
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="submit">Create an account</Button>

      </form>
    </div>
  );
};

export default SignUp;
