const axios = require('axios')

const BASEURL = '/api/books';

var API = {
    search: function(query) {
        return axios.get(BASEURL + "?q=" + query);
    },
    save: function (book){
        return axios.post (BASEURL, book);
    },
    getAllSaveBooks: function(){
        console.log ("reading all saved books");
        return axios.get('/api/books/saved');
    },
    remove: function (bookId) {
        return axios.delete('/api/books/' + bookId);
    }
}

// Export an object with a "search" method that searches the Giphy API for the passed query
module.exports = API;
