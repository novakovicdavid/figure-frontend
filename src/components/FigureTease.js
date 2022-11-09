import {Button, Col, Row} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'

export function FigureTease(props) {
    const {figures} = props;
    return (
        <Row className={"gap-4 justify-content-center position-relative"}>
            {
                figures.map((figure) =>
                    <Col className={"p-0"} xs={12} sm={3} md={2} style={{objectFit: "cover"}}>
                        <img src={figure.url} style={{width: "100%", height: "100%", objectFit: "cover", aspectRatio: figure.data().sizex + " / " + figure.data().sizey}}/>
                    </Col>
                )
            }
            <div className={"d-flex justify-content-center align-items-end position-absolute bottom-0"} style={{height: "500px", backgroundImage: "linear-gradient(transparent, white)"}}>
                <LinkContainer to={"/register"}>
                    <Button className={"mb-5"}>Join Figure</Button>
                </LinkContainer>
            </div>
        </Row>
    )
}