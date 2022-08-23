import React, { useState, useEffect } from "react"
import { getCustomers } from "../api/customerIndex";

function Users(props) {
    const [token] = [props.token];
    const [customers, setCustomers] = useState([]);

    async function setCustomers() {
        gottenCustomers = await getCustomers(token);
        if(gottenCustomers){
            await setCustomers(gottenCustomers);
        }
    }


    useEffect(() => {
        setCustomers();
    },[])
    
    return (
        <div>
            <h1>Users</h1>
            {customers.map((customer) => {
                return(
                    <div key={customer.id}>
                        <h2>Customer</h2>
                        <h5>Name:</h5>
                        <p>{customer.last_name},{customer.first_name}</p>
                        <h5>Email:</h5>
                        <p>{customer.email}</p>
                    </div>

                )
            })}
        </div>
    )
}
<Route path="/users" element={<Users />} />
export { default as Users } from "./Users";

export default Users;