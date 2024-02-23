# FactorBasedArray
Convenient tool library for JS/TS
It extends a standard JavaScript Array defination into a factor-based-array. Which means that using following method to insert into the array:
```javascript
import FactorBasedArray from "factor-based-array";

const data = [{value: 1, factor: 25047701142195034},
              {value: 2, factor: 7616624954982918},
              {value: 3, factor: 13051808673584686},
              {value: 4, factor: 5126238179222851},
              {value: 5, factor: 6677465637280715}];

const testArr = new FactorBasedArray();
data.map((element) => {
    testArr.insert(element.value, element.factor);
});

```
You'll get a sorted array (for demonstration, not in the exact data structure of a real FactorBasedArray):
```javascript
values: [2 0 3 4 1]
factors: [13051808673584686 25047701142195034 5126238179222851 6677465637280715 7616624954982918]
```

OK, don't waste your time with the project. 😒

To achieve the same results, just use a Map!

And never try the benchmark script. It will impress you with the never ending time cost.

Though we have following scripts to run:
```javascript
npm run build
```
```javascript
npm run test
```
```javascript
npm run test-apis
```
```javascript
npm run benchmark
```

Enjoy!

I wrote the project under an extremely depressed situation. But it's over.
