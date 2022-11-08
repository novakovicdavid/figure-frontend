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

    useEffect(() => {
        figuresFromLoader.docs.then((newFigures) => {
            setCountOfNewFigures(newFigures.length);
            setFigures(newFigures);
        });
    }, [figuresFromLoader]);

    return (
        <div id={"scroller"} className={"overflow-scroll"}
             style={{display: "grid", justifySelf: "center", width: "100vw"}}>
            {
                username &&
                <div className={"sticky-top"} style={{display: "grid", placeItems: "center", gridRow: "1 / 2", gridColumn: "1 / 2", height: "2em", backdropFilter: "blur(10px)"}}>{username}</div>
            }
            <Awaited awaiting={figuresFromLoader.docs} style={{placeSelf: "center", gridRow: "1 / -1", gridColumn: "1 / 2"}}>
                {
                    figures.length > 0 &&
                    <InfiniteScroll style={{display: "flex", flexDirection: "column", alignItems: "center"}}
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
                            <Figures figures={figures}/>
                        </div>
                    </InfiniteScroll>
                }
            </Awaited>
        </div>
    )
}