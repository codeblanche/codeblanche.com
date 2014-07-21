<?php

require '../vendor/autoload.php';

$app = new \Slim\Slim();

$app->post('/ajax/send', function () {
    $name    = filter_input(INPUT_POST, 'name');
    $email   = filter_input(INPUT_POST, 'email');
    $phone   = filter_input(INPUT_POST, 'phone');
    $message = filter_input(INPUT_POST, 'comment');

    if (empty($name) || empty($email) || empty($phone)) {
        echo 'Oops! Some values seem to be missing.';
    }

    $content = <<<EOM
Name  :  $name
Email :  $email
Phone :  $phone
---------------------------------------------------
$message
EOM;

    $headers = array(
        'From: no-reply@codeblanche.com',
        'Reply-To: ' . $email,
    );

    $result = mail('info@codeblanche.com', 'Contact on CodeBlanche', $content, implode("\r\n", $headers));

    if ($result) {
        echo "Thanks for contacting us. We'll be in touch with you shortly.";
    }
    else {
        echo "Something seems to have gone wrong. Perhaps you could email us instead <a href=\"mailto:info@codeblanche.com\">info@codeblanche.com</a>";
    }
});

$app->get('/', function () {
    require 'index.html';
});

$app->get('/:page', function ($page) {
    require 'index.html';
});

$app->run();
