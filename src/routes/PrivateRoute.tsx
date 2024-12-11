// import { Navigate } from "react-router-dom";
// import { isLogin } from '../../utils';


// const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
//     return isLogin() ? <Component {...rest} /> : <Navigate to="/" replace />;
// };
// export default PrivateRoute;


import React from "react";
import { Navigate } from "react-router-dom";
import { isLogin } from "../utils";

interface PrivateRouteProps {
    component: React.ComponentType<any>;
    [key: string]: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
    return isLogin() ? <Component {...rest} /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
