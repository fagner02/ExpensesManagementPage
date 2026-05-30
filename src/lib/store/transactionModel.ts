import { TransactionModel } from "@/prisma/models";
import { proxy, ProxyReturn } from "./store";

export let { model: transactionModel, useModel: useTransactionModel } = proxy<
    Partial<TransactionModel>
>({});

const transactionEditModels = new Map<
    string,
    ProxyReturn<Partial<TransactionModel>>
>();

export let getTransactionEditModel = (id: string) => {
    let proxyModel: ProxyReturn<Partial<TransactionModel>> | undefined;
    if (!(proxyModel = transactionEditModels.get(id))) {
        proxyModel = proxy({} as Partial<TransactionModel>);
        transactionEditModels.set(id, proxyModel);
    }
    return proxyModel!;
};
