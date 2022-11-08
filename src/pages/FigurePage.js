import {useLoaderData} from "react-router-dom";
import {useEffect, useState} from "react";
import {Card} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {Awaited} from "../components/Awaited";

export function FigurePage() {
    const {urlPromise, docPromise} = useLoaderData();
    const [imageURL, setImageURL] = useState("");
    const [figureData, setFigureData] = useState();
    const [style, setStyle] = useState({display: "grid"})
    useEffect(() => {
        urlPromise.then((imageUrl) => {
            setImageURL(imageUrl);
            setStyle({});
        });
        docPromise.then((doc) => {
            setFigureData(doc.data());
            setStyle({});
        });
    }, [urlPromise, docPromise])

    return (
        <div style={style}>
                <Card style={style}>
                    <Awaited awaiting={urlPromise} style={{placeSelf: "center", gridRow: "1"}}>
                        {
                            imageURL &&
                            <Card.Img variant={"top"} src={imageURL}/>
                        }
                    </Awaited>
                    <Awaited awaiting={docPromise} style={{placeSelf: "center", gridRow: "2"}}>
                        {
                            figureData &&
                            <Card.Body>
                                <Card.Title>{figureData.title}</Card.Title>
                                <Card.Text>{figureData.description}</Card.Text>
                                {"By "}
                                <LinkContainer to={'/profile/' + figureData.user}>
                                    <Card.Link>{figureData.user}</Card.Link>
                                </LinkContainer>
                            </Card.Body>
                        }
                    </Awaited>
                </Card>
        </div>
    )
}