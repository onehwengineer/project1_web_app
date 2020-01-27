'use strict';

const API = "YOUR_API_KEY";
const yelp = require('yelp-fusion');
const client = yelp.client(API);

var params = {};

exports.handler = async (event) => {
    
    var items_from_each_query_a = [] 
    
    params = { 
      term: "chinese restaurant",
      latitude: event.LAT,
      longitude: event.LNG,
      limit: 3,
    };
    
    try {
        // [1] SEARCH YELP
        const data = await client.search( params )
        // [2] PROCESS RETRIEVED DATA
        .then( response => {
            for (var each_business of response.jsonBody.businesses){
            	items_from_each_query_a.push( each_business );
            }
        });
    } catch (error){
        console.log( "[index.js] Status code : 400, Error code : ", error.stack);
    }
    
    // [3] RETURN QUERY RESULTS
    return items_from_each_query_a;
};