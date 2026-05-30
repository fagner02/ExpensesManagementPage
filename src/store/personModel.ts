import { PersonModel } from "@/prisma/models";
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
export let { model: personModel, useModel: usePersonModel } = proxy({
    id: "",
    age: 0,
    email: "",
    name: "",
    phone: "",
} as Partial<PersonModel>);

const personEditModels = new Map<string, ProxyReturn<Partial<PersonModel>>>();

export const getPersonEditModel = (id: string) => {
    let proxyModel: ProxyReturn<Partial<PersonModel>> | undefined;
    if (!(proxyModel = personEditModels.get(id))) {
        proxyModel = proxy({} as Partial<PersonModel>);
        personEditModels.set(id, proxyModel);
    }
    return proxyModel!;
};
