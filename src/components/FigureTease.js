import {Button, Col} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'

export function FigureTease(props) {
    const {figures, profile} = props;
    return (
        <>
            {
                figures.map((figure) =>
                    <Col key={figure.id} className={"p-0"} xs={12} sm={3} md={2} style={{objectFit: "cover"}}>
                        <img src={figure.url} style={{width: "100%", height: "100%", objectFit: "cover", aspectRatio: figure.width + " / " + figure.height}}/>
                    </Col>
                )
            }
            <div className={"d-flex justify-content-center align-items-end position-absolute bottom-0"} style={{height: "20em", backgroundImage: "linear-gradient(transparent, white 90%)"}}>
                <LinkContainer to={!profile ? "/register" : `/profile/${profile.id}`}>
                    <Button className={"mb-5"}>Join Figure</Button>
                </LinkContainer>
            </div>
        </>
    )
}