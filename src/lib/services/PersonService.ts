import { Pagination } from "../store/pagination";
import { api } from "./axios";
import { PersonModel } from "@/prisma/models";
const PersonService = {
    getAll: async (
        pagination: Pagination,
    ): Promise<{ people: []; totalCount: number }> => {
        return await api
            .get(
                `/Person?page=${pagination.page}&pageSize=${pagination.pageSize}`,
            )
            .then(async (response) => {
                let temp = response.data;
                return temp;
            })
            .catch(() => {
                return [];
            });
    },
    getById: async (id: string) => {
        var result = await api
            .get("Person/" + id)
            .then(async (response) => {
                let temp = {};
                temp = await response.data;
                return temp;
            })
            .catch(() => {
                return null;
            });
        return result;
    },
    post: async (data: Partial<PersonModel>) => {
        return await api.post("Person", data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    },
    delete: async (id: string) => {
        await api.delete(`Person/${id}`);
    },
    put: async (data: Partial<PersonModel>) => {
        await api.put(`Person/${data.id}`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    },
};
export default PersonService;
