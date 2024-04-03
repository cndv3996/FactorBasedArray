declare class FactorBasedArray<V = unknown, F = number> {
    private _factors;
    private _values;
    private _map;
    private isModified;
    readonly factorLengthLimit = 9;
    private readonly Error_Message_Internal_Mismatch;
    private readonly Error_Message_Factor_Fractional_Not_Acceptable;
    constructor();
    constructor(inputArray: FactorBasedArray);
    constructor(inputArray: Array<V>, inputFactors: Array<F>);
    clear(): void;
    clone(): FactorBasedArray<V, F>;
    deleteByFactor(factor: F): boolean;
    deleteByIndex(index: number): boolean;
    doStabilityCheck(): void;
    factor(index: number): F;
    factors(): F[];
    private fillArrToDict;
    indexOf(factor: F): number;
    insert(value: V, factor: F): void;
    private validateFactor;
    private invalidData;
    get length(): number;
    set length(length: number);
    pop(): [V, F];
    indexOfFactor(factor: F): number;
    isInsertionAfter(index: number, factor: F): boolean;
    removeFront(factor: F): void;
    removeBack(factor: F): void;
    shift(): [V, F];
    private syncDictToArr;
    value(index: number): V | undefined;
    values(): V[];
}
export default FactorBasedArray;
//# sourceMappingURL=index.d.ts.map