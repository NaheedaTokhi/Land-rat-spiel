import readlineSync from 'readline-sync';
import chalk from 'chalk';

console.log(chalk.hex("#6A5ACD").bold('Willkommen beim Landratespiel!'));
console.log(chalk.hex("#6A5ACD").bold('Versuchen Sie das Land zu erraten.'))

const lands = ['Asien','Europa','Amerika','Afrika'];
const asia=['Myanmar','Kuwait','Yemen','Iraq','Maldive','Nepal']
const europa=['Belarus','Austria','Georgia','Italy','Sweden']
const america=['Mexico','Peru','Chile','Haiti','Cuba','Panama']
const africa=['Egypt','Gabon','Niger','Gambia','Libya','Ghana','Kenya']
function getRandomLand() {
console.log(chalk.hex("#6A5ACD").bold('Welchen Kontinent wählen Sie? a / b / c oder d:'));
const continent = readlineSync.question(chalk.hex("#8A2BE2").bold('a: Asien \nb: Europa \nc: Amerika \nd: Afrika \n'));
  switch(continent){
    case "a":
    return asia[Math.floor(Math.random() * asia.length)].toLowerCase();
    case "b":
    return europa[Math.floor(Math.random() * europa.length)].toLowerCase();
    case "c":
    return america[Math.floor(Math.random() * america.length)].toLowerCase();
    case "d":
    return africa[Math.floor(Math.random() * africa.length)].toLowerCase();
  }
}
function displayWord(word, guessedLetters) {
  let display = '';
  for (const letter of word) {
    if (guessedLetters.includes(letter)) {
      display += letter + ' ';
    } else {
      display += '_ ';
    }
  }
  console.log(chalk.green(display.trim().charAt(0).toUpperCase()+display.trim().slice(1)));
}

function playGame(round) {
  const secretWord = getRandomLand();
  const guessedLetters = [];
  let incorrectGuesses = 0;
  const maxIncorrectGuesses = 10;

  console.log(chalk.hex("#8A2BE2").bold(`Runde: ${round}\n`));

  while (incorrectGuesses < maxIncorrectGuesses) {
    displayWord(secretWord, guessedLetters);
    console.log(`Falsche Vermutungen:`,chalk.red(` ${incorrectGuesses}/${maxIncorrectGuesses}`));
 

   // const guess = readlineSync.question(chalk.hex("#6A5ACD"),'Errate einen Buchstaben: ').toLowerCase();
    const colorText = chalk.hex("#6A5ACD")('Errate einen Buchstaben: ');
    const guess = readlineSync.question(colorText).toLowerCase();

    if (guess.length !== 1 || !/[a-z]/.test(guess)) {
      console.log(chalk.red(`Bitte geben Sie einen einzelnen Buchstaben ein.`));
      continue;
    }

    if (guessedLetters.includes(guess)) {
      console.log(chalk.red('Sie haben diesen Buchstaben bereits erraten.'));
      continue;
    }

    guessedLetters.push(guess);

    if (secretWord.includes(guess)) {
      console.log(chalk.green(`Richtige Vermutung!\n`));
    } else {
      incorrectGuesses++;
      console.log(chalk.red(`Falsche Vermutung!\n`));
    }

    if (secretWord.split('').every(letter => guessedLetters.includes(letter))) {
      console.log(chalk.hex("#6A5ACD")`Sie haben das Wort erraten:`,` ${chalk.green(secretWord.charAt(0).toUpperCase()+secretWord.slice(1))}`);
      console.log(chalk.hex("#6A5ACD")`Herzlichen Glückwunsch, Sie haben gewonnen!`);
      return;
    }
  }

  console.log(chalk.red(`Sie haben keinen Chance mehr. Das Wort war:`,`${chalk.green(secretWord.charAt(0).toUpperCase()+secretWord.slice(1))}`));
  console.log(chalk.red(chalk.hex("#6A5ACD")`Nächstes Mal mehr Glück!`));
}

let round = 1;
do {
  playGame(round);
  round++;
  const nextRound = `\nWollen Sie nochmal spielen? \nTippen Sie bitte' ${chalk.hex("#6A5ACD").bold('J')} für ${chalk.hex("#6A5ACD").bold('Ja')} und ${chalk.hex("#6A5ACD").bold('N')} für ${chalk.hex("#6A5ACD").bold('Nein')}: `;
const input = readlineSync.question(nextRound).toLowerCase();
  if (input === 'n') {
    break;
  }
} while (true);

