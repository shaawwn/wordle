
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

    checkLetters() {
        // checks the status of letters in the guess compared to word
        // letters are either 1)in word, but out of order, 2)in word in correct order, 3)not in word
        // check individual status of letters
        // return an object with the letter status? ie returnedObj = {'w': true,'o': partial,'r': true,'d': true,'z': false}
            // where true = in word and correct order, partial = in word but out of order, false = not i =n word at all
        let returnedWord = {};
        for(let i = 0; i < this.word.length; i++) {
            // check each letter ONLY against the same index in word
            if(this.checkLetterInWord(this.guess[i])) {
                // check letter order, ie letter index from guess should match same letter index from word
                if(this.checkLetterOrder(this.guess[i], this.word[i])) {
                    // letters match same index, add true to returnedObj
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
}

module.exports = checkMatch