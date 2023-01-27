import "./AboutPage.css"
import {useEffect, useState} from "react";
import Typewriter from 'typewriter-effect';
import {Button} from "react-bootstrap";

function setCursorClass(cursorClass) {
    const cursor = document.getElementsByClassName("cursor").item(0);
    [...cursor.classList].forEach((entry) => {
        if (entry !== "cursor" && entry !== "cursor-animated") cursor.classList.remove(entry)
    });
    cursor.classList.add(cursorClass);
    cursor.classList.add('cursor-' + cursorClass);
}

function setCursorAnimated(animated) {
    const cursor = document.getElementsByClassName("cursor").item(0);
    cursor.classList.toggle("cursor-animated", animated);
}

function setVisitedBefore() {
    localStorage.setItem("about-page-seen-before", "true")
}

export function AboutPage() {
    let [className, setClassName] = useState("light");
    useEffect(() => {
        setClassName("");
    }, []);

    const [skip, setSkip] = useState(localStorage.getItem("about-page-seen-before"));
    const [hideSkipButton, setHideSkipButton] = useState(skip);

    return (
        <div id={"about-page"} className={className} style={{display: "flex", flexDirection: "column", padding: "0 1rem"}}>
            <div style={{height: "100%"}}>
                <div style={{maxWidth: "45rem", marginLeft: "auto", marginRight: "auto", marginTop: "4rem"}}>
                    {
                        !skip &&
                        <Typewriter
                            options={{
                                cursor: "█",
                                cursorClassName: "cursor"
                            }}
                            onInit={(typewriter) => {
                                setCursorClass("h1")
                                setCursorAnimated(true)
                                typewriter.changeDelay(50)
                                typewriter
                                    .pauseFor(1000)
                                    .callFunction(() => setCursorAnimated(false))
                                    .typeString('<h1 class="d-inline">The project: Twitt</h1>')
                                    .deleteChars(5)
                                    .typeString('<h1 class="d-inline">Figure</h1>')
                                    .callFunction(() => setCursorAnimated(true))
                                    .pauseFor(500)
                                    .callFunction(() => setCursorClass("invisible"))
                                    .pasteString('<br/>')
                                    .callFunction(() => setCursorClass("h2"))
                                    .pauseFor(300)
                                    .pasteString('<br/>')
                                    .pauseFor(100)
                                    .pasteString('<br/>')
                                    .pauseFor(1000)
                                    .callFunction(() => setCursorAnimated(false))
                                    .typeString('<h2 class="d-inline">Frontend:</h2>')
                                    .callFunction(() => setCursorAnimated(true))
                                    .callFunction(() => setCursorClass("invisible"))
                                    .pasteString('<br/>')
                                    .callFunction(() => setCursorClass("p"))
                                    .pauseFor(500)
                                    .changeDelay(1)
                                    .callFunction(() => setCursorAnimated(false))
                                    .typeString(
                                        '<p class="d-inline">' +
                                        'Language: <code>Javascript</code>' +
                                        '<br/>' +
                                        'Framework: <code>React JS</code>' +
                                        '<br/>' +
                                        'Styling: <code>react-bootstrap</code>' +
                                        '<br/>' +
                                        'Infinite Scroll: <s><code>react-infinite-scroll-component</code></s> ' +
                                        'Custom implementation using <code>react-intersection-observer</code>' +
                                        '</p>')
                                    .callFunction(() => setCursorClass("invisible"))
                                    .pasteString('<br/><br/><br/>')

                                    .callFunction(() => setCursorAnimated(true))
                                    .callFunction(() => setCursorClass("h2"))
                                    .pauseFor(500)
                                    .changeDelay(50)
                                    .callFunction(() => setCursorAnimated(false))
                                    .typeString('<h2 class="d-inline">Backend:</h2>')
                                    .callFunction(() => setCursorAnimated(true))
                                    .callFunction(() => setCursorClass("invisible"))
                                    .pasteString('<br/>')
                                    .callFunction(() => setCursorClass("p"))
                                    .pauseFor(500)
                                    .changeDelay(1)
                                    .callFunction(() => setCursorAnimated(false))
                                    .typeString('<p class="d-inline">' +
                                        '<s>BaaS: <code>Firebase</code></s>' +
                                        '<br/>' +
                                        'Language: <code>Rust</code>' +
                                        '<br/>' +
                                        'Web framework: <code>Axum</code>' +
                                        '<br/>' +
                                        'Database: PostgreSQL using <code>sqlx</code>' +
                                        '<br/>' +
                                        'Session Store: Redis using <code>redis</code>' +
                                        '<br/>' +
                                        'Media storage: Backblaze (s3) using <code>aws-sdk-s3</code>' +
                                        '<br/>' +
                                        'CDN: <code>bunny.net</code>' +
                                        '<br/>' +
                                        'Hosting: <code>render.com</code>' +
                                        '</p>')
                                    .callFunction(() => setCursorClass("invisible"))
                                    .pasteString('<br/><br/><br/>')

                                    .callFunction(() => setCursorAnimated(true))
                                    .callFunction(() => setCursorClass("h2"))
                                    .pauseFor(500)
                                    .changeDelay(50)
                                    .callFunction(() => setCursorAnimated(false))
                                    .typeString('<h2 class="d-inline">Source code:</h2>')
                                    .callFunction(() => setCursorAnimated(true))
                                    .callFunction(() => setCursorClass("invisible"))
                                    .pasteString('<br/>')
                                    .callFunction(() => setCursorClass("p"))
                                    .pauseFor(500)
                                    .changeDelay(1)
                                    .callFunction(() => setCursorAnimated(false))
                                    .typeString(
                                        '<p class="d-inline">' +
                                        'Frontend: <a href={"https://github.com/novakovicdavid/figure-frontend"}>https://github.com/novakovicdavid/figure-frontend</a>' +
                                        '<br/>' +
                                        'Backend: <a href={"https://github.com/novakovicdavid/figure-backend"}>https://github.com/novakovicdavid/figure-frontend</a>' +
                                        '</p>')
                                    .callFunction(() => setCursorClass("invisible"))
                                    .pasteString('<br/><br/><br/>')

                                    .callFunction(() => setCursorAnimated(true))
                                    .callFunction(() => setCursorClass("h2"))
                                    .pauseFor(500)
                                    .changeDelay(50)
                                    .callFunction(() => setCursorAnimated(false))
                                    .typeString('<h2 class="d-inline">Addendum:</h2>')
                                    .callFunction(() => setCursorAnimated(true))
                                    .callFunction(() => setCursorClass("invisible"))
                                    .pasteString('<br/>')
                                    .callFunction(() => setCursorClass("p"))
                                    .pauseFor(500)
                                    .changeDelay(1)
                                    .callFunction(() => setCursorAnimated(false))
                                    .typeString(
                                        '<p class="d-inline">' +
                                        'Firebase was originally used as a BaaS, later I decided to write one ' +
                                        'myself in Rust. This was a very educational decision as I had to go deeper ' +
                                        'into how REST, HTTP protocol and cookies worked.' +
                                        '<br/>' +
                                        '<br/>' +
                                        'The reason I chose Rust is because I wanted to practice writing more Rust. I have ' +
                                        'some other projects with Rust in it but none of this size. I also believe Rust will ' +
                                        'take over backend programming in the future: it has the speed/efficiency of a compiled language ' +
                                        'like C++ and guarantees more safety than a language like Java. ' +
                                        '<br/>' +
                                        '<br/>' +
                                        'Some simple integration tests have been written with the help of ' +
                                        'a Docker image based on Postgres, which is seeded with data from the production ' +
                                        'database. Tests are written in Rust, a Docker container with Postgres & data ' +
                                        'is spun up using a Bash script before testing.' +
                                        '<br/>' +
                                        '<br/>' +
                                        'The frontend & backend is continuously deployed on Render.com: Render will automatically ' +
                                        'deploy new commits in the deploy branch in the backend repo, and the main branch in the ' +
                                        'frontend repo.' +
                                        '<br/>' +
                                        '<br/>' +
                                        'Bunny.net is used to cache and distribute images (Figures, profile pictures, banners...). ' +
                                        'Backblaze S3 is used to store said content.' +
                                        '</p>')
                                    .callFunction(() => setCursorAnimated(true))
                                    .callFunction(() => setHideSkipButton(true))
                                    .callFunction(() => setVisitedBefore())
                                    .start();
                            }}
                        />
                    }
                    {
                        skip &&
                        <div id={"about-page-skipped-text"}>
                            <h1>The project: Figure</h1>
                            <br/><br/>
                            <h2>Frontend:</h2>
                            <p>
                                Language: <code>Javascript</code>
                                <br/>
                                Framework: <code>React JS</code>
                                <br/>
                                Styling: <code>react-bootstrap</code>
                                <br/>
                                Infinite Scroll: <s><code>react-infinite-scroll-component</code></s> {" "}
                                Custom implementation using <code>react-intersection-observer</code>
                            </p>
                            <br/>
                            <h2>Backend:</h2>
                            <p >
                                <s style={{fontFamily: "Noto Sans Regular"}}>BaaS: <code>Firebase</code></s>
                                <br/>
                                Language: <code>Rust</code>
                                <br/>
                                Web framework: <code>Axum</code>
                                <br/>
                                Database: PostgreSQL using <code>sqlx</code>
                                <br/>
                                Session Store: Redis using <code>redis</code>
                                <br/>
                                Media storage: Backblaze (s3) using <code>aws-sdk-s3</code>
                                <br/>
                                CDN: <code>bunny.net</code>
                                <br/>
                                Hosting: <code>render.com</code>
                            </p>
                            <br/>
                            <h2>Source code:</h2>
                            <p>
                                Frontend: <a href={"https://github.com/novakovicdavid/figure-frontend"}>https://github.com/novakovicdavid/figure-frontend</a>
                                <br/>
                                Backend: <a href={"https://github.com/novakovicdavid/figure-backend"}>https://github.com/novakovicdavid/figure-frontend</a>
                            </p>
                            <br/>
                            <h2>Addendum:</h2>
                            <p>
                                Firebase was originally used as a BaaS, later I decided to write one
                                myself in Rust. This was a very educational decision as I had to go deeper
                                into how REST, HTTP protocol and cookies worked.
                                <br/>
                                <br/>
                                The reason I chose Rust is because I wanted to practice writing more Rust. I have
                                some other projects with Rust in it but none of this size. I also believe Rust will
                                take over backend programming in the future: it has the speed/efficiency of a compiled language
                                like C++ and guarantees more safety than a language like Java.
                                <br/>
                                <br/>
                                Some simple integration tests have been written with the help of
                                a Docker image based on Postgres, which is seeded with data from the production
                                database. Tests are written in Rust, a Docker container with Postgres & data
                                is spun up using a Bash script before testing.
                                <br/>
                                <br/>
                                The frontend & backend is continuously deployed on Render.com: Render will automatically
                                deploy new commits in the deploy branch in the backend repo, and the main branch in the
                                frontend repo.
                                <br/>
                                <br/>
                                Bunny.net is used to cache and distribute images (Figures, profile pictures, banners...).
                                Backblaze S3 is used to store said content.
                                <span id={"skipped-typewriter"}><Typewriter
                                    options={{
                                        cursor: "█",
                                        cursorClassName: "cursor-animated"
                                    }}
                                /></span>
                            </p>

                        </div>
                    }
                </div>
            </div>
            {
                !hideSkipButton &&
                <Button id={"about-skip-button"} className={"about-darken " + className} style={{position: "sticky", bottom: ".5rem", right: ".5rem", alignSelf: "end"}}
                        onClick={() => {
                            setVisitedBefore();
                            setSkip(true);
                            setHideSkipButton(true);
                        }
                        }>
                    Skip >
                </Button>
            }
        </div>
    )
}