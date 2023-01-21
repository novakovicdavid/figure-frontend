export function ProfileHeader(props) {
    const {profile} = props;
    return (
        <div className={"sticky-top"} style={{
            display: "grid",
            placeItems: "center",
            gridRow: "1 / 2",
            gridColumn: "1 / 2",
            height: "2em",
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.85)"
        }}>{profile.username}</div>
    )
}