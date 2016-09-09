/**
 * Setup event handlers for input controls bound to a SwineMeeper game.
 */
modulejs.define('ui', ['jquery'], function($) {

  var UI = {

    DIFFICULTIES: {
      easy: { rows: 9, cols: 9, numSwine: 10 },
      normal: { rows: 16, cols: 16, numSwine: 40 },
      hard: { rows: 24, cols: 24, numSwine: 99 }
    }

  };


  var createInstance = function(sm) {

    var instance = Object.create(UI, {
      sm: { value: sm },
      $el: { value: sm.$el },
      $difficulty: { value: sm.$el.find('[data-sm-difficulty]') }
    });

    instance.init();

    return instance;

  };


  UI.onChangeDifficulty = function() {

    var val = this.$difficulty.val();

    if (this.DIFFICULTIES.hasOwnProperty(val)) {
      this.sm.start(this.DIFFICULTIES[val].rows, this.DIFFICULTIES[val].cols, this.DIFFICULTIES[val].numSwine);
    }

  };


  UI.init = function() {

    this.addEventHandlers();
    this.onChangeDifficulty();

  };


  UI.addEventHandlers = function() {

    this.$difficulty.on('change', this.onChangeDifficulty.bind(this));

    this.$el.on('click', '[data-sm-reset]', function() {
      this.onChangeDifficulty();
    }.bind(this));

  };


  return createInstance;

});
