import React, { useState }  from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const email = localStorage.getItem("email")
    return(
    <div>
    <h3 className="wlcm">{email}'s Profile</h3>
    </div>
)

}
