// This module holds the GET fetches that were originally set up in AppControl

const remoteURL = "http://localhost:5002"
// const dataSet = `${dataSet}`

export default {

    get(id) {
        return fetch(`${remoteURL}/${id}`).then(r => r.json())
      },

    getAllGames() {
        return fetch(`${remoteURL}/games`)
        .then(r => r.json())
    },

    getAllUsers() {
        return fetch(`${remoteURL}/users`)
        .then(r => r.json())
    },

    getAllCategories() {
        return fetch(`${remoteURL}/categories`)
        .then(r => r.json())
    },

    post(newGameObj) {
        console.log(newGameObj);
    return fetch(`${remoteURL}/games`, {
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newGameObj)
        }).then(r => r.json());
    }
}
