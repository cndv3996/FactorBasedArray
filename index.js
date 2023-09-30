"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FactorBasedArray extends Array {
    constructor(...args) {
        super();
        // Array sorted based on factors in ascending or decending order
        this.asc = true;
        // -1: unlimited Array length, else: limited
        this.maxLength = -1;
        // If do Array and Factors length alignment check
        this.stabilityCheck = true;
        // Internal status messages
        this.Error_Message_Internal_Mismatch = "Internal data mismatch. Suggestion is to rebuild the array.";
        this.Error_Message_Algorithm_Fault = "Algorithm fault. Sorry I'm not sure where it went wrong. Maybe you can report it.";
        this.Error_Message_Method_Disabled = "This Class Method is disabled.";
        this.Error_Message_Use_Method_Insert = "Please use 'insert' instead.";
        this.Error_Message_Cannot_Sort = "The array cannot be sorted.";
        this.Error_Message_Cannot_Splice = "The array cannot be spliced.";
        this.Error_Message_Compitable_Reasons = "Out of compitable reasons.";
        let defaultArgs = args;
        // Initialse the FactorBasedArray with arguments of Pattern #1
        if (args.length === 1 && args[0] instanceof FactorBasedArray) {
            const inputArray = args[0];
            const array = inputArray.slice();
            this._factors = inputArray.factors();
            super(...array);
            return;
        }
        // Initialse the FactorBasedArray with arguments of Pattern #2/#3/#4/#5
        else if (args.length >= 2 && Array.isArray(args[0]) && Array.isArray(args[1])) {
            const inputArray = args[0];
            const inputFactors = args[1];
            const array = inputArray.slice();
            this._factors = inputFactors.slice();
            super(...array);
            defaultArgs = args.slice(2);
            this.initialiseDefaultArgs(defaultArgs);
            return;
        }
        this._factors = new Array();
        this.initialiseDefaultArgs(defaultArgs);
        return;
    }
    // Array and Factors length alignment check
    arrayStabilityCheck() {
        // Check if the length of the original array match with that of factors.
        if (this.length !== this._factors.length) {
            throw this.Error_Message_Internal_Mismatch;
        }
    }
    // Reset FactorBasedArray
    clear() {
        this.length = 0;
        this._factors.length = 0;
    }
    // Clone FactorBasedArray
    clone() {
        const array = super.slice();
        const factors = this.factors();
        const instance = new FactorBasedArray(array, factors);
        return instance;
    }
    // Concat FactorBasedArray
    concatFBA(...items) {
        const array = super.slice();
        const factors = this.factors();
        for (const item of items) {
            if (item instanceof FactorBasedArray) {
                array.concat(item);
                factors.concat(item.factors());
            }
        }
        const instance = new FactorBasedArray(array, factors);
        return instance;
    }
    // CopyWithin FactorBasedArray
    copyWithinFBA(target, start, end) {
        const message = `${this.Error_Message_Method_Disabled}, ${this.Error_Message_Compitable_Reasons}`;
        throw message;
        // const array = super.copyWithin(target, start, end);
        // const factors = this._factors.copyWithin(target, start, end);
        // const instance = new FactorBasedArray(array, factors);
        // return instance;
    }
    // Clone factors into an Array
    factors() {
        return this._factors.slice();
    }
    // Initialse default arguments
    initialiseDefaultArgs(args) {
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
    insert(value, factor, stabilityCheck = true) {
        const index = this.indexOfFactor(factor, stabilityCheck);
        if (index === this.length || index === (this.length - 1)) {
            // Push to end
            super.push(value);
            this._factors.push(factor);
            return;
        }
        super.splice(index, 0, value);
        this._factors.splice(index, 0, factor);
    }
    // Get the position in Array where to insert the element
    indexOfFactor(factor, stabilityCheck = true) {
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
            else if (this._factors[mid] < factor) {
                start = mid + 1;
            }
            else {
                end = mid - 1;
            }
        }
        // Return insert position
        index = end + 1;
        return index;
        const openList = new Array(0, this._factors.length);
        let min = Number.MAX_VALUE;
        let max = Number.MIN_VALUE;
        // If openList is not empty
        while (openList.length > 0) {
            // Read from end, easy to remove them after comparison
            const beginIndex = openList[openList.length - 2];
            const endIndex = openList[openList.length - 1];
            const begin = this._factors[beginIndex];
            const end = this._factors[endIndex - 1];
            let tempMin = Math.min(begin, end);
            let tempMax = Math.max(begin, end);
            min = Math.min(min, tempMin);
            max = Math.max(max, tempMax);
            if (beginIndex === endIndex || (beginIndex + 1) === endIndex) {
                // Found
                openList.length = 0;
                return beginIndex;
            }
            const greaterThanTheBegin = begin < factor;
            const greaterThanTheEnd = end < factor;
            if (greaterThanTheBegin !== greaterThanTheEnd) {
                // Factor lies inside the range
                openList.length = 0;
                const middleIndex = Math.floor((beginIndex + endIndex) * 0.5);
                openList.push(beginIndex);
                openList.push(middleIndex);
                openList.push(middleIndex);
                openList.push(endIndex);
            }
            else {
                // Remove used comparison range
                openList.length -= 2;
            }
        }
        // Not lies in existing range
        openList.length = 0;
        // Should not happen. If it comes here, maybe we need to debug.
        throw this.Error_Message_Algorithm_Fault;
    }
    // Tell to insert before or after the designated factor
    isInsertionAfter(index, factor) {
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
    set length(length) {
        this.length = length;
        this._factors.length = length;
    }
    // Pop operation
    pop() {
        const value = super.pop();
        this._factors.pop();
        return value;
    }
    // Push operation
    push(...items) {
        const message = `${this.Error_Message_Method_Disabled}, ${this.Error_Message_Use_Method_Insert}`;
        throw message;
    }
    // Reverse operation
    reverse() {
        const array = super.reverse();
        this._factors.reverse();
        return array;
    }
    // Shift operation
    shift() {
        const value = super.shift();
        this._factors.shift();
        return value;
    }
    // Disable: Sort operation
    sort(compareFn) {
        const message = `${this.Error_Message_Method_Disabled}, ${this.Error_Message_Cannot_Sort}`;
        throw message;
    }
    splice(start, deleteCount, ...rest) {
        const message = `${this.Error_Message_Method_Disabled}, ${this.Error_Message_Cannot_Splice}`;
        throw message;
    }
    // Disable: Unshift operation
    unshift(...items) {
        const message = `${this.Error_Message_Method_Disabled}, ${this.Error_Message_Use_Method_Insert}`;
        throw message;
    }
}
exports.default = FactorBasedArray;
