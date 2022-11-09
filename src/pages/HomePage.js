import {Button, Col, Container, Image, Row} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {useLoaderData} from "react-router-dom";
import {useEffect, useState} from "react";
import {FigureTease} from "../components/FigureTease";
import AOS from 'aos';
import 'aos/dist/aos.css';

export function HomePage() {
    const {totalFiguresPromise, totalUsersPromise, latestFiguresPromise} = useLoaderData();
    const [totalFigures, setTotalFigures] = useState("...");
    const [totalUsers, setTotalUsers] = useState("...")
    const [latestFigures, setLatestFigures] = useState();
    useEffect(() => {
        AOS.init();
        totalFiguresPromise.then((total) => {
            setTotalFigures(total);
        });
        totalUsersPromise.then((total) => {
            setTotalUsers(total);
        });
        latestFiguresPromise.then((urls) => {
            setLatestFigures(urls);
        })
    }, [])

    return (
        <Container fluid>
            <Row className={"text-bg-light p-4 pt-5 p-sm-5"}
                 style={{display: "flex", flexDirection: "column", placeItems: "center"}}>
                <Col className={"p-0 pt-5"} style={{maxWidth: "70em"}} data-aos={"fade-up"}>
                    <Row>
                        <Col md={8} lg={8} xxl={8}>
                            <Row>
                                <h1 className={"display-6"} style={{fontSize: "4em"}}><b>The platform for creative
                                    minds.</b></h1>
                                <p className={"display-1 mt-0"} style={{fontSize: "1.5em"}}>Upload to your
                                    hearts content. No limits, forever(*).</p>
                            </Row>
                            <Row className={"mt-3"}>
                                <Col className={"align-items-stretch d-flex"}>
                                    <LinkContainer to={"/register"}>
                                        <Button className={"flex-grow-1 flex-sm-grow-0"}>Join Figure</Button>
                                    </LinkContainer>
                                </Col>
                            </Row>
                            <Row xs={"auto"} sm={"auto"} md={"auto"}
                                 className={"mt-5 pb-5 d-flex justify-content-center justify-content-sm-start"}>
                                <Col>
                                    <h4>{totalFigures}</h4>
                                    <p>Figures</p>
                                </Col>
                                <Col>
                                    <h4>{totalUsers}</h4>
                                    <p>Users</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={4} lg={4} xxl={4} style={{display: "flex", alignItems: "center"}}>
                            <div style={{maxWidth: "100%"}}>
                                <Image fluid src={"https://i.imgur.com/E2tqE3F.png"}
                                       style={{minHeight: "18.75em", minWidth: "18.75em"}}/>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <div className={"p-4 p-sm-5"} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                {
                    latestFigures &&
                    <div className={"p-0"} style={{maxWidth: "70em", width: "100%"}} data-aos={"fade-up"}>
                        <h2 className={"p-0"}>Latest Figures</h2>
                        <FigureTease figures={latestFigures}/>
                    </div>
                }

            </div>
            <small>(*) Until I take it down, probably friday evening.</small>
            {/*Inspired by https://saaslandingpage.com/templates/creative/*/}
        </Container>
    )
}
