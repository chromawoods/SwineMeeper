/**
 * Main game controller module.
 */
modulejs.define('swine-meeper', ['jquery', 'grid', 'timer', 'apm'], function($, grid, createTimer, createApm) {


  function SwineMeeper($el) {

    this.$el = $el;
    this.$status = this.$el.find('[data-sm-status-message]');
    this.timer = createTimer(this.$el.find('[data-sm-timer]')).reset();
    this.apm = createApm(this.$el.find('[data-sm-apm]'), this.timer);
    this.grid = null;

    this.addEventHandlers();
    this.reset();

  }


  $.extend(SwineMeeper.prototype, {

    reset: function() {

      this.isRunning = false;
      this.timer.stop();
      this.apm.reset();
      this.numReveals = 0;
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

      this.updateStatus('');
      this.grid = grid.getNew(this.$el.removeClass('sm-game-end').find('[data-sm-grid]'), rows, cols, numSwine);
      this.timer.reset();
      this.isRunning = true;

      return this;
    },


    updateStatus: function(msg) {

      this.$status.html(msg);
      return this;

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


    doGameOver: function() {

      this.$el.addClass('sm-game-end')
      this.gameOver = true;
      this.apm.update(this.numReveals);
      this.timer.stop();

      return this;
    },


    winGame: function() {
      this.updateStatus('You win! Yay!').doGameOver();
    },


    loseGame: function() {
      this.updateStatus('Boom! You lost! :(');
      this.doGameOver().grid.detector.detectAll();
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
        cell.$el.children().addClass('adjacent-' + cell.adjacentSwine.toString());
      }

      else { cellClasses += ' empty'; }

      cell.$el.addClass(cellClasses);
    },


    onCellClicked: function($cell) {

      var instance = $cell.addClass('is-user-clicked').data('cellInstance');

      if (instance.isFlagged) {
        return false;
      }

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
      this.numReveals += 1;

    },


    onCellRightClicked: function($cell) {

      $cell.data('cellInstance').toggleFlagged();
      this.numClicks += 1;

    },


    onInteraction: function() {

      this.numClicks || this.timer.start();

    },


    addEventHandlers: function() {

      var self = this;

      // User reveals a cell by left clicking it
      this.$el.on('click', '.sm-cell-link', function(event) {

        self.onInteraction();

        if (!self.gameOver) {
          self.onCellClicked($(this).parent());
        }

        event.preventDefault();
      });

      // User flags a cell by right clicking it
      this.$el.on('contextmenu', '.sm-cell-link', function(event) {

        self.onInteraction();

        if (!self.gameOver) {
          self.onCellRightClicked($(this).parent());
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
