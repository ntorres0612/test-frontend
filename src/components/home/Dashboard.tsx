
import "./dashboard.css";
import { Outlet, Link } from 'react-router-dom';


export default function Dashboard() {
    return (
        <div id='dashboard'>

            <ul>
                <li><Link to="/dashboard/breeds">Breeds</Link></li>
                <li><Link to="/dashboard/search">Search</Link></li>
            </ul>

            <div className="content">
                <Outlet />
            </div>
        </div>
    );
}
