import { Route, Routes } from 'react-router-dom';
import Login from './components/login/login.component';
import Home from './routes/home/home.component';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  );
}

export default App;
