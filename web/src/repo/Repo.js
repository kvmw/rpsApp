const STORAGE_KEY = 'abcdefgh-key-storage';

export class Repo {
    constructor(storage) {
        this.storage = storage;
    }

    isEmpty() {
        const items = this.storage.getItem(STORAGE_KEY);

        return !items || items.length === 0;
    }

    save(r) {
        const items = this.all();

        r.id = items.length + 1;
        items.push(r);

        this.storage.setItem(STORAGE_KEY, JSON.stringify(items));
    }

    all() {
        const items = this.storage.getItem(STORAGE_KEY);
        return items ? JSON.parse(items) : [];
    }
}
