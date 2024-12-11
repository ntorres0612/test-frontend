
import "./dashboard.css";
import { Outlet, Link } from 'react-router-dom';
import { logout } from "../../utils";
import { useNavigate } from "react-router-dom";


export default function Dashboard() {
    const navigate = useNavigate();

    const onLogout = (e: any) => {
        console.log("onLogout...");
        logout()
        navigate("/")
    }

    return (
        <div id='dashboard'>

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
