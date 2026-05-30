import { TransactionModel } from "@/prisma/models";
import { proxy, ProxyReturn } from "./store";

const defaultModel: TransactionModel = {
    id: "",
    description: "",
    personId: "",
    transactionType: "EXPENSE",
    value: 0,
};

export let { model: transactionModel, useModel: useTransactionModel } =
    proxy<Partial<TransactionModel>>(defaultModel);

const transactionEditModels = new Map<
    string,
    ProxyReturn<Partial<TransactionModel>>
>();

export let getTransactionEditModel = (id: string) => {
    let proxyModel: ProxyReturn<Partial<TransactionModel>> | undefined;
    if (!(proxyModel = transactionEditModels.get(id))) {
        proxyModel = proxy(defaultModel as Partial<TransactionModel>);
        transactionEditModels.set(id, proxyModel);
    }
    return proxyModel!;
};
