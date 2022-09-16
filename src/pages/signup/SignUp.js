import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import bcrypt from "bcryptjs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AuthLayout from "../../components/layouts/AuthLayout";

const salt = bcrypt.genSaltSync(10);

const SignUp = () => {
  const [response, setResponse] = useState("");
  let formSubmitted = false;
  // const [hasErrors, setHasErrors] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");
  const [emailHasError, setEmailHasError] = useState(false);
  const navigate = useNavigate();

  const [usernameHelperText, setUsernameHelperText] = useState("");
  const [usernameHasError, setUsernameHasError] = useState(false);

  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [passwordHasError, setPasswordHasError] = useState(false);

  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    password2: "",
  });

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  // function isUniqueEmail(){

  // }

  function getUsernameValidationMessage() {
    if (formSubmitted) {
      if (user.username === "") {
        setUsernameHasError(true);

        return "Username is blank!";
      } else if (user.username.length > 30) {
        setUsernameHasError(true);

        return "Username must be less than 30 characters!";
      } else {
        setUsernameHasError(false);

        return "";
      }
    }
  }

  function getPasswordValidationMessage() {
    if (user.password === "") {
      setPasswordHasError(true);
      return "Password is blank!";
    } else if (user.password.length > 128) {
      setPasswordHasError(true);

      return "Password must be less than 128 characters!";
    } else if (user.password !== user.password2) {
      setPasswordHasError(true);

      return "Passwords are not the same";
    } else {
      setPasswordHasError(false);

      return "";
    }
  }

  function getEmailValidationMessage() {
    if (user.email === "") {
      setEmailHasError(true);

      return "Email is blank!";
    } else if (!isValidEmail(user.email)) {
      setEmailHasError(true);

      return "Invalid email!";
    }
    //   else if(isUniqueEmail(email)){
    //      setHasErrors(true);
    // }
    else {
      setEmailHasError(false);

      return "";
    }
  }

  const handleSignUp = () => {
    formSubmitted = true;
    setEmailHelperText(getEmailValidationMessage());
    setPasswordHelperText(getPasswordValidationMessage());
    setUsernameHelperText(getUsernameValidationMessage());

    if (
      getEmailValidationMessage() === "" &&
      getPasswordValidationMessage() === "" &&
      getUsernameValidationMessage() === ""
    ) {
      handleFetch();
    }
  };

  const handleFetch = () => {
    const newUser = {
      email: user.email,
      username: user.username,
      password: user.password,
    };

    fetch("http://localhost:8080/api/user/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.text())
      .then((data) => {
        setResponse(data);
      });
  };
  useEffect(() => {
    if (response !== "" && response === "Created") {
      navigate("/auth/signin");
    }
  });

  return (
    <AuthLayout
      title="Create Account"
      buttonHandler={handleSignUp}
      linkPath="/auth/signin"
      linkTitle="Already have an account? Sign In"
    >
      <Stack spacing={4} maxWidth={800}>
        <TextField
          label="Email"
          variant="standard"
          value={user.email}
          onChange={(e) => {
            let updatedValue = { email: e.target.value };
            setUser((user) => ({
              ...user,
              ...updatedValue,
            }));
          }}
          error={emailHasError}
          helperText={emailHelperText}
        />
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
          error={usernameHasError}
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
          error={passwordHasError}
          helperText={passwordHelperText}
        />
        <TextField
          label="Password2"
          variant="standard"
          type="password"
          value={user.password2}
          onChange={(e) => {
            let updatedValue = { password2: e.target.value };
            setUser((user) => ({
              ...user,
              ...updatedValue,
            }));
          }}
          error={passwordHasError}
          helperText={passwordHelperText}
        />
      </Stack>
    </AuthLayout>
  );
};
export default SignUp;
