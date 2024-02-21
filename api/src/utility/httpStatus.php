<?php
function httpStatus($code)
{
    header("HTTP/1.1 $code");

    $routeFile = __DIR__ . "/../error/" . basename($code) . ".php";
    if (file_exists($routeFile)) {
        include_once $routeFile;
        // Handle response as needed
    }
    exit;
}
