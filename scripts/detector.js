/**
 * Detects surrounding cells that are swine.
 * Checks recursively adjacent cells that are empty.
 */
modulejs.define('detector', function() {

  // Default attributes
  var Detector = {

    queue: [] // Cells to be detection-checked

  };


  var createInstance = function(grid) {

    return Object.create(Detector, {
      grid: { value: grid }
    });

  };


  Detector.setAdjacentSwine = function(cell) {

    var cellsToCheck = this.grid.getAdjacentCells(cell.col, cell.row);

    cell.adjacentSwine = 0;

    cellsToCheck.forEach(function(c) {
      cell.adjacentSwine += (c.isSwine) ? 1 : 0;
    });

  };


  Detector.setAllAdjacentSwine = function() {

    var self = this;

    this.grid.cells.forEach(function(c) {
      self.setAdjacentSwine(c);
    }.bind(this));

    return this;
  };


  // Adds a cell to the queue if it is not detected or already in queue
  Detector.addToDetectQueue  = function(cell) {

    var isDuplicate = false;

    if (!cell.isDetected) {

      cell.isDetected = true;

      if (!cell.adjacentSwine) {

        // Don't add cells that are already in the queue
        for (var i = 0, l = this.queue.length; i < l; i++) {
          if (this.queue[i].id === cell.id) { isDuplicate = true; break; }
        }

        isDuplicate || this.queue.push(cell);
      }

    }

  };


  /* Iterate adjacent cells to reveal number of swine.
    Uses queue to recursively iterate empty cells. */
  Detector.detectArea = function(cell, onComplete) {

    cell.isDetected = true;

    if (!cell.adjacentSwine) {
      this.grid.getAdjacentCells(cell.col, cell.row).forEach(function(c) {
        this.addToDetectQueue(c);
      }.bind(this));
    }

    // More cells to check...
    if (this.queue.length) {
      this.detectArea(this.queue.pop(), onComplete);
    }

    // No more cells in queue, invoke callback!
    else {
      typeof onComplete === 'function' && onComplete.apply();
    }

  };


  Detector.detectAll = function() {

    this.grid.cells.forEach(function(c) {
      c.isDetected = true;
    });

  };


  return createInstance;

});
