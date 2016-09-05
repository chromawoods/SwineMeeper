/**
 * Defines the prototype of a Cell.
 */
modulejs.define('cell', ['jquery'], function($) {

  // Default attributes
  var Cell = {

    isSwine: false,
    isFlagged: false,
    isUserClicked: false,
    isDetected: false,
    isRevealed: false,
    adjacentSwine: 0,
    $el: null

  };


  var createInstance = function(col, row) {

    return Object.create(Cell, {
      col: { value: col },
      row: { value: row },
      id: { value: 'c' + col + 'r' + row }
    });

  };


  // Set a jQuery element associated with this cell
  Cell.setElement = function($el) {
    this.$el = $el.data('cellInstance', this);
    return this;
  };


  Cell.reveal = function() {
    this.isRevealed = true;
    return this;
  };


  Cell.toggleFlagged = function() {

    if (this.isFlagged) {
      this.isFlagged = false;
      this.$el.removeClass('flagged');
    }

    else {
      this.isFlagged = true;
      this.$el.addClass('flagged');
    }

    return this;
  };


  return createInstance;

});
