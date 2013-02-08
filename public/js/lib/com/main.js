define([
    'com/config'
], function (config) {

    var Com = function () {

        this.getConfig = function () {
            return config;
        };

    };

    return new Com();

});
