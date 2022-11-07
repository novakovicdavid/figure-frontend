import {Card, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

function Figure(props) {
    const {id, url, title, width, height} = props;
    return (
        <Row>
            <Col>
                <Link to={'/figure/' + id}>
                    <Card className={"mb-4"}>
                        <Card.Img variant={"top"} src={url} style={{aspectRatio: width + ' / ' + height}}/>
                        <Card.Header as={"h5"}>{title}</Card.Header>
                    </Card>
                </Link>
            </Col>
        </Row>
    )
}

export function Figures(props) {
    const {figures} = props;
    return (
        <Container>
            {
                figures.map((figure) =>
                    <Figure id={figure.id} url={figure.url} title={figure.data().title} width={figure.data().sizex}
                            height={figure.data().sizey} key={figure.id}/>
                )
            }
        </Container>
    )
}