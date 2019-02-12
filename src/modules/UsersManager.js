// Fetch calls to "Users" in JSON


const remoteURL = "http://localhost:5002/users"

export default {

    getAllUsers() {

        return fetch(`${remoteURL}`)
        .then(r => r.json())
    },

    getUser(userInput, passInput){
        return fetch(`${remoteURL}?userName=${userInput}&password=${passInput}`).then(r => r.json())
    },

    postUser(newUserObj) {
        console.log(newUserObj);
        return fetch(`${remoteURL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUserObj)
        }).then(r => r.json());
    }
}


