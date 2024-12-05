import { readFile } from "node:fs/promises";

const raw = await readFile("input.txt", { encoding: "utf-8" });

const input = raw.trim().split("\n");
const splitIndex = input.indexOf("");
const rules = input.slice(0, splitIndex);
const pagesNums = input.slice(splitIndex + 1).map((row) => {
	return row.split(",").map((item) => {
		return Number.parseInt(item);
	});
});

const rulesMap = new Map();

for (const rule of rules) {
	const [key, val] = rule.split("|").map((val) => {
		return Number.parseInt(val);
	});

	if (rulesMap.has(key)) {
		const currVal = rulesMap.get(key);
		if (Array.isArray(currVal)) {
			currVal.push(val);
		}
	} else {
		rulesMap.set(key, [val]);
	}
}

const correctlyOrdered: number[][] = [];

for (const row of pagesNums) {
	const result = row
		.map((num, i) => {
			const arr = rulesMap.get(num) as number[];
			const subArr = row.slice(i + 1);
			return subArr
				.map((num) => {
					if (arr.includes(num)) {
						return true;
					}
					return false;
				})
				.every((item) => {
					return item === true;
				});
		})
		.every((item) => {
			return item === true;
		});

	result && correctlyOrdered.push(row);
}

// part one:

const middleNumsTotal = correctlyOrdered
	.map((arr) => {
		const middleIndex = Math.floor(arr.length / 2);

		return arr[middleIndex];
	})
	.reduce((acc, num) => {
		return (acc += num);
	}, 0);

console.log(middleNumsTotal);
