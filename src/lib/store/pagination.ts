import { useRef } from "react";
import { proxy } from "./store";

export type Pagination = { page: number; pageSize: number };

export const usePagination = (page: number = 0, pageSize: number = 5) => {
    const p = useRef(proxy({ page, pageSize }));
    return p.current.useModel();
};
