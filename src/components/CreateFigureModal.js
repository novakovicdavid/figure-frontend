import Form from 'react-bootstrap/Form';
import {Button, Modal, Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {backend} from "../services/backend";

async function handleUpload({title, description, file}) {
    if (!file || !title || !description) return;
    return await backend.upload_figure(title, description, file);
}

export function CreateFigureModal(props) {
    const {show, setShow} = props;
    const [formValidated, setFormValidated] = useState(false);
    const [figureToUpload, setFigureToUpload] = useState({
        file: null,
        title: null,
        description: null,
    });
    const [figureId, setFigureId] = useState(false);
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (figureId) {
            setShow(false);
            navigate("/figure/" + figureId);
            setFigureId(undefined);
            setFigureToUpload({
                file: null,
                title: null,
                description: null,
            });
            setUploading(false);
            setFormValidated(false);
        }
    }, [figureId, navigate]);

    return (
        <Modal show={show} onHide={() => {
            setShow(false);
            setFigureToUpload({
                file: null,
                title: null,
                description: null,
            });
            setUploading(false);
            setFormValidated(false);
        }}>
            <Modal.Header closeButton>
                <Modal.Title>Create figure</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={formValidated} onSubmit={(e) => {
                    e.preventDefault();
                    setFormValidated(true);
                    setUploading(true);
                    (async () => {
                        const figureId = await handleUpload(figureToUpload);
                        if (figureId && figureId.figure_id) setFigureId(figureId.figure_id);
                        else setUploading(false);
                    })();
                }}>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Control type="file" onChange={(e) => setFigureToUpload({...figureToUpload, file: e.target.files[0]})}
                                      accept={"image/png, image/jpeg"} required/>
                        <Form.Control.Feedback type={"invalid"}>Please provide an image.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId={"title"} className={"mb-3"}>
                        <Form.Label>Title:</Form.Label>
                        <Form.Control type={"text"} onChange={(e) => setFigureToUpload({...figureToUpload, title: e.target.value})} required/>
                        <Form.Control.Feedback type={"invalid"}>Please provide a title.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId={"description"} className={"mb-3"}>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control type={"text"} onChange={(e) => setFigureToUpload({...figureToUpload, description: e.target.value})} required/>
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