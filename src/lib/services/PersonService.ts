import { api } from "./axios";
import { PersonModel } from "@/prisma/models";
const PersonService = {
    getAll: async () => {
        return await api
            .get("/Person")
            .then(async (response) => {
                let temp = [];
                temp = response.data;
                if (temp.length === 0) {
                    temp = [{ id: "  -  ", name: " - " }];
                    return temp;
                }
                return temp;
            })
            .catch((error) => {
                var temp = [{ id: "  -  ", name: " - " }];
                return temp;
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
            .catch((error) => {
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
