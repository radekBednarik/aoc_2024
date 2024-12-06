import { readFile } from "node:fs/promises";

const raw = await readFile("input.txt", { encoding: "utf-8" });
const grid = raw
	.trim()
	.split("\n")
	.map((row) => {
		return row.split("");
	});

const directions = {
	">": ">",
	"\u25BC": "\u25BC",
	"<": "<",
	"^": "^",
};

const positions = new Set();
const startPos = findStartingPosition(grid, directions);
const startDir = directions[grid[startPos![0]][startPos![1]]];

positions.add(startPos);

function simulate() {
	//
}

function findStartingPosition(
	grid: string[][],
	directions: Record<string, string>,
) {
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (Object.values(directions).includes(grid[i][j])) {
				return [i, j];
			}
		}
	}
}
