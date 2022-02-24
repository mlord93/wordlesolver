import fs from 'fs';
import promptSync from 'prompt-sync';
const prompt = promptSync();
let words = getInput();
//there's a bug with forbidden characters-- if I have Green character and have another occurance of that character in my guess and it is gray, it fails the word

function getInput() {
    try {
        const filePathString = `./words/AllWords.txt`
        return fs.readFileSync(filePathString, 'utf8').split('\n');
    } catch (e) {
        throw e;
    }
}

function play() {
    while (true) {
        let guess = prompt('Guess: ');
        let result = prompt('Result: ');
        if (result == 'ggggg') {
            console.log(`Solution: ${guess}`);
            break;
        }
        let forbiddenChars = result.split('').reduce((a, c, i) => c == 'b' ? [...a, guess[i]] : a, []);
        words = words.filter(word => {
            let usedIndexes = result.split('').reduce((a, c, i) => c == 'g' ? [...a, i] : a, []);
            for (let i = 0; i<word.length; i++) {
                if (forbiddenChars.includes(word[i]) && result[i] !== 'g' ) return false; 
                if (result[i] == 'g' && guess[i] !== word[i] ) return false;
                if (result[i] == 'y' ) {
                    if (guess[i] == word[i]) return false;
                    let unusedMatches = getAllOccurances(word, guess[i]).filter(c => !usedIndexes.includes(c))
                    if (unusedMatches.length == 0) return false;
                    usedIndexes.push(unusedMatches[0]);
                }
            }
            return true;
        });
        console.log(words);
        console.log(`Number of options: ${words.length}`);
    }
}

function getAllOccurances(word, char) {
    const occurances = [];
    for (let i = 0; i<word.length; i++) {
        if (word[i] == char) occurances.push(i);
    }
    return occurances;
}

play();