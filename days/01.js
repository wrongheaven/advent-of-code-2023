import { getInput } from './utils.js';

const inputArray = getInput('01');

// ======== PART 1 ========

let sum = 0;
inputArray.forEach((input) => {
    const regex = /\d/g;
    const matches = input.match(regex);
    const first = matches[0];
    const last = matches[matches.length - 1];
    const concat = parseInt(first + last);
    
    sum += concat;
});
console.log(`Day 1 Part 1: ${sum}`);


// ======== PART 2 ========

sum = 0;
inputArray.forEach((input) => {
    // Doesn't work, as JavaScript regex deosn't support overlapping matches (`eightwo` would match `eight`, but not `two`)
    // TODO: Ditch regex, use a loop instead.
    const regex = /(\d|one|two|three|four|five|six|seven|eight|nine)/g;
    const matches = input.match(regex);

    const map = {
        one: '1',
        two: '2',
        three: '3',
        four: '4',
        five: '5',
        six: '6',
        seven: '7',
        eight: '8',
        nine: '9'
    };

    let first = matches[0];
    first = map[first] || first;
    let last = matches[matches.length - 1];
    last = map[last] || last;

    const concat = parseInt(first + last);
    
    sum += concat;
});
console.log(`Day 1 Part 2: ${sum}`);
