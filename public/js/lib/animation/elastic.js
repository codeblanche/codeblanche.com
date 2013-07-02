define([
    'jquery'
], function ($) {

    var target      = {};
    var current     = {};
    var velocity    = {};
    var interval    = null;
    var targetCount = 0;
    var zeroVelocityCount = 0;

    var settings    = {
        framerate   : 20,
        elasticity  : 0,
        friction    : 0
    }

    var Elastic = function (element, elasticity, friction, targets) {

        var $element    = $(element);
        var self        = this;
        var paused      = false;

        settings.elasticity = elasticity || 0.3;
        settings.friction   = friction || 0.45;
        targets             = targets || {};

        // Public methods

        this.setCssTargets = function (properties) {
            for (var name in properties) {
                self.setCssTarget(name, properties[name]);
            }

            return self;
        }

        this.setCssTarget = function (name, value) {
            if (typeof target[name] === 'undefined') {
                targetCount++;
            }

            target[name]    = value;
            current[name]   = parseInt($element.css(name));
            velocity[name]  = (target[name] - current[name]) * settings.elasticity * (1 - settings.friction);

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
            stop();

            return self;
        };

        this.start = function () {
            start();

            return self;
        };

        // Private methods and closures

        function start() {
            if (interval !== null) {
                return;
            }

            interval = setInterval(update, Math.round(1000 / settings.framerate));
        }

        function stop() {
            if (interval === null) {
                return;
            }

            clearInterval(interval);

            interval = null;
        }

        function update() {
            for (var name in target) {
                current[name] = parseInt($element.css(name));

                $element.css(name, current[name] + velocity[name]);

                velocity[name]  += (target[name] - current[name]) * settings.elasticity;
                velocity[name]  *= (1 - settings.friction);

                if (Math.floor(velocity[name]) !== 0) {
                    zeroVelocityCount = 0;
                }
                else {
                    zeroVelocityCount++;
                }
            }

            if (zeroVelocityCount / targetCount > 10) {
                stop();
            }
        }

    };

    return Elastic;

});