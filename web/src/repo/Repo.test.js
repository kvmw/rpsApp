import {Repo} from './Repo';
import {itBehavesLikeRepository} from 'rps';


class FakeLocalStorage {
    constructor() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        this.store[key] = value.toString();
    }
}

global.localStorage = new FakeLocalStorage;

describe('Repo Test', () => {
    itBehavesLikeRepository(() => new Repo(new FakeLocalStorage()));
});