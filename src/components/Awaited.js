import {Spinner} from "react-bootstrap";

export function Awaited(props) {
    const {isLoading, children} = props;
    return(
        <>
            {
                isLoading &&
                <Spinner animation={"border"} style={{placeSelf: "center", gridRow: "1 / -1", gridColumn: "1 / 2"}}/>
            }
            {
                !isLoading &&
                <>
                    {children}
                </>
            }
        </>

    )
}