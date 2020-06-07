var Main = /** @class */ (function () {
    function Main(startingPalyer) {
        if (startingPalyer === void 0) { startingPalyer = "X"; }
        this.turnPlayer = startingPalyer;
        this.numberOfTurns = 0;
        this.grid = Array.from({ length: 3 }).map(function () {
            return Array.from({ length: 3 }).map(function () { return 0; });
        });
    }
    Main.prototype.displayGrid = function () {
        var _this = this;
        var $main = $("#main");
        $main.addClass("grid-container");
        $main.css({
            display: "grid",
            "grid-template-columns": "auto auto auto",
            "grid-gap": "10px",
            "background-color": "#2196F3",
            padding: "10px"
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
            border: "1px solid rgba(0, 0, 0, 0.8)",
            padding: "20px",
            "font-size": "30px",
            "text-align": "center"
        });
        return $tile;
    };
    Main.prototype.fillTile = function (tileId, row, col) {
        !$("#" + tileId)[0].innerHTML &&
            ($("#" + tileId)[0].innerHTML = this.turnPlayer);
        this.grid[row][col] = this.turnPlayer;
        this.switchTurnPlayer();
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
    return Main;
}());
$(document).ready(function () {
    var main = new Main();
    main.displayGrid();
});
