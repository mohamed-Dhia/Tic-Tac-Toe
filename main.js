var Main = /** @class */ (function () {
    function Main(startingPalyer) {
        if (startingPalyer === void 0) { startingPalyer = "X"; }
        this.turnPlayer = startingPalyer;
        this.numberOfTurns = 0;
        this.grid = Array.from({ length: 3 }).map(function () { return Array.from({ length: 3 }); });
    }
    Main.prototype.displayGrid = function () {
        var _this = this;
        var $main = $("#main");
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
            margin: "auto"
        });
        _.range(1, 10).forEach(function (number) {
            $main.append(_this.createTile(number));
        });
    };
    Main.prototype.createTile = function (tileId) {
        var _this = this;
        var $tile = $("<div class=\"tile\" class=\"grid-item\" id=\"" + tileId + "\"></div>");
        $tile.on("click", function () {
            _this.fillTile(tileId, _this.findRow(tileId), _this.findCol(tileId));
        });
        $tile.css({
            "background-color": "rgba(255, 255, 255, 0.8)",
            width: "3rem",
            height: "2rem",
            border: "1px solid rgba(0, 0, 0, 0.8)",
            padding: "20px",
            "font-size": "30px"
        });
        return $tile;
    };
    Main.prototype.fillTile = function (tileId, row, col) {
        if ($("#" + tileId)[0].innerHTML)
            return;
        $("#" + tileId)[0].innerHTML = this.turnPlayer;
        this.colorTile(tileId);
        this.numberOfTurns++;
        this.grid[row][col] = this.turnPlayer;
        this.checkGameState();
        this.switchTurnPlayer();
    };
    Main.prototype.colorTile = function (tileId) {
        var color = this.turnPlayer === "X" ? "red" : "blue";
        $("#" + tileId).css("color", color);
    };
    Main.prototype.checkGameState = function () {
        ((this.checkForWinner() &&
            this.declareGameResult("player " + this.turnPlayer + " won")) ||
            (this.checkforDraw() && this.declareGameResult("draw"))) &&
            this.clearBoard();
    };
    Main.prototype.declareGameResult = function (msg) {
        alert(msg);
        return true;
    };
    Main.prototype.switchTurnPlayer = function () {
        this.turnPlayer = this.turnPlayer === "X" ? "O" : "X";
    };
    Main.prototype.findRow = function (tileId) {
        return tileId % 3 ? ~~(tileId / 3) : tileId / 3 - 1;
    };
    Main.prototype.findCol = function (tileId) {
        return tileId % 3 ? (tileId % 3) - 1 : 2;
    };
    Main.prototype.checkForWinner = function () {
        return (this.checkWinLine(this.getAllRow()) ||
            this.checkWinLine(this.getAllCol()) ||
            this.checkWinLine(this.getMajor()) ||
            this.checkWinLine(this.getMinor()));
    };
    Main.prototype.getAllCol = function () {
        var gridColoms = Array.from({
            length: 3
        }).map(function () { return Array.from({ length: 3 }); });
        this.grid.forEach(function (row, rowIndex) {
            row.forEach(function (tileValue, collIndex) {
                gridColoms[collIndex][rowIndex] = tileValue;
            });
        });
        return gridColoms.map(function (col) { return col.join(""); }).join("/");
    };
    Main.prototype.checkWinLine = function (compressedRows) {
        return /(XXX)|(OOO)/.test(compressedRows);
    };
    Main.prototype.getAllRow = function () {
        return this.grid.map(function (row) { return row.join(""); }).join("/");
    };
    //temporary solution since it's always a 3 by 3 grid
    Main.prototype.getMajor = function () {
        return this.grid
            .map(function (row, rowIndex) {
            return row.filter(function (tileValue, collIndex) { return rowIndex === collIndex; }).join("");
        })
            .join("");
    };
    //temporary solution since it's always a 3 by 3 grid
    Main.prototype.getMinor = function () {
        return this.grid
            .map(function (row, rowIndex) {
            return row
                .filter(function (tilesValue, collIndex) { return collIndex + rowIndex === 2; })
                .join("");
        })
            .join("");
    };
    Main.prototype.clearBoard = function () {
        this.grid = Array.from({ length: 3 }).map(function () { return Array.from({ length: 3 }); });
        $("#main").html("");
        this.numberOfTurns = 0;
        this.displayGrid();
    };
    Main.prototype.checkforDraw = function () {
        return this.numberOfTurns >= 9;
    };
    return Main;
}());
$(document).ready(function () {
    var main = new Main();
    main.displayGrid();
});
