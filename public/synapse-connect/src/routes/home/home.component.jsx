import { useContext } from 'react';
import './home.styles.css';
import { UserContext } from '../../context/user.context';
import { Link } from 'react-router-dom';

const Home = () => {
  const { displayName, email } = useContext(UserContext);
  return (
    <div>
      <h1>SYNAPSE CONNECT</h1>
      <Link to='/login'>Login</Link>
      <br/>
      <Link to='/signup'>Sign up</Link>
      <h2>{displayName}</h2>
      <h2>{email}</h2>
    </div>
  );
}

export default Home;
