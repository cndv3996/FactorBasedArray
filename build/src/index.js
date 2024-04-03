// Main Class
class FactorBasedArray {
    constructor(...args) {
        // Dictionary to hold Key-Value pairs
        this._map = {};
        // New data inserted to Dictionary
        this.isModified = true;
        // According to limit in Object, its key couldn't have more than 9 digits
        this.factorLengthLimit = 9;
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
    // Del a certain Key-Value pair by factor
    deleteByFactor(factor) {
        this.syncDictToArr();
        factor = this.validateFactor(factor);
        const index = this._factors.indexOf(factor);
        if (index === -1) {
            return false;
        }
        this.deleteByIndex(index);
        return true;
    }
    // Del a certain Key-Value pair by index
    deleteByIndex(index) {
        this.syncDictToArr();
        if (index < 0 || index >= this._values.length) {
            return false;
        }
        const factor = this._factors[index];
        delete this._factors[index];
        delete this._values[index];
        delete this._map[factor];
        return true;
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
    // Get a factors' array copy
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
    // Get index of key-value pair by factor
    indexOf(factor) {
        this.syncDictToArr();
        return this._factors.indexOf(factor);
    }
    // Insert an element into FactorBasedArray
    insert(value, factor) {
        factor = this.validateFactor(factor);
        this._map[factor] = value;
        this.invalidData();
    }
    validateFactor(factor) {
        if (!Number.isInteger(factor)) {
            const message = `${this.Error_Message_Factor_Fractional_Not_Acceptable}`;
            throw message;
        }
        // Digits of keys for Object can't exceed factorLengthLimit
        let t1 = factor.toString();
        if (t1.length > this.factorLengthLimit) {
            t1 = t1.substring(0, this.factorLengthLimit);
            factor = parseInt(t1);
        }
        return factor;
    }
    // New data inserted into Dictionary. Needs to be synced to factors' and values' array
    invalidData() {
        this.isModified = true;
    }
    // Get length of FactorBasedArray
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
    // Get the position in Array where the factor fits in
    // Used Binary-Search algorithm
    indexOfFactor(factor) {
        // If no elements exist, return default position
        if (this.length === 0) {
            return 0;
        }
        // 1. If only one element in the array
        // 2. Target factor position falls out of the existing elements' range of the array
        const afterStart = this.isInsertionAfter(0, factor);
        const afterEnd = this.isInsertionAfter(this._factors.length - 1, factor);
        if (afterStart === afterEnd) {
            // Not in the range of the Array
            if (afterEnd) {
                // End of the Array
                return this._factors.length;
            }
            else {
                // Start of the Array
                return 0;
            }
        }
        // Factor lies in exsiting range of the array, find the exact position to fit in
        // Binary-Search algorithm
        let start = 0;
        let end = this._factors.length - 1;
        let index = 0;
        while (start <= end) {
            const mid = Math.floor((start + end) * 0.5);
            // If K is found
            if (this._factors[mid] === factor) {
                index = mid;
                break;
            }
            const fallAfter = (this._factors[mid] < factor);
            if (fallAfter) {
                start = mid + 1;
            }
            else {
                end = mid - 1;
            }
        }
        // Return fitting in position
        index = end + 1;
        return index;
    }
    // Tell to fit in before or after the designated factor
    isInsertionAfter(index, factor) {
        if (index < 0) {
            // Out of bounds, fitting in before
            return false;
        }
        else if (index >= this._factors.length) {
            // Out of bounds, fitting in after
            return true;
        }
        // Inside bounds
        const target = this._factors[index];
        const greater = target < factor;
        // Factors are ascending
        return greater;
    }
    // [Useful API]
    // Remove elements before a certain Factor
    // One usecase is to remove outdated timestamps together with linked values
    removeFront(factor) {
        this.syncDictToArr();
        const index = this.indexOfFactor(factor);
        this._values = this._values.slice(index);
        this._factors = this._factors.slice(index);
        this.fillArrToDict(this._values, this._factors);
    }
    // [Useful API]
    // Remove elements after a certain Factor
    removeBack(factor) {
        this.syncDictToArr();
        const index = this.indexOfFactor(factor);
        this._values = this._values.slice(0, index);
        this._factors = this._factors.slice(0, index);
        this.fillArrToDict(this._values, this._factors);
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
        const factors1 = factors.map(factor => {
            return parseInt(factor);
        });
        this._factors = factors1;
        this._values = values;
        this.isModified = false;
    }
    // Get a value by index
    value(index) {
        this.syncDictToArr();
        return this._values[index];
    }
    // Get a values' array copy
    values() {
        this.syncDictToArr();
        return this._values.slice();
    }
}
export default FactorBasedArray;
//# sourceMappingURL=index.js.map