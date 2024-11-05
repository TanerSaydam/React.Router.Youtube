import { NavLink, Outlet, useNavigation } from "react-router-dom";
import { Spinner } from "./Spinner";

export function Layout(){
    const navigation = useNavigation();
    console.log(navigation);
    
    return(
        <>
        <ul>
            <li>
                <NavLink className={({isActive})=> isActive ? 'active' : ''} to="/">Home</NavLink>
            </li>
            <li>
                <NavLink className={({isActive})=> isActive ? 'active' : ''} to="/employee">Employee</NavLink>
            </li>
            <li>
                <NavLink className={({isActive})=> isActive ? 'active' : ''} to="/contact">Contact</NavLink>
            </li>
        </ul>
        <div>
            {(navigation.state === "loading" || navigation.state === "submitting") ? <Spinner/> : <Outlet/>}
        </div>
        </>
    )
}