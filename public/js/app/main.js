define([
    'jquery',
    'app/state',
    'app/nav/main',
    'lib/utils/url',
], function ($, state, nav, Url) {

    // onload
    $(function () {
        state.domready  = true;
        state.url       = new Url(document.location.href);

        nav.init();
    });

});
