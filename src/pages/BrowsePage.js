import {useLoaderData, useParams} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {Figures} from "../components/Figures";
import {Awaited} from "../components/Awaited";
import '../styling/no-scroll.css'
import {Spinner} from "react-bootstrap";
import {backend} from "../services/backend";

function getNextFiguresAndAppend(figures, setFigures, setCountOfNewFigures, lastFigureId, profile) {
    let promise;
    if (profile) promise = backend.get_figures_after_id(lastFigureId, profile.id);
    else promise = backend.get_figures_after_id(lastFigureId);
    promise.then((newFigures) => {
            setFigures([...figures, ...newFigures.figures]);
            setCountOfNewFigures(newFigures.figures.length);
        })
}

export function BrowsePage() {
    const profile_id = useParams().id;
    const {data, profileData} = useLoaderData();
    const [figures, setFigures] = useState([]);
    const [profile, setProfile] = useState();
    const [countOfNewFigures, setCountOfNewFigures] = useState(0);
    const [infinityScrollStyle, setInfinityScrollStyle] = useState({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: 0,
        transition: "opacity 0.5s"
    });

    useMemo(() => {
        if (!profile_id) setProfile(undefined);
    }, [profile_id]);

    useEffect(() => {
        data.then(data => {
            setFigures(data.figures);
            setCountOfNewFigures(data.figures.length);
        });
    }, [data]);

    useEffect(() => {
        if (!profileData) return;
        profileData.then(fetchedProfile => {
            console.log(fetchedProfile);
            setProfile(fetchedProfile.profile)
        });
    }, [profileData]);

    const waitFor = useMemo(() => {
        let promises = [data];
        if (profileData) promises.push(profileData);
        return promises;
    }, [data, profileData]);

    useEffect(() => {
        if (figures.length > 0) {
            requestAnimationFrame(() => {
                setInfinityScrollStyle({
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    opacity: 1,
                    transition: "opacity 0.5s"
                });
            });
        }
    }, [figures]);

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
                {
                    <InfiniteScroll style={infinityScrollStyle}
                                    dataLength={figures.length}
                                    next={() => {
                                        getNextFiguresAndAppend(figures, setFigures, setCountOfNewFigures, figures[figures.length - 1].id, profile);
                                    }}
                                    hasMore={countOfNewFigures === 1}
                                    loader={<div style={{height: '2.5rem'}}><Spinner animation={"border"}/></div>}
                                    endMessage={
                                        <p style={{textAlign: 'center'}}>
                                            <b>Yay! You have seen it all</b>
                                        </p>
                                    }
                                    scrollableTarget={"scroller"}
                                    scrollThreshold={0.6}
                    >
                        <div style={{width: "100%", maxWidth: "720px"}}>
                            <Figures figures={figures} isProfilePage={!!profile_id}/>
                        </div>
                    </InfiniteScroll>
                }
            </Awaited>
        </div>
    )
}