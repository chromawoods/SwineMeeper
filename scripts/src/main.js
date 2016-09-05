modulejs.define('main', ['swine-meeper', 'ui'], function(swineMeeper, createUi) {

  return {

    start: function() {

      $('.sm-container').each(function() {
        createUi(swineMeeper.getNew($(this)));
      });

    }

  };

});
