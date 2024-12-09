import { readFile } from "fs/promises";

const raw = await readFile("input.txt", { encoding: "utf-8" });
const input = raw
	.trim()
	.split("")
	.map((val) => {
		return Number.parseInt(val, 10);
	});

const initDiskMap = mapDisk(input);

console.log(initDiskMap);

const diskArray = createDiskArr(initDiskMap);

console.log(diskArray);

// helper functions

function mapDisk(
	input: number[],
): { type: "file" | "empty"; length: number }[] {
	const map: { type: "file" | "empty"; length: number }[] = [];

	input.forEach((val, i) => {
		if (i % 2 === 0) {
			map.push({ type: "file", length: val });
		} else {
			map.push({ type: "empty", length: val });
		}
	});

	return map;
}

function createDiskArr(diskMap: { type: "file" | "empty"; length: number }[]) {
	const diskArr: string[] = [];
	let fileIndex = 0;

	diskMap.forEach((obj) => {
		if (obj.length === 0) {
			diskArr.push("");
		}

		if (obj.type === "file") {
			diskArr.push(`${fileIndex}`.repeat(obj.length));
			fileIndex++;
		} else {
			diskArr.push(`.`.repeat(obj.length));
		}
	});

	return diskArr.join("");
}
