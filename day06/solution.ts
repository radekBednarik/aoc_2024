import { readFile } from "node:fs/promises";

const raw = await readFile("input.txt", { encoding: "utf-8" });
const grid = raw
	.trim()
	.split("\n")
	.map((row) => {
		return row.split("");
	});

const directions = new Map();
directions.set("right", ">");
directions.set("down", "\u25BC");
directions.set("left", "<");
directions.set("up", "^");

const positions = new Set();
positions.add(findStartingPosition(grid, directions));

function findStartingPosition(
	grid: string[][],
	directions: Map<string, string>,
) {
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			for (const item of directions.values()) {
				if (item === grid[i][j]) {
					return [i, j];
				}
			}
		}
	}
}

console.log(positions);
