import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "./Spinner";

export function CreateEmployee() {
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);

    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        setData(prev => ({ ...prev, [name]: value }));
    }

    function save(event) {
        setLoading(true);
        event.preventDefault();
        axios.post("https://localhost:7280/create", data).then(() => {
            navigate("/employee");
            setLoading(false);
        })
    }

    function getById() {
        axios.get(`https://localhost:7280/getById?id=${id}`).then(res => {
            setData(res.data);
        });
    }


    useEffect(() => {
        if (id) {
            getById();
        }
    }, [])

    return (
        <>
            {loading ?
                (<Spinner />)
                :
                (
                    <>
                        <form autoComplete="off" onSubmit={save}>
                            <h4>Create Employee</h4>
                            <div>
                                <label>First Name</label>
                                <input type="text" name="firstName" value={data.firstName ?? ""} onChange={handleChange} required minLength={3} />
                            </div>
                            <div>
                                <label>Last Name</label>
                                <input type="text" name="lastName" value={data.lastName ?? ""} onChange={handleChange} required minLength={3} />
                            </div>
                            <div>
                                <label>Profession</label>
                                <input type="text" name="profession" value={data.profession ?? ""} onChange={handleChange} required minLength={3} />
                            </div>
                            <div>
                                <label>Salary</label>
                                <input type="text" name="salary" value={data.salary ?? ""} onChange={handleChange} required minLength={3} />
                            </div>
                            <div>
                                <label>Avatar</label>
                                <input type="text" name="avatarUrl" value={data.avatarUrl ?? ""} onChange={handleChange} required minLength={3} />
                            </div>
                            <div>
                                <button type="submit">Save</button>
                            </div>
                        </form>
                    </>
                )
            }
        </>
    )
}