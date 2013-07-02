(function ($) {

    var intervalId;
    var intervalCallback;
    var frameInterval       = 50;
    var iterationCount      = 0;
    var collection          = [];

    $.attention = {
        effectClasses : {
            Bounce      : function () {
                var $el;
                var options;
                var originValue;
                var axis        = 'x';
                var direction   = 1;
                var gravity     = 0;
                var mass        = 0;
                var self        = this;
                var waiting     = 0;
                var counter     = 0;
                var velocity    = 0;

                function step() {
                    var currentValue = parseInt($el.css(cssProperty));

                    gravity = originValue - currentValue * options.gravity;

                    velocity += gravity;
                    velocity *= (1 - options.friction);

                    var newValue = currentValue + velocity;

                    if ((direction === 1 && newValue < originValue) || (direction === -1 && newValue > originValue)) {
                        velocity *= -1 * options.elasticity;
                        newValue = originValue;
                    }

                    $el.css(cssProperty, newValue + 'px')
                }

                this.init = function (element, customOptions) {
                    $el         = element;
                    options     = customOptions;

                    switch (String.toLowerCase(options.direction)) {
                        case 'up':
                            axis        = 'y';
                            direction   = -1;
                            cssProperty = 'marginTop';
                            break;
                        case 'down':
                            axis        = 'y';
                            direction   = 1;
                            cssProperty = 'marginTop';
                            break;
                        case 'left':
                            axis        = 'x';
                            direction   = -1;
                            cssProperty = 'marginLeft';
                            break;
                        case 'right':
                        default:
                            axis        = 'x';
                            direction   = 1;
                            cssProperty = 'marginLeft';
                            break;
                    }

                    mass        = Math.sqrt($el.outerWidth() * $el.outerHeight());
                    originValue = parseInt($el.css(cssProperty));
                };

                this.start = function () {
                    if (options.iterations !== 0 && counter >= options.iterations) {
                        $el.stopSeekingAttention();

                        return;
                    }

                    velocity += mass * options.elasticity * direction * options.force;

                    counter ++;
                };

                this.end = function () {
                    $el.css(cssProperty, originValue + 'px');
                };

                this.tick = function (msSinceLastTick) {
                    waiting += msSinceLastTick;

                    if (waiting > options.interval) {
                        this.start();
                        waiting = 0;
                    }

                    step();
                };

                this.getName = function () {
                    return 'Bounce';
                };

                this.getOptions = function () {
                    return options;
                }
            },
            Wobble      : function () {
                var $el;
                var options;
                var originValue;
                var axis        = 'x';
                var cssProperty = 'left';
                var direction   = 1;
                var gravity     = 0;
                var mass        = 0;
                var self        = this;
                var waiting     = 0;
                var counter     = 0;
                var velocity    = 0;

                function step() {
                    var currentValue = parseInt($el.css(cssProperty));

                    gravity = originValue - currentValue * options.gravity;

                    velocity += gravity;
                    velocity *= (1 - options.friction);

                    var newValue = currentValue + velocity;

                    $el.css(cssProperty, newValue + 'px')
                }

                this.init = function (element, customOptions) {
                    $el         = element;
                    options     = customOptions;

                    switch (options.direction) {
                        case 'up':
                            axis        = 'y';
                            direction   = -1;
                            cssProperty = 'marginTop';
                            break;
                        case 'down':
                            axis        = 'y';
                            direction   = 1;
                            cssProperty = 'marginTop';
                            break;
                        case 'left':
                            axis        = 'x';
                            direction   = -1;
                            cssProperty = 'marginLeft';
                            break;
                        case 'right':
                        default:
                            axis        = 'x';
                            direction   = 1;
                            cssProperty = 'marginLeft';
                            break;
                    }

                    mass        = Math.sqrt($el.outerWidth() * $el.outerHeight());
                    originValue = parseInt($el.css(cssProperty));
                };

                this.start = function () {
                    if (options.iterations !== 0 && counter >= options.iterations) {
                        $el.stopSeekingAttention();

                        return;
                    }

                    velocity += mass * options.elasticity * direction * options.force;

                    counter ++;
                };

                this.end = function () {
                    $el.css(cssProperty, originValue + 'px');
                };

                this.tick = function (msSinceLastTick) {
                    waiting += msSinceLastTick;

                    if (waiting > options.interval) {
                        this.start();
                        waiting = 0;
                    }

                    step();
                };

                this.getName = function () {
                    return 'Bounce';
                };

                this.getOptions = function () {
                    return options;
                }
            }
        }
    };

    var defaultOptions      = {
        effectClass : $.attention.effectClasses.Bounce,
        direction   : 'right',
        elasticity  : 0.4,
        interval    : 5000,
        iterations  : 0,
        force       : 1,
        gravity     : 0.3,
        friction    : 0
    }

    function startInterval() {
        if (intervalId) {
            return;
        }

        intervalId = setInterval(handleIntervalTick, frameInterval);
    }

    function stopInterval() {
        if (!intervalId) {
            return;
        }

        clearInterval(intervalId)

        intervalId = undefined;
    }

    function handleIntervalTick() {
        for (var i in collection) {
            if (isNaN(parseInt(i)) || typeof collection[i].effect !== 'object') {
                continue;
            }

            collection[i].effect.tick(frameInterval);
        }
    }

    function validateEffectClass(effectClass) {
        if (typeof effectClass !== 'function') {
            throw new Error("Unexpected 'effectClass' given in options argument for call to seekAttention");
        }

        var instance = new effectClass();

        if (typeof instance.init !== 'function') {
            throw new Error("Class '" + effectClass + "' must implement an 'init' method");
        }

        if (typeof instance.start !== 'function') {
            throw new Error("Class '" + effectClass + "' must implement an 'start' method");
        }

        if (typeof instance.end !== 'function') {
            throw new Error("Class '" + effectClass + "' must implement an 'end' method");
        }

        if (typeof instance.tick !== 'function') {
            throw new Error("Class '" + effectClass + "' must implement an 'tick' method");
        }

        return instance;
    }

    $.fn.seekAttention = function (customOptions) {
        var options = $.extend({}, defaultOptions, customOptions);

        var effect  = validateEffectClass(options.effectClass);

        effect.init($(this), options);

        collection.push({
            target  : this,
            effect  : effect
        });


        startInterval();

        return this;
    }

    $.fn.stopSeekingAttention = function () {
        for (var i in collection) {
            if (isNaN(parseInt(i)) || typeof collection[i].effect !== 'object') {
                continue;
            }

            if (collection[i].target.get(0) === this.get(0)) {
                collection[i].effect.end();

                collection[i] = undefined;

                collection.splice(i, 1);

                break;
            }
        }

        if (collection.length === 0) {
            stopInterval();
        }

        return this;
    }

})(jQuery);