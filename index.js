class FactorBasedArray {
    constructor(...args) {
        this._map = {};
        this.isModified = true;
        // Internal status messages
        this.Error_Message_Internal_Mismatch = "Internal data mismatch. Suggestion is to rebuild the array.";
        this.Error_Message_Factor_Fractional_Not_Acceptable = "Factor fractional not acceptable.";
        if (args.length === 1 && args[0] instanceof FactorBasedArray) {
            // Initialse the FactorBasedArray with arguments of Pattern #2
            const inputArray = args[0];
            const factors = inputArray.factors();
            const values = inputArray.values();
            this._factors = factors;
            this._values = values;
            this.fillArrToDict(values, factors);
            return;
        }
        else if (args.length === 2 && Array.isArray(args[0]) && Array.isArray(args[1])) {
            // Initialse the FactorBasedArray with arguments of Pattern #3
            const factors = args[1];
            const values = args[0];
            this._factors = factors.slice();
            this._values = values.slice();
            this.fillArrToDict(values, factors);
            return;
        }
        else {
            // Initialse the FactorBasedArray with arguments of Pattern #1
            this._factors = new Array();
            this._values = new Array();
        }
        return;
    }
    // Get a value by index
    value(index) {
        this.syncDictToArr();
        return this._values[index];
    }
    // Reset FactorBasedArray
    clear() {
        this._map = {};
        this._factors.length = 0;
        this._values.length = 0;
    }
    // Clone FactorBasedArray
    clone() {
        this.syncDictToArr();
        const values = this._values;
        const factors = this._factors;
        const instance = new FactorBasedArray(values, factors);
        return instance;
    }
    del(index) {
        this.syncDictToArr();
        const factor = this._factors[index];
        delete this._factors[index];
        delete this._values[index];
        delete this._map[factor];
    }
    // Array and Factors length alignment check
    doStabilityCheck() {
        // Check if the length of the original array match with that of factors.
        if (this._values.length !== this._factors.length) {
            throw this.Error_Message_Internal_Mismatch;
        }
    }
    // Get a factor by index
    factor(index) {
        this.syncDictToArr();
        return this._factors[index];
    }
    // Clone factors into an Array
    factors() {
        this.syncDictToArr();
        return this._factors.slice();
    }
    // Fill values & factors to an Object to use its hash-sorting feature
    fillArrToDict(values, factors) {
        this._map = {};
        for (let i = 0; i < values.length; i++) {
            this._map[factors[i]] = values[i];
        }
        this.invalidData();
    }
    invalidData() {
        this.isModified = true;
    }
    // Set length of FactorBasedArray
    get length() {
        this.syncDictToArr();
        const length = this._values.length;
        return length;
    }
    // Set length of FactorBasedArray
    set length(length) {
        this.syncDictToArr();
        this._factors.length = length;
        this._values.length = length;
        this.fillArrToDict(this._values, this._factors);
    }
    // Pop operation
    pop() {
        this.syncDictToArr();
        const value = this._values.pop();
        const factor = this._factors.pop();
        delete this._map[factor];
        return [value, factor];
    }
    // Insert an element into FactorBasedArray
    insert(value, factor) {
        if (!Number.isInteger(factor)) {
            const message = `${this.Error_Message_Factor_Fractional_Not_Acceptable}`;
            throw message;
        }
        this._map[factor] = value;
        this.invalidData();
    }
    // Shift operation
    shift() {
        this.syncDictToArr();
        const factor = this._factors.shift();
        const value = this._values.shift();
        delete this._map[factor];
        return [value, factor];
    }
    // Sync factors & values from this._map to array default containers
    syncDictToArr() {
        if (!this.isModified) {
            return;
        }
        const factors = Object.keys(this._map);
        const values = Object.values(this._map);
        this._factors = factors;
        this._values = values;
        /*
        const factors = [];
        const values = [];
        for (const key in this._map) {
            factors.push(key);
            values.push(this._map[key]);
        }
        this._factors = factors as F[];
        this._values = values as V[];
        //*/
        this.isModified = false;
    }
    // Clone values into an Array
    values() {
        this.syncDictToArr();
        return this._values.slice();
    }
}

export { FactorBasedArray as default };
