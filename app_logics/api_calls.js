const request = require('request');

const requestPromise = require("request-promise");
const auth = require('./../auth/auth');
const moment = require('moment');

module.exports.wordOfTheDay = function(){

	let todaysDate = new moment().format("YYYY-DD-MM");

	let options = {

			method : "GET",

			uri : "http://api.wordnik.com:80/v4/words.json/" + "wordOfTheDay",

			qs : { 
					"date" : todaysDate, 
					"api_key" : auth.api_key
				},

			json : true
	}

	return requestPromise(options);
	
	// request.get(
	// 		{
	// 			url: rootUrl + "wordOfTheDay", 
	// 			qs : { 
	// 				"date" : todaysDate, 
	// 				"api_key" : auth.api_key
	// 			}
	// 		}, function(err, response, body) {

	// 			let jsonBody = JSON.parse(body);

	// 	    	if(err){
	// 	    		throw err;
	// 	    	}

	// 	    	return jsonBody;

	// 	    }
	// )
}

module.exports.synonymsOfWord = function(word, limit = 5){

	let options = {

			method : "GET",

			uri : "http://api.wordnik.com:80/v4/word.json/" + word + "/relatedWords",

			qs : { 
					"useCanonical" : true, 
					"relationshipTypes" : "synonym",
					"limitPerRelationshipType" : limit,
					"api_key" : auth.api_key
				},

			json : true
	}

	return requestPromise(options);
}

module.exports.antonymsOfWord = function(word, limit = 5){

	let options = {

			method : "GET",

			uri : "http://api.wordnik.com:80/v4/word.json/" + word + "/relatedWords",

			qs : { 
					"useCanonical" : true, 
					"relationshipTypes" : "antonym",
					"limitPerRelationshipType" : limit,
					"api_key" : auth.api_key
				},

			json : true
	}

	return requestPromise(options);
}

module.exports.examplesOfWord = function(word, skip = 0,limit = 5){


	let options = {

			method : "GET",

			uri : "http://api.wordnik.com:80/v4/word.json/" + word + "/examples",

			qs : { 
					"includeDuplicates" : false, 
					"useCanonical" : false,
					"skip" : skip,
					"limit" : limit,
					"api_key" : auth.api_key
				},

			json : true
	}

	return requestPromise(options);
}

module.exports.definitionsOfWord = function(word, limit = 5){

	let options = {

			method : "GET",

			uri : "http://api.wordnik.com:80/v4/word.json/" + word + "/definitions",

			qs : { 
					"limit" : limit, 
					"includeRelated" : true,
					"sourceDictionaries" : "all",
					"useCanonical" : false,
					"includeTags" : false,
					"api_key" : auth.api_key
				},

			json : true
	}

	return requestPromise(options);
}

module.exports.getRandomWord = function(){

	let options = {

		method : "GET",

		uri : "http://api.wordnik.com:80/v4/words.json"+ "/randomWord",

		qs : { 
				"hasDictionaryDef" : true, 
				"api_key" : auth.api_key
		},

		json : true
	}

	return requestPromise(options)
}
