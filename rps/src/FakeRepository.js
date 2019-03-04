class FakeRepository {

    constructor() {
        this.rounds = [];

        this.counter = 1;
    }

    isEmpty() {
        return this.rounds.length === 0;
    }

    save(r) {
        r.id = this.counter++;
        this.rounds.push(r);
    }

    all() {
        return this.rounds;
    }
}

module.exports = {FakeRepository};