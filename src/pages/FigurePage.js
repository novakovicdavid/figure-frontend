import {Link, useLoaderData} from "react-router-dom";
import {useEffect, useState} from "react";

export function FigurePage() {
    const [imageUrlPromiseFromLoader, figureDocPromiseFromLoader] = useLoaderData();
    const [imageURL, setImageURL] = useState("");
    const [figureData, setFigureData] = useState();
    useEffect(() => {
        async function fetchURL() {
            setImageURL(await imageUrlPromiseFromLoader);
        }

        async function fetchFigureMetadata() {
            figureDocPromiseFromLoader.then((doc) => {
                setFigureData(doc.data());
            })
        }

        Promise.all([fetchURL(), fetchFigureMetadata()]);
    }, [])

    console.log(figureData);
    return (
        <>
            {
                imageURL &&
                <img src={imageURL}/>
            }
            {
                figureData &&
                <div>
                    <p>{figureData.title}</p>
                    <p>{figureData.description}</p>
                    <Link to={'/profile/' + figureData.user}>{figureData.user}</Link>
                </div>
            }
        </>
    )
}