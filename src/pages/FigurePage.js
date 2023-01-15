import {useLoaderData} from "react-router-dom";
import {useEffect, useState} from "react";
import {Card} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {Awaited} from "../components/Awaited";

export function FigurePage() {
    const {data} = useLoaderData();
    const [figure, setFigure] = useState();
    const [style, setStyle] = useState({display: "grid"})
    const [imageStyle, setImageStyle] = useState({})
    useEffect(() => {
        data.then(result => {
            if (result.figure) {
                setFigure(result.figure);
                setStyle({});
                setImageStyle({aspectRatio: result.figure.width + ' / ' + result.figure.height});
            }
        })
    }, [data]);

    return (
        <div style={style}>
                <Card style={style}>
                    <Awaited awaiting={data} style={{placeSelf: "center"}}>
                        {
                            figure &&
                            <>
                                <Card.Img variant={"top"} src={figure.url} style={imageStyle}/>
                                <Card.Body>
                                    <Card.Title>{figure.title}</Card.Title>
                                    <Card.Text>{figure.description}</Card.Text>
                                    {"By "}
                                    <LinkContainer to={'/profile/' + figure.profile.id}>
                                        <Card.Link>{figure.profile.username}</Card.Link>
                                    </LinkContainer>
                                </Card.Body>
                            </>
                        }
                    </Awaited>
                </Card>
        </div>
    )
}