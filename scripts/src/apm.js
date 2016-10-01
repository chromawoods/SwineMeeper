modulejs.define('apm', function() {

  var APM = {

    message: 'Reveals Per Minute: ',
    apm: 0

  };


  APM.reset = function() {

    this.$el.empty();
    this.apm = 0;

  };


  APM.calculateApm = function(numActions) {

    this.apm = (numActions / ((this.timer.getMilliDuration() / 1000) / 60)).toFixed(1);

    return this;

  };


  APM.update = function(numActions) {

    this.calculateApm(numActions).$el.html(this.message + this.apm);

  };


  var createInstance = function($el, timer) {

    return Object.create(APM, {
      $el: { value: $el },
      timer: { value: timer }
    });

  };


  return createInstance;

});
