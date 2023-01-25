import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export function Footer() {
    const [className, setClassName] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        if (window.location.pathname === "/about") setClassName("about-darken");
        else setClassName("");
    }, [navigate]);
    return(
        <div className={className} style={{display: "grid", placeItems: "center"}}>
            <small>Copyright © David Blablabla</small>
        </div>
    )
}