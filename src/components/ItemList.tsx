import { ReactNode, useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import { useHeight } from "@/lib/store/store";

const ItemList = (props: {
    children: ReactNode;
    show: boolean;
    loading: boolean;
}) => {
    const container = useRef<HTMLDivElement>(null);

    const height = useHeight(
        () => container.current?.scrollHeight ?? 0,
        [props.loading],
    );
    return (
        <div
            ref={container}
            className="container"
            style={{
                height: props.show ? "0" : `${height.value}px`,
                transform: props.show ? "translateY(100%)" : "translateY(0)",
                opacity: props.show ? "0" : "1",
                visibility: props.show ? "hidden" : "visible",
                transition: "all 0.5s ease-out",
                paddingTop: props.loading ? "20px" : "0",
            }}
        >
            <Loader loading={props.loading}></Loader>
            {/* ITEM ROW ---------------------------------- */}
            {props.children}
        </div>
    );
};
export default ItemList;
