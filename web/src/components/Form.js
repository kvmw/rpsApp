import React, {Component} from 'react';

class Form extends Component {

    constructor(props) {
        super(props);

        this.game = props.game;

        this.state = {
            result: '',
            p1Throw: '',
            p2Throw: ''
        };

        this.submit = this.submit.bind(this);
    }

    submit() {
        this.game.play(this.state.p1Throw, this.state.p2Throw, this);
    }

    error() {
        this.setState({result: 'INVALID THROW(S)!'});
    }

    p1wins() {
        this.setState({result: 'PLAYER ONE WINS!'});
    }

    p2wins() {
        this.setState({result: 'PLAYER TWO WINS!'});
    }

    tie() {
        this.setState({result: 'TIE!'});
    }

    render() {
        return (
            <div>
                <div id="result">{this.state.result}</div>

                <input id='p1' onChange={(e) => this.setState({p1Throw: e.target.value})}/>
                <input id='p2' onChange={(e) => this.setState({p2Throw: e.target.value})}/>
                <button id='submit' onClick={this.submit}>Submit</button>
            </div>
        );
    }
}

export default Form;
