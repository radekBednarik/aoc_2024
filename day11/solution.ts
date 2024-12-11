import { readFile } from "fs/promises";

const raw = await readFile("input.txt", { encoding: "utf-8" });
const input = raw
	.trim()
	.split(" ")
	.map((val) => {
		return Number.parseInt(val);
	});

let arr: number[] = input;

console.time("Execution time");

for (let i = 0; i < 25; i++) {
	const tempArr: number[] = [];

	for (let j = 0; j < arr.length; j++) {
		const numAsString = arr[j].toString();

		if (arr[j] === 0) {
			tempArr.push(1);
		} else if (numAsString.length % 2 === 0) {
			const mid = Math.floor(numAsString.length / 2);

			tempArr.push(Number.parseInt(numAsString.slice(0, mid)));
			tempArr.push(Number.parseInt(numAsString.slice(mid)));
		} else {
			tempArr.push(arr[j] * 2024);
		}
	}

	arr = tempArr;
}

console.timeEnd("Execution time");

console.log("First part: ", arr.length);
