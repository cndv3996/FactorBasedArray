import FactorBasedArray from "../src/index.js";
import { feedArr, arrMatch, getRandomArr, getRandomFactor } from "./commonComponents.js";
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
testArr1.doStabilityCheck();
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
const values1 = testArr1.values();
const factors1 = testArr1.factors();
const valuesClone1 = copyArr1.values();
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

// Test API deleteByFactor
testItem = "Test API deleteByFactor";
testResult = true;
console.log(`*${testItem}: `);
const testArr8 = new FactorBasedArray();
feedArr(testArr8, generalConfig.test.basicTestDataLines);
const factors10 = testArr8.factors();
const values10 = testArr8.values();
const index2 = Math.floor(testArr8.length * Math.random());
testArr8.deleteByFactor(factors10[index2]);
delete factors10[index2];
delete values10[index2];
const factors11 = testArr8.factors();
const values11 = testArr8.values();
const s1 = factors10.join(", ");
const s2 = factors11.join(", ");
const s3 = values10.join(", ");
const s4 = values11.join(", ");
const match12 = s1 === s2;
const match15 = s3 === s4;
if (!match12) {
    testResult = false;
    console.log(" -Element deleted factors not as expected.");
}
if (!match15) {
    testResult = false;
    console.log(" -Element deleted values not as expected.");
}
testItems.push(testItem);
testResults.push(testResult);
console.log(` ${testItem}: `, testResult ? "Pass" : "Fail");
console.log("");

// Test API deleteByIndex
testItem = "Test API deleteByIndex";
testResult = true;
console.log(`*${testItem}: `);
const testArr9 = new FactorBasedArray();
feedArr(testArr9, generalConfig.test.basicTestDataLines);
const factors12 = testArr9.factors();
const values12 = testArr9.values();
const index3 = Math.floor(testArr9.length * Math.random());
testArr9.deleteByIndex(index3);
delete factors12[index3];
delete values12[index3];
const factors15 = testArr9.factors();
const values15 = testArr9.values();
const s5 = factors12.join(", ");
const s6 = factors15.join(", ");
const s7 = values12.join(", ");
const s8 = values15.join(", ");
const match16 = s5 === s6;
const match17 = s7 === s8;
if (!match16) {
    testResult = false;
    console.log(" -Element deleted factors not as expected.");
}
if (!match17) {
    testResult = false;
    console.log(" -Element deleted values not as expected.");
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

// Test API indexOf
testItem = "Test API indexOf";
testResult = true;
console.log(`*${testItem}: `);
const testArr10 = new FactorBasedArray();
feedArr(testArr10, generalConfig.test.basicTestDataLines);
const index5 = Math.floor(testArr10.length * Math.random());
const factor6 = testArr10.factor(index5);
const index6 = testArr10.indexOf(factor6);
const factor7 = testArr10.factor(index6);
const match18 = factor6 === factor7;
if (!match18) {
    testResult = false;
    console.log(" -Found index not as expected.");
}
testItems.push(testItem);
testResults.push(testResult);
console.log(` ${testItem}: `, testResult ? "Pass" : "Fail");
console.log("");

// Test API indexOfFactor
testItem = "Test API indexOfFactor";
testResult = true;
console.log(`*${testItem}: `);
const testArr13 = new FactorBasedArray();
const results5 = feedArr(testArr13, generalConfig.test.testDataLines);
// Get a random factor
const index9 = Math.floor(Math.random() * generalConfig.test.testDataLines * 0.6) +
Math.floor(generalConfig.test.testDataLines * 0.2);
// Make a factor greater than above selected random factor in the array
const factor10 = testArr13.factor(index9) + 1;
const index10 = testArr13.indexOfFactor(factor10);
const match21 = testArr13.factor(index10 - 1) < factor10;
const match22 = testArr13.factor(index10) >= factor10;
const match23 = testArr13.factor(index10 + 1) > factor10;
if (!match21) {
    testResult = false;
    console.log(" -Results not as expected.");
}
if (!match22) {
    testResult = false;
    console.log(" -Results not as expected.");
}
if (!match23) {
    testResult = false;
    console.log(" -Results not as expected.");
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
    const factor = getRandomFactor();
    const index = factors7.indexOf(factor);
    if (index === -1) {
        factor1 = factor;
        factors7.push(factor);
        factors7.sort((a, b) => (a - b));
    }
}
testArr4.insert(value1, factor1);
const index1: number = factors7.indexOf(factor1);
if (index1 === -1) {
    testResult = false;
    console.log(" -Inserted factor not found.");
}
const value2 = testArr4.value(index1);
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
const value3 = testArr5.value(testArr5.length - 1);
const factor3 = testArr5.factor(testArr5.length - 1);
const value4 = testArr5.pop();
const size4 = testArr5.length;
const factors8 = testArr5.factors();
const match7 = size4 === factors8.length;
const match8 = (value3 === value4[0]) && (factor3 === value4[1]);
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

// Test API removeFront
testItem = "Test API removeFront";
testResult = true;
console.log(`*${testItem}: `);
const testArr11 = new FactorBasedArray();
const results3 = feedArr(testArr11, generalConfig.test.testDataLines);
// Get a random factor
const index7 = Math.floor(Math.random() * generalConfig.test.testDataLines * 0.6) +
Math.floor(generalConfig.test.testDataLines * 0.2);
// Make a factor greater than above selected random factor in the array
const factor8 = testArr11.factor(index7) + 1;
testArr11.removeFront(factor8);
const len1 = generalConfig.test.testDataLines - index7 - 1;
const match19 = len1 === testArr11.length;
if (!match19) {
    testResult = false;
    console.log(" -Results not as expected.");
}
testItems.push(testItem);
testResults.push(testResult);
console.log(` ${testItem}: `, testResult ? "Pass" : "Fail");
console.log("");

// Test API removeBack
testItem = "Test API removeBack";
testResult = true;
console.log(`*${testItem}: `);
const testArr12 = new FactorBasedArray();
const results4 = feedArr(testArr12, generalConfig.test.testDataLines);
// Get a random factor
const index8 = Math.floor(Math.random() * generalConfig.test.testDataLines * 0.6) +
Math.floor(generalConfig.test.testDataLines * 0.2);
// Make a factor greater than above selected random factor in the array
const factor9 = testArr12.factor(index8) + 1;
testArr12.removeBack(factor9);
const len2 = index8 + 1;
const match20 = len2 === testArr12.length;
if (!match20) {
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
const value5 = testArr7.value(0);
const factor5 = testArr7.factor(0);
const value6 = testArr7.shift();
const size5 = testArr7.length;
const factors9 = testArr7.factors();
const match10 = size5 === factors9.length;
const match11 = (value5 === value6[0]) && (factor5 === value6[1]);
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