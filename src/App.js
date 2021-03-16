import React from 'react';
import './App.css';
import CodeRepoCards from './components/CodeRepoCards';

class App extends React.Component {
  render() {
    return <div className="App">
      <header className="App-header">
        <h1>
          IcyRealm's Github Repository
        </h1>
        <h2>
          This repository is automatically generated via React + GitHub API.
        </h2>   
      </header>
      <CodeRepoCards></CodeRepoCards>
      <footer>
           Version 1.0         
      </footer>
    </div>
  }
}

export default App;
