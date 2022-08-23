import React, { useState, useEffect } from "react"
import { getCustomers } from "../api/customerIndex";

function Users(props) {
    const [token] = useState(localStorage.getItem("token") ? localStorage.getItem("token"):"");
    const [customers, setCustomers] = useState([]);

    async function setLocalCustomers() {
        const gottenCustomers = await getCustomers(token);
        if(gottenCustomers){
            await setCustomers(gottenCustomers);
        }
    }


    useEffect(() => {
        setLocalCustomers();
    },[])
    
    return (
        <div>
            <h1>Users</h1>
            {(customers[0] ? customers.map((customer) => {
                return(
                    <div key={customer.id}>
                        <h2>Customer</h2>
                        <h5>Name:</h5>
                        <p>{customer.last_name},{customer.first_name}</p>
                        <h5>Email:</h5>
                        <p>{customer.email}</p>
                    </div>

                )
            }): <div>
                <h2>You must be an administrator to access this page.</h2>
                </div>)}
        </div>
    )
}

export default Users;