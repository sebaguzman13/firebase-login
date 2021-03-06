import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import LandingPage from './components/LandingPage/LandingPage';
import ProfileScreen from './components/UserComponents/ProfileScreen';
import MyPetsScreen from './components/UserComponents/MyPetsScreen';
import PetForm from './components/PetComponents/PetForm';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<App />} >
          <Route index element={<LandingPage />} />
          <Route path={'login'} element={<Login />} />
          <Route path={'register'} element={<Login register />} />
          <Route path={'profile'} element={<ProfileScreen />} />
          <Route path={"my-pets"} element={<MyPetsScreen />} />
          <Route path={"my-pets/info"} element={<PetForm cancelButton />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
