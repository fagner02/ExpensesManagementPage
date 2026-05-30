import { PersonModel } from "@/prisma/models";
import { proxy, ProxyReturn } from "./store";

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
