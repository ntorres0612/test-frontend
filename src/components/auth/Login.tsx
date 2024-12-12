import React, { Fragment, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { loginToken } from "../../utils";
import "./login.css";
import { login } from "../../api/authApi";
import { LoginRequest } from "../../data/model/LoginRequest";

interface FormValues {
  email: string;
  password: string;
}

export default function Login() {
  const [errorLogin, setErrorLogin] = useState<string>("");

  const initialValues: FormValues = {
    email: "torres@gmail.com",
    password: "torres123",
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


  const onLogin = (e: any) => {
    e.preventDefault();
    const loginRequest: LoginRequest = {
      "email": values.email,
      "password": values.password
    };
    login(loginRequest).then((response: any) => {
      console.log('response', response);
      if (response.token) {
        loginToken(response.token)
        navigate("/dashboard")
      } else {
        setErrorLogin("Datos incorrectos")
      }

    }).catch(e => {
      setErrorLogin("Datos incorrectos")

    })
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
        label="Email"
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
        label="Password"
        variant="outlined"
      />

      <Button type="submit" variant="contained">
        Login
      </Button>

      <div className="errorLogin">{errorLogin}</div>
    </form>
  );
}
