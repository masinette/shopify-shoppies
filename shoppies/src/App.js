import logo from './logo.svg';
import './App.css';
import MovieBox from './components/MovieBox'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          The Shoppies
        </p>
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
