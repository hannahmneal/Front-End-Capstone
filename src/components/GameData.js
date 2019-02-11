// This module holds the GET fetches that were originally set up in AppControl

const remoteURL = "http://localhost:5002"
// const dataSet = `${dataSet}`

export default {

    get(id) {
        return fetch(`${remoteURL}/games/${id}`)
        .then(r => r.json())
      },

    getAllGames() {
        return fetch(`${remoteURL}/games?_expand=category`)
        .then(r => r.json())
//         .then(res => res.text())          // convert to plain text
//   .then(text => console.log(text))
    },
// Produces T error

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
    // The newGameObj is created in GameForm, within constructNewGame; it is triggered on form submit
        return fetch(`${remoteURL}/games`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newGameObj)
        }).then(r => r.json());
    }
}
