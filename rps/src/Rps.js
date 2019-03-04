const Throw = Object.freeze({
    ROCK: 'Rock',
    PAPER: 'Paper',
    SCISSORS: 'Scissors'
});

const Result = Object.freeze({
    P1_WINS: 'p1',
    P2_WINS: 'p2',
    TIE: 'tie',
    INVALID: 'invalid'
});

class Game {
    constructor(repository) {
        this.repository = repository;
    }

    play(p1Throw, p2Throw, observer) {
        new Request(p1Throw, p2Throw, observer, this.repository).run();
    }

    history(observer) {
        const r = this.repository.isEmpty();

        if (r)
            observer.noHistory();
        else
            observer.history(this.repository.all());
    }
}

class Request {
    constructor(p1Throw, p2Throw, observer, repository) {
        this.p1Throw = p1Throw;
        this.p2Throw = p2Throw;
        this.observer = observer;
        this.repository = repository;
    }

    run() {
        if (this.isInvalid()) {
            this.repository.save(new Round(this.p1Throw, this.p2Throw, Result.INVALID));
            this.observer.error();

        } else if (this.isTie()) {
            this.repository.save(new Round(this.p1Throw, this.p2Throw, Result.TIE));
            this.observer.tie();

        } else if (this.playerOneWins()) {
            this.repository.save(new Round(this.p1Throw, this.p2Throw, Result.P1_WINS));
            this.observer.p1wins();

        } else {
            this.repository.save(new Round(this.p1Throw, this.p2Throw, Result.P2_WINS));
            this.observer.p2wins();
        }
    }

    isTie() {
        return this.p1Throw === this.p2Throw;
    }

    playerOneWins() {
        return this.p1Throw === Throw.ROCK && this.p2Throw === Throw.SCISSORS
            || this.p1Throw === Throw.PAPER && this.p2Throw === Throw.ROCK
            || this.p1Throw === Throw.SCISSORS && this.p2Throw === Throw.PAPER;
    }

    isInvalid() {
        return [this.p1Throw, this.p2Throw].some(t => ![Throw.ROCK, Throw.PAPER, Throw.SCISSORS].includes(t));
    }
}

class Round {
    constructor(p1Throw, p2Throw, result) {
        this.p1Throw = p1Throw;
        this.p2Throw = p2Throw;
        this.result = result;

        this.id = undefined;
    }
}

module.exports = {Game, Throw, Round, Result};