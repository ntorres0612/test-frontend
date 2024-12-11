import React, { Fragment, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./register.css";
import { RegisterRequest } from "../../data/model/RegisterRequest";
import { register } from "../../api/authApi";

interface FormValues {
    fullname: string,
    email: string;
    password: string;
}

export default function Register() {
    const [errorLogin, setErrorLogin] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");

    const initialValues: FormValues = {
        fullname: "",
        email: "",
        password: "",
    };

    const [values, setValues] = useState<FormValues>({ ...initialValues });

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


    const onRegister = (e: any) => {
        e.preventDefault();
        const registerRequest: RegisterRequest = {
            "fullName": values.fullname,
            "email": values.email,
            "password": values.password
        };
        register(registerRequest).then((response: any) => {
            console.log('response', response);
            if (response.id) {
                setSuccessMessage("Registrado exitosamente")
                setValues(initialValues)
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
                onRegister(e);
            }}
            className="register-wrapper"
        >
            <p>Signup</p>

            <TextField
                onChange={(event: any) =>
                    handleFieldChange(event, "fullname", event.target.value)
                }
                autoComplete="off"
                value={values.fullname}
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

            <div className="successRegister">{successMessage}</div>
            <div className="errorLogin">{errorLogin}</div>
        </form>
    );
}
