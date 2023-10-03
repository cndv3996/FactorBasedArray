import FactorBasedArray from "../src/index.js";
import { generateRandomData, importArr } from "../test/commonComponents.js";
import { performance } from "perf_hooks";

const lines = [1000, 10000, 100000, 1000000];

for (let i = 0; i < lines.length; i++) {
    const data = generateRandomData(lines[i]);
    const size = data.inValues.length;
    const arr = new FactorBasedArray();
    const start = performance.now();
    importArr(arr, data.inValues, data.inFactors);
    const end = performance.now();
    const cost = end - start;
    console.log(`Data size: ${size}`);
    console.log(`Time cost: ${cost} ms`);
    console.log("");
}

