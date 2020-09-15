<?php

declare(strict_types=1);

require_once 'controller/EnqueteController.php';
require_once 'Handler.php';

$controller = new EnqueteController();

$handler = new Handler($controller);
$handler->handle();