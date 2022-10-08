const PersonFetch = {
  getAll: async () => {
    return await fetch(process.env.REACT_APP_API + "Person/TotalBalance")
      .then(async (response) => {
        let temp = [];
        temp = await response.json();
        if (temp.people.length === 0) {
          temp.people = [{ id: "  -  ", name: " - " }];
          return temp;
        }
        return temp;
      })
      .catch((error) => {
        var temp = { people: [{ id: "  -  ", name: " - " }] };
        return temp;
      });
  },
  getById: async (id) => {
    var result = await fetch(process.env.REACT_APP_API + "Person/" + id)
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
    return fetch(process.env.REACT_APP_API + "Person", {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  delete: async (ids) => {
    await fetch(process.env.REACT_APP_API + "Person", {
      method: "DELETE",
      body: JSON.stringify(ids),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  put: async (data) => {
    await fetch(process.env.REACT_APP_API + "Person", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
export default PersonFetch;
