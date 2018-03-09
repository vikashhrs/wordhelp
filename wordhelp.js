const commander = require('commander');

const App_Logic = require('./app_logics/app_logic');

commander
  .version('1.0.0')
  .description('Word Help');


commander
  .command('word_of_the_day')
  .description("Word of the day")
  .action(App_Logic.wordOfTheDay());


commander
  .command('synonym_of <word>')
  .description('Synonyms of word')
  .action((word) => {
  	console.log(word);
  		App_Logic.synonymsOfWord(word);
  });



commander
  .command('antonym_of <word>')
  .description('Antonyms of word')
  .action((word) => {
  	console.log(word);
  		App_Logic.antonymsOfWord(word);
  });


commander
  .command('examples_of <word>')
  .description('Examples of word')
  .action((word) => {
  		App_Logic.examplesOfWord(word);
  });

commander
  .command('dictionary_of [words...]')
  .description('Examples of word')
  .action((words) => {
  		if(words.length == 2){
  			if(word[0] != "dict"){
  				console.log("Invalid Command");
  			}else{
  				console.log("Valid Commands");
  			}
  		}else{

  		}
  });



commander.parse(process.argv);