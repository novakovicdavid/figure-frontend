import {useAuthContext} from "../contexts/authContext";

export function ProfileHeader(props) {
    const {profile} = props;
    const loggedInProfileId = useAuthContext().profile.id;
    let isOwner = profile.id === loggedInProfileId;


    return (
        <div className={"sticky-top"} style={{
            display: "flex",
            // padding: ".3rem",
            paddingLeft: "1.2rem",
            fontSize: "1.2rem",
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.85)"
        }}>
            <span style={{paddingRight: "2.5rem", fontSize: "2rem"}} onClick={() => {
                const scroller = document.getElementById("scroller");
                scroller.scrollTop = 0;
            }}>&#8593;</span>
            <span style={{display: "inline-flex", flexDirection: "column",}}>
                <b>{profile.display_name ? profile.display_name : profile.username}</b>
                <small className={"text-muted"} style={{fontSize: "0.8rem"}}>{profile.total_figures + " Figures"}</small>
            </span>

        </div>
    )
}