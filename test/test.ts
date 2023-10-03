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
    const text1 = factors1.join(", ");
    const text2 = testArr1.join(", ");

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

// Verify being defined an ascending FactorBasedArray
const isDefinedAscending = testArr1.isAscending();

const testItem1 = "Verifying being defined ascending FactorBasedArray";
const testResult1 = isDefinedAscending ? "Pass" : "Fail";
testItems.push(testItem1);
testResults.push(isDefinedAscending);
console.log(`*${testItem1}: ` + testResult1);
console.log("");

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

// Test group #2
console.log("***************************************");
console.log("Test descending order FactorBasedArray: ");
console.log("");
const testArr2 = new FactorBasedArray(false);
const finalArr2 = feedArr(testArr2, generalConfig.test.testDataLines);
const inFactors2 = finalArr2.inFactors;
const inValues2 = finalArr2.inValues;

// Print factors and values in FactorBasedArray
if (generalConfig.test.printFinalFactorsAndValuesInArray) {
    console.log("Print factors and values in FactorBasedArray: ");
    const factors2 = testArr2.factors();
    const text3 = factors2.join(", ");
    const text4 = testArr2.join(", ");

    console.log("Factors: " + text3);
    console.log("Values: " + text4);
    console.log("");
}

// Print input factors and values
if (generalConfig.test.printFinalFactorsAndValuesInArray) {
    console.log("Print INPUT factors and values: ");
    const text3a = inFactors2.join(", ");
    const text4a = inValues2.join(", ");

    console.log("Input factors: " + text3a);
    console.log("Input values: " + text4a);
    console.log("");
}

// Verify being defined a descending FactorBasedArray
const isDefinedDescending = !testArr2.isAscending();

const testItem4 = "Verifying being defined descending FactorBasedArray";
const testResult4 = isDefinedDescending ? "Pass" : "Fail";
testItems.push(testItem4);
testResults.push(isDefinedDescending);
console.log(`*${testItem4}: ` + testResult4);
console.log("");

// Verify a descending FactorBasedArray
const isDescending = verifyFactorsInRightOrder(testArr2, false);

const testItem5 = "Verifying descending FactorBasedArray";
const testResult5 = isDescending ? "Pass" : "Fail";
testItems.push(testItem5);
testResults.push(isDescending);
console.log(`*${testItem5}: ` + testResult5);
console.log("");

// Verify sorted factor to value correspondence
const isValid2 = verifyFactorsToValuesCorrespondence(testArr2, inFactors2, inValues2);

const testItem6 = testItem2;
const testResult6 = isValid2 ? "Pass" : "Fail";
testItems.push(testItem6);
testResults.push(isValid2);
console.log(`*${testItem6}: ` + testResult6);
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