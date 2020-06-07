declare const $: any;
declare const _: any;
class Main {
	turnPlayer: string;
	numberOfTurns: number;
	grid: (number | string)[][];
	constructor() {
		this.turnPlayer = "X";
		this.numberOfTurns = 0;
		this.grid = Array.from({ length: 3 }).map(() =>
			Array.from({ length: 3 }).map(() => 0)
		);
	}
	createGrid() {
		$("#main").addClass("grid-container");
		$("#main").css({
			display: "grid",
			"grid-template-columns": "auto auto auto",
			"grid-gap": "10px",
			"background-color": "#2196F3",
			padding: "10px",
		});
		_.range(1, 10).forEach((number: number) => {
			$("#main").append(this.createTile(number));
		});
	}
	createTile(tileId: number) {
		const $tile = $(
			`<div class="tile" class="grid-item" id="${tileId}"></div>`
		);
		$tile.on("click", () => {
			this.fillTile(tileId, this.findRow(tileId), this.findCol(tileId));
		});
		$tile.css({
			"background-color": "rgba(255, 255, 255, 0.8)",
			border: "1px solid rgba(0, 0, 0, 0.8)",
			padding: "20px",
			"font-size": "30px",
			"text-align": "center",
		});
		return $tile;
	}
	fillTile(tileId, row, col) {
		!$(`#${tileId}`)[0].innerHTML &&
			($(`#${tileId}`)[0].innerHTML = this.turnPlayer);
		console.log({ tileId, col, row });
		this.grid[row][col] = this.turnPlayer;
		this.switchTurnPlayer();
	}
	switchTurnPlayer() {
		this.turnPlayer = this.turnPlayer === "X" ? "O" : "X";
	}
	findRow(tileId) {
		return tileId % 3 ? ~~(tileId / 3) : tileId / 3 - 1;
	}
	findCol(tileId) {
		return tileId % 3 ? (tileId % 3) - 1 : 2;
	}
}

$(document).ready(function () {
	const main = new Main();
	main.createGrid();
});
