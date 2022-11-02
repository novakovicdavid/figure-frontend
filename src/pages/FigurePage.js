import {useLoaderData} from "react-router-dom";
import {useEffect, useState} from "react";

export function FigurePage() {
    const urlPromiseFromLoader = useLoaderData();
    const [imageURL, setImageURL] = useState("");
    useEffect(() => {
        async function fetchURL() {
            setImageURL(await urlPromiseFromLoader);
        }
        fetchURL();
    })
    return (
        <img src={imageURL}/>
    )
}