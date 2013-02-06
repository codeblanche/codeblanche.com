define([
    'jquery',
    'app/state',
    'lib/animation/elastic'
], function ($, state, Elastic) {

    var $pointer;
    var animation;

    var Pointer = function () {

        var self = this;

        this.init = function (top) {
            if (!state.domready) {
                throw new Error("Dom is not ready for this!");
            }

            $pointer = $('#navpointer');

            self.moveTo(top);

            //animation = new Elastic($pointer, 0.9);
            //animation.setCssTarget('top', 175).start();
        };

        this.moveTo = function (top) {
            $pointer.animate({ 'top': top }, 'fast');
        }

    };

    return new Pointer();


});
