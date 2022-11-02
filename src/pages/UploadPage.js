import Form from 'react-bootstrap/Form';
import {Button} from "react-bootstrap";
import {useState} from "react";
import {ref, uploadBytes} from "firebase/storage";
import {fbAuth, fbFirestore, fbStorage} from "../services/firebase";
import {v4 as uuidv4} from 'uuid';
import {doc, setDoc} from "firebase/firestore";
import {serverTimestamp} from "firebase/firestore"

function handleUpload(event, title, description, file) {
    event.preventDefault();
    const uuid = uuidv4();
    if (file === null) return;
    console.log(fbAuth.currentUser.uid)
    const storageRef = ref(fbStorage, 'users/' + fbAuth.currentUser.uid + '/images/' + uuid);
    uploadBytes(storageRef, file).then(() => {
        console.log('Uploaded a blob or file!');
    });

    setDoc(doc(fbFirestore, "figures", uuid), {
        creation: serverTimestamp(),
        description: description,
        title: title,
        user: fbAuth.currentUser.uid
    }).then(() => {
        console.log('Created database entry')
    })
}

export function UploadPage() {
    const [file, setFile] = useState(null)
    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)
    return (
        <Form onSubmit={(e) => handleUpload(e, title, description, file)}>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Default file input example</Form.Label>
                <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])}
                              accept={"image/png, image/jpeg"}/>
            </Form.Group>
            <Form.Group controlId={"title"} className={"mb-3"}>
                <Form.Label>Title</Form.Label>
                <Form.Control type={"text"} onChange={(e) => setTitle(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId={"description"} className={"mb-3"}>
                <Form.Label>Description</Form.Label>
                <Form.Control type={"text"} onChange={(e) => setDescription(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}