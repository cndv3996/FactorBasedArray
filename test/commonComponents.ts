import FactorBasedArray from "../src/index.js";
import generalConfig from "../general-config.json" assert { type: "json" };

// Check if the elements in FactorBasedArray well arranged in its defined Ascending order
export const verifyFactorsInRightOrder = (testArr: FactorBasedArray, isAscending: boolean = true): boolean => {
    let isValid = true;
    let preFactor: number = 0;
    for (let i = 0; i < testArr.length; i++) {
        const factor = Number(testArr.factor(i));
        const ascending = preFactor && (factor > preFactor);
        const descending = preFactor && (factor < preFactor);
        // Allow equality
        if (ascending !== isAscending && descending === isAscending) {
            isValid = false;
            console.log(`Invalid at index: ${i}, Previous factor: ${preFactor}, Factor: ${factor}`);
            break;
        }
        preFactor = factor;
    }
    return isValid;
}

// Check if a filled FactorBasedArray's each elements to be correspondent to original input values, indexed by factors
export const verifyFactorsToValuesCorrespondence = (testArr: FactorBasedArray, inFactors: Array<number>, inValues: Array<number>): boolean => {
    let isValid = true;
    for (let i = 0; i < testArr.length; i++) {
        const factor = Number(testArr.factor(i));
        const value = testArr.value(i);
        const pos = inFactors.indexOf(factor);
        if (pos === -1) {
            isValid = false;
            break;
        }
        const match = value === inValues[pos];
        if (!match) {
            isValid = false;
            break;
        }
    }
    return isValid;
}

// Generate random factors and values only
export const generateRandomData = (size: number) => {
    let counter = 0;
    const inValues = [];
    const inFactors = [];

    for (let i = 0; i < size; i++) {
        const factor = getRandomFactor();
        inValues.push(counter);
        inFactors.push(factor);
        counter++;
    }

    const finalArr = {
        inFactors: inFactors,
        inValues: inValues
    };

    return finalArr;
}

export const getRandomFactor = (): number => {
    const factor = Math.floor(Math.random() * generalConfig.test.maxFactor);
    return factor;
}

// Insert random factors and values to FactorBasedArray
export const feedArr = (testArr: FactorBasedArray, size: number) => {
    let counter = 0;
    const inValues = [];
    const inFactors = [];

    if (generalConfig.test.printInsertionSteps) {
        console.log(`Insert ${size} lines of test Data into FactorBasedArray.`);
    }

    for (let i = 0; i < size; i++) {
        const factor = getRandomFactor();
        testArr.insert(counter, factor);
        inValues.push(counter);
        inFactors.push(factor);
        // Print insertion steps
        if (generalConfig.test.printInsertionSteps && i < generalConfig.test.testDataLines) {
            const factors = testArr.factors();
            const values = testArr.values();
            const factorsString = factors.join(", ");
            const valuesString = values.join(", ");
            const inputFactorsString = inFactors.join(", ");
            const inputValuesString = inValues.join(", ");
            console.log(`Insertion step #${i + 1}`);
            console.log(`  Factors: ${factorsString}`);
            console.log(`  Values: ${valuesString}`);
            console.log(`  Input factors: ${inputFactorsString}`);
            console.log(`  Input values: ${inputValuesString}`);
            console.log("");
        }
        counter++;
    }

    if (generalConfig.test.printInsertionSteps) {
        console.log(`Insertion finished.`);
        console.log("");
    }

    const finalArr = {
        inFactors: inFactors,
        inValues: inValues,
        outArr: testArr
    };

    return finalArr;
}

// Import factors and values to FactorBasedArray
export const importArr = (testArr: FactorBasedArray, values: Array<number>, factors: Array<number>) => {
    if (!values.length) {
        throw("Empty input data.");
    }

    if (values.length !== factors.length) {
        throw("Unmatched input values and factors dimension.");
    }

    for (let i = 0; i < values.length; i++) {
        testArr.insert(values[i], factors[i]);
    }
}

// Check equality of two Arrays
export const arrMatch = (arr1: unknown[], arr2: unknown[]): boolean => {
    const arrString1 = arr1.join(", ");
    const arrString2 = arr2.join(", ");
    const isMatch = arrString1 === arrString2;
    return isMatch;
}

// Get a sized FactorBasedArray filled with random data
export const getRandomArr = (size: number): FactorBasedArray => {
    const arr = new FactorBasedArray();
    feedArr(arr, size);
    return arr;
}
