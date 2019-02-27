const axios = require('axios')

const BASEURL = 'https://www.googleapis.com/books/v1/volumes?q=';

var API = {
    search: function(query) {
        console.log (BASEURL + query);
        return axios.get(BASEURL + query);
    }
    
}

// Export an object with a "search" method that searches the Giphy API for the passed query
module.exports = API;
