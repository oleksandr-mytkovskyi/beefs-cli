const CoreGame = require('beefs-game');
const readline = require('readline');


console.log('\x1b[32m%s\x1b[0m', 'Вітаємо в грі бики-корови');

const game = new CoreGame();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('\x1b[32m%s\x1b[0m', 'Я загадав, спробуй відгадати:');

// console.log(game.secret);

function askQuestion() {
    rl.question('', function (input) {
        game.checkSecret(input);
        askQuestion();
    });
}

askQuestion();

game.event.on('win', () => {
    console.log('\x1b[35m%s\x1b[0m', '\nТи переміг, вітаємо!!!');
    console.log('Загаданий секрет:', game.secret);
    rl.question('Зіграємо ще ? (y or n) ', answer => {
        if (answer === 'y') {
            game.reset();
            console.log('\x1b[32m%s\x1b[0m', 'Я загадав, спробуй відгадати:');
            askQuestion();
        } else {
            rl.close();
        }
    })

})

game.event.on('lose', () => {
    console.log('\x1b[35m%s\x1b[0m', '\nТи програв =((((((');
    console.log('Загаданий секрет:', game.secret);
    rl.question('Зіграємо ще ? (y or n) ', answer => {
        if (answer === 'y') {
            game.reset();
            console.log('\x1b[32m%s\x1b[0m', 'Я загадав, спробуй відгадати:');
            askQuestion();
        } else {
            rl.close();
        }
    })
})


rl.on("close", function () {
    console.log('\x1b[33m%s\x1b[0m', '\nДякуємо за гру, до зустрічі!')
    process.exit(0);
});