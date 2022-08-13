import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import YourProgress from "./pages/YourProgress";
import CalendarView from "./pages/CalendarView";
import HabitsPage from './pages/HabitsPage';
import OpportunitiesPage from './pages/OpportunitiesPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="createaccount" element={<SignUp />} />
        <Route path="yourprogress" element={<YourProgress />} />
        <Route path="calendar" element={<CalendarView />} />
        <Route path="habitsPage" element={<HabitsPage />} />
        <Route path="OpportunitiesPage" element={<OpportunitiesPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
