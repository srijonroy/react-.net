import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Header } from 'semantic-ui-react';

function App() {
  return (
    <div className="App">
      <Header as='h2' 
        icon='users'
       content='Reactivities'
       color='blue'
       />
    </div>
  );
}

export default App;
