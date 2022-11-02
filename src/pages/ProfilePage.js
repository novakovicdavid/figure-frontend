import {Link, useParams} from "react-router-dom";
import {collection, query, orderBy, limit, getDocs, startAfter, where} from "firebase/firestore";
import {fbFirestore} from "../services/firebase";
import {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function getAndAppendFigures(figures, setFigures, setCountOfNewFigures) {
    const lastDoc = figures[figures.length - 1];
    console.log('figures length: ', figures.length)
    console.log('last doc: ', lastDoc);
    const q = query(collection(fbFirestore, 'figures'), orderBy('creation', 'desc'), startAfter(lastDoc), limit(1));

    getDocs(q).then((docsSnapshot) => {
        setCountOfNewFigures(docsSnapshot.docs.length);
        setFigures([...figures, ...docsSnapshot.docs]);
    });
}

export function ProfilePage() {
    const useruid = useParams().useruid;
    const [figures, setFigures] = useState([]);
    const [countOfNewFigures, setCountOfNewFigures] = useState(0);

    useEffect(() => {
        const q = query(collection(fbFirestore, 'figures'), where('user', '==', useruid), orderBy('creation', 'desc'), limit(1));
        getDocs(q).then((querySnapshot) => {
            setCountOfNewFigures(querySnapshot.docs.length);
            setFigures(querySnapshot.docs);
        });
    }, [useruid]);

    console.log('render')

    return (
        <>
            {
                figures.length > 0 &&
                <InfiniteScroll
                    dataLength={figures.length}
                    next={() => {
                        getAndAppendFigures(figures, setFigures, setCountOfNewFigures)
                    }}
                    hasMore={countOfNewFigures === 1}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{textAlign: 'center'}}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                    height={100}>
                    {
                        figures.map((figure) => {
                            return <div style={{height: "500px"}} key={figure.id}>{figure.id}</div>
                        })
                    }
                </InfiniteScroll>
            }
        </>
    )
}