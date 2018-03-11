const inquirer = require("inquirer");
const requests = require('./api_calls');
const chalk = require("chalk");

const takeInputQuestion = [
	{

	    type : 'input',
	    name : 'word',
	    message : 'Enter your guess : '

	}
]

const choicesQuestion = [
	{

		type : 'list',
		name : 'choice',
		choices : [
			"Try Again",
			"Help me with an hint",
			"Quit"
		],
		message : 'Select among the below.'

	}
];


module.exports.generateRandomWord = function(){

	let listOfPromises = [];

	requests
		.getRandomWord()
		.then(function(data){
			const word = data.word;
			listOfPromises = [

				requests.definitionsOfWord(word),
				requests.synonymsOfWord(word)
			];


			Promise
				.all(listOfPromises)
				.then(function(data){

					displayDefinitions(data[0]);

					let listOfCorrectWords = getListOfWords(data[1],word);

					playRecursive(listOfCorrectWords, word);
				})
				.catch(function(err){
					console.log(err);
				});

		})
		.catch(function(err){

			console.log(err);

		});

}

function getListOfWords(jsonOject,word){

		let wordList = [];
		if(jsonOject.length != 0){
			jsonOject[0].words.forEach(function(eachWord){
				wordList.push(eachWord.toLowerCase());
			})
		}
		wordList.push(word.toLowerCase());
		return word;

}

function playRecursive(listOfCorrectWords,word){
		
		inquirer
		.prompt(takeInputQuestion)
		.then(function(input){
			
			if(listOfCorrectWords.includes(input.word.trim().toLowerCase()))
				console.log("Congo!! You won.");
			else{

				console.log(chalk.red("You are not right!"))

				inquirer
					.prompt(choicesQuestion)
					.then(function(selectedChoice){

						if(selectedChoice.choice === "Try Again"){
						
							playRecursive(listOfCorrectWords);

						}else if(selectedChoice.choice === "Help me with an hint"){
							console.log("Scrambled Word of the actual word is ",chalk.green(scrambeWord(word)))
							playRecursive(listOfCorrectWords);

						}else{

							console.log("Game Ends");
						}
					})
			}	
		});	
}


function scrambeWord(wordToScramble) {
	wordToScramble = wordToScramble.split("");
	let i = wordToScramble.length;
    if (i == 0) return wordToScramble;
    while (--i) {
        let j = Math.floor(Math.random() * (i + 1 ));
        let a = wordToScramble[i];
        let b = wordToScramble[j];
        wordToScramble[i] = b;
        wordToScramble[j] = a;
    }
    return wordToScramble.join("");
}

function displayDefinitions(jsonData){

	console.log("Figure out the word from the definitions below");

	if(jsonData.length != 0){

    	jsonData.forEach(function(terms){
			console.log(chalk.cyan(terms.text));
			console.log();
    	});

    }else{

    	console.log(chalk.bgRed("Sorry! No definitions at this time."))

    }

}