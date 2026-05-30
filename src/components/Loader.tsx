import { CSSProperties, useEffect, useState } from "react";

const Loader = (props: { loading: boolean; style?: CSSProperties }) => {
    const [className, setClassName] = useState("loader-on");

    useEffect(() => {
        if (props.loading) {
            setClassName("loader-on");
        } else {
            setTimeout(() => {
                setClassName("");
            }, 500);
        }
    }, [props.loading]);

    return (
        <div
            className={`loader ${className}`}
            style={{
                opacity: props.loading ? "1" : "0",
                height: props.loading ? "10px" : "0",
                ...props.style,
            }}
        >
            <div></div>
        </div>
    );
};
export default Loader;
