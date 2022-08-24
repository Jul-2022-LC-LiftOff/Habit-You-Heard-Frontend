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
  // const [hasErrors, setHasErrors] = useState(false);
  let hasError = false;
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
      hasError = true;

      return "Username is blank!";
    } else if (user.username.length > 30) {
      hasError = true;

      return "Username must be less than 30 characters!";
    } else {
      hasError = false;
      return "";
    }
  }

  function getPasswordValidationMessage() {
    console.log(user.password);
    console.log(hasError);
    if (user.password === "") {
      hasError = true;
      return "Password is blank!";
    } else if (user.password.length > 128) {
      hasError = true;

      return "Password must be less than 128 characters!";
    } else if (user.password !== user.password2) {
      hasError = true;

      return "Passwords are not the same";
    } else {
      hasError = false;
      return "";
    }
    console.log(user.password);
    console.log(hasError);
  }

  function getEmailValidationMessage() {
    if (user.email === "") {
      hasError = true;
      return "Email is blank!";
    } else if (!isValidEmail(user.email)) {
      hasError = true;
      return "Invalid email!";
    }
    //   else if(isUniqueEmail(email)){
    //      setHasErrors(true);
    // }
    else {
      hasError = false;

      return "";
    }
  }
  // useEffect(() => {
  //   console.log(hasErrors);
  //   // if (usernameHasError || passwordHasError || emailHasError) {
  //   //   setHasErrors(true);
  //   // }
  //   console.log(hasErrors);
  //   console.log(formSubmitted);
  // }, [usernameHasError, passwordHasError, emailHasError, formSubmitted]);
  const handleSignUp = () => {
    setEmailHelperText(getEmailValidationMessage());
    setPasswordHelperText(getPasswordValidationMessage());
    setUsernameHelperText(getUsernameValidationMessage());
    console.log(hasError);
    // console.log()
    console.log(getEmailValidationMessage());
    console.log(getPasswordValidationMessage());
    console.log(getUsernameValidationMessage());

    if (
      getEmailValidationMessage() === "" &&
      getPasswordValidationMessage() === "" &&
      getUsernameValidationMessage() === ""
    ) {
      console.log("executing");
      handleFetch();
    }
  };

  // useEffect(() => {
  //   if (formSubmitted && !hasErrors) {
  //     handleFetch();
  //   } else {
  //     setFormSubmitted(false);
  //   }
  // }, [formSubmitted]);

  const handleFetch = () => {
    const hashedPassword = bcrypt.hashSync(user.password, salt);

    const newUser = {
      email: user.email,
      username: user.username,
      password: hashedPassword,
    };

    if (newUser.password === hashedPassword) {
      fetch("http://localhost:8080/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      })
        .then((res) => res.text())
        .then((data) => {
          console.log(data);
          setResponse(data);
        });
    }

    console.log(user.password);

    console.log(hasError);
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
