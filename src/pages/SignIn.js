import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AuthLayout from "../components/layouts/AuthLayout";

export default function SignInSide() {
  const [response, setResponse] = useState("");
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleLogin = () => {};
  useEffect(() => {
    //needs response from Auth controller (not yet built)
    if (response !== "" && response === "Verified") {
      navigate("/");
    }
  });
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
        />
      </Stack>
    </AuthLayout>
  );
}
