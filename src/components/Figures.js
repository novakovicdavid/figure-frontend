import {Card, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

function Figure(props) {
    const {id, url, title, width, height, user, isProfilePage, refLastFigure} = props;
    return (
        <Row ref={refLastFigure}>
            <Col>
                <Card className={"mb-4"}>
                    <Link to={'/figure/' + id}>
                        <Card.Img variant={"top"} src={url} style={{aspectRatio: width + ' / ' + height}}/>
                        <Card.Header as={"h5"}>{title}</Card.Header>
                    </Link>
                    {
                        !isProfilePage &&
                        <p className={"ms-3 mt-1 mb-1"}>{user}</p>
                    }
                </Card>
            </Col>
        </Row>
    )
}

export function Figures(props) {
    const {figures, isProfilePage, refLastFigure} = props;
    return (
        <Container>
            {
                figures.map((figure, index) =>
                    <Figure id={figure.id} url={figure.url} title={figure.title} width={figure.width}
                            height={figure.height} user={figure.profile.username}
                            isProfilePage={isProfilePage} key={figure.id}
                            refLastFigure={(index === figures.length - 1) ? refLastFigure : undefined}/>
                )
            }
        </Container>
    )
}