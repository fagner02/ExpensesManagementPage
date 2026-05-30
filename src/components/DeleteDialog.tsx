import { useHeight } from "@/lib/store/store";
import { RefObject, useRef } from "react";

const DeleteDialog = ({
    deleteCallback,
    closeDelete,
    show,
    rowRef,
}: {
    deleteCallback: () => void;
    closeDelete: () => void;
    show: boolean;
    rowRef: RefObject<HTMLDivElement | null>;
}) => {
    const container = useRef<HTMLDivElement>(null);

    const height = useHeight(
        () =>
            Math.max(
                rowRef.current?.clientHeight ?? 0,
                (container.current?.scrollHeight ?? 0) - 1,
            ),
        [show],
    );
    return (
        <div
            style={{
                gridArea: "unit",
                background: "white",
                opacity: show ? "1" : "0",
                visibility: show ? "visible" : "hidden",
                transition: "all 0.5s",
                zIndex: "1",
                overflow: "hidden",
                padding: show ? "10px" : "0px",
                height: show ? `${height.value}px` : "0",
                display: "flex",
                placeContent: "center",
            }}
        >
            <div
                ref={container}
                style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    transform: show ? "translateY(0)" : "translateY(-100%)",
                    transition: "all 0.5s ease",
                    gap: "10px",
                }}
            >
                Are you sure you want to delete?
                <div style={{ display: "flex" }}>
                    <button
                        style={{
                            marginRight: "10px",
                        }}
                        onClick={() => {
                            deleteCallback();
                        }}
                    >
                        Yes
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            closeDelete();
                        }}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteDialog;
