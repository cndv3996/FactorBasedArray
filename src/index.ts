// Main Class
class FactorBasedArray<V = unknown, F = number> {
    // Factors referenced to make orders
    private _factors: Array<F>;
    // Values. Needs to be synced from Dictionary to be updated before reading
    private _values: Array<V>;
    // Dictionary to hold Key-Value pairs
    private _map: Record<number, unknown> = {};
    // New data inserted to Dictionary
    private isModified: Boolean = true;
    // According to limit in Object, its key couldn't have more than 9 digits
    readonly factorLengthLimit = 9;
    // Internal status messages
    private readonly Error_Message_Internal_Mismatch = "Internal data mismatch. Suggestion is to rebuild the array.";
    private readonly Error_Message_Factor_Fractional_Not_Acceptable = "Factor fractional not acceptable.";
    // Constructors
    // Pattern #1
    constructor();
    // Pattern #2
    constructor(inputArray: FactorBasedArray);
    // Pattern #3
    constructor(inputArray: Array<V>, inputFactors: Array<F>);
    constructor(...args: Array<unknown>) {
        if (args.length === 1 && args[0] instanceof FactorBasedArray) {
            // Initialse the FactorBasedArray with arguments of Pattern #2
            const inputArray = args[0] as FactorBasedArray;
            const factors = inputArray.factors() as F[];
            const values = inputArray.values() as V[];
            this._factors = factors;
            this._values = values;
            this.fillArrToDict(values, factors);
            return;
        }
        else if (args.length === 2 && Array.isArray(args[0]) && Array.isArray(args[1])) {
            // Initialse the FactorBasedArray with arguments of Pattern #3
            const factors = args[1] as F[];
            const values = args[0] as V[];
            this._factors = factors.slice() as F[];
            this._values = values.slice() as V[];
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
    clear(): void {
        this._map = {};
        this._factors.length = 0;
        this._values.length = 0;
    }

    // Clone FactorBasedArray
    clone(): FactorBasedArray<V, F> {
        this.syncDictToArr();
        const values = this._values;
        const factors = this._factors;
        const instance = new FactorBasedArray(values, factors);
        return instance;
    }

    // Del a certain Key-Value pair
    del(index: number) {
        this.syncDictToArr();
        const factor = this._factors[index];
        delete this._factors[index];
        delete this._values[index];
        delete this._map[factor as number];
    }

    // Array and Factors length alignment check
    doStabilityCheck() {
        // Check if the length of the original array match with that of factors.
        if (this._values.length !== this._factors.length) {
            throw this.Error_Message_Internal_Mismatch;
        }
    }

    // Get a factor by index
    factor(index: number): F {
        this.syncDictToArr();
        return this._factors[index] as F;
    }

    // Get a factors' array copy
    factors(): F[] {
        this.syncDictToArr();
        return this._factors.slice() as F[];
    }

    // Fill values & factors to an Object to use its hash-sorting feature
    private fillArrToDict(values: V[], factors: F[]) {
        this._map = {};
        for (let i = 0; i < values.length; i++) {
            this._map[factors[i] as number] = values[i];
        }
        this.invalidData();
    }

    // Insert an element into FactorBasedArray
    insert(value: V, factor: F): void {
        if (!Number.isInteger(factor)) {
            const message = `${this.Error_Message_Factor_Fractional_Not_Acceptable}`;
            throw message;
        }
        // Digits of keys for Object can't exceed factorLengthLimit
        let t1 = (factor as number).toString();
        if (t1.length > this.factorLengthLimit) {
            t1 = t1.substring(0, this.factorLengthLimit);
            factor = parseInt(t1) as F;
        }
        this._map[factor as number] = value;
        this.invalidData();
    }

    // New data inserted into Dictionary. Needs to be synced to factors' and values' array
    private invalidData() {
        this.isModified = true;
    }

    // Get length of FactorBasedArray
    get length(): number {
        this.syncDictToArr();
        const length = this._values.length;
        return length;
    }

    // Set length of FactorBasedArray
    set length(length: number) {
        this.syncDictToArr();
        this._factors.length = length;
        this._values.length = length;
        this.fillArrToDict(this._values, this._factors);
    }

    // Pop operation
    pop(): [V, F] {
        this.syncDictToArr();
        const value = this._values.pop() as V;
        const factor = this._factors.pop() as F;
        delete this._map[factor as number];
        return [value, factor];
    }

    // Shift operation
    shift(): [V, F] {
        this.syncDictToArr();
        const factor = this._factors.shift() as F;
        const value = this._values.shift() as V;
        delete this._map[factor as number];
        return [value, factor];
    }

    // Sync factors & values from this._map to array default containers
    private syncDictToArr() {
        if (!this.isModified) {
            return;
        }
        const factors = Object.keys(this._map) as string[];
        const values = Object.values(this._map) as V[];
        this._factors = factors as F[];
        this._values = values as V[];
        this.isModified = false;
    }

    // Get a value by index
    value(index: number): V | undefined {
        this.syncDictToArr();
        return this._values[index];
    }

    // Get a values' array copy
    values(): V[] {
        this.syncDictToArr();
        return this._values.slice() as V[];
    }
}

export default FactorBasedArray;