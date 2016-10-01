/**
 * Defines and returns an instance of a Timer object.
 */
modulejs.define('timer', ['jquery'], function($) {

  // Default attributes
  var Timer = {

    currentVal: 0,
    currentHumanVal: '',
    maxVal: 999,
    isRunning: false,
    interval: null

  };


  Timer.getMilliDuration = function() {
    return Date.now() - this.startMillis;
  };


  Timer.setHumanValue = function() {

    var v = this.currentVal,
      vs = v.toString();

    // Figure out leading zeroes for the timer display
    this.currentHumanVal = v > 99 ? vs : v > 9 ? '0' + vs : v > 0 ? '00' + vs : '000';

    return this;

  };


  Timer.init = function() {

    return this.setHumanValue();

  };


  Timer.render = function() {
    this.$el.html(this.currentHumanVal);
  };


  Timer.onInterval = function() {

    this.currentVal += 1;
    this.setHumanValue().render();

  };


  Timer.start = function() {

    this.startMillis = Date.now();
    this.isRunning = true;
    this.interval = setInterval(this.onInterval.bind(this), 1000);

  };


  Timer.stop = function() {

    clearInterval(this.interval);
    this.isRunning = false;

    return this;

  };


  Timer.reset = function() {

    this.currentVal = 0;
    this.setHumanValue();
    this.isRunning = false;

    clearInterval(this.interval);
    this.render();

    return this;
  };


  var createInstance = function($el) {

    var instance = Object.create(Timer, {
      $el: { value: $el }
    });

    return instance.init();

  };


  return createInstance;

});
