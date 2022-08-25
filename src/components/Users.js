import React, { useState, useEffect } from "react"
import { getCustomers } from "../api/customerIndex";

function Users(props) {
    const [token] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "");
    const [customers, setCustomers] = useState([]);

    async function setLocalCustomers() {
        const gottenCustomers = await getCustomers(token);
        if (gottenCustomers) {
            await setCustomers(gottenCustomers);
        }
    }

    useEffect(() => {
        setLocalCustomers();
    }, [])

    return (
        <div>
            <h1>Users</h1>
            {(customers[0] ? customers.map((customer) => {
                return (
                    <div className="prdct" key={customer.id}>
                        <h2 id="ttl">Customer</h2>
                        <h5 id="ttl">Name:</h5>
                        <p id="p1">{customer.last_name},{customer.first_name}</p>
                        <h5 id="ttl">Email:</h5>
                        <p id="p1">{customer.email}</p>
                    </div>
                )
            }) : <div>
                <h2>You must be an administrator to access this page.</h2>
            </div>)}
        </div>
    )
}

export default Users;