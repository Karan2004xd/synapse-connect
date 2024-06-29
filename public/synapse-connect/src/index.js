import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/user.context';
import { DashboardProvider } from './context/dashboard.context';
import { RoomProvider } from './context/room.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <DashboardProvider>
          <RoomProvider>
            <App />
          </RoomProvider>
        </DashboardProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
