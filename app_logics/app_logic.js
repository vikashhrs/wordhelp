
const request = require('request');
const colors = require('colors');
const auth = require('./../auth/auth');
const moment = require('moment');

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
