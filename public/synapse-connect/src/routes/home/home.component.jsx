import { useContext, useEffect } from 'react';
import './home.styles.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/user.context';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(UserContext);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [navigate, isAuthenticated]);

  const goToSignUpPage = () => {
    navigate('/signup');
  };

  const goToLoginPage = () => {
    navigate('/login');
  };

  return (
    <div>
      <h1>SYNAPSE CONNECT</h1>
      <p>Making sweat pants as new board room attire!</p>
      <button type='button' onClick={goToSignUpPage}>Go to Sign Up page</button>
      <button type='button' onClick={goToLoginPage}>Go to Login page</button>
    </div>
  );
}

export default Home;
