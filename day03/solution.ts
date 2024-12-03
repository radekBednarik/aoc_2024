import { readFile } from "node:fs/promises";

const raw = await readFile("input.txt", { encoding: "utf-8" });
const input = raw.trim();

// part 1

const resultOne = input
	.match(/mul\(\d+,\d+\)/gm)
	?.map((str) => {
		return str.match(/\d+/g);
	})
	.map((arr) => {
		return arr?.map((val) => {
			return Number.parseInt(val);
		});
	})
	.reduce((acc, nums) => {
		acc += nums![0] * nums![1];
		return acc;
	}, 0);

console.log(resultOne);

// part 2
// used Copilot on this, because I suck
//
let enabled = true;
const resultTwo = input
	.split(/(?=do\(\)|don't\(\)|mul\(\d+,\d+\))/)
	.reduce((acc, part) => {
		if (part.match(/do\(\)/)) {
			enabled = true;
		} else if (part.match(/don't\(\)/)) {
			enabled = false;
		} else if (enabled && part.match(/mul\((\d+),(\d+)\)/)) {
			const [_, a, b] = part.match(/mul\((\d+),(\d+)\)/)!;
			acc += Number(a) * Number(b);
		}
		return acc;
	}, 0);

console.log(resultTwo);
