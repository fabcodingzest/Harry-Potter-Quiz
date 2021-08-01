const readlineSync = require("readline-sync");
const chalk = require('chalk');

let score = 0;
const username = readlineSync.question("What is your name? \n")
const start = () => {
  console.log(`\nHello there Muggle! Welcome to ${chalk.blue.bold.bgYellowBright(' Harry Potter Quiz ')} \n`);
}



const levelOneQues = [
  {
    question: "Which Harry Potter word is now in the Oxford English Dictionary? \n",
    answer: "Muggle",
    type: "mcq",
    options: ["Hogwarts", "Muggle", "Voldemort"]
  },
  {
    question: "Who were Harry's parents? \n",
    answer: "James and Lily Potter",
    type: "mcq",
    options: ["Henry and Maggie Potter", "William and Elizabeth Potter", "James and Lily Potter"]
  },
  {
    question: "Who first shows Harry the diary of Tom Riddle? \n",
    answer: "Moaning Myrtle",
    type: "mcq",
    options: ["Moaning Myrtle", "Fawkes", "Nearly Headless Nick"]
  },
  {
    question: "Harry's father was lord Voledemort? \n",
    answer: false,
    type: "y/n"
  },
  {
    question: `Who kills Dumbledore at the end of "The Half-Blood Prince"? \n`,
    answer: "Snape",
    type: "question"
  },
]

const levelTwoQues = [
  {
    question: `In the epilogue to "Harry Potter and the Deathly Hallows," to whom is Harry married? \n`,
    answer: "Ginny Weasley",
    type: "mcq",
    options: ["Hermione Granger", "Ginny Weasley", "Cho Chang"]
  },
  {
    question: "The sorcerer's stone is an incredibly valuable magical item which provides immortality and unlimited wealth. Which item was NOT protecting its hiding place? \n",
    answer: "A Blast-Ended Skrewt",
    type: "mcq",
    options: ["A three-headed dog", "Snape's potions puzzle", "A Blast-Ended Skrewt"]
  },
  {
    question: "How did Harry get the scar on his forehead? \n",
    answer: "Voldemort Tried to kill him when he was a baby",
    type: "mcq",
    options: ["In a Quidditch accident", "Voldemort Tried to kill him when he was a baby", "He crashed he weasley's car into the whomping tree"]
  },
  {
    question: "What was the name of the joke shop founded by the Weasley twins at 93 Diagon Alley? \n",
    answer: "Weasley’s Wizard Wheezes",
    type: "mcq",
    options: ["Weasley’s Witchcraft Wonders", "Weasley’s Worldwide Whompers", "Weasley’s Wicked Whatsits", "Weasley’s Wizard Wheezes"]
  },
  {
    question: `Who knocks out the troll in the ladies’ bathroom in Harry Potter and the Philosopher’s Stone? \n`,
    answer: "Ron",
    type: "question"
  },
]

const levelThreeQues = [
  {
    question: "Which element is associated with Hufflepuff? \n",
    answer: "Earth",
    type: "mcq",
    options: ["Earth", "Fire", "Air", "Water"]
  },
  {
    question: "‘Wit beyond measure is man’s greatest treasure’ is the motto of which house? \n",
    answer: "Ravenclaw",
    type: "mcq",
    options: ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"]
  },
  {
    question: "Who was the Prisoner of Azkaban, and was he guilty of the crime he was accused of committing? \n",
    answer: "Sirius Black, not guilty",
    type: "mcq",
    options: ["James Potter, not guilty", "Cornelius Fudge, guilty", "Sirius Black, not guilty"]
  },
  {
    question: "What position does Harry play on his Quidditch team? \n",
    answer: "seeker",
    type: "question"
  },
  {
    question: `Fluffy is Hermione's cat"? \n`,
    answer: true,
    type: "y/n"
  },
]

const level = (quesObj, levelInfo) => {
  const [level, rightAnswerQty] = levelInfo;

console.log(chalk.green.bold(`${level>1 ? `Congratulations🥳 for completeting ${chalk.red(`Level ${level - 1}`)}, you are now entering` : chalk.red`Welcome to`} ${chalk.yellow(`Level ${level}`)}`))
if(rightAnswerQty){
  const nextLevel = level + 1
  console.log(`You have to get ${chalk.yellowBright(rightAnswerQty)} answers right to enter Level ${chalk.cyanBright(nextLevel)}`)
}

  const rightAnswerReaction = chalk.greenBright('\nAyeeeeee, You got it right!')
  const wrongAnswerReaction = chalk.red(`\nHa, you don't know this lol!`)

  quesObj.forEach(obj => {
    
    if(obj.type === "mcq"){
    const indexOfRightAnswer = readlineSync.keyInSelect(obj.options, obj.question)
      if(obj.options[indexOfRightAnswer] === obj.answer){
        console.log(rightAnswerReaction)
        score += 5;
      } else {
        console.log(wrongAnswerReaction)
      }
    } else if (obj.type === "question"){
      const answer = readlineSync.question(obj.question)
      if(answer.toUpperCase() === obj.answer.toUpperCase()){
        console.log(rightAnswerReaction)
        score+=5;
      } else {
        console.log(wrongAnswerReaction)
      }
    } else if (obj.type === "y/n"){
      const rightOrWrong = readlineSync.keyInYN(obj.question)
      if(rightOrWrong === obj.answer){
        console.log(rightAnswerReaction)
        score += 5;
      } else {
        console.log(wrongAnswerReaction)
      }
    }
    console.log(`${chalk.blueBright("Right answer:")} ${chalk.yellowBright(obj.answer)}`)
    console.log(chalk.cyanBright(`Current score is: ${chalk.yellow(score)} \n`))

  })
}


const game = () => {
  level(levelOneQues, [1, 3])
  if(score >= 15){
    level(levelTwoQues, [2, 4])
    if(score >= 35) {
      level(levelThreeQues, [3])
    }
  }
}

const highScores = [
  {
    name: 'Fab',
    score: 75
  },
  {
    name: 'Riz',
    score: 10
  },
]

const calcHighestScore = () => {
  console.log(chalk.redBright(`Your total score is: ${chalk.yellowBright(score)}\n`))
  let highScore = 0;
  console.log(chalk.black.bgWhite('Score Table: '))
  console.log(`${username}: ${chalk.redBright(score)}`)
  highScores.forEach(item => {
    console.log(`${item.name}: ${chalk.redBright(item.score)}`)
    if(highScore < item.score) {
      highScore = item.score
    }
  })

  if(score === highScore){
    console.log(`${chalk.yellowBright('Oh, its a tie! Congrats for having the highest score ❤️')}`)
  } else if(score > highScore){
    highScore = score
    console.log(`${score === 75 ? chalk.cyanBright`\nOMG, YOU GOT THE HIGHEST POSSIBLE SCORE, CONGRATULATIONS POTTERHEAD!🥳` : `${chalk.yellowBright('Ayeeeeee, you got the highest Score ❤️')}`}`)
  } else {
    console.log(`${chalk.yellowBright('Yo, better luck next time ❤️')}`)
  }

}


start()
game()
calcHighestScore()