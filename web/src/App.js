import React, {Component} from 'react';
import History from './components/History';
import Form from './components/Form';
import {Game} from 'rps';
import {Repo} from './repo/Repo';

class App extends Component {
    render() {

        const appStyle = {
            display: 'flex',
            flexDirection: 'column',
            width: '15%'
        };

        const game = new Game(new Repo(window.localStorage));

        return (
            <div style={appStyle}>
                <Form game={game}/>
                <History game={game}/>
            </div>
        );
    }
}

export default App;
