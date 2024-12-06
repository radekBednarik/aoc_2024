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
	const pos = startPos;
	const dir = startDir;

	while (true) {
    if (isOutOfBounds(pos, grid))
  }
}

function findStartingPosition(
	grid: string[][],
	directions: Record<string, string>,
) : [number, number]{
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (Object.values(directions).includes(grid[i][j])) {
				return [i, j];
			}
		}
	}

  throw new Error("Did not found starting point")
}

function isOutOfBounds(position: [number, number], grid: string[][]) {
	const [x, y] = position;

	return x < 0 || x >= grid[0].length || y < 0 || y >= grid.length;
}

console.log(startDir, startPos);
