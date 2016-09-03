modulejs.define('main', ['swine-meeper', 'ui'], function(swineMeeper, createUi) {

  return {

    start: function(selector) {

      $(selector).each(function() {
        createUi(swineMeeper.getNew($(this)));
      });

    }

  };

});
