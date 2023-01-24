import {Alert, Button, Form, Modal, Spinner} from "react-bootstrap";
import {useState} from "react";
import {backend} from "../services/backend";

function updateProfile(values, setValues) {
    setValues({...values, uploading: true, error: undefined});
    backend.updateProfile(values.display_name, values.bio, values.banner, values.profile_picture)
        .then((result) => {
            if (!result.error) {
                window.location.reload()
            } else {
                setValues({...values, uploading: false, error: result.error});
            }
        });
}

export function EditProfileModal(props) {
    const {show, setShow, profile} = props;
    const [values, setValues] = useState({
        uploading: false,
        display_name: profile.display_name,
        bio: profile.bio,
        banner: undefined,
        profile_picture: undefined,
        error: undefined
    });

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Edit profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate={true} onSubmit={(e) => {
                    e.preventDefault();
                    updateProfile(values, setValues);
                }}>
                    <Form.Group className="mb-3">
                        <Form.Label>Banner picture</Form.Label>
                        <Form.Control type="file" onChange={(e) => setValues({...values, banner: e.target.files[0]})}
                                      accept={"image/png, image/jpeg"} required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Profile picture</Form.Label>
                        <Form.Control type="file"
                                      onChange={(e) => setValues({...values, profile_picture: e.target.files[0]})}
                                      accept={"image/png, image/jpeg"} required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Display Name</Form.Label>
                        <Form.Control type={"text"} defaultValue={profile.display_name}
                                      onChange={(e) => setValues({...values, display_name: e.target.value})} required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control type={"text"} defaultValue={profile.bio}
                                      onChange={(e) => setValues({...values, bio: e.target.value})} required/>
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={values.uploading}>
                        {
                            values.uploading &&
                            <Spinner as={"span"} animation={"border"} size={"sm"} className={"me-1"}/>
                        }
                        {values.uploading ? "Submitting..." : "Submit"}
                    </Button>
                    {
                        values.error &&
                        <Alert className={"mt-3"} variant={"danger"}>{values.error}</Alert>
                    }
                </Form>
            </Modal.Body>
        </Modal>
    )
}