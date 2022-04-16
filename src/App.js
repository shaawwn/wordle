import GameBoard from './components/board.js';
import style from './style.css'
import {React, useState, useEffect} from 'react'

const wordDict = require('./words.json'); // list of 5 letter words

function App() {

  const [word, setWord] = useState()

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function getWord() {
    // select a 5 letter word at random wordDict, randomly generate # from 0 - wordDict.lenght
    const len = wordDict.length
    const ranNumber = Math.floor(Math.random() * len)
    
    return wordDict[ranNumber]
  }


  // getWord()
  return (
    <div className="App">
      <h1 className="header">Wordle!</h1>
      <GameBoard word={getWord()} dict={wordDict}/>
    </div>
  );
}

export default App;
