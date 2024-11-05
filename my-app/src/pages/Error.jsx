import { Link } from "react-router-dom";

export function Error(){
    return(
        <>
            <h1>Something went wrong!</h1>
            <Link to="/">Return home page</Link>
        </>
    )
}