import React from 'react';
import {shallow} from 'enzyme';
import History from './History';
import {Result, Throw} from 'rps';

describe('Game History', () => {

    describe('when there is no history', () => {
        it('tells the user no history', () => {
            const noHistoryGame = {
                history: (observer) => observer.noHistory()
            };
            const component = shallow(<History game={noHistoryGame}/>);

            expect(component.text()).toContain('NO HISTORY');
        });
    });

    describe('when there is history available', () => {
        const expectRound = (row, p1Throw, p2Throw, result) => {
            expect(row).toContain(p1Throw);
            expect(row).toContain(p2Throw);
            expect(row).toContain(result);
        };

        it('shows the game history, recent round first', () => {
            const noHistoryGame = {
                history: (observer) => observer.history([
                    {id: 1, p1Throw: Throw.ROCK, p2Throw: Throw.SCISSORS, result: Result.P1_WINS},
                    {id: 2, p1Throw: Throw.ROCK, p2Throw: Throw.PAPER, result: Result.P2_WINS}
                ])
            };

            const component = shallow(<History game={noHistoryGame}/>);

            expect(component.text()).not.toContain('NO HISTORY');

            expectRound(component.find('#row-1').text(), Throw.ROCK, Throw.PAPER, Result.P2_WINS);
            expectRound(component.find('#row-2').text(), Throw.ROCK, Throw.SCISSORS, Result.P1_WINS);
        });

        it('user can request the updated history', () => {
            const items = [
                {id: 1, p1Throw: Throw.ROCK, p2Throw: Throw.SCISSORS, result: Result.P1_WINS}
            ];

            const myGame = {
                history: (observer) => observer.history(items)
            };

            const component = shallow(<History game={myGame}/>);

            expectRound(component.find('#row-1').text(), Throw.ROCK, Throw.SCISSORS, Result.P1_WINS);

            items.push({id: 2, p1Throw: Throw.ROCK, p2Throw: Throw.PAPER, result: Result.P2_WINS});

            component.find('button#refresh').simulate('click');

            expectRound(component.find('#row-1').text(), Throw.ROCK, Throw.PAPER, Result.P2_WINS);
            expectRound(component.find('#row-2').text(), Throw.ROCK, Throw.SCISSORS, Result.P1_WINS);
        });
    });
});
