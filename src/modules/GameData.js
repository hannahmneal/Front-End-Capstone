// This module holds the GET fetches that were originally set up in AppControl

const remoteURL = "http://localhost:5002";
// const dataSet = `${dataSet}`

export default {

//===============================================================================

  get(id) {
    return fetch(`${remoteURL}/games/${id}`).then(r => r.json());
  },
  // Used within componentDidMount() in the GameEditForm component to pre-load the edit form with the specific game's data from state.

//===============================================================================
// This fetch is currently unused:

  // getAllGamesAndCategories() {
  //   return fetch(`${remoteURL}/games?_expand=category`).then(r => r.json());
  // },
//===============================================================================
// This fetch is currently unused:

  // getSpecificGame(id) {
  //   return fetch(`${remoteURL}/games/${id}?_expand=category`).then(r =>
  //     r.json()
  //   );
  // },
//===============================================================================
// This is only used in componentDidMount() in AppControl:

  getAllCategories() {
    return fetch(`${remoteURL}/categories`).then(r => r.json());
  },
//===============================================================================

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

  editThisGame(id, editedGameObj) {
    return fetch(`${remoteURL}/games/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedGameObj)
    });
  }
}

//=============================================================================
// URLs with Json array/object format representations (for reference):

// All game objects in games[] with categories[] nested inside
  // http://localhost:5002/games?userId=1&_expand=category
  // games = [ 0: { ... category: { ... } }, 1: {... category: {...} } etc. ]

// Games of a specific game id and user id:
  // http://localhost:5002/games?id=1&?userId=1&_expand=category
  // games = [ 0: { ... category: { ... } } ]

// All users as objects, with each user's games embedded as an array:
  // http://localhost:5002/users?_embed=games&_embed_category
  // users = [ {user object: {... user's games array = [ {...}, {...} ] }, user object: {... games = [{...}] } ]

// All games for a specific user, with the user info embedded, as well as the category embedded:
  // http://localhost:5002/games?userId=1&_expand=user&_expand=category
  // games of user 1 = [ 0: game object: { user object: {...}, category object: {...}]

