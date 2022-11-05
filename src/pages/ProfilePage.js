import {Link, useLoaderData, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {fetchNextFigures} from "../utilities/FigureFetching";

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
    const [countOfNewFigures, setCountOfNewFigures] = useState(0);
    const {collectionRef, queryOrder, queryMaxItems, limitOfNewItems} = props;

    useEffect(() => {
        figuresFromLoader.docs.then((newFigures) => {
            setCountOfNewFigures(newFigures.length);
            setFigures(newFigures);
        });
    }, [figuresFromLoader]);

    return (
        <>
            <div id={"scroller"} className={"overflow-scroll"}>
                {
                    figures.length > 0 &&
                    <InfiniteScroll
                        dataLength={figures.length}
                        next={() => {
                            getAndAppendFigures(figures, setFigures, setCountOfNewFigures, useruid, collectionRef, queryOrder, queryMaxItems)
                        }}
                        hasMore={countOfNewFigures === limitOfNewItems}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{textAlign: 'center'}}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                        scrollableTarget={"scroller"}
                    >
                        {
                            figures.map((figure) => {
                                return (
                                    <div style={{height: "500px"}} key={figure.id}>
                                        <Link to={'/figure/' + figure.id}>
                                            {
                                                <img style={{height: "100px"}} src={figure.url}/>
                                            }
                                        </Link>
                                        <p>{figure.data().title}</p>
                                        <p>{figure.data().description}</p>
                                    </div>
                                )
                            })
                        }
                    </InfiniteScroll>
                }
            </div>
        </>
    )
}