// Fetch calls for "Users"

const remoteURL = "http://localhost:5002"

export default {

    getAllUsers() {
        return fetch(`${remoteURL}/users`)
        .then(r => r.json())
    },
//============================================================

    //Users URL structure:
    // http://localhost:5002/users?username=hannahmneal&password=pass

    getUser(nameInput, passInput){
        return fetch(`${remoteURL}/users?username=${nameInput}&password=${passInput}`)
        .then(r => r.json())
    },
//==============================================================

// Used in AppControl for the setUser() function (to reset the global user state):

    getUserById(id){
        return fetch(`${remoteURL}/users/${id}`)
        .then(r => r.json())
    },


    getUsersGames(userId) {
        return fetch (`${remoteURL}/games?userId=${userId}&_expand=category`)
        .then(r=> r.json())
    },

    postUser(newUserObj) {
        console.log(newUserObj);
        return fetch(`${remoteURL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUserObj)
        }).then(r => r.json());
    }

}
//==============================================================
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

