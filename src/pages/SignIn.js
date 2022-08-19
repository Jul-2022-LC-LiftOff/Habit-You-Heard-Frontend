import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AuthLayout from "../components/layouts/AuthLayout";

export default function SignInSide() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [loginClicked, setLoginClicked] = useState(false);

  const [usernameNotFound, setUsernameNotFound] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [usernameHelperText, setUsernameHelperText] = useState("");

  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });

  function fetchToken() {
    fetch("http://localhost:8080/api/auth/assign/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.text())
      .then((data) => setToken(data));
  }

  console.log(token);
  const handleLogin = () => {
    setLoginClicked(true);
  };

  useEffect(() => {
    if (token === "Invalid Password") {
      setPasswordHelperText("Invalid Password!");
    }
    if (token === "User Not Found") {
      setUsernameHelperText("User Not Found");
    }
  }, [token]);

  useEffect(() => {
    if (loginClicked) {
      fetchToken();
      //needs response from Auth controller (not yet built)
      if (
        token !== "" &&
        token !== "Invalid Password" &&
        token !== "User Not Found"
      ) {
        navigate("/");
      } else {
        setLoginClicked(false);
      }
    }
  }, [loginClicked]);
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
          value={user.username}
          onChange={(e) => {
            let updatedValue = { username: e.target.value };
            setUser((user) => ({
              ...user,
              ...updatedValue,
            }));
          }}
          error={token === "User Not Found"}
          helperText={usernameHelperText}
        />
        <TextField
          label="Password"
          variant="standard"
          type="password"
          value={user.password}
          onChange={(e) => {
            let updatedValue = { password: e.target.value };
            setUser((user) => ({
              ...user,
              ...updatedValue,
            }));
          }}
          error={token === "Invalid Password"}
          helperText={passwordHelperText}
        />
      </Stack>
    </AuthLayout>
  );
}
