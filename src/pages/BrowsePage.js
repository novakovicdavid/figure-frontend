import {useLoaderData, useParams} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {Figures} from "../components/Figures";
import {Awaited} from "../components/Awaited";
import '../styling/no-scroll.css'
import {Spinner} from "react-bootstrap";
import {backend} from "../services/backend";
import {useInView} from "react-intersection-observer";

function getNextFiguresAndAppend(figures, setFigures, setReachedEnd, lastFigureId, profile, setFetching) {
    let promise;
    if (profile) promise = backend.get_figures_after_id(lastFigureId, profile.id);
    else promise = backend.get_figures_after_id(lastFigureId);
    promise.then((newFigures) => {
        if (newFigures.error) return;
        setFigures([...figures, ...newFigures.figures]);
        setFetching(false);
        if (newFigures.figures.length < 3) setReachedEnd(true);
    })
}

export function BrowsePage() {
    const profile_id = useParams().id;
    const {data, profileData} = useLoaderData();
    const [figures, setFigures] = useState([]);
    const [profile, setProfile] = useState();
    const [fetching, setFetching] = useState(false);
    const [reachedEnd, setReachedEnd] = useState(false);
    const [infinityStyle, setInfinityStyle] = useState({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: 0,
        transition: "opacity 0.5s"
    });

    const {ref, inView} = useInView({
        threshold: 0.2,
    });

    useEffect(() => {
        if (!profile_id && profile) setProfile(undefined);
    }, [profile, profile_id]);

    useEffect(() => {
        if (figures.length === 0 && !profile) {
            Promise.all([data, profileData])
                .then(([data, profileData]) => {
                    if (data.figures) {
                        setFigures(data.figures);
                        if (data.figures.length > 0) requestAnimationFrame(() => {
                            setInfinityStyle({
                                ...infinityStyle,
                                opacity: 1
                            });
                        });
                    }
                    if (profileData && profileData.profile) setProfile(profileData.profile);
                })
        }
    }, [data, figures.length, profile, profileData]);

    useEffect(() => {
        if (inView && !fetching && !reachedEnd) {
            setFetching(true);
            getNextFiguresAndAppend(figures, setFigures, setReachedEnd, figures[figures.length - 1].id, profile, setFetching);
        }
    }, [inView]);

    const waitFor = useMemo(() => {
        let promises = [data];
        if (profileData) promises.push(profileData);
        return promises;
    }, [data, profileData]);

    console.log(fetching);

    return (
        <div id={"scroller"} className={"overflow-scroll"}
             style={{display: "grid", justifySelf: "center", width: "100vw"}}>
            {
                profile &&
                <div className={"sticky-top"} style={{
                    display: "grid",
                    placeItems: "center",
                    gridRow: "1 / 2",
                    gridColumn: "1 / 2",
                    height: "2em",
                    backdropFilter: "blur(10px)"
                }}>{profile.username}</div>
            }
            <Awaited awaiting={waitFor} style={{placeSelf: "center", gridRow: "1 / -1", gridColumn: "1 / 2"}}>
                <div style={infinityStyle}>
                    <div style={{width: "100%", maxWidth: "720px"}}>
                        <Figures figures={figures} isProfilePage={!!profile_id} refLastFigure={ref}/>
                    </div>
                    {
                        fetching &&
                        <Spinner animation={"border"}/>
                    }
                    {
                        reachedEnd &&
                        <p>The end.</p>
                    }
                </div>
            </Awaited>
        </div>
    )
}