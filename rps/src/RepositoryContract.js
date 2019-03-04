const {Round, Throw, Result} = require('./Rps');

function itBehavesLikeRepository(repoFactory) {
    describe('Repository', () => {
        let repo;

        beforeEach(() => {
            repo = repoFactory();
        });

        it('shows if repo is empty', () => {
            expect(repo.isEmpty()).toBeTruthy();
        });

        it('shows if repo is NOT empty', () => {
            repo.save(new Round(Throw.ROCK, Throw.PAPER, Result.P2_WINS));

            expect(repo.isEmpty()).toBeFalsy();
        });

        it('returns empty list when repo is empty', () => {
            expect(repo.all()).toEqual([]);
        });

        it('returns list of rounds when repo is not empty', () => {

            repo.save(new Round(Throw.ROCK, Throw.ROCK, Result.TIE));
            repo.save(new Round(Throw.SCISSORS, Throw.PAPER, Result.P1_WINS));

            const result = repo.all().map(r => ({p1Throw: r.p1Throw, p2Throw: r.p2Throw, result: r.result}));

            expect(result).toEqual([
                {p1Throw: Throw.ROCK, p2Throw: Throw.ROCK, result: Result.TIE},
                {p1Throw: Throw.SCISSORS, p2Throw: Throw.PAPER, result: Result.P1_WINS}
            ]);
        });

        it('assigns unique id to each round during save', () => {
            repo.save(new Round('foo', 'bar', Result.INVALID));
            repo.save(new Round(Throw.PAPER, 'bar', Result.INVALID));

            const result = repo.all().map(r => r.id);

            expect(result[0]).not.toEqual(result[1]);
        });
    });
}

module.exports = {itBehavesLikeRepository};