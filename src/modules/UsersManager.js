// Fetch calls to "Users" in JSON


const remoteURL = "http://localhost:5002"

export default {

    getAllUsers() {

        return fetch(`${remoteURL}/users`)
        .then(r => r.json())
    },


    getUser(usernameInput, passInput){
        return fetch(`${remoteURL}/users?username=${usernameInput}&password=${passInput}`)
// http://localhost:5002/users?username=hannahmneal&password=pass
// returns: users = [{matched user object}]
        .then(r => r.json())
    },

    getUsersGames(userId) {
        return fetch (`${remoteURL}/games?userId=${userId}&_expand=category`)
// http://localhost:5002/games?userId=1&_expand=category
// returns: games = [{games of user, "category" = {...} }]
        .then(r => r.json())
    }

//     postUser(newUserObj) {
//         console.log(newUserObj);
//         return fetch(`${remoteURL}`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(newUserObj)
//         }).then(r => r.json());
//     }
}


// Pass parameters into URL
// Set session storage with id
// No need for a forEach()