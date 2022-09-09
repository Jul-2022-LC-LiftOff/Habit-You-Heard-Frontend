import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import AuthLayout from "../components/layouts/AuthLayout";

export default function SignInSide(props) {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [loginClicked, setLoginClicked] = useState(false);
  const [userLoggingIn, setUserLoggingIn] = useState({});
  const [usernameNotFound, setUsernameNotFound] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [usernameHelperText, setUsernameHelperText] = useState("");

  async function fetchToken() {
    return await fetch("http://localhost:8080/api/auth/assign/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userLoggingIn),
    }).then((res) => res.json());
  }

  console.log(token);
  console.log(props.userId);

  const handleLogin = () => {
    fetchToken().then((response) => {
      if (response.token) {
        console.log(response.token);
        setPasswordHelperText("");
        setUsernameHelperText("");

        setToken(response.token);
        props.setUserId(response.userId);
        navigate("/");
      } else if (response.errorMessage) {
        if (response.errorMessage === "Invalid Password") {
          setPasswordHelperText("Invalid Password!");
        } else {
          setPasswordHelperText("");
        }
        if (response.errorMessage === "User Not Found") {
          setUsernameHelperText("User Not Found");
        } else {
          setUsernameHelperText("");
        }
      }
    });
  };

  return (
    <AuthLayout
      title="Welcome Back!"
      buttonHandler={handleLogin}
      linkPath="/auth/signup"
      linkTitle="Sign Up"
    >
      <Stack spacing={4} maxWidth={800}>
        <TextField
          label="Username"
          variant="standard"
          value={userLoggingIn.username}
          onChange={(e) => {
            let updatedValue = { username: e.target.value };
            setUserLoggingIn((userLoggingIn) => ({
              ...userLoggingIn,
              ...updatedValue,
            }));
          }}
          error={usernameHelperText === "User Not Found"}
          helperText={usernameHelperText}
        />
        <TextField
          label="Password"
          variant="standard"
          type="password"
          value={userLoggingIn.password}
          onChange={(e) => {
            let updatedValue = { password: e.target.value };
            setUserLoggingIn((userLoggingIn) => ({
              ...userLoggingIn,
              ...updatedValue,
            }));
          }}
          error={passwordHelperText === "Invalid Password!"}
          helperText={passwordHelperText}
        />
      </Stack>
    </AuthLayout>
  );
}
