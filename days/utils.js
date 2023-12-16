import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

export const getInput = (day) => {
    const thisFilePath = fileURLToPath(import.meta.url);
    const inputDir = dirname(dirname(thisFilePath)) + '/input';
    return readFileSync(`${inputDir}/${day}.txt`, 'utf8').trim().split('\n');
};
