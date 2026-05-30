"use client";

import { setHeightCallbacks } from "@/lib/store/store";
import { useEffect } from "react";

export function GlobalListeners() {
    useEffect(() => {
        const handleResize = () => {
            setHeightCallbacks.forEach((item) => item.cb());
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return null;
}
