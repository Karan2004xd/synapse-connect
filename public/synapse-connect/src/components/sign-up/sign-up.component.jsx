import { Link, Navigate } from 'react-router-dom';
import './sign-up.styles.css'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromUser, signInWithGooglePopup } from '../../utils/firebase/firebase.utils';
import { useContext, useState } from 'react';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { UserContext } from '../../context/user.context';
import { fetchPostData } from '../../utils/datafetch/datafetch.utils';

const defaultFromFields = {
  email: '',
  password: '',
  confirmPassword: '',
  displayName: ''
};

const SignUp = () => {

  const [formFields, setFormFields] = useState(defaultFromFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const { updateEmail, updateDisplayName, isAuthenticated, updateId } = useContext(UserContext);

  if (isAuthenticated()) {
    return (
      <Navigate to={'/'} />
    );
  }

  const resetFormFields = () => {
    setFormFields(defaultFromFields);
  };

  const updateContext = async (displayName, email, requestType = 'create') => {
    updateDisplayName(displayName);
    updateEmail(email);

    const requestData = {
      name: displayName,
      email: email
    };

    const { id } = await fetchPostData(`/member/${requestType}`, requestData);
    updateId(id);
  };

  const signInWithGoogle = async () => {
    const result = await signInWithGooglePopup();

    const { user } = result;
    const { displayName, email } = user;

    await updateContext(displayName, email);
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

      updateContext(displayName, email);

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

        <Button 
          type="button" 
          buttonType={'google'} 
          onClick={signInWithGoogle}
        >
          Google Sign In
        </Button>

      </form>
    </div>
  );
};

export default SignUp;
