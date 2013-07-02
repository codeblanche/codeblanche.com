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

            animation = new Elastic($pointer, 0.5, 0.5);

            self.moveTo(top);
        };

        this.moveTo = function (top) {
            /*
            $pointer.animate({ 'top': top }, 'fast');
            /*/
            animation.setCssTarget('top', top).start();
            //*/
        }

    };

    return new Pointer();


});
