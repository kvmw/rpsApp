const {Game, Throw, Result} = require('./Rps');
const {FakeRepository} = require('./FakeRepository');

describe('RPS Game', () => {
    const game = new Game(new FakeRepository());

    const observer = {
        p1wins: jest.fn(),
        p2wins: jest.fn(),
        tie: jest.fn(),
        error: jest.fn()
    };

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('when player 1 throws "Rock"', () => {
        describe('and player 2 throws "Scissors"', () => {
            it('then player 1 wins', () => {
                game.play(Throw.ROCK, Throw.SCISSORS, observer);

                expect(observer.p1wins).toHaveBeenCalled();
            });
        });

        describe('and player 2 throws "Paper"', () => {
            it('then player 2 wins', () => {
                game.play(Throw.ROCK, Throw.PAPER, observer);

                expect(observer.p2wins).toHaveBeenCalled();
            });
        });

        describe('and player 2 throws "Rock"', () => {
            it('then is tie', () => {
                game.play(Throw.ROCK, Throw.ROCK, observer);

                expect(observer.tie).toHaveBeenCalled();
            });
        });
    });

    describe('when player 1 throws "Paper"', () => {
        describe('and player 2 throws "Rock"', () => {
            it('then player 1 wins', () => {
                game.play(Throw.PAPER, Throw.ROCK, observer);

                expect(observer.p1wins).toHaveBeenCalled();
            });
        });

        describe('and player 2 throws "Scissors"', () => {
            it('then player 2 wins', () => {
                game.play(Throw.PAPER, Throw.SCISSORS, observer);

                expect(observer.p2wins).toHaveBeenCalled();
            });
        });

        describe('and player 2 throws "Paper"', () => {
            it('then is tie', () => {
                game.play(Throw.PAPER, Throw.PAPER, observer);

                expect(observer.tie).toHaveBeenCalled();
            });
        });
    });

    describe('when player 1 throws "Scissors"', () => {
        describe('and player 2 throws "Paper"', () => {
            it('then player 1 wins', () => {
                game.play(Throw.SCISSORS, Throw.PAPER, observer);

                expect(observer.p1wins).toHaveBeenCalled();
            });
        });

        describe('and player 2 throws "Rock"', () => {
            it('then player 2 wins', () => {
                game.play(Throw.SCISSORS, Throw.ROCK, observer);

                expect(observer.p2wins).toHaveBeenCalled();
            });
        });

        describe('and player 2 throws "Scissors"', () => {
            it('then is tie', () => {
                game.play(Throw.SCISSORS, Throw.SCISSORS, observer);

                expect(observer.tie).toHaveBeenCalled();
            });
        });
    });

    describe('when player 1 throws "fork"', () => {
        it('then is invalid', () => {
            game.play('fork', Throw.SCISSORS, observer);

            expect(observer.error).toHaveBeenCalled();
        });
    });

    describe('when player 2 throws "spoon"', () => {
        it('then is invalid', () => {
            game.play(Throw.PAPER, 'spoon', observer);

            expect(observer.error).toHaveBeenCalled();
        });
    });
});

describe('RPS Game History', () => {
    const ignore = () => {
    };

    const gameObserver = {
        p1wins: ignore,
        p2wins: ignore,
        tie: ignore,
        error: ignore
    };

    const historyObserver = {
        noHistory: jest.fn(),
        history: jest.fn()
    };

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('when no game is played', () => {
        it('sends no history to observer', () => {
            new Game(new FakeRepository()).history(historyObserver);

            expect(historyObserver.noHistory).toHaveBeenCalled();
        });
    });

    describe('when player 1 has won some rounds', () => {
        it('sends the rounds to observer', () => {
            let game = new Game(new FakeRepository());

            game.play(Throw.ROCK, Throw.SCISSORS, gameObserver);
            game.play(Throw.PAPER, Throw.ROCK, gameObserver);

            game.history(historyObserver);

            expect(historyObserver.history).toHaveBeenCalledWith([
                {id: 1, p1Throw: Throw.ROCK, p2Throw: Throw.SCISSORS, result: Result.P1_WINS},
                {id: 2, p1Throw: Throw.PAPER, p2Throw: Throw.ROCK, result: Result.P1_WINS}
            ]);
        });
    });

    describe('when player 2 has won some rounds', () => {
        it('sends the rounds to observer', () => {
            let game = new Game(new FakeRepository());

            game.play(Throw.SCISSORS, Throw.ROCK, gameObserver);
            game.play(Throw.ROCK, Throw.PAPER, gameObserver);

            game.history(historyObserver);

            expect(historyObserver.history).toHaveBeenCalledWith([
                {id: 1, p1Throw: Throw.SCISSORS, p2Throw: Throw.ROCK, result: Result.P2_WINS},
                {id: 2, p1Throw: Throw.ROCK, p2Throw: Throw.PAPER, result: Result.P2_WINS}
            ]);
        });
    });

    describe('when there are tie rounds', () => {
        it('sends the rounds to observer', () => {
            let game = new Game(new FakeRepository());

            game.play(Throw.SCISSORS, Throw.SCISSORS, gameObserver);
            game.play(Throw.ROCK, Throw.ROCK, gameObserver);

            game.history(historyObserver);

            expect(historyObserver.history).toHaveBeenCalledWith([
                {id: 1, p1Throw: Throw.SCISSORS, p2Throw: Throw.SCISSORS, result: Result.TIE},
                {id: 2, p1Throw: Throw.ROCK, p2Throw: Throw.ROCK, result: Result.TIE}
            ]);
        });
    });

    describe('when there are invalid rounds', () => {
        it('sends the rounds to observer', () => {
            let game = new Game(new FakeRepository());

            game.play('foo', 'bar', gameObserver);
            game.play('baz', 'qux', gameObserver);

            game.history(historyObserver);

            expect(historyObserver.history).toHaveBeenCalledWith([
                {id: 1, p1Throw: 'foo', p2Throw: 'bar', result: Result.INVALID},
                {id: 2, p1Throw: 'baz', p2Throw: 'qux', result: Result.INVALID}
            ]);
        });
    });
});

