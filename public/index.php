<?php

require '../vendor/autoload.php';

$app = new \Slim\Slim();

$app->post('/ajax/send', function () {

    header('Content-Type: application/json');

    $email   = filter_input(INPUT_POST, 'email');
    $phone   = filter_input(INPUT_POST, 'phone');
    $message = filter_input(INPUT_POST, 'message');

    if (empty($email) || empty($phone) || empty($message)) {
        echo json_encode(array('ok' => false));

        return;
    }

    $content = <<<EOM
Email:  $email
Phone:  $phone
---------------------------------------------------
$message
EOM;

    $headers = array(
        'From: no-reply@codeblanche.com',
        'Reply-To: ' . $email,
    );

    $result = mail('info@codeblanche.com', 'Contact on CodeBlanche', $content, implode("\r\n", $headers));

    echo json_encode(array('ok' => $result));
});

$app->get('/', function () {
    require 'index.html';
});

$app->get('/:page', function ($page) {
    require 'index.html';
});

$app->run();
