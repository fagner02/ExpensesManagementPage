import { TransactionModel } from "@/prisma/models";
import { api } from "./axios";

const TransactionService = {
    getAll: async (pagination: {
        page: number;
        pageSize: number;
    }): Promise<{ transactions: TransactionModel[]; totalCount: number }> => {
        return await api
            .get(
                `Transaction?page=${pagination.page}&pageSize=${pagination.pageSize}`,
            )
            .then(async (response) => {
                let temp = await response.data;
                return temp;
            })
            .catch(() => {
                return { transactions: [], totalCount: 0 };
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
            .catch(() => {
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
            .catch(() => {
                return { count: 0 };
            });
    },
    delete: async (id: string) => {
        return await api.delete(`Transaction/${id}`);
    },
    post: async (data: Partial<TransactionModel>) => {
        return await api.post("Transaction", data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    },
    put: async (data: Partial<TransactionModel>) => {
        return await api.post("Transaction", data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    },
};
export default TransactionService;
