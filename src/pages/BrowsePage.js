import {useLoaderData, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {fetchNextFigures} from "../utilities/FigureFetching";
import {Figures} from "../components/Figures";
import {Awaited} from "../components/Awaited";
import '../styling/no-scroll.css'

function getAndAppendFigures(figures, setFigures, setCountOfNewFigures, username, collectionRef, queryOrder, queryMaxItems) {
    const lastDoc = figures[figures.length - 1];
    fetchNextFigures(lastDoc, queryOrder, queryMaxItems, username).then((newFigures) => {
        setCountOfNewFigures(newFigures.length);
        setFigures([...figures, ...newFigures]);
    });
}

export function BrowsePage(props) {
    const username = useParams().username;
    const figuresFromLoader = useLoaderData();
    const [figures, setFigures] = useState([]);
    const [countOfNewFigures, setCountOfNewFigures] = useState(0);
    const {collectionRef, queryOrder, queryMaxItems, limitOfNewItems} = props;
    const [infinityScrollStyle, setInfinityScrollStyle] = useState({display: "flex", flexDirection: "column", alignItems: "center", opacity: 0, transition: "opacity 0.5s"})

    useEffect(() => {
        figuresFromLoader.docs.then((newFigures) => {
            setCountOfNewFigures(newFigures.length);
            setFigures(newFigures);
        });
    }, [figuresFromLoader]);

    useEffect(() => {
        if (figures.length > 0) setInfinityScrollStyle({display: "flex", flexDirection: "column", alignItems: "center", opacity: 1, transition: "opacity 0.5s"});
    }, [figures])

    return (
        <div id={"scroller"} className={"overflow-scroll"}
             style={{display: "grid", justifySelf: "center", width: "100vw"}}>
            {
                username &&
                <div className={"sticky-top"} style={{display: "grid", placeItems: "center", gridRow: "1 / 2", gridColumn: "1 / 2", height: "2em", backdropFilter: "blur(10px)"}}>{username}</div>
            }
            <Awaited awaiting={figuresFromLoader.docs} style={{placeSelf: "center", gridRow: "1 / -1", gridColumn: "1 / 2"}}>
                {
                    <InfiniteScroll style={infinityScrollStyle}
                                    dataLength={figures.length}
                                    next={() => {
                                        getAndAppendFigures(figures, setFigures, setCountOfNewFigures, username, collectionRef, queryOrder, queryMaxItems)
                                    }}
                                    hasMore={countOfNewFigures === limitOfNewItems}
                                    loader={<></>}
                                    endMessage={
                                        <p style={{textAlign: 'center'}}>
                                            <b>Yay! You have seen it all</b>
                                        </p>
                                    }
                                    scrollableTarget={"scroller"}
                    >
                        <div style={{width: "100%", maxWidth: "720px"}}>
                            <Figures figures={figures} isProfilePage={!!username}/>
                        </div>
                    </InfiniteScroll>
                }
            </Awaited>
        </div>
    )
}