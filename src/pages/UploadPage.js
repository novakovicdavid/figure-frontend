import Form from 'react-bootstrap/Form';
import {Button, Spinner} from "react-bootstrap";
import {useState} from "react";
import {ref, uploadBytes} from "firebase/storage";
import {fbFirestore, fbStorage} from "../services/firebase";
import {v4 as uuidv4} from 'uuid';
import {doc, setDoc} from "firebase/firestore";
import {serverTimestamp} from "firebase/firestore"
import {useAuthContext} from "../contexts/authContext";
import {useNavigate} from "react-router-dom";

function handleUpload(event, title, description, file, useruid, navigate) {
    event.preventDefault();
    const uuid = uuidv4();
    if (file === null) return;

    const metadata = {
        customMetadata: {
            'user': useruid
        }
    }
    const storageRef = ref(fbStorage, 'figures/' + uuid);
    uploadBytes(storageRef, file, metadata).then(() => {
        setDoc(doc(fbFirestore, "figures", uuid), {
            creation: serverTimestamp(),
            description: description,
            title: title,
            user: useruid
        }).then(() => {
            navigate("/figure/" + uuid);
        })
    });
}

export function UploadPage() {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [submitButtonActive, setSubmitButtonActive] = useState(true);
    const {user} = useAuthContext();
    const navigate = useNavigate();


    return (
        <Form onSubmit={(e) => {
            handleUpload(e, title, description, file, user.uid, navigate);
            setSubmitButtonActive(false);
        }}>
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
            <Button variant="primary" type="submit" disabled={submitButtonActive}>
                {
                    submitButtonActive &&
                    <Spinner as={"span"} animation={"border"} size={"sm"} className={"me-1"}/>
                }
                Submit
            </Button>
        </Form>
    )
}