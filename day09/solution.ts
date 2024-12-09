import { readFile } from "fs/promises";

const raw = await readFile("input.txt", { encoding: "utf-8" });
const input = raw.trim();
