import FactorBasedArray from "../src/index.js";
import { verifyFactorsInRightOrder, verifyFactorsToValuesCorrespondence, feedArr } from "./commonComponents.js";
import generalConfig from "../general-config.json" assert { type: "json" };

const testItems = [];
const testResults = [];



// Test group #1
console.log("***************************************");
console.log("Test ascending order FactorBasedArray: ");
console.log("");
const testArr1 = new FactorBasedArray();
const finalArr1 = feedArr(testArr1, generalConfig.test.testDataLines);
const inFactors1 = finalArr1.inFactors;
const inValues1 = finalArr1.inValues;

// Print factors and values in FactorBasedArray
if (generalConfig.test.printFinalFactorsAndValuesInArray) {
    console.log("Print factors and values in FactorBasedArray: ");
    const factors1 = testArr1.factors();
    const values1 = testArr1.values();
    const text1 = factors1.join(", ");
    const text2 = values1.join(", ");

    console.log("Factors: " + text1);
    console.log("Values: " + text2);
    console.log("");
}

// Print input factors and values
if (generalConfig.test.printFinalFactorsAndValuesInArray) {
    console.log("Print INPUT factors and values: ");
    const text1a = inFactors1.join(", ");
    const text2a = inValues1.join(", ");

    console.log("Input factors: " + text1a);
    console.log("Input values: " + text2a);
    console.log("");
}

// Verify an ascending FactorBasedArray
const isAscending = verifyFactorsInRightOrder(testArr1);

const testItem2 = "Verifying ascending FactorBasedArray";
const testResult2 = isAscending ? "Pass" : "Fail";
testItems.push(testItem2);
testResults.push(isAscending);
console.log(`*${testItem2}: ` + testResult2);
console.log("");

// Verify sorted factor to value correspondence
const isValid1 = verifyFactorsToValuesCorrespondence(testArr1, inFactors1, inValues1);

const testItem3 = "Verifying sorted factor to value correspondence";
const testResult3 = isValid1 ? "Pass" : "Fail";
testItems.push(testItem3);
testResults.push(isValid1);
console.log(`*${testItem3}: ` + testResult3);
console.log("");

// Print results
console.log("***************************************");
console.log("Test results summary: ");
let successfulCount = 0;
let failedCount = 0;
for (let i = 0; i < testItems.length; i++) {
    const result = testResults[i];
    console.log(`Test item #${i + 1}: `, result ? "Pass" : "Fail");
    if (result) {
        successfulCount++;
    }
    else {
        failedCount++;
    }
}

console.log(`Passed items: (${successfulCount}/${testItems.length})`);

if (successfulCount === testItems.length) {
    console.log("Test items ALL passed!");
}