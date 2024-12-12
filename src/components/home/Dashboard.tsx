
import "./dashboard.css";
import { Outlet, Link } from 'react-router-dom';
import { logout } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";


export default function Dashboard() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState<any>();


    const onLogout = (e: any) => {
        console.log("onLogout...");
        logout()
        navigate("/")
    }
    useEffect(() => {
        let token = localStorage.getItem("token")
        const decoded = jwtDecode(token!);
        setUserInfo(decoded)

    }, [])

    return (
        <div id='dashboard'>
            <div id="info-user">
                <div>Fullname: <b>{userInfo?.fullName}</b></div>
                <div>email:  <b>{userInfo?.email}</b></div>
            </div>
            <ul>
                <li><Link to="/dashboard/breeds">Breeds</Link></li>
                <li><Link to="/dashboard/search">Search</Link></li>
                <li><Link to="#" onClick={(event: any) =>
                    onLogout(event)
                }>Cerrar sesión</Link></li>
            </ul>

            <div className="content">
                <Outlet />
            </div>
        </div>
    );
}
