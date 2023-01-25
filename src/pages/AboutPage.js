import "./AboutPage.css"
import {useEffect, useState} from "react";
import Typewriter from 'typewriter-effect';

function setCursorClass(cursorClass) {
    const cursor = document.getElementsByClassName("cursor").item(0);
    cursor.classList.forEach((entry) => {
        if (entry !== "cursor" && entry !== "cursor-animated") cursor.classList.remove(entry)
    });
    cursor.classList.add(cursorClass);
    cursor.classList.add('cursor-' + cursorClass);
}

function toggleCursorAnimated() {
    const cursor = document.getElementsByClassName("cursor").item(0);
    cursor.classList.toggle("cursor-animated");
}

export function AboutPage() {
    let [className, setClassName] = useState("light");
    useEffect(() => {
        setClassName("");
    }, []);

    const skip = localStorage.getItem("about-page-seen-before");
    // const skip = false;

    return (
        <div id={"about-page"} className={className} style={{padding: "0 1rem"}}>
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
                            toggleCursorAnimated()
                            typewriter.changeDelay(50)
                            typewriter
                                .pauseFor(1000)
                                .callFunction(() => toggleCursorAnimated())
                                .pasteString()
                                .typeString('<h1 class="d-inline">The project: Twitt</h1>')
                                .deleteChars(5)
                                .typeString('<h1 class="d-inline">Figure</h1>')
                                .callFunction(() => toggleCursorAnimated())
                                .pauseFor(500)
                                .callFunction(() => setCursorClass("invisible"))
                                .pasteString('<br/>')
                                .callFunction(() => setCursorClass("h2"))
                                .pauseFor(300)
                                .pasteString('<br/>')
                                .pauseFor(100)
                                .pasteString('<br/>')
                                .pauseFor(1000)
                                .callFunction(() => toggleCursorAnimated())
                                .typeString('<h2 class="d-inline">Frontend:</h2>')
                                .callFunction(() => toggleCursorAnimated())
                                .callFunction(() => setCursorClass("invisible"))
                                .pasteString('<br/>')
                                .callFunction(() => setCursorClass("p"))
                                .pauseFor(500)
                                .changeDelay(1)
                                .callFunction(() => toggleCursorAnimated())
                                .typeString(
                                    '<p class="d-inline">' +
                                    'Language: <code>Javascript</code>' +
                                    '<br/>' +
                                    'Framework: <code>React JS</code>' +
                                    '<br/>' +
                                    'Styling: <code>react-router-bootstrap</code>' +
                                    '<br/>' +
                                    'Infinite Scroll: <s><code>react-infinite-scroll-component</code></s> ' +
                                    'Custom implementation using <code>react-intersection-observer</code>' +
                                    '</p>')
                                .callFunction(() => toggleCursorAnimated())
                                .pasteString('<br/><br/><br/>')
                                .callFunction(() => setCursorClass("h2"))
                                .pauseFor(500)
                                .changeDelay(50)
                                .callFunction(() => toggleCursorAnimated())
                                .typeString('<h2 class="d-inline">Backend:</h2>')
                                .callFunction(() => toggleCursorAnimated())
                                .callFunction(() => setCursorClass("invisible"))
                                .pasteString('<br/>')
                                .callFunction(() => setCursorClass("p"))
                                .pauseFor(500)
                                .changeDelay(1)
                                .callFunction(() => toggleCursorAnimated())
                                .typeString('<p class="d-inline">' +
                                    '<s>BaaS: <code>Firebase</code></s>' +
                                    '<br/>' +
                                    'Language: <code>Rust</code>' +
                                    '<br/>' +
                                    'Web framework: <code>Axum</code>' +
                                    '<br/>' +
                                    'Database: PostgresQL using <code>sqlx</code>' +
                                    '<br/>' +
                                    'Session Store: Redis using <code>redis</code>' +
                                    '<br/>' +
                                    'Media storage: Backblaze (s3) using <code>aws-sdk-s3</code>' +
                                    '<br/>' +
                                    'CDN: <code>bunny.net</code>' +
                                    '<br/>' +
                                    'Hosting: <code>render.com</code>' +
                                    '</p>')
                                .callFunction(() => toggleCursorAnimated())
                                .pasteString('<br/><br/><br/>')
                                .callFunction(() => setCursorClass("h2"))
                                .pauseFor(500)
                                .changeDelay(50)
                                .callFunction(() => toggleCursorAnimated())
                                .typeString('<h2 class="d-inline">Addendum:</h2>')
                                .callFunction(() => toggleCursorAnimated())
                                .callFunction(() => setCursorClass("invisible"))
                                .pasteString('<br/>')
                                .callFunction(() => setCursorClass("p"))
                                .pauseFor(500)
                                .changeDelay(1)
                                .callFunction(() => toggleCursorAnimated())
                                .typeString(
                                    '<p class="d-inline">' +
                                    'I first used a package to implement infinite scrolling, but ' +
                                    'it was rather buggy. An implementation ' +
                                    'using <code>react-intersection-observer</code> (observer api) ' +
                                    'turned out to be trivial to write.' +
                                    '<br/>' +
                                    '<br/>' +
                                    'Firebase was originally used as a BaaS, later I decided to write one ' +
                                    'myself in Rust. This was a very educational decision as I had to go deeper ' +
                                    'into how REST, HTTP protocol and cookies worked. ' +
                                    'Some simple integration tests have been written with the help of ' +
                                    'a Docker image based on Postgres, which is seeded with data from the production ' +
                                    'database. Tests are written in Rust, a Docker container with Postgres & data ' +
                                    'is spun up using a Bash script before testing.')
                                .callFunction(() => toggleCursorAnimated())
                                .callFunction(() => localStorage.setItem("about-page-seen-before", "true"))
                                .start();
                        }}
                    />
                }
                {
                    skip &&
                    <div>
                        <h1>The project: Figure</h1>
                        <br/><br/>
                        <h2>Frontend:</h2>
                        <p>
                            Language: <code>Javascript</code>
                            <br/>
                            Framework: <code>React JS</code>
                            <br/>
                            Styling: <code>react-router-bootstrap</code>
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
                            Database: PostgresQL using <code>sqlx</code>
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
                        <h2>Addendum</h2>
                        <p>
                            I first used a package to implement infinite scrolling, but
                            it was rather buggy. An implementation
                            using <code>react-intersection-observer</code> (observer api)
                            turned out to be trivial to write.
                            <br/>
                            <br/>
                            Firebase was originally used as a BaaS, later I decided to write one
                            myself in Rust. This was a very educational decision as I had to go deeper
                            into how REST, HTTP protocol and cookies worked.
                            Some simple integration tests have been written with the help of
                            a Docker image based on Postgres, which is seeded with data from the production
                            database. Tests are written in Rust, a Docker container with Postgres & data
                            is spun up using a Bash script before testing.
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
    )
}