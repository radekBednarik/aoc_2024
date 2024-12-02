import { readFile } from "fs/promises";

const raw = await readFile("input.txt", { encoding: "utf-8" });
const input = raw
	.trim()
	.split("\n")
	.map((row) => {
		return row.split(" ").map((num) => {
			return Number.parseInt(num);
		});
	});

// part one
let safeReports = 0;

for (const report of input) {
	let flag = false;
	let prevDiff = 0;

	for (let i = 0; i < report.length - 1; i++) {
		if (report[i] === report[i + 1]) {
			flag = false;
			break;
		}

		const diff = report[i] - report[i + 1];

		if ((prevDiff > 0 && diff < 0) || (prevDiff < 0 && diff > 0)) {
			flag = false;
			break;
		}

		prevDiff = diff;

		const absDiff = Math.abs(diff);

		if (absDiff >= 1 && absDiff <= 3) {
			flag = true;
		} else {
			flag = false;
			break;
		}
	}

	if (flag) {
		safeReports++;
	}
}

console.log(safeReports);

// part 2
const safeReportsTwo = 0;
for (const report of input) {
	console.log("---");
}

console.log(safeReportsTwo);
