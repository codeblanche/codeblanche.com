define([
    'jquery'
], function ($) {

    var target      = {};
    var current     = {};
    var velocity    = {};
    var direction   = {};
    var interval    = null;
    var framerate   = 1;

    var Elastic = function (element, drag, targets) {

        var $element    = $(element);
        var self        = this;
        var paused      = false;

        drag    = drag || 0.3;
        targets = targets || {};

        // Public methods

        this.setCssTargets = function (properties) {
            for (var name in properties) {
                self.setCssTarget(name, properties[name]);
            }

            return self;
        }

        this.setCssTarget = function (name, value) {
            target[name]    = value;
            current[name]   = parseInt($element.css(name));
            velocity[name]  = (target[name] - current[name]) * (1 - drag);
            direction[name] = target[name] > current[name] ? 1 : -1;

            return self;
        }

        this.finish = function () {
            if (interval !== null) {
                return self;
            }

            clearInterval(interval);

            interval = null;

            for (var name in target) {
                $element.css(name, target[name]);
            }

            return self;
        };

        this.stop = function () {
            if (interval === null) {
                return self;
            }

            clearInterval(interval);

            interval = null;

            return self;
        };

        this.start = function () {
            if (interval !== null) {
                return self;
            }

            interval = setInterval(update, Math.round(1000 / framerate));

            return self;
        };

        // Private methods and closures

        function update() {
            console.log('target', target);
            console.log('current', current);
            console.log('velocity', velocity);
            console.log('direction', direction);

            for (var name in target) {
                current[name] = parseInt($element.css(name));

                $element.css(name, (current[name] + velocity[name]) * direction[name]);

                velocity[name]  = (target[name] - velocity[name] + current[name]) * (1 - drag);
                direction[name] = target[name] > current[name] ? 1 : -1;
            }
        }

    };

    return Elastic;

});