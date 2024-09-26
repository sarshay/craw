<?php

// Allow requests from specific origins
$allowedOrigins = array(
    'http://192.168.110.147',
    'http://localhost:3000', // Replace with the origin of your React app
    'https://local.heinsoe.com', // Replace with the origin of your React app
    'http://192.168.110.244:3000', // Add HTTPS version if applicable
    'http://192.168.99.2:3000', // Add HTTPS version if applicable
    'https://himyanmar.online'
);

// Check if the request origin is allowed
// if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
//     header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
//     header('Access-Control-Allow-Credentials: true');
// }

// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

// Your PHP code goes here...
