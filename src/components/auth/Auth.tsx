import React, { Fragment, useState } from "react";
import Login from "./Login";
import Register from "./Register";

import "./auth.css";
interface FormValues {
    email: string;
    password: string;
}

export default function Auth() {
    const [showLoginForm, setShowLoginForm] = useState<boolean>(true);

    const showRegisterForm = (e: any) => {
        setShowLoginForm(!showLoginForm);
    }
    return (
        <div id="auth-container">
            <div id="auth-forms">
                {
                    showLoginForm ? <Login /> : <Register />
                }

                <a href="#" onClick={(event: any) => showRegisterForm(event)}>{showLoginForm ? "Register" : "Login"}</a>
            </div>
        </div>
    );
}
