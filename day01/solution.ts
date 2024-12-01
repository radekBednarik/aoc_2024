import { readFile } from "node:fs/promises";

let result = 0;
const raw = await readFile("input.txt", { encoding: "utf-8" });
const input = raw
  .trim()
  .split("\n")
  .map((row) => {
    return row.split(" ").filter((num) => {
      return num.length > 0;
    });
  })
  .reduce(
    (acc, [first, second]) => {
      acc[0].push(Number(first));
      acc[1].push(Number(second));
      return acc;
    },
    [[], []] as [number[], number[]],
  )
  .map((arr) => {
    return arr.sort();
  });

// 1st part:
input[1].forEach((num, i) => {
  result += Math.abs(num - input[0][i]);
});

console.log(result);

// 2nd part:
const computed = new Map();

for (const num of input[0]) {
  if (!computed.has(num)) {
    let count = 0;

    for (let n of input[1]) {
      if (n === num) {
        count++;
      }
    }

    computed.set(num, num * count);
  } else {
    computed[num] += computed[num];
  }
}

let resultTwo = 0;
computed.forEach((value) => {
  resultTwo += value;
});

console.log(resultTwo);
