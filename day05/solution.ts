import { readFile } from "node:fs/promises";

const raw = await readFile("input.txt", { encoding: "utf-8" });

const input = raw.trim().split("\n");
const splitIndex = input.indexOf("");
const rules = input.slice(0, splitIndex);
const pagesNums = input.slice(splitIndex + 1).map((row) => {
  return row.split(",").map((item) => {
    return parseInt(item);
  });
});

const rulesMap = new Map();

for (const rule of rules) {
  const [key, val] = rule.split("|").map((val) => {
    return parseInt(val);
  });

  if (rulesMap.has(key)) {
    const currVal = rulesMap.get(key);
    if (Array.isArray(currVal)) {
      currVal.push(val);
    }
  } else {
    rulesMap.set(key, [val]);
  }
}

console.log(JSON.stringify(pagesNums));
