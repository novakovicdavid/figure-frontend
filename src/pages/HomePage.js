import {Button, Col, Container, Image, Row} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {useLoaderData} from "react-router-dom";
import {useEffect, useLayoutEffect, useState} from "react";
import {FigureTease} from "../components/FigureTease";
import {useInView} from "react-intersection-observer";
import {useAuthContext} from "../contexts/authContext";

export function HomePage() {
    const {profile} = useAuthContext();
    const {totalFiguresCountPromise, totalProfilesCountPromise, latestFiguresPromise} = useLoaderData();
    const [totalFigures, setTotalFigures] = useState("...");
    const [totalUsers, setTotalUsers] = useState("...")
    const [latestFigures, setLatestFigures] = useState();
    useEffect(() => {
        totalProfilesCountPromise.then((total) => {
            if (!total.error) setTotalUsers(total)
        });
        totalFiguresCountPromise.then((total) => {
            if (!total.error) setTotalFigures(total)
        });
        latestFiguresPromise.then((figures) => {
            if (!figures.error) setLatestFigures(figures.figures);
        });
    }, [latestFiguresPromise, totalFiguresCountPromise, totalProfilesCountPromise]);

    // Fade in Landing part
    const [landingStyle, setLandingStyle] = useState({visibility: 'hidden', opacity: 0});
    useEffect(() => {
        setLandingStyle({visibility: 'visible', opacity: 1, transform: 'translate(0, 0)'})
    }, []);

    // Fade in Figure teaser
    const [teaserStyle, setTeaserStyle] = useState({visibility: 'hidden', opacity: 0});
    const {ref, inView} = useInView({
        threshold: 1,
    });
    useLayoutEffect(() => {
        if (teaserStyle.opacity === 0 && inView)
            requestAnimationFrame(() =>
                setTeaserStyle({visibility: 'visible', opacity: 1, transform: 'translate(0, 0)'}));
    }, [inView]);


    return (
        <Container fluid>
            <Row className={"text-bg-light p-4 pt-5 p-sm-5"}
                 style={{display: "flex", flexDirection: "column", placeItems: "center", position: "relative"}}>
                <Col className={"p-0 pt-0 pt-sm-5"}
                     style={{
                         maxWidth: "70em",
                         transition: 'visibility 0.2s linear, opacity 0.2s linear, transform 0.4s ease',
                         transform: 'translate(0, 5em)',
                         ...landingStyle
                     }}>
                    <Row>
                        <Col md={8} lg={8} xxl={8}>
                            <Row>
                                <h1 className={"display-6"} style={{fontSize: "4em"}}><b>The platform for creative
                                    minds.</b></h1>
                                <p className={"display-1 mt-0"} style={{fontSize: "1.5em"}}>Upload to your
                                    heart's content. No limits, forever(*).</p>
                            </Row>
                            <Row className={"mt-3"}>
                                <Col className={"align-items-stretch d-flex"}>
                                    <LinkContainer to={!profile ? "/register" : `/profile/${profile.id}`}>
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
                                <Image fluid src={"https://i.imgur.com/E2tqE3F.png"}/>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className={"p-4 p-sm-5"}
                 style={{position: 'relative', display: "flex", flexDirection: "column", alignItems: "center"}}>
                {/* Fade in trigger */}
                {
                    latestFigures && teaserStyle.opacity === 0 &&
                    <div ref={ref} style={{position: 'absolute', minHeight: '10em'}}/>
                }
                {
                    !latestFigures &&
                    <div style={{height: "47.375em"}}/>
                }
                {
                    latestFigures &&
                    <Row className={"p-0 gap-4 justify-content-center position-relative"}
                         style={{
                             maxWidth: "70em",
                             width: "100%",
                             transition: 'visibility 0.2s linear, opacity 0.2s linear, transform 0.4s ease',
                             transform: 'translate(0, 5em)',
                             ...teaserStyle
                         }}>
                        <h2 className={"p-0 mb-4 mt-4"}>Latest Figures</h2>
                        <FigureTease figures={latestFigures} profile={profile}/>
                    </Row>
                }
            </Row>
            <small>(*) Until I take it down, probably friday evening.</small>
            {/*Inspired by https://saaslandingpage.com/templates/creative/*/}
        </Container>
    )
}
