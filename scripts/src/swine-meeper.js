modulejs.define('swine-meeper', ['jquery', 'grid'], function($, grid) {


  function SwineMeeper($el) {

    this.$el = $el;
    this.grid = null;

    this.addEventHandlers();
    this.reset();
  }


  $.extend(SwineMeeper.prototype, {

    reset: function() {

      this.isRunning = false;
      this.numClicks = 0;
      this.health = 0;
      this.gameOver = false;

      if (this.grid) {
        this.grid.reset();
      }

    },


    start: function(rows, cols, numSwine) {

      if (this.isRunning) {
        this.reset();
      }

      this.grid = grid.getNew(this.$el.find('[data-sm-grid]'), rows, cols, numSwine);
      this.isRunning = true;
    },


    // Iterate cells and take necessary actions
    render: function() {

      var unrevealedCells = 0;

      this.grid.cells.forEach(function(c) {

        if (c.isDetected && !c.isRevealed) {
          this.onCellRevealed(c.reveal());
        }

        if (!c.isRevealed && !c.isSwine) {
          unrevealedCells += 1;
        }

      }.bind(this));

      if (!unrevealedCells && !this.gameOver) {
        this.winGame();
      }

    },


    winGame: function() {
      console.log("You win! Well done!");
      this.gameOver = true;
    },


    loseGame: function() {
      console.log("You lost the game!");
      this.gameOver = true;
      this.grid.detector.detectAll();
      this.render();
    },


    loseHealth: function() {
      this.health -= 1;
      if (this.health < 0) { this.loseGame(); }
    },


    onCellRevealed: function(cell) {

      var cellClasses = 'revealed';

      if (cell.isSwine) {
        cellClasses += ' swine';
        cell.isUserClicked && this.loseHealth();
      }

      else if (cell.adjacentSwine) {
        cell.$el.children().html(cell.adjacentSwine.toString());
      }

      else { cellClasses += ' empty'; }

      cell.$el.addClass(cellClasses);
    },


    onCellClicked: function($cell) {

      var instance = $cell.data('cellInstance');

      instance.isUserClicked = true;

      if (instance.isSwine) {

        // Don't lose on the first click
        if (this.numClicks === 0) {
          this.grid.moveSwine(instance);
          this.onCellClicked($cell);
          return;
        }

        instance.isDetected = true;
        this.render();
      }

      else {
        this.grid.detector.detectArea(instance, this.render.bind(this));
      }

      this.numClicks += 1;
    },


    addEventHandlers: function() {

      var self = this;

      this.$el.on('click', '.sm-cell-link', function(event) {

        if (!self.gameOver) {
          self.onCellClicked($(this).parent());
        }

        event.preventDefault();
      });

    }

  });


  return {

    getNew: function($el) {

      return new SwineMeeper($el);

    }

  };

});
