const {itBehavesLikeRepository} = require('./RepositoryContract');
const {FakeRepository} = require('./FakeRepository');

describe('Fake Repository', () => {
    itBehavesLikeRepository(() => new FakeRepository());
});
