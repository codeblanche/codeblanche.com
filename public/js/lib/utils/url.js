define(function () {

   var Url = function (uri) {

       var regex = /^(?:([^:]+):\/\/)?([a-z0-9\-\.]+\.[a-z0-9]+)?(?:\:([0-9]+))?(?:([^?]+))?(?:\?([^#]+))?(?:#(.+))?$/i;
       var parts = regex.exec(uri);

       this.getProtocol = function () {
           return parts[1];
       };

       this.getDomain = function () {
           return parts[2];
       };

       this.getPort = function () {
           return parts[3];
       };

       this.getPath = function () {
           return parts[4];
       };

       this.getQueryString = function () {
           return parts[5];
       };

       this.getHash = function () {
           return parts[6];
       };

   };

   return Url;

});

