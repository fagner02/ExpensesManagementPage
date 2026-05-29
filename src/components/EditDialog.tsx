import { RefObject, useEffect, useRef, useState } from "react";

const EditModel = (props: {
    show: boolean;
    save: () => void;
    children: React.ReactNode;
    closeEdit: () => void;
    rowRef: RefObject<HTMLDivElement | null>;
}) => {
    const [height, setHeight] = useState(0);
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setHeight(
            Math.max(
                props.rowRef.current?.clientHeight ?? 0,
                container.current?.scrollHeight ?? 0,
            ),
        );
    }, [props.show]);
    return (
        <div
            ref={container}
            style={{
                background: "white",
                height: props.show ? `${height}px` : "0px",
                padding: props.show ? "10px" : "0px",
                opacity: props.show ? "1" : "0",
                visibility: props.show ? "visible" : "hidden",
                transition: "all 0.5s",
                overflow: "hidden",
                gridArea: "unit",
                zIndex: "1",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    transform: props.show
                        ? "translateY(0)"
                        : "translateY(-100%)",
                    transition: "all 0.5s",
                }}
            >
                {/*EDIT INPUT ROWS ----------------------------------------------------*/}
                {props.children}

                {/*EDIT CONTROLS -----------------------------------------------------*/}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                        gap: "10px",
                    }}
                >
                    <button
                        onClick={(e) => {
                            props.closeEdit();
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={(e) => {
                            props.save();
                            // var age =
                            //     document.querySelector(
                            //         "#e-age" + props.id,
                            //     ).value;
                            // var name =
                            //     document.querySelector(
                            //         "#e-name" + props.id,
                            //     ).value;
                            // var email =
                            //     document.querySelector(
                            //         "#e-email" +
                            //             props.id,
                            //     ).value;
                            // var phone =
                            //     document.querySelector(
                            //         "#e-phone" +
                            //             props.id,
                            //     ).value;
                            // PersonFetch.put({
                            //     id: props.id,
                            //     age:
                            //         age === ""
                            //             ? null
                            //             : parseInt(age),
                            //     name:
                            //         name === ""
                            //             ? null
                            //             : name,
                            //     email:
                            //         email === ""
                            //             ? null
                            //             : email,
                            //     phone:
                            //         phone === ""
                            //             ? null
                            //             : phone,
                            // }).then((data) => {
                            //     this.closeEdit(props.id);
                            //     this.refresh();
                            // });
                        }}
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};
export default EditModel;
