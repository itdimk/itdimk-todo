import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/App";
import { Provider } from "react-redux";
import { reduxStore } from "./redux/reduxStore";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { SignUp } from "./pages/SignUp/SignUp";
import "normalize.css";
import "./index.scss";
import { SignIn } from "./pages/SignIn/SignIn";
import { ResetPassword } from "./pages/ResetPassword/ResetPassword";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={reduxStore}>
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
