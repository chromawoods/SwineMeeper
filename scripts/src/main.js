/**
 * Setup UI interactions and create new SwineMeeper game instances.
 */
modulejs.define('main', ['swine-meeper', 'ui'], function(swineMeeper, createUi) {

  return {

    start: function() {

      $('.sm-container').each(function() {
        createUi(swineMeeper.getNew($(this)));
      });

    }

  };

});
