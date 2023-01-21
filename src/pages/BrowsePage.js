import {useLoaderData, useParams} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {Figures} from "../components/Figures";
import {Awaited} from "../components/Awaited";
import '../styling/no-scroll.css'
import {Spinner} from "react-bootstrap";
import {backend} from "../services/backend";
import {useInView} from "react-intersection-observer";
import {ProfileHeader} from "../components/ProfileHeader";

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
    const profile_id = parseInt(useParams().id);
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
        transition: "opacity 0.3s"
    });

    const {ref, inView} = useInView({
        threshold: 0,
    });

    useEffect(() => {
        // Clear state when going from one profile to another
        if (profile && (profile.id !== profile_id)) {
            setProfile(undefined);
            setFigures([]);
            setFetching(false);
            setReachedEnd(false);
        }

        // Seed page with data
        else if (figures.length === 0 && !profile) {
            Promise.all([data, profileData])
                .then(([data, profileData]) => {
                    if (profileData && profileData.profile) setProfile(profileData.profile);
                    if (data.figures) {
                        requestAnimationFrame(() => {
                            setInfinityStyle({
                                ...infinityStyle,
                                opacity: 1
                            });
                        });
                        setFigures(data.figures);
                        if (data.figures.length < 3) {
                            setReachedEnd(true);
                        }
                    }
                })
        }
    }, [data, figures, profile, profileData, profile_id]);

    // Get new figures when last figure in list is visible
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

    return (
        <div id={"scroller"} className={"overflow-scroll"}
             style={{display: "grid", justifySelf: "center", width: "100vw"}}>
            <Awaited awaiting={waitFor} style={{placeSelf: "center", gridRow: "1 / -1", gridColumn: "1 / 2"}}>
                <div style={infinityStyle}>
                    <div style={{
                        width: "100%", height: "100%", maxWidth: "720px",
                        border: "1px solid rgb(239, 243, 244)",
                        borderTop: 0,
                        borderBottom: 0}}>
                        {
                            profile &&
                            <ProfileHeader profile={profile}/>
                        }
                        {
                            figures &&
                            <Figures figures={figures} isProfilePage={!!profile_id} refLastFigure={ref}/>
                        }
                        {
                            fetching &&
                            <Spinner animation={"border"}/>
                        }
                        {
                            reachedEnd &&
                            <p style={{display: "grid", placeItems: "center"}}>The end.</p>
                        }
                    </div>
                </div>
            </Awaited>
        </div>
    )
}