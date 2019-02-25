// This module contains fetch calls for filters.

const remoteURL = "http://localhost:5002";

export default {

    getFilteredPlayers(min, max) {
        // This URL was tested in the browser and it does indeed work to filter games by min and max players:
        return fetch (`${remoteURL}/games?minPlayers_gte=${min}?&maxPlayers_lte=${max}`)
        .then(r => r.json());
    }

}



//JSON SERVER DOCUMENTATION:
// Operators

// Add _gte or _lte for getting a range
// GET /posts?views_gte=10&views_lte=20

// Add _ne to exclude a value
// GET /posts?id_ne=1

// Add _like to filter (RegExp supported)
// GET /posts?title_like=server