<?php
include __DIR__ . '/env.php';
include_once __DIR__ . '/cors.php';

// Include utility files
include_once __DIR__ . '/src/utility/httpStatus.php';
include_once __DIR__ . '/src/utility/logger.php';
include_once __DIR__ . '/src/utility/response.php';
include_once __DIR__ . '/src/auth/auth.php';
include_once __DIR__ . '/src/utility/oop.php';
include_once __DIR__ . '/src/utility/method.php';

// include_once __DIR__ . '/migrate.php';


// Handle HTTP requests
$paths =  parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$param = explode('/', $paths);
array_shift($param);
$input = file_get_contents('php://input');
$routeFile = __DIR__ . "/src/routes/" . basename($param[0]) . ".php";
$method = $_SERVER['REQUEST_METHOD'];

if ($param[0]) {
    // Check if the route file exists
    if (file_exists($routeFile)) {
        include_once $routeFile;
        // Handle response as needed
    } else {
        // var_dump($param);
        // var_dump($routeFile);
        httpStatus(404);
    }
} else {
    // No route specified, provide welcome message
    echo "Welcome";
}


// switch ($method) {
//     case 'GET':
//         if ($request[0] == 'books') {
//             if (isset($request[1])) {
//                 echo getBookById($request[1]);
//             } else {
//                 echo getBooks();
//             }
//         }
//         break;
//     case 'POST':
//         if ($request[0] == 'books') {
//             echo addBook($input);
//         }
//         break;
//     default:
//         header("HTTP/1.1 405 Method Not Allowed");
//         header("Allow: GET, POST");
//         break;
// }
