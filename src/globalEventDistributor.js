export class GlobalEventDistributor {

    constructor() {
        this.stores = [];
    }

    registerStore(store) {
        this.stores.push(store);
    }

    dispatch(event) {
        console.log('GlobalEventDistributor dispatch');
        this.stores.forEach((s) => s.dispatch(event));
    }
}