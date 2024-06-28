import { Route, Routes } from 'react-router-dom';
import Login from './components/login/login.component';
import Home from './routes/home/home.component';
import SignUp from './components/sign-up/sign-up.component';
import Dashboard from './routes/dashboard/dashboard.component';
import History from './routes/history/history.component';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/history' element={<History />} />
    </Routes>
  );
}

export default App;
