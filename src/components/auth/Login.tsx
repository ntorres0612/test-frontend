import React, { Fragment, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { loginToken } from "../../utils";
import "./login.css";

interface FormValues {
  email: string;
  password: string;
}

export default function Login() {
  const [errorLogin, setErrorLogin] = useState<string>("");

  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const [values, setValues] = useState<FormValues>({ ...initialValues });
  const navigate = useNavigate();

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof FormValues,
    value: string
  ) => {
    event.persist && event.persist();
    setValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const showRegisterForm = (e: any) => {
    console.log("show...");
  }
  const onLogin = (e: any) => {
    e.preventDefault();
    loginToken("123456")
    navigate("/dashboard")
    // Example: Perform login logic here
    // loginToken(res.token)
    // navigate("/dashboard")
    // setErrorLogin(res.message)
  };

  return (

    <form
      onSubmit={(e) => {
        onLogin(e);
      }}
      className="login-wrapper"
    >
      <p>Signin</p>
      <TextField
        onChange={(event: any) =>
          handleFieldChange(event, "email", event.target.value)
        }
        autoComplete="off"
        value={values.email}
        name="email"
        id="email"
        label="email"
        variant="outlined"
      />

      <TextField
        onChange={(event: any) =>
          handleFieldChange(event, "password", event.target.value)
        }
        autoComplete="off"
        value={values.password}
        name="password"
        type="password"
        id="password"
        label="Passwordx"
        variant="outlined"
      />

      <Button type="submit" variant="contained">
        Login
      </Button>

      <div className="errorLogin">{errorLogin}</div>
    </form>
  );
}
