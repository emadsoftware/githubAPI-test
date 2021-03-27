import React from 'react';
import './App.css';
import CodeRepoCards from './components/CodeRepoCards';
import BarComponent from './components/BarComponent';

class App extends React.Component {
    // Initialize variables
    constructor(props){
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
          userRepo: 'icyrealm',
      };
  
    }

    handleChange(e) {
      this.setState({             
        userRepo: e.target.value
      });
  } 

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
      <div className="group">
          <label>User: </label>
          <input
              type="text"
              id="markdown-content"
              onChange={this.handleChange}
              defaultValue={this.state.userRepo}
          />
      </div>
      <BarComponent name={this.state.userRepo}></BarComponent>
      <CodeRepoCards name={this.state.userRepo}></CodeRepoCards>
      <footer>
           Version 1.0         
      </footer>
    </div>
  }
}

export default App;
