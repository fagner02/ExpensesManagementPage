import { ReactNode } from "react";

const AddDialog = (props: {
    children: ReactNode;
    show: boolean;
    closeAdd: () => void;
    save: () => void;
}) => {
    return (
        <div
            className="container"
            style={{
                transition: "all 0.4s ease",
                flexGrow: props.show ? "1" : "0",
                height: props.show ? "100%" : "0px",
                opacity: props.show ? "1" : "0",
                gap: "10px",
                marginTop: props.show ? "0" : "-50px",
            }}
        >
            {/*INPUT ROW -----------------------------------------------*/}
            {props.children}
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "10px",
                }}
            >
                <button
                    onClick={() => {
                        props.closeAdd();
                    }}
                >
                    Cancel
                </button>
                <button
                    onClick={() => {
                        props.save();
                        props.closeAdd();
                    }}
                >
                    Add
                </button>
            </div>
        </div>
    );
};

export default AddDialog;
