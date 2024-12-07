import { readFile } from "node:fs/promises";

const raw = await readFile("input.txt", { encoding: "utf-8" });
const raw_2 = raw
	.trim()
	.split("\n")
	.map((row) => {
		return row.split(":");
	});

const input = raw_2.map((row) => {
	return row.map((item, i) => {
		if (i === 0) {
			return Number.parseInt(item);
		}

		return item
			.trim()
			.split(" ")
			.map((val) => {
				return Number.parseInt(val);
			});
	});
});

console.log(JSON.stringify(input));
