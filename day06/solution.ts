import { readFile } from "node:fs/promises";

const raw = await readFile("input.txt", { encoding: "utf-8" });
const grid = raw
	.trim()
	.split("\n")
	.map((row) => {
		return row.split("");
	});

console.log(grid);
