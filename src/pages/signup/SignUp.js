import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import bcrypt from "bcryptjs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AuthLayout from "../../components/layouts/AuthLayout";

const salt = bcrypt.genSaltSync(10);

const SignUp = () => {
  const [response, setResponse] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);
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
    if (user.username === "") {
      return "Username is blank!";
    } else if (user.username.length > 30) {
      return "Username must be less than 30 characters!";
    } else {
      return "";
    }
  }

  function getPasswordValidationMessage() {
    if (user.password === "") {
      setHasErrors(true);
      return "Password is blank!";
    } else if (user.password.length > 128) {
      setHasErrors(true);
      return "Password must be less than 128 characters!";
    } else {
      setHasErrors(false);
      return "";
    }
  }

  function getEmailValidationMessage() {
    if (user.email == "") {
      setHasErrors(true);
      return "Email is blank!";
    } else if (!isValidEmail(user.email)) {
      setHasErrors(true);
      return "Invalid email!";
    }
    //   else if(isUniqueEmail(email)){
    //      setHasErrors(true);
    // }
    else {
      setHasErrors(false);

      return "";
    }
  }
  useEffect(() => {
    console.log(hasErrors);
    if (usernameHasError || passwordHasError || emailHasError) {
      setHasErrors(true);
    }
    console.log(hasErrors);
    console.log(formSubmitted);
  }, [usernameHasError, passwordHasError, emailHasError, formSubmitted]);

  const handleSignUp = () => {
    setEmailHelperText(getEmailValidationMessage());
    setPasswordHelperText(getPasswordValidationMessage());
    setUsernameHelperText(getUsernameValidationMessage());
    setFormSubmitted(true);
    if (formSubmitted) {
      const updatedValue = { password: bcrypt.hashSync(user.password, salt) };
      setUser((user) => ({
        ...user,
        ...updatedValue,
      }));
      console.log(hasErrors);
      if (!hasErrors) {
        fetch("http://localhost:8080/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        })
          .then((res) => res.text())
          .then((data) => setResponse(data));
      }
    }
  };
  useEffect(() => {
    //temporary: (only works for Micah's test controller)

    if (response !== "" && response === "Hi") {
      navigate("/auth/signin");
    }
  });

  return (
    <AuthLayout
      title="Create Account"
      buttonHandler={handleSignUp}
      linkPath="/auth/signin"
      linkTitle="Sign In"
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
        />
      </Stack>
    </AuthLayout>
  );
};
export default SignUp;
