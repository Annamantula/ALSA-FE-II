import React from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Home(props) {
    const nav = useNavigate();
    const [setCategory] = [props.setCategory];

    return (
        <div className="background:">
            <h1 >
                <div className="slogan"> WELCOME TO ALSA</div>
                <div className="H">YOUR FAVORITE GROCERIES</div>
            </h1>
        </div>
    )
}

