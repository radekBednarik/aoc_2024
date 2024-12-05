import { readFile } from "node:fs/promises";

const raw = await readFile("input.txt", { encoding: "utf-8" });

const input = raw.trim().split("\n");
const splitIndex = input.indexOf("");
const rules = input.slice(0, splitIndex);
const pagesNums = input.slice(splitIndex + 1);

console.log(JSON.stringify(rules));
console.log("==========");
console.log(JSON.stringify(pagesNums));
