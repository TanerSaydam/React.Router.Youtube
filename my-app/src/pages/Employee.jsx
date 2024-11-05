import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "./Spinner";

export function Employee(){
    const [data, setData] = useState([]);
    const [q, setQ] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(()=> {
        getAll();
    },[])

    function getAll(){
        setLoading(true);
        let endPoint = `https://localhost:7280/getall?search=${q}`
        axios.get(endPoint).then(res => {
            setData(res.data);
            setLoading(false);
        });
    }

    const gotoCreateEmployeePage = () => {
        navigate("/employee/create");
    }

    const deleteById = (id) =>{
        const result = window.confirm("You want to delete this record?");
        if(result){
            axios.delete(`https://localhost:7280/deleteById?id=${id}`).then(()=> {
                getAll();
            });
        }
    }

    function searchhandle(e){
        e.preventDefault();
        getAll();
    }

    return(
        <>
        {loading ? (
            <Spinner/>
        ):
        (
            <>
                        <h4>Employee Page</h4>
                        <button onClick={gotoCreateEmployeePage}>Add Employee</button>
                        <form onSubmit={searchhandle}>
                            <input type="search" onChange={(e) => setQ(e.target.value)} placeholder="Search something..." />
                        </form>
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Avatar</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Profession</th>
                                    <th>Salary</th>
                                    <th>Operations</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((val, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>
                                                <img src={val.avatarUrl} width={100} height={100} style={{ objectFit: "cover" }} />
                                            </td>
                                            <td>{val.firstName}</td>
                                            <td>{val.lastName}</td>
                                            <td>{val.profession}</td>
                                            <td>{val.salary}</td>
                                            <td>
                                                <Link to={`/employee/update/${val.id}`}>Update</Link>
                                                <button onClick={() => deleteById(val.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
            </>

        )}
        </>
    )
}