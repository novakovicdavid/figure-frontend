import {useLoaderData} from "react-router-dom";
import {useEffect, useState} from "react";
import {Card} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'

export function FigurePage() {
    const {urlPromise, docPromise} = useLoaderData();
    const [imageURL, setImageURL] = useState("");
    const [figureData, setFigureData] = useState();
    useEffect(() => {
        urlPromise.then((imageUrl) => setImageURL(imageUrl));
        docPromise.then((doc) => {
            setFigureData(doc.data());
        })
    }, [urlPromise, docPromise])

    return (
        <div>
            {
                imageURL &&
                <Card></Card>
            }
            {
                figureData &&
                <Card>
                    <Card.Img variant={"top"} src={imageURL}/>
                    <Card.Body>
                        <Card.Title>{figureData.title}</Card.Title>
                        <Card.Text>{figureData.description}</Card.Text>
                        {"By "}
                        <LinkContainer to={'/profile/' + figureData.user}>
                            <Card.Link>{figureData.user}</Card.Link>
                        </LinkContainer>
                    </Card.Body>
                </Card>
            }
        </div>
    )
}