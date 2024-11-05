import axios from "axios";
import { Form, Link, redirect, useLoaderData, useNavigate } from "react-router-dom";

export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    try {
        let endPoint = `https://localhost:7280/getall?search=${q}`
        const response = await axios.get(endPoint);
        return { data: response.data, query:q }
    } catch (error) {
        return { data: [], query: q }
    }
}

export async function action({ params }) {
    const id = params.id;
    await axios.delete(`https://localhost:7280/deleteById?id=${id}`);
    return redirect("/employee")
}

export function Employee() {
    const res = useLoaderData();
    const navigate = useNavigate();

    console.log(res);
    

    const gotoCreateEmployeePage = () => {
        navigate("/employee/create");
    }

    return (
        <>
            <h4>Employee Page</h4>
            <button onClick={gotoCreateEmployeePage}>Add Employee</button>
            <Form role="search" id="search-form">
                <input type="search" name="q" defaultValue={res.query} placeholder="Search something..." />
            </Form>
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
                    {res.data.map((val, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>
                                    <img alt="no pic" src={val.avatarUrl} width={100} height={100} style={{ objectFit: "cover" }} />
                                </td>
                                <td>{val.firstName}</td>
                                <td>{val.lastName}</td>
                                <td>{val.profession}</td>
                                <td>{val.salary}</td>
                                <td>
                                    <Link to={`/employee/update/${val.id}`}>Update</Link>
                                    <Form method="post" action={`delete/${val.id}`} onSubmit={(e) => {
                                        if (!window.confirm("You want to delete this record?")) {
                                            e.preventDefault();
                                        }
                                    }}>
                                        <button type="submit">Delete</button>

                                    </Form>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}