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
			console.log(word);
			listOfPromises = [

				requests.definitionsOfWord(word),
				requests.synonymsOfWord(word)
			];


			Promise
				.all(listOfPromises)
				.then(function(data){

					let listOfSynonyms = getListOfWords(data[1]);

					console.log(listOfSynonyms);

					playRecursive(word, listOfSynonyms);
				})
				.catch(function(err){
					console.log(err);
				});

		})
		.catch(function(err){

			console.log(err);

		});

}

function getListOfWords(jsonOject){

		let emptyList = [];
		return jsonOject.length != 0 ? jsonOject[0].words : emptyList;

}

function playRecursive(word,listOfSynonyms){
		
		inquirer
		.prompt(takeInputQuestion)
		.then(function(input){
			
			if(input.word == word || listOfSynonyms.includes(input.word))
				console.log("Congo!! You won.");
			else{

				console.log(chalk.red("You are not right!"))

				inquirer
					.prompt(choicesQuestion)
					.then(function(selectedChoice){

						if(selectedChoice.choice === "Try Again"){
						
							playRecursive(word, listOfSynonyms);

						}else if(selectedChoice.choice === "Help me with an hint"){
							console.log("Scrambled Word of the actual word is ",chalk.green(scrambeWord(word)))
							playRecursive(word, listOfSynonyms);

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