import { getInput } from './utils.js';

const inputArray = getInput('03');

part1();
function part1()
{
    const partNumbers = [];
    let previousCharacter = '';
    for (let row = 0; row < inputArray.length; row++) {
        for (let col = 0; col < inputArray[row].length; col++) {

            // Part numbers are any contiguous sequence of digits
            if (inputArray[row][col].match(/[0-9]/)) {
                // If the previous character is a digit, append this digit to the previous number
                if (previousCharacter.match(/[0-9]/)) {
                    partNumbers[partNumbers.length - 1].number += inputArray[row][col];
                } else {
                    const partNumberData = {
                        row,
                        col,
                        number: inputArray[row][col],
                    };
                    partNumbers.push(partNumberData);
                }
            }

            previousCharacter = inputArray[row][col];
        }
    }

    let sumPartNumbers = 0;
    partNumbers.forEach((partNumber) => {
        // Check if the part number is adjacent to a symbol
        // Top-left
        if (partNumber.row > 0 && partNumber.col > 0) {
            const symbol = inputArray[partNumber.row - 1][partNumber.col - 1];
            if (symbol.match(/[^0-9.]/)) {
                sumPartNumbers += parseInt(partNumber.number);
                return;
            }
        }
        // Direct left
        if (partNumber.col > 0) {
            const symbol = inputArray[partNumber.row][partNumber.col - 1];
            if (symbol.match(/[^0-9.]/)) {
                sumPartNumbers += parseInt(partNumber.number);
                return;
            }
        }
        // Bottom left
        if (partNumber.row < inputArray.length - 1 && partNumber.col > 0) {
            const symbol = inputArray[partNumber.row + 1][partNumber.col - 1];
            if (symbol.match(/[^0-9.]/)) {
                sumPartNumbers += parseInt(partNumber.number);
                return;
            }
        }
        // All above. If part number length is, say, 3, then check 3 above
        for (let i = 0; i < partNumber.number.length; i++) {
            if (partNumber.row - 1 < 0) break;

            const symbol = inputArray[partNumber.row - 1][partNumber.col + i];
            if (symbol.match(/[^0-9.]/)) {
                sumPartNumbers += parseInt(partNumber.number);
                return;
            }
        }
        // All below
        for (let i = 0; i < partNumber.number.length; i++) {
            if (partNumber.row + 1 >= inputArray.length) break;

            const symbol = inputArray[partNumber.row + 1][partNumber.col + i];
            if (symbol.match(/[^0-9.]/)) {
                sumPartNumbers += parseInt(partNumber.number);
                return;
            }
        }
        // Move to the end of the part number
        const offset = partNumber.number.length - 1;
        // Top right
        if (partNumber.row > 0 && partNumber.col + offset < inputArray[partNumber.row].length - 1) {
            const symbol = inputArray[partNumber.row - 1][partNumber.col + offset + 1];
            if (symbol.match(/[^0-9.]/)) {
                sumPartNumbers += parseInt(partNumber.number);
                return;
            }
        }
        // Direct right
        if (partNumber.col + offset < inputArray[partNumber.row].length - 1) {
            const symbol = inputArray[partNumber.row][partNumber.col + offset + 1];
            if (symbol.match(/[^0-9.]/)) {
                sumPartNumbers += parseInt(partNumber.number);
                return;
            }
        }
        // Bottom right
        if (partNumber.row < inputArray.length - 1 && partNumber.col + offset < inputArray[partNumber.row].length - 1) {
            const symbol = inputArray[partNumber.row + 1][partNumber.col + offset + 1];
            if (symbol.match(/[^0-9.]/)) {
                sumPartNumbers += parseInt(partNumber.number);
                return;
            }
        }
    });

    console.log(`Day 3 Part 1: ${sumPartNumbers}`);
}

part2();
function part2()
{
    const partNumbers = [];
    let previousCharacter = '';
    for (let row = 0; row < inputArray.length; row++) {
        for (let col = 0; col < inputArray[row].length; col++) {

            // Part numbers are any contiguous sequence of digits
            if (inputArray[row][col].match(/[0-9]/)) {
                // If the previous character is a digit, append this digit to the previous number
                if (previousCharacter.match(/[0-9]/)) {
                    partNumbers[partNumbers.length - 1].number += inputArray[row][col];
                } else {
                    const partNumberData = {
                        row,
                        col,
                        number: inputArray[row][col],
                    };
                    partNumbers.push(partNumberData);
                }
            }

            previousCharacter = inputArray[row][col];
        }
    }

    const getNeighborPartNumbers = (row, col) => {
        const neighboringIndices = [
            // Top left
            { row: row - 1, col: col - 1 },
            // Top
            { row: row - 1, col: col },
            // Top right
            { row: row - 1, col: col + 1 },
            // Right
            { row: row, col: col + 1 },
            // Bottom right
            { row: row + 1, col: col + 1 },
            // Bottom
            { row: row + 1, col: col },
            // Bottom left
            { row: row + 1, col: col - 1 },
            // Left
            { row: row, col: col - 1 },
        ];

        const neighborPartNumbers = [];
        neighboringIndices.forEach((index) => {
            // Does there exist a part number at this index?
            partNumbers.forEach((partNumber) => {
                // Since part numbers can be multiple digits, we need to check if the index is
                // within the part number's range.
                // The row, however, is always the same, so we only need to check the column.
                if (partNumber.row !== index.row) return;
                
                // Check if the column is within the part number's range
                if (
                    index.col >= partNumber.col &&
                    index.col < partNumber.col + partNumber.number.length
                ) {
                    neighborPartNumbers.push(partNumber);
                }
            });
        });

        // Remove duplicates
        const uniqueNeighborPartNumbers = [];
        neighborPartNumbers.forEach((neighborPartNumber) => {
            if (!uniqueNeighborPartNumbers.includes(neighborPartNumber)) {
                uniqueNeighborPartNumbers.push(neighborPartNumber);
            }
        });

        return uniqueNeighborPartNumbers;
    };

    let sumRatios = 0;
    for (let row = 0; row < inputArray.length; row++) {
        for (let col = 0; col < inputArray[row].length; col++) {
            
            // Is this a gear?
            if (inputArray[row][col] == '*') {
                // Get all adjacent part numbers
                const neighbors = getNeighborPartNumbers(row, col);
                if (neighbors.length == 2) {
                    // This is a gear.
                    // Calculate the gear ratio
                    const ratio = parseInt(neighbors[0].number) * parseInt(neighbors[1].number);
                    sumRatios += ratio;
                }
            }
        }
    }

    console.log(`Day 3 Part 2: ${sumRatios}`);
}
