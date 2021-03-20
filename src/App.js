import React from 'react';
import './App.css';
import CodeRepoCards from './components/CodeRepoCards';
import BarComponent from './components/BarComponent';

class App extends React.Component {
  render() {
    return <div className="App">
      <header className="App-header">
        <h1>
          Github Repository Analyzer
        </h1>
        <h2>
          This repository is automatically generated via React + GitHub API.
        </h2>   
      </header>
      <BarComponent></BarComponent>
      <CodeRepoCards></CodeRepoCards>
      <footer>
           Version 1.0         
      </footer>
    </div>
  }
}

export default App;
