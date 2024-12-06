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

simulate();

console.log("part one - visited: ", positions.size);

// HELPER functions

function simulate() {
	let pos = startPos;
	let dir = startDir;

	while (true) {
		positions.add(JSON.stringify(pos));
		const [nextX, nextY] = getNextPosition(pos, dir);

		if (isOutOfBounds([nextX, nextY], grid)) {
			break;
		}

		const nextItem = grid[nextX][nextY];

		if (nextItem === "#") {
			dir = setNextDirection(dir, directions);
			continue;
		}

		pos = [nextX, nextY];
	}
}

function findStartingPosition(
	grid: string[][],
	directions: Record<string, string>,
): [number, number] {
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (Object.values(directions).includes(grid[i][j])) {
				return [i, j];
			}
		}
	}

	throw new Error("Did not found starting point");
}

function isOutOfBounds(position: [number, number], grid: string[][]) {
	const [x, y] = position;

	return x < 0 || x >= grid[0].length || y < 0 || y >= grid.length;
}

function getNextPosition(curPosition: [number, number], direction: string) {
	// X is ROW index!!!!! which means vertical movement, stupid!!!
	const [x, y] = curPosition;
	if (direction === "^") {
		return [x - 1, y];
	}

	if (direction === ">") {
		return [x, y + 1];
	}

	if (direction === "\u25BC") {
		return [x + 1, y];
	}

	return [x, y - 1];
}

function setNextDirection(currDir: string, directions: Record<string, string>) {
	const values = Object.values(directions);
	const currIndex = values.indexOf(currDir);

	if (currIndex === values.length - 1) {
		return values[0];
	}

	return values[currIndex + 1];
}
