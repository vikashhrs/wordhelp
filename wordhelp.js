const commander = require('commander');

const App_Logic = require('./app_logics/app_logic');

commander
  .version('1.0.0')
  .description('Word Help');


commander
  .command('word_of_the_day')
  .description("Word of the day")
  .action(App_Logic.wordOfTheDay());


commander.parse(process.argv);