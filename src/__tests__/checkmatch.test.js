// import checkMatch from '../logic/checkmatch,js';/
const checkMatch = require('../logic/checkmatch.js');


test("word matches guess", () => {
    // const checkMatch = new checkMatch();
    const matcher = new checkMatch(['w','o','r','d','s'], ['w','o','r','d','s'])
    expect(matcher.checkWordMatch()).toBe(true)
})

test("guess does not match word", () => {
    const matcher = new checkMatch(['w','o','r','d','s'], ['g','u','e','s','s'])
    expect(matcher.checkWordMatch()).toBe(false)
})

test("'w' from the guessed word is also in  the word", () => {
    const matcher = new checkMatch(['w','o','r','d','s'], ['w','a','l','t','z']);
    // returns in word, in word + correct order, not in word
    expect(matcher.checkLetterInWord('w')).toBe(true)
})

test("no letters are common to either word", () => {
    const matcher = new checkMatch(['w','o','r','d','s'],['z','i','l','l','a']);
    expect(matcher.checkLetterInWord('z')).toBe(false)
})

test("letter is common to both words but not in correct order", () => {
    const matcher = new checkMatch(['w','o','r','d','s'],['c','i','t','i','s']);
    expect(matcher.checkLetterInWord('s')).toBe(true)
})

test("w should equal w in check word order", () => {
    const matcher = new checkMatch(['w','o','r','d','s'], ['w','a','l','t','z']);
    expect(matcher.checkLetterOrder('w','w')).toBe(true)
})

test("z should not equal s in check word order", () => {
    const matcher = new checkMatch(['w','o','r','d','s'], ['w','a','l','t','z']);
    expect(matcher.checkLetterOrder('z','w')).toBe(false)
})

test("waltz as guess should return obj that matches 'w' as the only common letter", () => {
    const matcher = new checkMatch(['w','o','r','d','s'], ['w','a','l','t','z']);
    expect(matcher.checkLetters()).toEqual(
        {
            'w': true,
            'a': false,
            'l': false,
            't': false,
            'z': false
        }
    )
}) 

test("walsz as guess should return obj that matches 'w' as in true, and 's' as partial, others as false", () => {
    const matcher = new checkMatch(['w','o','r','d','s'], ['w','a','l','s','z']);
    expect(matcher.checkLetters()).toEqual(
        {
            'w': true,
            'a': false,
            'l': false,
            's': 'partial',
            'z': false
        }
    )
}) 

test("'wards' should match 'words' in all but the 'a'", () => {
    const matcher = new checkMatch(['w','o','r','d','s'], ['w','a','r','d','s']);
    expect(matcher.checkLetters()).toEqual(
        {
            'w': true,
            'a': false,
            'r': true,
            'd': true,
            's': true
        }
    )
}) 


test("no common letters should return object with all false", () => {
    const matcher = new checkMatch(['w','o','r','d','s'], ['z','i','l','l','a']);
    expect(matcher.checkLetters()).toEqual(
        {
            'z': false, // 'z': {0:false,1:false,2: false,3: false,4: false}
            'i': false,
            'l': false,
            'l': false, // oh boy, but maybe its ok for this project
            'a': false
        }
    )
}) 

// guessedLetters should be a list of object of keys, with values that are a dictionary
test("'E' in 'STEVE' should return true, partial as a guess for the word 'STEER'", () => {
    const matcher = new checkMatch(['S','T','E','E','R'], ['S','T','E','V','E']);
    //TODO
    // game function using guessedLetter object that uses match info to update guessedLetter key/values
    // guessedLetters = {'E': {2: true, 4: 'partial}} is what e should be
    // expect(updateGuessedLetters()).toBe(false;)
})

