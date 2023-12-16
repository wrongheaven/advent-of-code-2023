import { getInput } from './utils.js';

const inputArray = getInput('04');

class Card
{
    id;
    winningNumbers;
    scratchedNumbers;

    matchingNumbers = 0;
    
    winValue = 0;

    constructor(cardInput)
    {
        // Split the card input into the card label and the card data
        const [cardLabel, cardData] = cardInput.split(':');
        this.id = parseInt(cardLabel.split(' ').pop());

        // Split the card data into the winning numbers and the scratched numbers
        const [winningNumbers, scratchedNumbers] = cardData.trim().split(' | ').map((numbers) => {
            // Parse the numbers into an array of integers
            return numbers.split(' ').map((number) => {
                return parseInt(number) || 0;
            }).filter((number) => {
                return number !== 0;
            });
        });

        this.winningNumbers = winningNumbers;
        this.scratchedNumbers = scratchedNumbers;
    }

    calcWinValue()
    {
        // How many of the scratched numbers are in the winning numbers?
        const winNumCount = this.scratchedNumbers.filter((number) => {
            return this.winningNumbers.includes(number);
        }).length;

        this.matchingNumbers = winNumCount;

        // Calculate the win value
        this.winValue = winNumCount > 0
            ? Math.pow(2, winNumCount - 1)
            : 0
        ;
    }
}

part1();
function part1()
{
    // Create an array of Card objects
    const cards = inputArray.map((line) => {
        const card = new Card(line);
        // Calculate the win value for each card
        card.calcWinValue();
        return card;
    });

    const sumOfWinValues = cards.reduce((sum, card) => {
        return sum + card.winValue;
    }, 0);

    console.log(`Day 4 Part 1: ${sumOfWinValues}`);
}

part2();
function part2()
{
    // Create an array of Card objects
    const cards = inputArray.map((line) => {
        const card = new Card(line);
        card.calcWinValue();
        return card;
    });

    const cardCounts = {};
    cards.forEach(({ id }) => {
        cardCounts[id] = 1;
    });

    cards.forEach(({ id, matchingNumbers }) => {
        for (let i = 0; i < cardCounts[id]; i++) {
            for (let j = 1; j <= matchingNumbers; j++) {
                cardCounts[id+j]++;
            }
        }
    });

    const totalCardCounts = Object.values(cardCounts).reduce((sum, count) => {
        return sum + count;
    }, 0);

    console.log(`Day 4 Part 2: ${totalCardCounts}`);
}
