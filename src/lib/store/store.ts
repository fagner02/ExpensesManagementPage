import { useSyncExternalStore } from "react";

export type ProxyReturn<T> = { model: T; useModel: () => T };

export const proxy = <T>(value: T): ProxyReturn<T> => {
    const listeners = new Set<Function>();
    let current: any = value;
    const p = new Proxy(current, {
        set(target, prop, value) {
            if (current[prop] !== value) {
                target[prop as keyof typeof target] = value;
                current = structuredClone(target);
                listeners.forEach((cb) => cb());
            }
            return true;
        },
    });
    return {
        model: p,
        useModel: () => {
            useSyncExternalStore(
                (cb) => {
                    listeners.add(cb);
                    return () => listeners.delete(cb);
                },
                () => current,
                () => current,
            );
            return p;
        },
    };
};
