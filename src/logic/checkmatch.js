
// function checkMatch(word, guess) {
//     // check that a guess against the matched word
//     return true
// }

class checkMatch {

    // checkWordMatch() - checks the guess word against the word
    // checkLetters() checks letters in guess compared to word
    constructor(word, guess) {
        // word is word to check against, guess is the user submitted word, both are arrays of alpha characters
        this.word = word;
        this.guess = guess;
    }

    checkWordMatch() {
        // checks if the guessed word matches the word
        if(this.word.join("") === this.guess.join("")) {
            return true
        }
        return false
    }

    checkLetters2() {
        let returnedArray = []

        for(let i = 0; i < this.word.length; i++) {
            if(this.checkLetterInWord(this.guess[i])) {
                
            }
        }
    }

    updateKeyboardState(keyBoardObj) {
        // check guessed letters in a word with a keyboard state to reflect persistent guesses during the game
        // keyboardObj is a game state value reflecting the OVERALL state of letters during a game round
        // this.guess is checked against the keyBoardObj, and keyBoardObj will updated depending on state of guess letters
        // false - Nothing changes, even if keyBoardObj[letter] is already True, correct guesses PERSIST
        // True - changes if keyBoardObj is either false or partial
        // partial - only changes if keyBoardObj[letter] is false, will not update for an already TRUE value
        // call checkLetters(which returns an obj with letterKeys and boolean values)
        const guess = this.checkLetters()
        let newKeyBoardObj = keyBoardObj
        Object.keys(guess).forEach(letter => {
            // console.log("Checking....", letter)
            // since guess[letter] = false does nothing, no need to check for it
            if(guess[letter] === 'partial') {
                if(keyBoardObj[letter] === false) {
                    newKeyBoardObj[letter] = 'partial'
                }
                // do something
            } else if(guess[letter] === true) {
                // do something
                if(keyBoardObj[letter] === false || keyBoardObj[letter] === 'partial') {
                    newKeyBoardObj[letter] = true
                }
            }
        })
        return newKeyBoardObj
    }

    checkLetters() {
        // Guess and Word should are ARRAYs in order to check inclusion
        // checks the status of letters in the guess compared to word
        // letters are either 1)in word, but out of order, 2)in word in correct order, 3)not in word
        // check individual status of letters
        // return an object with the letter status? ie returnedObj = {'w': true,'o': partial,'r': true,'d': true,'z': false}
            // where true = in word and correct order, partial = in word but out of order, false = not i =n word at all
        // returns object key/values in format 'E': {0:false,1:false,2: false,3: false,4: false}
        let returnedWord = {};
    
        for(let i = 0; i < this.word.length; i++) {
            // check each letter ONLY against the same index in word
            if(this.checkLetterInWord(this.guess[i])) {
                // check letter order, ie letter index from guess should match same letter index from word
                if(this.checkLetterOrder(this.guess[i], this.word[i])) {
                    // letters match same index, add true to returnedObj, i=index value
                    returnedWord[this.guess[i]] = true;
                } else {
                    // letters don't match same index, add 'partial' to returnedObj
                    returnedWord[this.guess[i]] = 'partial'
                }
            } else {
                // letter is not in word, but continue loop
                returnedWord[this.guess[i]] = false;
            }
        }

        return returnedWord;
    }

    
    checkLetterOrder(guessLetter, wordLetter) {
        // checks whether a letter is in correct order
        if(guessLetter === wordLetter) {
            return true
        }
        return false
    }

    checkLetterInWord(letter) {
        // check if a letter is in word, if it is not return false (because why even run other checks if not in word?)
        if(this.word.includes(letter)) {
            return true
        }
        return false
    }

    updateValues(letterKey) {
        // letterKey is key in guessed letters object with value true/false/partial
        // If a letter exists in object, and its status changes, update the status of that letter
        // eg guess['A': false] => ['A': true] without needing to make a new object
    }
}

module.exports = checkMatch