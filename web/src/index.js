import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Game} from 'rps';
import {Repo} from './repo/Repo';

ReactDOM.render(<App game={new Game(new Repo(window.localStorage))}/>, document.getElementById('root'));
