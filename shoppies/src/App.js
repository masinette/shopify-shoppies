import './App.css';
import MovieBox from './components/MovieBox'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          The Shoppies
        </h1>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      <MovieBox />
      </header>
    </div>
  );
}

export default App;
