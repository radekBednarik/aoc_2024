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
}) as [number, number[]][];

// part one:

let partOneResult = 0;

for (const row of input) {
	const [result, numbers] = row;
	const combinations = generateCombinations(numbers);

	for (const combination of combinations) {
		let tempResult = numbers[0];

		for (let i = 0; i < combination.length; i++) {
			const op = combination[i];
			const number = numbers[i + 1];

			if (op === "*") {
				tempResult *= number;
			} else {
				tempResult += number;
			}
		}

		if (result === tempResult) {
			partOneResult += result;
			break;
		}
	}
}

console.log(partOneResult);

//------ helper functions

function generateCombinations(numbers: number[]): string[][] {
	const operators = ["*", "+"];
	const results: string[][] = [];

	function helper(current: string[], index: number) {
		if (index === numbers.length - 1) {
			results.push([...current]);
			return;
		}

		for (const operator of operators) {
			current.push(operator);
			helper(current, index + 1);
			current.pop();
		}
	}

	helper([], 0);
	return results;
}
