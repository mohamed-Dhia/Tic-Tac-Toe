declare const $: any;
declare const _: any;
class Main {
	turnPlayer: string;
	numberOfTurns: number;
	grid: (string | undefined)[][];
	constructor(startingPalyer: string = "X") {
		this.turnPlayer = startingPalyer;
		this.numberOfTurns = 0;
		this.grid = Array.from({ length: 3 }).map(() => Array.from({ length: 3 }));
	}

	displayGrid(): void {
		const $main = $("#main");
		$main.addClass("grid-container");
		$main.css({
			display: "grid",
			width: "20rem",
			"text-align": "center",
			"justify-content": "center",
			"align-content": "center",
			"grid-template-columns": "100px 100px 100px",
			"grid-gap": "10px",
			"background-color": "#2196F3",
			padding: "10px",
			margin: "auto",
		});
		_.range(1, 10).forEach((number: number) => {
			$main.append(this.createTile(number));
		});
	}

	createTile(tileId: number): string {
		const $tile = $(
			`<div class="tile" class="grid-item" id="${tileId}"></div>`
		);
		$tile.on("click", () => {
			this.fillTile(tileId, this.findRow(tileId), this.findCol(tileId));
		});
		$tile.css({
			"background-color": "rgba(255, 255, 255, 0.8)",
			width: "3rem",
			height: "2rem",
			border: "1px solid rgba(0, 0, 0, 0.8)",
			padding: "20px",
			"font-size": "30px",
		});
		return $tile;
	}

	fillTile(tileId: number, row: number, col: number): void {
		!$(`#${tileId}`)[0].innerHTML &&
			($(`#${tileId}`)[0].innerHTML = this.turnPlayer);
		this.grid[row][col] = this.turnPlayer;
		this.numberOfTurns++;
		this.checkGameState();
		this.switchTurnPlayer();
	}

	checkGameState() {
		((this.checkForWinner() &&
			this.declareGameResult(`player ${this.turnPlayer} won`)) ||
			(this.checkforDraw() && this.declareGameResult("draw"))) &&
			this.clearBoard();
	}

	declareGameResult(msg: string) {
		alert(msg);
		return true;
	}

	switchTurnPlayer(): void {
		this.turnPlayer = this.turnPlayer === "X" ? "O" : "X";
	}

	findRow(tileId: number): number {
		return tileId % 3 ? ~~(tileId / 3) : tileId / 3 - 1;
	}

	findCol(tileId: number): number {
		return tileId % 3 ? (tileId % 3) - 1 : 2;
	}

	checkForWinner(): boolean {
		return (
			this.checkWinLine(this.getAllRow()) ||
			this.checkWinLine(this.getAllCol()) ||
			this.checkWinLine(this.getMajor()) ||
			this.checkWinLine(this.getMinor())
		);
	}

	getAllCol(): string {
		const gridColoms: (string | undefined)[][] = Array.from({
			length: 3,
		}).map(() => Array.from({ length: 3 }));
		this.grid.forEach((row, rowIndex) => {
			row.forEach((tileValue, collIndex) => {
				gridColoms[collIndex][rowIndex] = tileValue;
			});
		});
		return gridColoms.map((col) => col.join("")).join("/");
	}

	checkWinLine(compressedRows: string): boolean {
		return /(XXX)|(OOO)/.test(compressedRows);
	}

	getAllRow(): string {
		return this.grid.map((row) => row.join("")).join("/");
	}
	//temporary solution since it's always a 3 by 3 grid
	getMajor(): string {
		return this.grid
			.map((row, rowIndex) =>
				row.filter((tileValue, collIndex) => rowIndex === collIndex).join("")
			)
			.join("");
	}
	//temporary solution since it's always a 3 by 3 grid
	getMinor(): string {
		return this.grid
			.map((row, rowIndex) =>
				row
					.filter((tilesValue, collIndex) => collIndex + rowIndex === 2)
					.join("")
			)
			.join("");
	}

	clearBoard(): void {
		this.grid = Array.from({ length: 3 }).map(() => Array.from({ length: 3 }));
		$("#main").html("");
		this.numberOfTurns = 0;
		this.displayGrid();
	}

	checkforDraw() {
		return this.numberOfTurns >= 9;
	}
}

$(document).ready(function () {
	const main = new Main();
	main.displayGrid();
});
