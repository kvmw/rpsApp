import React, {Component} from 'react';

class History extends Component {

    constructor(props) {
        super(props);

        this.game = props.game;

        this.state = {history: ''};

        this.noHistory = this.noHistory.bind(this);
        this.history = this.history.bind(this);
    }

    componentDidMount() {
        this.game.history(this);
    }

    noHistory() {
        this.setState({history: 'NO HISTORY'});
    }

    history(items) {
        const render =
            <ul>
                {items.reverse().map((r, i) => <li key={i} id={'row-' + (i + 1)}>
                    <span>{r.id}</span> :&nbsp;
                    <span>{r.p1Throw}</span> vs.&nbsp;
                    <span>{r.p2Throw}</span> =>&nbsp;
                    <span>{r.result}</span>
                </li>)}
            </ul>;

        this.setState({history: render});
    }

    render() {
        return (
            <div>
                {this.state.history}
                <button id='refresh' onClick={() => this.game.history(this)}>Refresh</button>
            </div>
        );
    }
}

export default History;
