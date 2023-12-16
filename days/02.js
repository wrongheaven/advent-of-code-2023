import { getInput } from './utils.js';

const inputArray = getInput('02');

// ======== PART 1 ========

const maxNumberOfCubes = {
    'red': 12,
    'green': 13,
    'blue': 14
};

let sumOfIDs = 0;
inputArray.forEach((input) => {
    const [game, allCubePulls] = input.split(':');

    const cubePulls = allCubePulls.split(';').map((pull) => {
        return pull.trim().split(',').map((collection) => {
            let [count, color] = collection.trim().split(' ');
            count = parseInt(count);
            return { count, color };
        });
    });

    const minNumberOfCubes = {
        'red': 0,
        'green': 0,
        'blue': 0
    };

    cubePulls.forEach((pull) => {
        pull.forEach((collection) => {
            minNumberOfCubes[collection.color] = Math.max(minNumberOfCubes[collection.color], collection.count);
        });
    });

    // Are all minNumberOfCubes <= maxNumberOfCubes?
    let possible = true;
    Object.keys(minNumberOfCubes).forEach((color) => {
        if (minNumberOfCubes[color] > maxNumberOfCubes[color]) {
            possible = false;
        }
    });

    if (possible) {
        const gameID = parseInt(game.split(' ')[1]);
        sumOfIDs += gameID;
    }
});

console.log(`Day 2 Part 1: ${sumOfIDs}`);


// ======== PART 2 ========

let sumOfSetPowers = 0;
inputArray.forEach((input) => {
    const [game, allCubePulls] = input.split(':');

    const cubePulls = allCubePulls.split(';').map((pull) => {
        return pull.trim().split(',').map((collection) => {
            let [count, color] = collection.trim().split(' ');
            count = parseInt(count);
            return { count, color };
        });
    });

    const minNumberOfCubes = {
        'red': 0,
        'green': 0,
        'blue': 0
    };

    cubePulls.forEach((pull) => {
        pull.forEach((collection) => {
            minNumberOfCubes[collection.color] = Math.max(minNumberOfCubes[collection.color], collection.count);
        });
    });

    // Multiply all minNumberOfCubes counts
    const setPower = Object.keys(minNumberOfCubes).reduce((acc, color) => {
        return acc * minNumberOfCubes[color];
    }, 1);

    sumOfSetPowers += setPower;
});

console.log(`Day 2 Part 2: ${sumOfSetPowers}`);
