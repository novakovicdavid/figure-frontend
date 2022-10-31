import Form from 'react-bootstrap/Form';
import {Button} from "react-bootstrap";
import {useState} from "react";
import {ref, uploadBytes} from "firebase/storage";
import {fbAuth, fbStorage} from "../services/firebase";
import {v4 as uuidv4} from 'uuid';

function handleUpload(event, file) {
    event.preventDefault();
    if (file === null) return;
    console.log(fbAuth.currentUser.uid)
    const storageRef = ref(fbStorage, 'users/' + fbAuth.currentUser.uid + '/images/' + uuidv4());
    uploadBytes(storageRef, file).then(() => {
        console.log('Uploaded a blob or file!');
    });
}

export function Upload() {
    const [file, setFile] = useState(null)
    return (
        <Form onSubmit={(e) => handleUpload(e, file)}>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Default file input example</Form.Label>
                <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} accept={"image/png, image/jpeg"}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}