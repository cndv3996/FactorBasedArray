import FactorBasedArray from "../src/index";
import generalConfig from "../general-config.json";

export const verifyFactorsInRightOrder = (testArr: FactorBasedArray, isAscending: boolean = true): boolean => {
    let isValid = true;
    let preFactor;
    for (let i = 0; i < testArr.length; i++) {
        const factor = testArr.factorAt(i);
        const ascending = preFactor && factor > preFactor;
        const descending = preFactor && factor < preFactor;
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

export const verifyFactorsToValuesCorrespondence = (testArr: FactorBasedArray, inFactors: Array<number>, inValues: Array<number>): boolean => {
    let isValid = true;
    for (let i = 0; i < testArr.length; i++) {
        const factor = testArr.factorAt(i);
        const value = testArr[i] as number;
        const factorMatches = factor === inFactors[value];
        const valueMatches = value === inValues[value];
        if (!factorMatches || !valueMatches) {
            isValid = false;
            break;
        }
    }
    return isValid;
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
        const factor = Math.random();
        testArr.insert(counter, factor);
        inValues.push(counter);
        inFactors.push(factor);
        // Print insertion steps
        if (generalConfig.test.printInsertionSteps && i < generalConfig.test.testDataLines) {
            const factors = testArr.factors();
            const values = testArr.slice();
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

export const arrMatch = (arr1: unknown[], arr2: unknown[]): boolean => {
    const arrString1 = JSON.stringify(arr1);
    const arrString2 = JSON.stringify(arr2);
    const isMatch = arrString1 === arrString2;
    return isMatch;
}

export const getRandomArr = (size: number): FactorBasedArray => {
    const arr = new FactorBasedArray();
    feedArr(arr, size);
    return arr;
}
