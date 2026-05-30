import { DependencyList, useEffect, useRef, useSyncExternalStore } from "react";

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

export const setHeightCallbacks = new Map<
    Function,
    { p: ProxyReturn<{ value: number }>; cb: Function }
>();
export const useHeight = (
    setHeight: () => number,
    deps: DependencyList = [],
) => {
    let p: ProxyReturn<{ value: number }> | undefined;
    const cb = () => {
        if (!p) return;
        p.model.value = setHeight();
    };
    const cbRef = useRef(cb);
    const storedProxy = setHeightCallbacks.get(cbRef.current);
    if (storedProxy) {
        p = storedProxy.p;
        storedProxy.cb = cb;
    } else {
        p = proxy({ value: 0 });
        cb();
        setHeightCallbacks.set(cbRef.current, { p, cb });
    }

    useEffect(() => {
        cb();
    }, deps);
    useEffect(() => {
        return () => {
            p = undefined;
            setHeightCallbacks.delete(cbRef.current);
        };
    }, []);
    return p.useModel();
};
