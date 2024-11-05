import { Link, Outlet } from "react-router-dom";

export function Layout(){
    return(
        <>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/employee">Employee</Link>
            </li>
            <li>
                <Link to="/contact">Contact</Link>
            </li>
        </ul>
        <div>
            <Outlet/>
        </div>
        </>
    )
}