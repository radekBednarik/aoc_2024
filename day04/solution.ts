import { readFile } from "node:fs/promises";

const raw = await readFile("input.txt", { encoding: "utf-8" });
const input = raw
	.trim()
	.split("\n")
	.map((row) => {
		return row.split("");
	});

// part one - done via Copilot, I am not experienced
// with these kind of problems and no programming genius either, so...
const word = "XMAS";
const wordLength = word.length;
let count = 0;

const directions = [
	{ x: 1, y: 0 }, // right
	{ x: -1, y: 0 }, // left
	{ x: 0, y: 1 }, // down
	{ x: 0, y: -1 }, // up
	{ x: 1, y: 1 }, // down-right
	{ x: -1, y: -1 }, // up-left
	{ x: 1, y: -1 }, // up-right
	{ x: -1, y: 1 }, // down-left
];

const isValid = (x: number, y: number) =>
	x >= 0 && y >= 0 && x < input.length && y < input[0].length;

const searchWord = (x: number, y: number, dx: number, dy: number) => {
	for (let i = 0; i < wordLength; i++) {
		if (
			!isValid(x + i * dx, y + i * dy) ||
			input[x + i * dx][y + i * dy] !== word[i]
		) {
			return false;
		}
	}
	return true;
};

for (let i = 0; i < input.length; i++) {
	for (let j = 0; j < input[i].length; j++) {
		for (const { x, y } of directions) {
			if (searchWord(i, j, x, y)) {
				count++;
			}
		}
	}
}

console.log(count);
