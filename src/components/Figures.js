import {Link} from "react-router-dom";

function Figure(props) {
    const {id, url, title, width, height, profile, isProfilePage, refLastFigure} = props;
    let style = {
        padding: "1em",
    };
    if (!refLastFigure) style = {
        ...style,
        borderBottom: "1px solid rgb(239, 243, 244)"
    }
    return (
        <div ref={refLastFigure} style={style}>
            {
                !isProfilePage &&
                <>
                    {"By "}
                    <Link to={'/profile/' + profile.id}>
                        <span>{profile.username}</span>
                    </Link>
                </>

            }
            <Link to={'/figure/' + id}>
                <img src={url} style={{aspectRatio: width + ' / ' + height, width: "100%"}}/>
                <h5 style={{marginBottom: 0}}>{title}</h5>
            </Link>
        </div>
    )
}

export function Figures(props) {
    const {figures, isProfilePage, refLastFigure} = props;
    return (
        <>
            {
                figures.map((figure, index) =>
                    <Figure id={figure.id} url={figure.url} title={figure.title} width={figure.width}
                            height={figure.height} profile={figure.profile}
                            isProfilePage={isProfilePage} key={figure.id}
                            refLastFigure={(index === figures.length - 1) ? refLastFigure : undefined}/>
                )
            }
        </>
    )
}