import axios from "axios";
import { Form, useLoaderData, redirect } from "react-router-dom";

export async function action({ request }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    if (!data.id) data.id = null;
    await axios.post("https://localhost:7280/create", data);
    return redirect("/employee");
}

export async function loader({ params }) {
    let endPoint = `https://localhost:7280/getById?id=${params.id}`
    const response = await axios.get(endPoint);
    return response.data
}

export function CreateEmployee() {
    const data = useLoaderData();

    return (
        <>
            <Form method="post" autoComplete="off">
                <h4>Create Employee</h4>
                <input defaultValue={data?.id} name="id" style={{ display: "none" }} />
                <div>
                    <label>First Name</label>
                    <input type="text" name="firstName" defaultValue={data?.firstName} required minLength={3} />
                </div>
                <div>
                    <label>Last Name</label>
                    <input type="text" name="lastName" defaultValue={data?.lastName} required minLength={3} />
                </div>
                <div>
                    <label>Profession</label>
                    <input type="text" name="profession" defaultValue={data?.profession} required minLength={3} />
                </div>
                <div>
                    <label>Salary</label>
                    <input type="text" name="salary" defaultValue={data?.salary} required minLength={3} />
                </div>
                <div>
                    <label>Avatar</label>
                    <input type="text" name="avatarUrl" defaultValue={data?.avatarUrl} required minLength={3} />
                </div>
                <div>
                    <button type="submit">Save</button>
                </div>
            </Form>
        </>
    )
}