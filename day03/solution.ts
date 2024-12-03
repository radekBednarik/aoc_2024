import { readFile } from "node:fs/promises";

const raw = await readFile("input.txt", { encoding: "utf-8" });
const input = raw
	.trim()
	.match(/mul\(\d+,\d+\)/gm)
	?.map((str) => {
		return str.match(/\d+/g);
	})
	.map((arr) => {
		return arr?.map((val) => {
			return Number.parseInt(val);
		});
	});

// part 1

const resultOne = input?.reduce((acc, nums) => {
	acc += nums![0] * nums![1];
	return acc;
}, 0);

console.log(resultOne);
