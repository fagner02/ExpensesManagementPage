import axios from "axios";
const PersonFetch = {
    getAll: async () => {
        return axios
            .get(import.meta.env.VITE_API_URL + "/Person/TotalBalance")
            .then(async (response) => {
                console.log(import.meta.env.VITE_API_URL);
                console.log(response.request);
                let temp = [];
                temp = await response.data;
                if (temp.people.length === 0) {
                    temp.people = [{ id: "  -  ", name: " - " }];
                    return temp;
                }
                return temp;
            })
            .catch((error) => {
                console.log(error);
                var temp = { people: [{ id: "  -  ", name: " - " }] };
                return temp;
            });
    },
    getById: async (id) => {
        var result = await fetch(import.meta.VITE_API_URL + "Person/" + id)
            .then(async (response) => {
                let temp = {};
                temp = await response.json();
                return temp;
            })
            .catch((error) => {
                return null;
            });
        return result;
    },
    post: (data) => {
        return fetch(import.meta.VITE_API_URL + "Person", {
            body: JSON.stringify(data),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
    },
    delete: async (ids) => {
        await fetch(import.meta.VITE_API_URL + "Person", {
            method: "DELETE",
            body: JSON.stringify(ids),
            headers: {
                "Content-Type": "application/json",
            },
        });
    },
    put: async (data) => {
        await fetch(import.meta.VITE_API_URL + "Person", {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });
    },
};
export default PersonFetch;