// with each guess, the OVERALL state of guessed letters should persist following each guess, ie, if 'A' is correctly guessed,
// then the KEYBOARD should reflect that status, and should persist for as long as the game continues
test("For the word STEER, guessing STOVE should reflect S/T as True, and E as partial in the keyboard state object", () => {
    const matcher = new checkMatch(['S','T','E','E','R'], ['S','T','O','V','E']);
    let keyBoard = {
        "A": false,"B": false,"C": false,"D": false,"E": false,"F": false,"G": false,"H": false,
        "I": false,"J": false,"K": false,"L": false,"M": false,"N": false,"O": false,"P": false,
        "Q": false,"R": false,"S": false,"T": false,"U": false,"V": false,"W": false,"X": false,
        "Y": false,"Z": false}

    matcher.checkKeyboardState(keyBoard);
    expect(keyBoard).toEqual(
        {
            "A": false,"B": false,"C": false,"D": false,"E": 'partial',"F": false,"G": false,"H": false,
            "I": false,"J": false,"K": false,"L": false,"M": false,"N": false,"O": false,"P": false,
            "Q": false,"R": false,"S": true,"T": true,"U": false,"V": false,"W": false,"X": false,
            "Y": false,"Z": false}
    )
})

test("For the word STEER, and guessing STOVE, following guess STEED should reflect E in correect location and change nothing", () => {
    const matcher = new checkMatch(['S','T','E','E','R'], ['S','T','E','E','D']);
    let keyBoard = {
        "A": false,"B": false,"C": false,"D": false,"E": 'partial',"F": false,"G": false,"H": false,
        "I": false,"J": false,"K": false,"L": false,"M": false,"N": false,"O": false,"P": false,
        "Q": false,"R": false,"S": true,"T": true,"U": false,"V": false,"W": false,"X": false,
        "Y": false,"Z": false}
        
    matcher.checkKeyboardState(keyBoard);
    expect(keyBoard).toEqual(
        {
            "A": false,"B": false,"C": false,"D": false,"E": true,"F": false,"G": false,"H": false,
            "I": false,"J": false,"K": false,"L": false,"M": false,"N": false,"O": false,"P": false,
            "Q": false,"R": false,"S": true,"T": true,"U": false,"V": false,"W": false,"X": false,
            "Y": false,"Z": false}
    )
})

test("For the word STEER, and guessing STEAM should not change E from true to false or partial", () => {
    const matcher = new checkMatch(['S','T','E','E','R'], ['S','T','E','A','M']);
    let keyBoard = {
        "A": false,"B": false,"C": false,"D": false,"E": true,"F": false,"G": false,"H": false,
        "I": false,"J": false,"K": false,"L": false,"M": false,"N": false,"O": false,"P": false,
        "Q": false,"R": false,"S": true,"T": true,"U": false,"V": false,"W": false,"X": false,
        "Y": false,"Z": false}
        
    matcher.checkKeyboardState(keyBoard);
    expect(keyBoard).toEqual(
        {
            "A": false,"B": false,"C": false,"D": false,"E": true,"F": false,"G": false,"H": false,
            "I": false,"J": false,"K": false,"L": false,"M": false,"N": false,"O": false,"P": false,
            "Q": false,"R": false,"S": true,"T": true,"U": false,"V": false,"W": false,"X": false,
            "Y": false,"Z": false}
    )
})

test("For the word STEER, completely wrong guess should not change keyboard state", () => {
    const matcher = new checkMatch(['S','T','E','E','R'], ['P','O','L','Y','P']);
    let keyBoard = {
        "A": false,"B": false,"C": false,"D": false,"E": true,"F": false,"G": false,"H": false,
        "I": false,"J": false,"K": false,"L": false,"M": false,"N": false,"O": false,"P": false,
        "Q": false,"R": false,"S": true,"T": true,"U": false,"V": false,"W": false,"X": false,
        "Y": false,"Z": false}
        
    matcher.checkKeyboardState(keyBoard);
    expect(keyBoard).toEqual(
        {
            "A": false,"B": false,"C": false,"D": false,"E": true,"F": false,"G": false,"H": false,
            "I": false,"J": false,"K": false,"L": false,"M": false,"N": false,"O": false,"P": false,
            "Q": false,"R": false,"S": true,"T": true,"U": false,"V": false,"W": false,"X": false,
            "Y": false,"Z": false}
    )
})