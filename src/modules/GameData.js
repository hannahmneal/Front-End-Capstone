// This module holds the GET fetches that were originally set up in AppControl

const remoteURL = "http://localhost:5002";
// const dataSet = `${dataSet}`

export default {
  // http://localhost:5002/games?userId=1&_expand=category

  get(id) {
    return fetch(`${remoteURL}/games/${id}`).then(r => r.json());
  },

  getAllGamesAndCategories() {
    return fetch(`${remoteURL}/games?_expand=category`).then(r => r.json());
  },

  getSpecificGame(id) {
    return fetch(`${remoteURL}/games/${id}?_expand=category`).then(r =>
      r.json()
    );
  },

  getAllCategories() {
    return fetch(`${remoteURL}/categories`).then(r => r.json());
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
  },

// games of a specific game id and user id:
// http://localhost:5002/games?id=1&?userId=1&_expand=category
// `${remoteURL}/games?id=${gameId}&?userId=${userId}&_expand=category`

  editThisGame(id, editedGameObj) {
    // return fetch(`${remoteURL}/games/${gameId}`, {
        return fetch(`${remoteURL}/games/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedGameObj)
    });
  }
}

// T-error:
//   .then(res => res.text())          // convert to plain text
//   .then(text => console.log(text))
