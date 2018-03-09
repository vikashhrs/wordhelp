
const request = require('request');
const colors = require('colors');
const auth = require('./../auth/auth');
const moment = require('moment');
const chalk = require('chalk');

const rootUrl = "http://api.wordnik.com:80/v4/words.json/";

module.exports.wordOfTheDay = function(){

	let todaysDate = new moment().format("YYYY-DD-MM");
	
	request.get(
			{
				url: rootUrl + "wordOfTheDay", 
				qs : { "date" : todaysDate, "api_key" : auth.api_key}
			}, function(err, response, body) {
		    	if(err){
		    		throw err;
		    	}else{
		    		console.log("Todays Word : " + JSON.parse(body).word.bgCyan);
		    		console.log("Published On : " + JSON.parse(body).publishDate.bgCyan);
		    		console.log("Note About Word : " + JSON.parse(body).note.bgCyan);
		    		console.log();
		    		console.log("Look at few examples below :")
		    		JSON.parse(body).examples.forEach(function(example){
		    			console.log("Title : "+example.title.bgYellow);
		    			console.log("Text : "+example.text.bgYellow);
		    			console.log();
		    		});
		    		console.log("What the defination is ?");
		    		JSON.parse(body).definitions.forEach(function(term){
		    			console.log("Text : "+term.text.bgMagenta);
		    			console.log("Part of speech : "+term.partOfSpeech.bgMagenta);
		    			console.log("Source : "+term.partOfSpeech.bgMagenta);
		    			console.log();
		    		});
		    	}
		    }
	)
}

module.exports.synonymsOfWord = function(word, limit = 5){
	console.log(word,limit)
	request.get(
			{
				url: "http://api.wordnik.com:80/v4/word.json/" + word + "/relatedWords", 
				qs : { 
					"useCanonical" : true, 
					"relationshipTypes" : "synonym",
					"limitPerRelationshipType" : limit,
					"api_key" : auth.api_key
				}
			}, function(err, response, body) {

				let jsonBody = JSON.parse(body);
		    	
		    	if(err){
		    		throw err;
		    	}else{
		    		if(jsonBody.length != 0){

		    			console.log("Synonyms of your word, "+chalk.bgYellow(word)+" are "+chalk.bgGreen(jsonBody[0].words))

		    		}else{

		    			console.log(chalk.bgRed("Sorry! No Synonyms at this time."))

		    		}
		    	}
		    }
	)
}

module.exports.antonymsOfWord = function(word, limit = 5){
	console.log(word,limit)
	request.get(
			{
				url: "http://api.wordnik.com:80/v4/word.json/" + word + "/relatedWords", 
				qs : { 
					"useCanonical" : true, 
					"relationshipTypes" : "antonym",
					"limitPerRelationshipType" : limit,
					"api_key" : auth.api_key
				}
			}, function(err, response, body) {

		    	let jsonBody = JSON.parse(body);

		    	if(err){
		    		throw err;
		    	}else{
		    		
		    		if(jsonBody.length != 0){

		    			console.log("Antonyms of your word, "+chalk.bgYellow(word)+" are "+chalk.bgGreen(jsonBody[0].words))

		    		}else{

		    			console.log(chalk.bgRed("Sorry! No antonyms at this time."))

		    		}
		    	}
		    }
	)
}

module.exports.examplesOfWord = function(word, skip = 0,limit = 5){

	request.get(
			{
				url: "http://api.wordnik.com:80/v4/word.json/" + word + "/examples", 
				qs : { 
					"includeDuplicates" : false, 
					"useCanonical" : false,
					"skip" : skip,
					"limit" : limit,
					"api_key" : auth.api_key
				}
			}, function(err, response, body) {

		    	let jsonBody = JSON.parse(body);

		    	if(err){
		    		throw err;
		    	}else{
		    		
		    		if(jsonBody.examples.length != 0){

		    			console.log("Examples of your word, "+chalk.green(word));

		    			let examples = jsonBody.examples;

		    			examples.forEach(function(example){
		    				console.log("Title : " + chalk.cyan(example.title));
		    				console.log("Text : " + chalk.cyan(example.text));
		    				console.log();
		    			});

		    		}else{

		    			console.log(chalk.bgRed("Sorry! No examples at this time."))

		    		}
		    	}
		    }
	)
}

module.exports.definitionsOfWord = function(word, limit = 5){

	request.get(
			{
				url: "http://api.wordnik.com:80/v4/word.json/" + word + "/definitions", 
				qs : { 
					"limit" : limit, 
					"includeRelated" : true,
					"sourceDictionaries" : "all",
					"useCanonical" : false,
					"includeTags" : false,
					"api_key" : auth.api_key
				}
			}, function(err, response, body) {

		    	let jsonDefinitions = JSON.parse(body);

		    	if(err){
		    		throw err;
		    	}else{
		    		
		    		if(jsonDefinitions.length != 0){

		    			console.log("Definitions of your word, "+chalk.green(word));


		    			jsonDefinitions.forEach(function(terms){
		    				console.log(chalk.cyan(terms.text));
		    				console.log();
		    			});

		    		}else{

		    			console.log(chalk.bgRed("Sorry! No examples at this time."))

		    		}
		    	}
		    }
	)
}
