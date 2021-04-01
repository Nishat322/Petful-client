import REACT_APP_API_BASE from "../config";

const PetfulApiService = {
  getAllPets() {
    return fetch(`${REACT_APP_API_BASE}/pets`)
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .catch((error) => console.error(error));
  },

  getPeople() {
    return fetch(`${REACT_APP_API_BASE}/people`, {
      headers: {},
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .catch((error) => console.error(error));
  },

  postPeople(name) {
    return fetch(`${REACT_APP_API_BASE}/people`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  deletePerson() {
    return fetch(`${REACT_APP_API_BASE}/people`, {
      method: "DELETE",
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  dequeuePet(pet) {
    return fetch(`${REACT_APP_API_BASE}/pets`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ type: pet }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

export default PetfulApiService