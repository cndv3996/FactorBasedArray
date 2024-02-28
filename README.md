# FactorBasedArray
Convenient tool library for JS/TS.
It's a defaultly sorted array.

You can insert factor-value pair to the array.
Then the pair are automatically ordered in an ascendingly order of factors.

```javascript
// Usage sample
import FactorBasedArray from "factor-based-array";

// Insert some data for demonstration
// Here we make some mocking data
const data = [];
for (let i = 0; i < 10; i++) {
    const month = Math.floor(12 * Math.random());
    const day = Math.floor(30 * Math.random());
    // Get a random day in March
    const date = new Date(2024, month, day);
    const timestamp = date.getTime();
    const item = {
        value: i + 1,
        factor: timestamp
    };
    data.push(item);
}

// Usage of the array mainly here
const testArr = new FactorBasedArray();
data.map((element) => {
    testArr.insert(element.value, element.factor);
});

const values = testArr.values();
const factors = testArr.factors();

console.info(values);
console.info(factors);

```
You'll get a sorted array:
```javascript
// Original values should be 1, 2, 3, 4, 5, ...
values: [
  1, 8,  2, 7, 5,
  4, 9, 10, 3, 6
]
factors: [
  170481600, 170645760,
  170896320, 171017280,
  171138240, 171440640,
  171570240, 171734400,
  172918080, 172935360
]

```
Why the input factors look being relatively short? What if the factors to be longer? Say, more than 10 digits?
Cause we use an Object to work as Dictionary to keep factors ordered.

[Notice] The keys in an Object have limits on its data-type (can't be strings). And limits on how many digits of a number can have (can't be longer than 9 - 10 digits).
So, if we use timestamps as factors, it works fine!

We have following scripts to run:
```javascript
// Build Typescript code into JavaScript
npm run build
```
```javascript
// Unit test
npm run test
```
```javascript
// Unit test
npm run test-apis
```
```javascript
// Insertion performance with higher lines of data
npm run benchmark
```

Enjoy!
