import { useCallback, useContext, useEffect, useState } from 'react';
import './dashboard.styles.css';
import { UserContext } from '../../context/user.context';
import { useNavigate } from 'react-router-dom';
import Popup from '../../components/popup/popup.component';
import { DashboardContext } from '../../context/dashboard.context';

const Dashboard = () => {
  const { isAuthenticated } = useContext(UserContext);
  const { showPopup, setShowPopup } = useContext(DashboardContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().currentTimeZone;

  const updateCurrentTime = useCallback(() => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: currentTimeZone });
  }, [currentTimeZone]);

  const updateCurrentDate = useCallback(() => {
    const now = new Date();
    const options = { weekday: 'long', 'month': 'long', day: 'numeric', timeZone: currentTimeZone };
    const formattedDate = now.toLocaleDateString('en-US', options);
    return formattedDate;
  }, [currentTimeZone]);

  const [currentTime, setCurrentTime] = useState(updateCurrentTime());
  const [currentDate, setCurrentDate] = useState(updateCurrentDate());

  useEffect(() => {
    const now = new Date();
    const delay = (60 - now.getSeconds()) * 1000;

    const timeoutId = setTimeout(() => {
      setCurrentTime(updateCurrentTime());
      setCurrentDate(updateCurrentDate());
      const interval = setInterval(updateCurrentTime, 60000);

      // clear the interval when the component unmounts
      return () => clearInterval(interval);
    }, delay);

    // clear the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, [updateCurrentTime, updateCurrentDate]);

  const goToHistoryPage = () => {
    navigate('/history');
  }

  const togglePopUp = () => {
    setShowPopup(!showPopup);
  }

  return (
    <div>
      <h2>{currentTime}</h2>
      <p>{currentDate}</p>

      <button type='button' onClick={togglePopUp}>New meeting</button>
      <button type='button' onClick={togglePopUp}>Join meeting</button>
      <button type='button' onClick={goToHistoryPage}>History</button>

      <div>
        {showPopup && <Popup />}
      </div>
    </div>
  );
};

export default Dashboard;
