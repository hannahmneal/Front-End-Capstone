// Fetch calls to "Users" in JSON


const remoteURL = "http://localhost:5002/users"

export default {

    // getUser(id) {
    //     return fetch(`${remoteURL}`)
    //     .then()
    // }

    getAllUsers() {

        return fetch(`${remoteURL}`)
        .then(r => r.json())
    },

    //Users URL structure:
    // http://localhost:5002/users?username=hannahmneal&password=pass

    getUser(nameInput, passInput){
        return fetch(`${remoteURL}?username=${nameInput}&password=${passInput}`)
        .then(r => r.json())
    },

    // http://localhost:5002/users/1?_embed=games
    getUsersGames(id) {
        return fetch (`${remoteURL}/${id}?_embed=games`)
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