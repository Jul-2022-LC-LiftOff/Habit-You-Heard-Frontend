import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthBackground from "./components/layouts/AuthBackground";
import "./index.css";
import SignUp from "./pages//signup/SignUp";
import CalendarView from "./pages/CalendarView";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import SignIn from "./pages/SignIn";
import YourProgress from "./pages/YourProgress";
// import App from './App';
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="yourprogress" element={<YourProgress />} />
        <Route path="calendar" element={<CalendarView />} />
      </Route>
      <Route path="/auth" element={<AuthBackground />}>
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" title={SignUp.title} element={<SignUp />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
