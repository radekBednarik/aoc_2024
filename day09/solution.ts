import { readFile } from "fs/promises";

const raw = await readFile("input.txt", { encoding: "utf-8" });
const input = raw
	.trim()
	.split("")
	.map((val) => {
		return Number.parseInt(val, 10);
	});

const initDiskMap = mapDisk(input);

// helper functions

function mapDisk(
	input: number[],
): { type: "file" | "empty"; length: number }[] {
	const map: { type: "file" | "empty"; length: number }[] = [];

	input.forEach((val) => {
		if (val % 2 === 0) {
			map.push({ type: "file", length: val });
		} else {
			map.push({ type: "empty", length: val });
		}
	});

	return map;
}

console.log(initDiskMap[0], initDiskMap[1]);
