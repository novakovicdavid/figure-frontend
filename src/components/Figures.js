import {Card, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

function Figure(props) {
    const {id, url, title, width, height, user} = props;
    return (
        <Row>
            <Col>
                <Card className={"mb-4"}>
                    <Link to={'/figure/' + id}>
                        <Card.Img variant={"top"} src={url} style={{aspectRatio: width + ' / ' + height}}/>
                        <Card.Header as={"h5"}>{title}</Card.Header>
                    </Link>
                    <p className={"ms-3 mt-1 mb-1"}>{user}</p>

                </Card>
            </Col>
        </Row>
    )
}

export function Figures(props) {
    const {figures} = props;
    console.log(figures);
    return (
        <Container>
            {
                figures.map((figure) =>
                    <Figure id={figure.id} url={figure.url} title={figure.data().title} width={figure.data().sizex}
                            height={figure.data().sizey} user={figure.data().user} key={figure.id}/>
                )
            }
        </Container>
    )
}