import Form from 'react-bootstrap/Form';
import {Button, Modal, Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {backend} from "../services/backend";

function handleUpload(title, description, file, navigate, setUploading, setFigureId) {
    if (!file || !title || !description) return;
    setUploading(true);
    backend.upload_figure(title, description, file)
        .then((response) => setFigureId(response.figure_id));
}

export function Upload(props) {
    const {show, setShow} = props;
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [figureId, setFigureId] = useState(false);
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (figureId) {
            navigate("/figure/" + figureId);
            setFigureId(undefined);
            setShow(false);
            setFile(undefined);
            setTitle(undefined);
            setDescription(undefined);
            setUploading(false);
            setValidated(false);
        }
    }, [figureId, navigate]);

    return (
        <Modal show={show} onHide={() => {
            setShow(false);
            setFile(undefined);
            setTitle(undefined);
            setDescription(undefined);
            setUploading(false);
            setValidated(false);
        }}>
            <Modal.Header closeButton>
                <Modal.Title>Upload figure</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={(e) => {
                    e.preventDefault();
                    handleUpload(title, description, file, navigate, setUploading, setFigureId);
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