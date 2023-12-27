import React from 'react';
import './App.css';
import CodeRepoCards from './components/CodeRepoCards';
import BarComponent from './components/BarComponent';
import MetaTags from 'react-meta-tags';

class App extends React.Component {
  // Initialize variables
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleGenerate = this.handleGenerate.bind(this);
    this.state = {
      userRepo: 'emadsoftware',
      updateKey: 0, // Add a key to trigger component update
    };
  }

  handleChange(e) {
    this.setState({
      userRepo: e.target.value,
    });
  }

  handleGenerate() {
    // Update the key to trigger component re-render
    this.setState((prevState) => ({
      updateKey: prevState.updateKey + 1,
    }));
  }

  render() {
    return (
      <div className="App">
        <MetaTags>
          <title>Github Repository Analyzer App v.1</title>
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        </MetaTags>
        <header className="App-header">
          <h1>Github Repository Analyzer App v.1</h1>
        </header>
        <div className="group">
          <label>User: </label>
          <input
            type="text"
            id="markdown-content"
            onChange={this.handleChange}
            defaultValue={this.state.userRepo}
          />
          <button onClick={this.handleGenerate}>Generate</button>
        </div>
        <BarComponent key={this.state.updateKey} name={this.state.userRepo}></BarComponent>
        <CodeRepoCards name={this.state.userRepo}></CodeRepoCards>
        <footer>Version 1.0</footer>
      </div>
    );
  }
}

export default App;
