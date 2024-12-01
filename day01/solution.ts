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

input[1].forEach((num, i) => {
  result += Math.abs(num - input[0][i]);
});

console.log(result);
