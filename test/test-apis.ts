import FactorBasedArray from "../src/index.js";
import { verifyFactorsInRightOrder, verifyFactorsToValuesCorrespondence, feedArr, arrMatch, getRandomArr } from "./commonComponents.js";
import generalConfig from "../general-config.json" assert { type: "json" };

const testItems = [];
const testResults = [];

// Test group #1
console.log("***************************************");
console.log("Test APIs of FactorBasedArray: ");
console.log("");
const testArr1 = new FactorBasedArray();
let testItem;
let testResult;

// Test API arrayStabilityCheck
testItem = "Test API arrayStabilityCheck";
testResult = true;
console.log(`*${testItem}: `);
testArr1.arrayStabilityCheck();
testItems.push(testItem);
testResults.push(testResult);
console.log(` ${testItem}: `, testResult ? "Pass" : "Fail");
console.log("");

// Test API clear
const test_clear = () => {
    testItem = "Test API clear";
    testResult = true;
    console.log(`*${testItem}: `);
    testArr1.clear();
    const valuesLen = testArr1.length;
    const factorsLen = testArr1.factors().length;
    if (valuesLen === 0 && factorsLen === 0) {
        testItems.push(testItem);
        testResults.push(testResult);
    }
    else {
        testResult = false;
        testItems.push(testItem);
        testResults.push(testResult);
    }
    console.log(` ${testItem}: `, testResult ? "Pass" : "Fail");
    console.log("");
}

// Test API clone
testItem = "Test API clone";
testResult = true;
console.log(`*${testItem}: `);
const copyArr1 = testArr1.clone();
const isClone = testArr1 !== copyArr1;
const values1 = testArr1.slice();
const factors1 = testArr1.factors();
const valuesClone1 = copyArr1.slice();
const factorsClone1 = copyArr1.factors();
const match1 = arrMatch(values1, valuesClone1);
const match2 = arrMatch(factors1, factorsClone1);

if (!isClone) {
    testResult = false;
    console.log(" -Clone not as expected.");
}
else if (!match1) {
    testResult = false;
    console.log(" -Cloned values not match with original.");
}
else if (!match2) {
    testResult = false;
    console.log(" -Cloned factors not match with original.");
}
testItems.push(testItem);
testResults.push(testResult);
console.log(` ${testItem}: `, testResult ? "Pass" : "Fail");
console.log("");

// Test API concatFBA
testItem = "Test API concatFBA";
testResult = true;
console.log(`*${testItem}: `);
const size1 = Math.floor(Math.random() * generalConfig.test.testDataLines);
const arr1 = getRandomArr(size1);
const size2 = Math.floor(Math.random() * generalConfig.test.testDataLines);
const arr2 = getRandomArr(size2);
const size3 = Math.floor(Math.random() * generalConfig.test.testDataLines);
const arr3 = getRandomArr(size3);
const combinedArr = arr1.concatFBA(arr2, arr3) as FactorBasedArray<number, number>;
const values2_1 = arr1.slice() as number[];
const values2_2 = arr2.slice() as number[];
const values2_3 = arr3.slice() as number[];
const factors2_1 = arr1.factors() as number[];
const factors2_2 = arr2.factors() as number[];
const factors2_3 = arr3.factors() as number[];
const combinedValues1 = values2_1.concat(values2_2, values2_3);
const values11 = new Array<number>(...combinedValues1);
values11.sort((a, b) => (a - b));
const combinedFactors1 = factors2_1.concat(factors2_2, factors2_3);
const factors11 = new Array<number>(...combinedFactors1);
factors11.sort((a, b) => (a - b));
const values12 = Array<number>(...combinedArr);
const factors12 = combinedArr.factors();
const valid1 = verifyFactorsInRightOrder(combinedArr);
const valid2 = values12.length === values11.length;
const valid3 = arrMatch(factors12, factors11);
if (!valid1) {
    testResult = false;
    console.log(" -Factors not in correct order.");
}
else if (!valid2) {
    testResult = false;
    console.log(" -Returned values not match with original.");
}
else if (!valid3) {
    testResult = false;
    console.log(" -Returned factors not match with original.");
}
testItems.push(testItem);
testResults.push(testResult);
console.log(` ${testItem}: `, testResult ? "Pass" : "Fail");
console.log("");

