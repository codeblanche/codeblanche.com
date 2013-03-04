<?php

require '../vendor/autoload.php';

$app = new \Slim\Slim();

$app->get('/', function () {
    require 'index.html';
});

$app->get('/:page', function ($page) {
    require 'index.html';
});

$app->run();