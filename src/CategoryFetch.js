const CategoryFetch = {
  getAll: async () => {
    return await fetch(process.env.REACT_APP_API + "Transaction")
      .then(async (response) => {
        let temp = [];
        temp = await response.json();
        if (temp.length === 0) {
          console.log("No categories found");
          return [
            {
              id: "  -  ",
              type: " - ",
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
  getDetail: async (id) => {
    return await fetch(process.env.REACT_APP_API + "Person/" + id + "/products")
      .then(async (response) => {
        let temp = [];
        temp = await response.json();
        return temp;
      })
      .catch((error) => {
        return [];
      });
  },
  post: (data) => {
    return fetch(process.env.REACT_APP_API + "Transaction", {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  delete: async (id) => {
    await fetch(process.env.REACT_APP_API + "Person/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
export default CategoryFetch;
