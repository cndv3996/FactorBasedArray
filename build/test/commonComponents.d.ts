import FactorBasedArray from "../src/index.js";
export declare const verifyFactorsInRightOrder: (testArr: FactorBasedArray, isAscending?: boolean) => boolean;
export declare const verifyFactorsToValuesCorrespondence: (testArr: FactorBasedArray, inFactors: Array<number>, inValues: Array<number>) => boolean;
export declare const generateRandomData: (size: number) => {
    inFactors: number[];
    inValues: number[];
};
export declare const getRandomFactor: () => number;
export declare const feedArr: (testArr: FactorBasedArray, size: number) => {
    inFactors: number[];
    inValues: number[];
    outArr: FactorBasedArray<unknown, number>;
};
export declare const importArr: (testArr: FactorBasedArray, values: Array<number>, factors: Array<number>) => void;
export declare const arrMatch: (arr1: unknown[], arr2: unknown[]) => boolean;
export declare const getRandomArr: (size: number) => FactorBasedArray;
//# sourceMappingURL=commonComponents.d.ts.map