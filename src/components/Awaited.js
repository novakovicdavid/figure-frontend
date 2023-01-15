import {Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";

export function Awaited(props) {
    const {awaiting, children, style} = props;
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        Promise.all(awaiting).then(() => setLoading(false));
    }, [awaiting])
    return(
        <>
            {
                loading &&
                <Spinner animation={"border"} style={style}/>
            }
            {
                !loading &&
                <>
                    {children}
                </>
            }
        </>

    )
}