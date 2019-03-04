import React from 'react';
import {shallow} from 'enzyme';
import Form from './Form';
import {Throw} from 'rps';

describe('Game Form', () => {

    describe('when invalid throw(s) is submitted', () => {
        it('displays "INVALID THROW(S)!"', () => {
            const alwaysInvalidGame = {
                play: (p1, p2, observer) => observer.error()
            };

            const component = shallow(<Form game={alwaysInvalidGame}/>);

            expect(component.find('#result').text()).not.toContain('INVALID THROW(S)!');

            component.find('button#submit').simulate('click');

            expect(component.find('#result').text()).toContain('INVALID THROW(S)!');
        });
    });

    describe('when player 1 wins', () => {
        it('displays "PLAYER ONE WINS!"', () => {
            const alwaysPlayer1WinsGame = {
                play: (p1, p2, observer) => observer.p1wins()
            };

            const component = shallow(<Form game={alwaysPlayer1WinsGame}/>);

            expect(component.find('#result').text()).not.toContain('PLAYER ONE WINS!');

            component.find('button#submit').simulate('click');

            expect(component.find('#result').text()).toContain('PLAYER ONE WINS!');
        });
    });

    describe('when player 2 wins', () => {
        it('displays "PLAYER TWO WINS!"', () => {
            const alwaysPlayer2WinsGame = {
                play: (p1, p2, observer) => observer.p2wins()
            };

            const component = shallow(<Form game={alwaysPlayer2WinsGame}/>);

            expect(component.find('#result').text()).not.toContain('PLAYER TWO WINS!');

            component.find('button#submit').simulate('click');

            expect(component.find('#result').text()).toContain('PLAYER TWO WINS!');
        });
    });

    describe('when is tie', () => {
        it('displays "TIE!"', () => {
            const alwaysTieGame = {
                play: (p1, p2, observer) => observer.tie()
            };

            const component = shallow(<Form game={alwaysTieGame}/>);

            expect(component.find('#result').text()).not.toContain('TIE!');

            component.find('button#submit').simulate('click');

            expect(component.find('#result').text()).toContain('TIE!');
        });
    });

    describe('on submit', () => {
        it('passes the throws to game', () => {
            const alwaysTieGame = {
                play: jest.fn()
            };

            const component = shallow(<Form game={alwaysTieGame}/>);


            component.find('input#p1').simulate('change', {target: {value: Throw.PAPER}});
            component.find('input#p2').simulate('change', {target: {value: Throw.ROCK}});

            component.find('button#submit').simulate('click');

            expect(alwaysTieGame.play).toHaveBeenCalledWith(Throw.PAPER, Throw.ROCK, expect.anything());
        });

        it('passes another pair of throws to the game', () => {
            const alwaysTieGame = {
                play: jest.fn()
            };

            const component = shallow(<Form game={alwaysTieGame}/>);


            component.find('input#p1').simulate('change', {target: {value: Throw.ROCK}});
            component.find('input#p2').simulate('change', {target: {value: Throw.SCISSORS}});

            component.find('button#submit').simulate('click');

            expect(alwaysTieGame.play).toHaveBeenCalledWith(Throw.ROCK, Throw.SCISSORS, expect.anything());
        });
    });
});
