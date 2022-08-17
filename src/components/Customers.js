import React, { useEffect, useState } from "react";
import { getCustomers } from "../api/customerIndex";

function Customers() {
    const [customers, setCustomers] = useState([]);
    useEffect(async () => {
        result = await getCustomers(localStorage.getItem("token"));
        setCustomers(result);
    }, [])
    return(
        <div>
            {customers.map((customer) => {
                console.log(customer);
            })}
        </div>
    )
}