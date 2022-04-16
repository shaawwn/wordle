import GameBoard from './components/board.js';
import style from './style.css'

function App() {
  return (
    <div className="App">
      <h1 className="header">Wordle!</h1>
      <GameBoard />
    </div>
  );
}

export default App;
