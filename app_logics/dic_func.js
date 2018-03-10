const requests = require('./api_calls');
const chalk = require("chalk");


module.exports.dic_synonyms = function(word){

	requests
		.synonymsOfWord(word)
		.then(function(jsonData){

			displaySynonyms(jsonData, word);

		})
		.catch(function(err){
			console.log(err)
		});
}

module.exports.dic_antonyms = function(word){

	requests
		.antonymsOfWord(word)
		.then(function(jsonData){

			displayAntonyms(jsonData, word);

		})
		.catch(function(err){
			console.log(err)
		});
}

module.exports.dic_examples = function(word){

	requests
		.examplesOfWord(word)
		.then(function(jsonData){

			displayExamples(jsonData, word);

		})
		.catch(function(err){
			console.log(err)
		});
}

module.exports.dic_wordoftheday = function(){

	requests
		.wordOfTheDay()
		.then(function(jsonData){

			console.log("Todays Word : " + chalk.green(jsonData.word));
    		console.log("Published On : " + jsonData.publishDate);
    		console.log("Note About Word : " + jsonData.note);
    		console.log();
    		console.log(chalk.bgCyan("Look at few examples below :"));
    		jsonData.examples.forEach(function(example){
    			console.log(chalk.yellow("Title : ")+example.title);
    			console.log(chalk.yellow("Text : ")+example.text);
    			console.log();
    		});
    		console.log(chalk.bgCyan("What the defination is ?"));
    		jsonData.definitions.forEach(function(term){
    			console.log(chalk.yellow("Text : ")+chalk.blue(term.text));
    			console.log(chalk.yellow("Part of speech : ")+chalk.blue(term.partOfSpeech));
    			console.log(chalk.yellow("Source : ")+chalk.blue(term.partOfSpeech));
    			console.log();
    		});

		})
		.catch(function(err){
			console.log(chalk.bgRed("Something went wrong!"));
		})
}

module.exports.dic_definitions = function(word){

	requests
		.definitionsOfWord(word)
		.then(function(jsonData){

			displayDefinitions(jsonData, word);

		})
		.catch(function(err){

			console.log(chalk.bgRed("Something went wrong!"));

		})
}

module.exports.dic_displayAll = function(word){

	console.log(word)

	let listOfPromises = [
		requests.definitionsOfWord(word),
		requests.synonymsOfWord(word),
		requests.antonymsOfWord(word),
		requests.examplesOfWord(word)
	];

	Promise
		.all(listOfPromises)
		.then(function(jsonData){

			displayDefinitions(jsonData[0],word);

		})
		.catch(function(err){
			console.log(err);
		});
}


function displaySynonyms(jsonData, word){

	if(jsonData.length != 0){

		let words = jsonData[0].words;

		console.log("Synonyms of word, "+chalk.green(word)+" are "+chalk.green(words))
	}else{
		console.log("We are not having any synonyms for word, "+chalk.green(word)+" as of now!")
	}
}

function displayAntonyms(jsonData, word){

	if(jsonData.length != 0){

		let words = jsonData[0].words;

		console.log("Antonyms of word, "+chalk.green(word)+" are "+chalk.green(words))
	}else{
		console.log("We are not having any antonym for word, "+chalk.green(word)+" as of now!")
	}

}

function displayExamples(jsonData, word){

	if(jsonData.examples.length != 0){

		console.log("Examples of your word, "+chalk.green(word));

		let examples = jsonData.examples;

		examples.forEach(function(example){
			console.log(chalk.yellow("Title : ") + chalk.cyan(example.title));
			console.log(chalk.yellow("Text : ") + chalk.cyan(example.text));
			console.log();
		});

    }else{

    	console.log(chalk.bgRed("Sorry! No examples at this time."))

    }

}

function displayDefinitions(jsonData, word){

	if(jsonData.length != 0){

    	console.log("Below few definitions of your word, "+chalk.green(word));


    	jsonData.forEach(function(terms){
			console.log(chalk.cyan(terms.text));
			console.log();
    	});

    }else{

    	console.log(chalk.bgRed("Sorry! No examples at this time."))

    }

}
