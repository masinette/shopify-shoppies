import './App.css';
import MovieBox from './components/MovieBox'

function App() {
  return (
    <div className="App">
    
      <div id="wrapper">
        <header className="App-header">
          <h1 className="logo">
            &#127916;
              Welcome to The Shoppies Awards!
            &#127916;
          </h1>
          <MovieBox />
        </header>
      </div>
    </div>
  );
}

export default App;
