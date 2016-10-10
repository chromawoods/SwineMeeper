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
    interval: null,
    intervalDelay: 100

  };


  Timer.getMilliDuration = function() {
    return Date.now() - this.startMillis;
  };


  Timer.setHumanValue = function() {

    var v = this.currentVal,
      vs = v.toString();

    // Figure out leading zeroes for the timer display
    this.currentHumanVal = v >= 100 ? vs : v >= 10 ? '0' + vs : v > 0 ? '00' + vs : '000';

    if (this.currentVal > 0 && vs.indexOf('.') < 0) {
      this.currentHumanVal += '.0';
    }

    return this;

  };


  Timer.init = function() {

    return this.setHumanValue();

  };


  Timer.render = function() {
    this.$el.html(this.currentHumanVal);
  };


  Timer.onInterval = function() {

    var decimals = 1;

    this.currentVal += this.intervalDelay / 1000;

    // Avoid weird rounding issues
    this.currentVal = Number(Math.round(this.currentVal + 'e' + decimals) + 'e-' + decimals);

    this.setHumanValue().render();

  };


  Timer.start = function() {

    this.startMillis = Date.now();
    this.isRunning = true;
    this.interval = setInterval(this.onInterval.bind(this), this.intervalDelay);

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
