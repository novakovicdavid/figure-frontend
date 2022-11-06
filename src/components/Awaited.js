import {Spinner} from "react-bootstrap";

export function Awaited(props) {
    const {isLoading, children} = props;
    return(
        <>
            {
                isLoading &&
                <Spinner animation={"border"} style={{placeSelf: "center"}}/>
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