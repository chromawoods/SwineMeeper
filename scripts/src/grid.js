/**
 * Creates cells and populates Swine.
 */
modulejs.define('grid', ['cell', 'jquery', 'detector'], function(createCell, $, createDetector) {

  // Constructor function
  function Grid($table, rows, cols, numSwine) {

    this.$table = $table;
    this.numSwine = numSwine;
    this.rows = rows;
    this.cols = cols;
    this.cells = [];

    this.buildGrid();
    this.detector = createDetector(this).setAllAdjacentSwine();
  }


  // Methods
  $.extend(Grid.prototype, {

    populateSwine: function(howMany) {

      howMany = howMany || this.numSwine;

      var getCell = function() {
        var index = Math.floor(Math.random() * this.cells.length),
            cell = this.cells[index];
        return cell.isSwine ? getCell() : cell;
      }.bind(this);

      for (var i = 0; i < howMany; i++) {
        getCell().isSwine = true;
      }

    },


    // Make a cell swine-free and then re-populate that swine
    moveSwine: function(swineCell) {
      swineCell.isSwine = false;
      swineCell.isUserClicked = false;
      this.populateSwine(1);
      this.detector.setAllAdjacentSwine();
    },


    // Iterate grid and return adjacent non-revealed cells
    getAdjacentCells: function(col, row) {

      var cells = [], gc;

      for (var i = 0, l = this.cells.length; i < l; i++) {

        gc = this.cells[i];

        if (gc.row < row + 2 && gc.row > row - 2) {
          if (gc.col < col + 2 && gc.col > col - 2) {
            if (gc.col !== col || gc.row !== row) {
              cells.push(this.cells[i]);
            }
          }
        }

      }

      return cells;
    },


    reset: function() {

      this.cells.forEach(function(c) {
        c.$el.off().remove();
      });

      this.cells = [];

    },


    // Create cell instances and their corresponding table elements
    buildGrid: function() {

      var rows = [], self = this;

      // Returns an array of table-cells
      var getCells = function(numCols, rowIndex, $cells) {

        var cellInstance;

        for (var colIndex = 0; colIndex < numCols; colIndex++) {
          cellInstance = createCell(colIndex, rowIndex)
            .setElement($('<td/>', {
              'class': 'sm-cell',
              'html': '<a class="sm-cell-link" href="#"></a>'
            }));

          $cells.push(cellInstance.$el);
          this.cells.push(cellInstance);
        }

        return $cells;

      }.bind(this);

      // Iterate rows and populate them with cells
      for (var rowIndex = 0; rowIndex < this.rows; rowIndex++) {
        rows.push($('<tr/>', { 'class': 'sm-row' }).append(getCells(this.cols, rowIndex, [])));
      }

      // Decide which cells are swine
      this.populateSwine();

      this.$table.append(rows);
    }


  });


  return {

    getNew: function($el, rows, cols, numSwine) {
      return new Grid($el, rows, cols, numSwine);
    }

  };

});
