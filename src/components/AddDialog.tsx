import { useHeight } from "@/lib/store/store";
import { ReactNode, useRef } from "react";

const AddDialog = (props: {
    children: ReactNode;
    show: boolean;
    closeAdd: () => void;
    save: () => void;
}) => {
    const container = useRef<HTMLDivElement>(null);
    const height = useHeight(() => container.current?.scrollHeight ?? 0);

    return (
        <div
            ref={container}
            className="container"
            style={{
                transition: "all 0.4s ease",
                flexGrow: props.show ? "1" : "0",
                height: props.show ? `${height.value}px` : "0px",
                opacity: props.show ? "1" : "0",
                visibility: props.show ? "visible" : "hidden",
                transform: props.show ? "translateY(0%)" : "translateY(50%)",
                gap: "10px",
                overflow: "hidden",
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
                    onClick={(e) => {
                        e.stopPropagation();
                        props.closeAdd();
                    }}
                >
                    Cancel
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
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
