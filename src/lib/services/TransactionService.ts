import { TransactionModel } from "@/prisma/models";
import { api } from "./axios";
const TransactionFetch = {
    getAll: async () => {
        return await api
            .get("Transaction")
            .then(async (response) => {
                let temp = [];
                temp = await response.data;
                if (temp.length === 0) {
                    return [
                        {
                            id: "  -  ",
                            transactionType: " - ",
                            value: " - ",
                            personId: " - ",
                            description: " - ",
                        },
                    ];
                }
                return temp;
            })
            .catch((error) => {
                return [
                    {
                        id: "  -  ",
                        type: " - ",
                        value: " - ",
                        personId: " - ",
                        description: " - ",
                    },
                ];
            });
    },
    getDetail: async (id: string) => {
        return await api
            .get("Person/" + id + "/products")
            .then(async (response) => {
                let temp = [];
                temp = await response.data();
                return temp;
            })
            .catch((error) => {
                return [];
            });
    },
    getCount: async () => {
        return await api
            .get("Transaction/Count")
            .then(async (response) => {
                let temp = { count: 0 };
                temp = await response.data();
                return temp;
            })
            .catch((error) => {
                return { count: 0 };
            });
    },
    post: (data: Partial<TransactionModel>) => {
        return api.post("Transaction", JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json",
            },
        });
    },
};
export default TransactionFetch;
