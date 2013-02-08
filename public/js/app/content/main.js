define([
    'jquery',
    'app/state',
], function ($, state) {

    var $container;
    var current;
    var next;
    var busy = false;

    var Content = function () {

        var self = this;

        function showNext () {
            $('#' + next).fadeIn('fast');

            current = next;
            next    = null;
        }

        this.init = function () {
            if (!state.domready) {
                throw new Error("Dom is not ready for this!");
            }

            $container   = $('#content');

            return self;
        };

        this.show = function (contentName) {
            if (contentName === current) {
                return self;
            }

            next = contentName;

            if (current !== undefined && current !== null) {

                busy = true;

                $('#' + current).fadeOut('fast', function () {
                    current = null;
                    busy    = false;

                    showNext();
                });
            }
            else if (!busy) {
                showNext();
            }

            return self;
        };

    };

    return new Content();

});
