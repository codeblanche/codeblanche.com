requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery  : 'lib/jquery-1.9.1.min'
    },
    packages: [
        "app",
        { name: "com", location: "lib/com" },
    ]
});

require(["app"]);
