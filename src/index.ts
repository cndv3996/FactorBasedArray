class FactorBasedArray<V = unknown, F = number> extends Array<V> {
    // Array sorted based on factors in ascending or decending order
    private asc = true;
    // -1: unlimited Array length, else: limited
    private maxLength = -1;
    // If do Array and Factors length alignment check
    private stabilityCheck = true;
    // Factors referenced to make orders
    private _factors: Array<F>;
    private enablePush = false;
    // Internal status messages
    private readonly Error_Message_Internal_Mismatch = "Internal data mismatch. Suggestion is to rebuild the array.";
    private readonly Error_Message_Algorithm_Fault = "Algorithm fault. Sorry I'm not sure where it went wrong. Maybe you can report it.";
    private readonly Error_Message_Method_Disabled = "This Class Method is disabled.";
    private readonly Error_Message_Use_Method_Insert = "Please use 'insert' instead.";
    private readonly Error_Message_Cannot_Sort = "The array cannot be sorted.";
    private readonly Error_Message_Cannot_Splice = "The array cannot be spliced.";
    private readonly Error_Message_Compitable_Reasons = "Out of compitable reasons.";
    // Constructors
    // Pattern #1
    constructor(inputArray: FactorBasedArray);
    // Pattern #2
    constructor(inputArray: Array<V>, inputFactors: Array<F>);
    // Pattern #3
    constructor(inputArray: Array<V>, inputFactors: Array<F>, asc: boolean);
    // Pattern #4
    constructor(inputArray: Array<V>, inputFactors: Array<F>, asc: boolean, maxLength: number);
    // Pattern #5
    constructor(inputArray: Array<V>, inputFactors: Array<F>, asc: boolean, maxLength: number, stabilityCheck: boolean);
    // Pattern #6
    constructor();
    // Pattern #7
    constructor(asc: boolean);
    // Pattern #8
    constructor(asc: boolean, maxLength: number);
    // Pattern #9
    constructor(asc: boolean, maxLength: number, stabilityCheck: boolean);
    constructor(...args: Array<any>) {
        let defaultArgs = args;
        super();
        if (args.length === 1 && args[0] instanceof FactorBasedArray) {
            // Initialse the FactorBasedArray with arguments of Pattern #1
            const inputArray = args[0] as FactorBasedArray;
            const array = inputArray.slice() as V[];
            this._factors = inputArray.factors() as F[];
            super.push(...array);
            this._sort();
            return;
        }
        else if (args.length >= 2 && Array.isArray(args[0]) && Array.isArray(args[1])) {
            // Initialse the FactorBasedArray with arguments of Pattern #2/#3/#4/#5
            const inputArray = args[0] as V[];
            const inputFactors = args[1] as F[];
            const array = inputArray.slice() as V[];
            this._factors = inputFactors.slice() as F[];
            defaultArgs = args.slice(2);
            super.push(...array);
            this._sort();
            this.initialiseDefaultArgs(defaultArgs);
            return;
        }

        this._factors = new Array();
        this.initialiseDefaultArgs(defaultArgs);
        return;
    }

    // Array and Factors length alignment check
    arrayStabilityCheck(): void {
        // Check if the length of the original array match with that of factors.
        if (this.length !== this._factors.length) {
            throw this.Error_Message_Internal_Mismatch;
        }
    }

    // Reset FactorBasedArray
    clear(): void {
        this.length = 0;
        this._factors.length = 0;
    }

    // Clone FactorBasedArray
    clone(): FactorBasedArray<V, F> {
        const array = super.slice();
        const factors = this.factors();
        const instance = new FactorBasedArray(array, factors);
        return instance;
    }

    // Concat FactorBasedArray
    concatFBA(...items: FactorBasedArray<V, F>[]): FactorBasedArray<V, F> {
        let values = super.slice();
        let factors = this.factors();
        for (const item of items) {
            if (item instanceof FactorBasedArray) {
                values = values.concat(item);
                factors = factors.concat(item.factors());
            }
        }
        const instance = new FactorBasedArray(values, factors);
        return instance;
    }

    // CopyWithin FactorBasedArray
    copyWithinFBA(target: number, start: number, end?: number | undefined): FactorBasedArray<V, F> {
        // const message = `${this.Error_Message_Method_Disabled}, ${this.Error_Message_Compitable_Reasons}`;
        // throw message;
        super.copyWithin(target, start, end);
        this._factors.copyWithin(target, start, end);
        return this;
    }

    // Get a factor by index
    factorAt(index: number): F {
        return this._factors[index];
    }

    // Clone factors into an Array
    factors(): F[] {
        return this._factors.slice();
    }

    // Initialse default arguments
    private initialiseDefaultArgs(args: unknown[]): void {
        if (args.length === 1 && typeof args[0] === "boolean") {
            this.asc = args[0];
        }
        else if (args.length === 2 && typeof args[0] === "boolean" && typeof args[1] === "number") {
            this.asc = args[0];
            this.maxLength = args[1];
        }
        else if (args.length === 3 && typeof args[0] === "boolean" && typeof args[1] === "number" && typeof args[2] === "boolean") {
            this.asc = args[0];
            this.maxLength = args[1];
            this.stabilityCheck = args[2];
        }
    }

    // Insert an element into FactorBasedArray
    insert(value: V, factor: F, stabilityCheck: boolean = true): void {
        const index = this.indexOfFactor(factor, stabilityCheck);
        if (index === this.length) {
            // Push to end
            super.push(value);
            this._factors.push(factor);
            return;
        }
        super.splice(index, 0, value);
        this._factors.splice(index, 0, factor);
    }

    // Get the position in Array where to insert the element
    indexOfFactor(factor: F, stabilityCheck: boolean = true): number {
        // For mass insertion, there is an option to disable the stabilityCheck
        // You can call that yourself after the batch insertion
        (stabilityCheck && this.stabilityCheck) && this.arrayStabilityCheck();
        // If no elements exist, just insert
        if (this.length === 0) {
            return 0;
        }
        // 1. If only one element in the array
        // 2. Inserting factor falls out of the existing elements' range of the array
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
        // Factor lies in exsiting range of the array, find the exact position to insert into
        // With initial comparison range
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
            const fallAfter = (this.asc && this._factors[mid] < factor) ||
                (!this.asc && this._factors[mid] > factor);
            if (fallAfter) {
                start = mid + 1;
            }
            else {
                end = mid - 1;
            }
        }
        // Return insert position
        index = end + 1;
        return index;
    }

    // Return Factors sorting order
    isAscending(): boolean {
        return this.asc;
    }

    // Tell to insert before or after the designated factor
    isInsertionAfter(index: number, factor: F): boolean {
        if (index < 0) {
            // Out of bounds, insert before
            return false;
        }
        else if (index >= this._factors.length) {
            // Out of bounds, insert after
            return true;
        }
        // Inside bounds
        const target = this._factors[index];
        const greater = target < factor;
        if (this.asc) {
            // Factors are ascending
            if (greater) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            // Descending factors
            if (greater) {
                return false;
            }
            else {
                return true;
            }
        }
    }

    // Set length of FactorBasedArray
    set length(length: number) {
        this.length = length;
        this._factors.length = length;
    }

    // Pop operation
    pop(): V | undefined {
        const value = super.pop() as V;
        this._factors.pop();
        return value;
    }

    // Push operation
    push(...items: V[]): number {
        const message = `${this.Error_Message_Method_Disabled}, ${this.Error_Message_Use_Method_Insert}`;
        throw message;
    }

    // Reverse operation
    reverse(): V[] {
        const array = super.reverse();
        this._factors.reverse();
        return array;
    }

    // Shift operation
    shift(): V | undefined {
        const value = super.shift() as V;
        this._factors.shift();
        return value;
    }

    // Disable: Sort operation
    sort(compareFn?: ((a: V, b: V) => number) | undefined): this {
        const message = `${this.Error_Message_Method_Disabled}, ${this.Error_Message_Cannot_Sort}`;
        throw message;
    }

    // Private: Internal Sort operation
    private _sort() {
        interface CompareElement {
            index: number,
            factor: number
        }
        const sortedInputs = this._factors.map((value, index) => ({ index: index, factor: value })) as CompareElement[];
        const compareFunc = (a: CompareElement, b: CompareElement) => {
            return this.asc ? a.factor - b.factor : b.factor - a.factor;
        }
        sortedInputs.sort(compareFunc);
        this._factors = sortedInputs.map((value) => value.factor) as F[];
        const values = sortedInputs.map((value) => this[value.index]);
        this.length = 0;
        super.push(...values);
    }

    // Disable: Splice operation
    splice(start: number, deleteCount?: number | undefined): V[];
    splice(start: number, deleteCount: number, ...items: V[]): V[];
    splice(start: unknown, deleteCount?: unknown, ...rest: unknown[]): V[] {
        const message = `${this.Error_Message_Method_Disabled}, ${this.Error_Message_Cannot_Splice}`;
        throw message;
    }

    // Disable: Unshift operation
    unshift(...items: V[]): number {
        const message = `${this.Error_Message_Method_Disabled}, ${this.Error_Message_Use_Method_Insert}`;
        throw message;
    }
}

export default FactorBasedArray;