// Fetch calls for "Users"

const remoteURL = "http://localhost:5002"

export default {

    getAllUsers() {
        return fetch(`${remoteURL}/users`)
        .then(r => r.json())
    },

    //Users URL structure:
    // http://localhost:5002/users?username=hannahmneal&password=pass

    getUser(nameInput, passInput){
        return fetch(`${remoteURL}/users?username=${nameInput}&password=${passInput}`)
        .then(r => r.json())
    },

    getUserById(id){
        return fetch(`${remoteURL}/users/${id}`)
        .then(r => r.json())
    },

    // User-specific games URL with categories:
    // http://localhost:5002/games?userId=1&_expand=category

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
// Other URL combinations (for reference):

    // http://localhost:5002/users?_embed=games&_embed_category
    // returns: users = [ {games=[{...}] } ]

    // http://localhost:5002/games?userId=1&_expand=user&_expand=category
    // returns: games = [{user's games  user = {...} category = {...}]
