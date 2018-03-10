const commander = require('commander');

const App_Logic = require('./app_logics/dic_func');

const Game = require('./app_logics/game');

commander
  .version('1.0.0')
  .description('Word Help');


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

// commander
//   .command('dict <word>')
//   .description('All details of word')
//   .action((word) => {
//     console.log(word)
//           App_Logic.dic_displayAll(word);
//   });

commander
  .command('[words...]')
  .description('All details of word')
  .action((words) => {
          console.log(words)
  });



commander
  .command('play')
  .description('Word Guessting Game')
  .action(() => {
  		
  		Game.generateRandomWord();

  });


// commander
//   .command('')
//   .description("Word of the day")
//   .action(App_Logic.dic_wordoftheday());



commander.parse(process.argv);