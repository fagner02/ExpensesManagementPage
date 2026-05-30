import { ReactNode } from "react";

const ItemList = (props: { children: ReactNode; show: boolean }) => {
    return (
        <div
            className="container"
            style={{
                height: props.show ? "0" : "100%",
                transform: props.show ? "translateY(10%)" : "translateY(0)",
                opacity: props.show ? "0" : "1",
                visibility: props.show ? "hidden" : "visible",
                transition: "all 0.5s ease-out",
            }}
        >
            {/* ITEM ROW ---------------------------------- */}
            {props.children}
        </div>
    );
};
export default ItemList;
