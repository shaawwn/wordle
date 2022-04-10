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
            'z': false,
            'i': false,
            'l': false,
            'l': false, // oh boy, but maybe its ok for this project
            'a': false
        }
    )
}) 