// Test API copyWithinFBA
testItem = "Test API copyWithinFBA";
testResult = true;
console.log(`*${testItem}: `);
const target1 = Math.floor(generalConfig.test.testDataLines * 0.25);
const start1 = Math.floor(generalConfig.test.testDataLines * 0.5);
const end1 = Math.floor(generalConfig.test.testDataLines * 0.75);
const testArr2 = getRandomArr(generalConfig.test.testDataLines);
const values3 = testArr2.slice();
const factors3 = testArr2.factors();
testArr2.copyWithinFBA(target1, start1, end1);
values3.copyWithin(target1, start1, end1);
factors3.copyWithin(target1, start1, end1);
const values4 = testArr2.slice();
const factors4 = testArr2.factors();
const match3 = arrMatch(values3, values4);
const match4 = arrMatch(factors3, factors4);
if (!match3) {
    testResult = false;
    console.log(" -Values returned not as expected.");
}
else if (!match4) {
    testResult = false;
    console.log(" -Factors returned not as expected.");
}
testItems.push(testItem);
testResults.push(testResult);
console.log(` ${testItem}: `, testResult ? "Pass" : "Fail");
console.log("");

// Test API factors
testItem = "Test API factors";
testResult = true;
console.log(`*${testItem}: `);
const testArr3 = new FactorBasedArray();
const results1 = feedArr(testArr3, generalConfig.test.testDataLines);
const factors5 = results1.inFactors;
factors5.sort((a, b) => (a - b));
const factors6 = testArr3.factors();
const match5 = arrMatch(factors5, factors6);
if (!match5) {
    testResult = false;
    console.log(" -Factors returned not as expected.");
}
testItems.push(testItem);
testResults.push(testResult);
console.log(` ${testItem}: `, testResult ? "Pass" : "Fail");
console.log("");

// Test API insert
testItem = "Test API insert";
testResult = true;
console.log(`*${testItem}: `);
const testArr4 = new FactorBasedArray();
const results2 = feedArr(testArr4, generalConfig.test.testDataLines);
const factors7 = results2.inFactors;
const values7 = results2.inValues;
let value1 = values7.length;
let factor1;
while (!factor1) {
    const factor = Math.random();
    const index = factors7.indexOf(factor);
    if (index === -1) {
        factor1 = factor;
        factors7.push(factor);
        factors7.sort((a, b) => (a - b));
    }
}
testArr4.insert(value1, factor1);
const index1 = factors7.indexOf(factor1);
if (index1 === -1) {
    testResult = false;
    console.log(" -Inserted factor not found.");
}
const value2 = testArr4[index1];
const match6 = value2 === value1;
if (!match6) {
    testResult = false;
    console.log(" -Insert worked not as expected.");
}
testItems.push(testItem);
testResults.push(testResult);
console.log(` ${testItem}: `, testResult ? "Pass" : "Fail");
console.log("");

// Test API pop
testItem = "Test API pop";
testResult = true;
console.log(`*${testItem}: `);
const testArr5 = getRandomArr(generalConfig.test.testDataLines);
const value3 = testArr5[testArr5.length - 1];
const value4 = testArr5.pop();
const size4 = testArr5.length;
const factors8 = testArr5.factors();
const match7 = size4 === factors8.length;
const match8 = value3 === value4;
if (!match7) {
    testResult = false;
    console.log(" -Results not as expected.");
}
else if (!match8) {
    testResult = false;
    console.log(" -Returned results not as expected.");
}
testItems.push(testItem);
testResults.push(testResult);
console.log(` ${testItem}: `, testResult ? "Pass" : "Fail");
console.log("");

// Test API reverse
testItem = "Test API reverse";
testResult = true;
console.log(`*${testItem}: `);
const testArr6 = getRandomArr(generalConfig.test.testDataLines);
const values9 = testArr6.slice();
const values10 = testArr6.reverse();
values9.reverse();
const match9 = arrMatch(values9, values10);
const valid4 = verifyFactorsInRightOrder(testArr6, false);
if (!match9) {
    testResult = false;
    console.log(" -Results not as expected.");
}
else if (!valid4) {
    testResult = false;
    console.log(" -Results not as expected.");
}
testItems.push(testItem);
testResults.push(testResult);
console.log(` ${testItem}: `, testResult ? "Pass" : "Fail");
console.log("");

// Test API shift
testItem = "Test API shift";
testResult = true;
console.log(`*${testItem}: `);
const testArr7 = getRandomArr(generalConfig.test.testDataLines);
const value5 = testArr7[0];
const value6 = testArr7.shift();
const size5 = testArr7.length;
const factors9 = testArr7.factors();
const match10 = size5 === factors9.length;
const match11 = value5 === value6;
if (!match10) {
    testResult = false;
    console.log(" -Results not as expected.");
}
else if (!match11) {
    testResult = false;
    console.log(" -Returned results not as expected.");
}
testItems.push(testItem);
testResults.push(testResult);
console.log(` ${testItem}: `, testResult ? "Pass" : "Fail");
console.log("");

// Test API clear (Differed)
test_clear();

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