import {collection, getDocs, query, startAfter, where} from "firebase/firestore";
import {fbFirestore, fbStorage} from "../services/firebase";
import {getDownloadURL, ref} from "firebase/storage";

function getQuerySnapshot(q) {
    return getDocs(q).then((querySnapshot) => {
        return Promise.all(querySnapshot.docs.map(async (doc) => {
            const referenceStorage = ref(fbStorage, 'figures/' + doc.id);
            doc.url = await getDownloadURL(referenceStorage);
            return doc;
        }));
    });
}

export function fetchFirstFigures(queryOrder, queryMaxItems, username = undefined) {
    let q;
    if (username) q = query(collection(fbFirestore, 'figures'), where('user', '==', username), queryOrder, queryMaxItems);
    else q = query(collection(fbFirestore, 'figures'), queryOrder, queryMaxItems);
    return getQuerySnapshot(q);
}

export function fetchNextFigures(lastDoc, queryOrder, queryMaxItems, username = undefined) {
    let q;
    if (username) q = query(collection(fbFirestore, 'figures'), where('user', '==', username), queryOrder, startAfter(lastDoc), queryMaxItems);
    else q = query(collection(fbFirestore, 'figures'), queryOrder, startAfter(lastDoc), queryMaxItems);
    return getQuerySnapshot(q);
}