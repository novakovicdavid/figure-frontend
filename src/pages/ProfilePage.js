import {Link, useLoaderData, useParams} from "react-router-dom";
import {query, getDocs, startAfter, where} from "firebase/firestore";
import {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {fbStorage} from "../services/firebase";
import {getDownloadURL, ref} from "firebase/storage";

function getQuerySnapshot(q) {
    return getDocs(q).then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => {
            const referenceStorage = ref(fbStorage, 'figures/' + doc.id);
            doc.url = getDownloadURL(referenceStorage);
            return doc;
        })
    });
}

function getAndAppendFigures(figures, setFigures, setCountOfNewFigures, useruid, collectionRef, queryOrder, queryMaxItems) {
    const lastDoc = figures[figures.length - 1];
    const q = query(collectionRef, where('user', '==', useruid), queryOrder, startAfter(lastDoc), queryMaxItems);
    getQuerySnapshot(q).then((figuresWithUnresolvedUrl) => {
        figuresWithUnresolvedUrl = figuresWithUnresolvedUrl.map(async (figure) => {
            figure.url = await figure.url;
            return figure;
        });
        Promise.all(figuresWithUnresolvedUrl).then((figuresWithResolvedUrl) => {
            setCountOfNewFigures(figuresWithResolvedUrl.length);
            setFigures([...figures, ...figuresWithResolvedUrl]);
        });
    })
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
            <p>Loading lol</p>
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
                    height={100}>
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
        </>
    )
}