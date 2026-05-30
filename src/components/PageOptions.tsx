import { Pagination } from "@/lib/store/pagination";
import { useEffect, useMemo } from "react";

const PageOptions = (props: {
    pagination: Pagination;
    totalElems: number;
    refresh: () => void;
}) => {
    const totalPages = useMemo(() => {
        return Math.ceil(props.totalElems / props.pagination.pageSize);
    }, [props.totalElems, props.pagination.pageSize]);

    return (
        <div
            style={{
                position: "fixed",
                left: "0px",
                right: "0px",
                bottom: "0px",
                height: "fit-content",
                margin: "20px var(--padding)",
                display: "flex",
                justifyContent: "end",
            }}
        >
            <div
                style={{
                    border: "1px solid",
                    borderRadius: "10px",
                    padding: "5px",
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                    gap: "10px",
                }}
            >
                <button
                    onClick={() => {
                        props.pagination.page--;
                        props.refresh();
                    }}
                    style={{ marginLeft: "-3px" }}
                    disabled={props.pagination.page <= 0}
                >
                    &lt;
                </button>
                <p>
                    Page {props.pagination.page + 1} of {totalPages}
                </p>
                <button
                    onClick={() => {
                        props.pagination.page++;
                        props.refresh();
                    }}
                    disabled={props.pagination.page >= totalPages - 1}
                >
                    &gt;
                </button>
                <p>Showing</p>
                <select
                    style={{
                        flex: "0",
                        minWidth: "45px",
                        height: "stretch",
                        cursor: "pointer",
                    }}
                    name="page_size"
                    value={props.pagination.pageSize}
                    onChange={(e) => {
                        props.pagination.pageSize = parseInt(e.target.value);
                        props.refresh();
                    }}
                >
                    <option>50</option>
                    <option>25</option>
                    <option>10</option>
                    <option>5</option>
                    <option>1</option>
                </select>
                <p>of {props.totalElems} elements</p>
            </div>
        </div>
    );
};
export default PageOptions;
