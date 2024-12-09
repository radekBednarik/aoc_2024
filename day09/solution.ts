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

const diskImage = createDiskImage(initDiskMap);

console.log(diskImage);

const compactedDisk = compactDisk(diskImage);

console.log(compactedDisk);

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

function createDiskImage(
	diskMap: { type: "file" | "empty"; length: number }[],
) {
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

function compactDisk(diskImage: string) {
	const arr = diskImage.split("");

	for (let i = 0; i < arr.length; i++) {
		const rightSide = arr.slice(i);
		const flag = rightSide.every((val) => {
			return val === ".";
		});

		if (flag) {
			break;
		}

		const char = arr[i];

		if (char === ".") {
			for (let j = arr.length - 1; j > 0; j--) {
				const endChar = arr[j];

				if (endChar !== ".") {
					const temp = arr[j];
					arr[j] = arr[i];
					arr[i] = temp;
					break;
				}
			}
		}
	}

	return arr.join("");
}
