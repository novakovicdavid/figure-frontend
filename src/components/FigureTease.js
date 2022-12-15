import {Button, Col} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'

export function FigureTease(props) {
    const {figures, style} = props;
    return (
        <>
            {
                figures.map((figure) =>
                    <Col key={figure.id} className={"p-0"} xs={12} sm={3} md={2} style={{objectFit: "cover", ...style}}>
                        <img src={figure.url} style={{width: "100%", height: "100%", objectFit: "cover", aspectRatio: figure.data().sizex + " / " + figure.data().sizey}}/>
                    </Col>
                )
            }
            <div className={"d-flex justify-content-center align-items-end position-absolute bottom-0"} style={{height: "100%", backgroundImage: "linear-gradient(transparent, white 90%)"}}>
                <LinkContainer to={"/register"}>
                    <Button className={"mb-5"}>Join Figure</Button>
                </LinkContainer>
            </div>
        </>
    )
}