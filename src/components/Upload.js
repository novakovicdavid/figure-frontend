import Form from 'react-bootstrap/Form';
import {Button, Modal, Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import {ref, uploadBytes} from "firebase/storage";
import {fbFirestore, fbStorage} from "../services/firebase";
import {v4 as uuidv4} from 'uuid';
import {doc, setDoc} from "firebase/firestore";
import {serverTimestamp} from "firebase/firestore"
import {useAuthContext} from "../contexts/authContext";
import {useNavigate} from "react-router-dom";

function handleUpload(event, title, description, file, useruid, navigate, setUploading, setUidOfCompletedUpload) {
    event.preventDefault();
    const uuid = uuidv4();
    if (!file || !title || !description) return;
    setUploading(true);

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
            setUidOfCompletedUpload(uuid);
        })
    });
}

export function Upload(props) {
    const {show, setShow} = props;
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [uidOfCompletedUpload, setUidOfCompletedUpload] = useState();
    const {user} = useAuthContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (uidOfCompletedUpload) {
            setShow(false);
            navigate("/figure/" + uidOfCompletedUpload);
            console.log('uid:', uidOfCompletedUpload);
        }
    }, [uidOfCompletedUpload]);
    return (
        <Modal show={show} onHide={() => {
            setShow(false);
            setValidated(false);
        }}>
            <Modal.Header closeButton>
                <Modal.Title>Upload figure</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={(e) => {
                    handleUpload(e, title, description, file, user.uid, navigate, setUploading, setUidOfCompletedUpload);
                    setValidated(true);
                }}>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])}
                                      accept={"image/png, image/jpeg"} required/>
                        <Form.Control.Feedback type={"invalid"}>Please provide an image.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId={"title"} className={"mb-3"}>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type={"text"} onChange={(e) => setTitle(e.target.value)} required/>
                        <Form.Control.Feedback type={"invalid"}>Please provide a title.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId={"description"} className={"mb-3"}>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type={"text"} onChange={(e) => setDescription(e.target.value)} required/>
                        <Form.Control.Feedback type={"invalid"}>Please provide a description.</Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={uploading}>
                        {
                            uploading &&
                            <Spinner as={"span"} animation={"border"} size={"sm"} className={"me-1"}/>
                        }
                        {uploading ? "Submitting..." : "Submit"}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}