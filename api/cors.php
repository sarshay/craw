<?php

// Allow requests from specific origins
$allowedOrigins = array(
    'http://localhost:3000', // Replace with the origin of your React app
    'https://local.heinsoe.com', // Replace with the origin of your React app
    'http://192.168.110.244:3000', // Add HTTPS version if applicable
    'http://192.168.99.2:3000' // Add HTTPS version if applicable
);

// Check if the request origin is allowed
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
    header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
    header('Access-Control-Allow-Credentials: true');
}

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Allow the necessary methods and headers
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    exit;
}
