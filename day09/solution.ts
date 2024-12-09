import { Presets, SingleBar } from "cli-progress";
import { readFile } from "fs/promises";

const raw = await readFile("input.txt", { encoding: "utf-8" });
const input = raw
	.trim()
	.split("")
	.map((val) => {
		return Number.parseInt(val, 10);
	});

const initDiskMap = mapDisk(input);
const diskImage = createDiskImage(initDiskMap);
const compactedDisk = compactDisk(diskImage);
const chcksum = checksum(compactedDisk);

console.log("Day one result: ", chcksum);

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

	console.log("Created map of initial state of the disk.");

	return map;
}

function createDiskImage(
	diskMap: { type: "file" | "empty"; length: number }[],
) {
	const diskArr: string[] = [];
	let fileIndex = 0;

	diskMap.forEach((obj) => {
		if (obj.length > 0) {
			if (obj.type === "file") {
				diskArr.push(`${fileIndex}`.repeat(obj.length));
				fileIndex++;
			} else {
				diskArr.push(`.`.repeat(obj.length));
			}
		}
	});

	console.log("Created image of initial disk state.");

	return diskArr.join("").trim();
}

function compactDisk(diskImage: string) {
	const arr = diskImage.split("");
	let rightPos = 0;

	console.log("Starting compacting the disk...\n");

	const bar = new SingleBar({}, Presets.rect);
	bar.start(arr.length, 0);

	for (let i = 0; i < arr.length; i++) {
		bar.increment();
		const rightSide = arr.slice(i);
		const flag = rightSide.every((val) => {
			return val === ".";
		});

		if (flag) {
			bar.stop();
			break;
		}

		const char = arr[i];

		if (char === ".") {
			for (let j = arr.length - 1 - rightPos; j > 0; j--) {
				const endChar = arr[j];

				if (endChar !== ".") {
					const temp = arr[j];
					arr[j] = arr[i];
					arr[i] = temp;
					rightPos++;
					break;
				}
			}
		}
	}

	console.log("Disk compaction finished.\n");

	return arr.join("").trim();
}

function checksum(compactedDisk: string) {
	let sum = 0;

	for (let i = 0; i < compactedDisk.length; i++) {
		if (compactedDisk[i] === ".") {
			break;
		}

		sum += Number.parseInt(compactedDisk[i]) * i;
	}

	console.log("Checksum computed");

	return sum;
}
