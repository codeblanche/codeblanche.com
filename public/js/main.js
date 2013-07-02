requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery      : 'lib/jquery-1.9.1.min',
        attention   : 'lib/jquery.attention'
    },
    packages: [
        "app",
        { name: "com", location: "lib/com" },
    ]
});

require(["app"]);
