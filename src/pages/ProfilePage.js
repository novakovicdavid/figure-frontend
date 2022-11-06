import {useLoaderData, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {fetchNextFigures} from "../utilities/FigureFetching";
import {Figures} from "../components/Figures";
import {Awaited} from "../components/Awaited";
import '../styling/no-scroll.css'

function getAndAppendFigures(figures, setFigures, setCountOfNewFigures, useruid, collectionRef, queryOrder, queryMaxItems) {
    const lastDoc = figures[figures.length - 1];
    fetchNextFigures(lastDoc, queryOrder, queryMaxItems, useruid).then((newFigures) => {
        setCountOfNewFigures(newFigures.length);
        setFigures([...figures, ...newFigures]);
    });
}

export function ProfilePage(props) {
    const useruid = useParams().useruid;
    const figuresFromLoader = useLoaderData();
    const [figures, setFigures] = useState([]);
    const [isLoading, setLoading] = useState(true)
    const [countOfNewFigures, setCountOfNewFigures] = useState(0);
    const {collectionRef, queryOrder, queryMaxItems, limitOfNewItems} = props;

    useEffect(() => {
        figuresFromLoader.docs.then((newFigures) => {
            setCountOfNewFigures(newFigures.length);
            setFigures(newFigures);
            setLoading(false);
        });
    }, [figuresFromLoader]);

    return (
        <Awaited isLoading={isLoading}>
            <div id={"scroller"} className={"overflow-scroll"}
                 style={{justifySelf: "center", maxWidth: "720px"}}>
                {
                    figures.length > 0 &&
                    <InfiniteScroll
                        dataLength={figures.length}
                        next={() => {
                            getAndAppendFigures(figures, setFigures, setCountOfNewFigures, useruid, collectionRef, queryOrder, queryMaxItems)
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
                        <Figures figures={figures}/>
                    </InfiniteScroll>
                }

            </div>
        </Awaited>
    )
}