const commander = require('commander');

const App_Logic = require('./app_logics/dic_func');

const Game = require('./app_logics/game');

commander
  .version('1.0.0')
  .description('Word Help');

commander
  .command('dic <word>')
  .description('Dictionary of word')
  .action((word) => {
      App_Logic.dic_displayAll(word);
  });


commander
  .command('def <word>')
  .description('Definitions of word')
  .action((word) => {
      App_Logic.dic_definitions(word);
  });

commander
  .command('syn <word>')
  .description('Synonyms of word')
  .action((word) => {
  		App_Logic.dic_synonyms(word);
  });


commander
  .command('ant <word>')
  .description('Antonyms of word')
  .action((word) => {
  		App_Logic.dic_antonyms(word);
  });


commander
  .command('ex <word>')
  .description('Examples of word')
  .action((word) => {
  		App_Logic.dic_examples(word);
  });

commander
  .command('play')
  .description('Word Guessting Game')
  .action(() => {
  		
  		Game.generateRandomWord();

  });


// for command like wordhelp only
 
if (process.argv.length < 3) {
  App_Logic.dic_wordoftheday();
}


// for command like wordhelp dict <word>  or wordhelp <word>

if (process.argv.length == 3 || process.argv.length == 4) {
  if(process.argv.length == 4){
    if(process.argv[2] === "dict"){
      App_Logic.dic_displayAll(process.argv[3]);
    }
  }else{
    if(process.argv[2] !== "play")
      App_Logic.dic_displayAll(process.argv[2]);
  }
}


commander.parse(process.argv);