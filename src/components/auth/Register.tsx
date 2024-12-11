import React, { Fragment, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import "./register.css";

interface FormValues {
    fullname: string,
    email: string;
    password: string;
}

export default function Register() {
    const [errorLogin, setErrorLogin] = useState<string>("");

    const initialValues: FormValues = {
        fullname: "",
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


    const onLogin = (e: any) => {
        e.preventDefault();
        console.log("show");
        // loginToken("123456")
        // navigate("/dashboard")
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
            className="register-wrapper"
        >
            <p>Signup</p>

            <TextField
                onChange={(event: any) =>
                    handleFieldChange(event, "fullname", event.target.value)
                }
                autoComplete="off"
                value={values.email}
                name="fullname"
                id="fullname"
                label="Fullname"
                variant="outlined"
            />

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
                label="Passwordd"
                variant="outlined"
            />

            <Button type="submit" variant="contained">
                Register
            </Button>

            <div className="errorLogin">{errorLogin}</div>
        </form>
    );
}
