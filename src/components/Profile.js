import {useAuthContext} from "../contexts/authContext";
import {Button} from "react-bootstrap";
import {EditProfileModal} from "./EditProfileModal";
import {useState} from "react";

export function Profile(props) {
    const {profile} = props;
    const loggedInProfile = useAuthContext().profile;
    let isOwner = profile.id === loggedInProfile?.id;
    let [showEditModal, setShowEditModal] = useState(false);

    return (
        <>
            <div style={{
                paddingBottom: "1rem",
                border: "1px solid rgb(239, 243, 244)",
                borderTop: 0,
                borderLeft: 0,
                borderRight: 0
            }}>
                <div style={{width: "100%", height: "12rem", backgroundColor: "seagreen"}}>
                    {
                        profile.banner &&
                        <img src={profile.banner}
                             style={{width: "100%", height: "100%", backgroundColor: "transparent"}}/>
                    }
                </div>
                <div style={{padding: "0 1rem"}}>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <div>
                            <img
                                src={profile.profile_picture ? profile.profile_picture : "https://cdn.figure.novakovic.be/profile_pictures/default.png"}
                                style={{
                                    width: "9rem",
                                    height: "9rem",
                                    marginTop: "-50%",
                                    borderRadius: "50%",
                                    border: "4px solid white"
                                }}/>
                        </div>
                        {
                            isOwner &&
                            <Button onClick={() => setShowEditModal(true)}>Edit profile</Button>
                        }
                    </div>
                    <div style={{marginTop: "1rem"}}>
                        <h5 style={{
                            margin: 0,
                            fontWeight: "bold",
                            lineHeight: "1.2rem"
                        }}>{profile.display_name ? profile.display_name : profile.username}</h5>
                        <div className={"text-muted"}>@{profile.username}</div>
                    </div>
                    <div style={{marginTop: "0.8rem"}}>
                        {profile.bio}
                    </div>
                </div>
            </div>
            <EditProfileModal show={showEditModal} setShow={setShowEditModal} profile={profile}/>
        </>

    )
}