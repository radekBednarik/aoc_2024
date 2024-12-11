import { readFile } from "fs/promises";

const raw = await readFile("input.txt", { encoding: "utf-8" });
const input = raw
	.trim()
	.split(" ")
	.map((val) => {
		return Number.parseInt(val);
	});

let arr: number[] = [];

for (let i = 0; i < 75; i++) {
	const temp = i === 0 ? input : arr;
	const tempArr: number[] = [];

	for (let j = 0; j < temp.length; j++) {
		const numAsString = temp[j].toString();

		if (temp[j] === 0) {
			tempArr.push(1);
		} else if (numAsString.length % 2 === 0) {
			const mid = Math.floor(numAsString.length / 2);

			tempArr.push(Number.parseInt(numAsString.slice(0, mid)));
			tempArr.push(Number.parseInt(numAsString.slice(mid)));
		} else {
			tempArr.push(temp[j] * 2024);
		}
	}

	arr = tempArr;
}

console.log("First part: ", arr.length);
