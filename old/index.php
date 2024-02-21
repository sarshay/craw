<?php
// $_GET
// $_POST

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
function apiHost(){
    return 'https://api.sarshay.com';
}
session_start();
require_once __DIR__ . '/helper/pathManager.php';
require_once __DIR__ . '/auth/auth.php';


if (currentPath(1) == "home") {
    echo "home";
} elseif (currentPath(1) == "admin") {
    if (isLogIn()) {
        include_once __DIR__ . '/pages/admin/index.php';
    }else{
        header('Content-Type: application/json; charset=utf-8');
        header('HTTP/1.0 404 Not Found', true, 404);
        echo "404";
    }
} elseif (currentPath(1) == "login") {
    include_once __DIR__ . '/pages/admin/login.php';
}else {
    $_method = 'GET';
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        if (isset($_POST['_method'])) {
            $_method = $_POST['_method'];
        } else {
            $_method = 'POST';
        }
    }

    require_once __DIR__ . '/controllers/category.controller.php';
    header('Content-Type: application/json; charset=utf-8');
    if (
        currentPath(1) == 'wp' ||
        currentPath(1) == 'categories'
    ) {
        switch ($_method) {
            case 'POST':
                Insert(currentPath(1), $_POST);
                break;
            case 'PUT':
                Update(currentPath(1), $_POST);
                break;
            case 'DELETE':
                Delete(currentPath(1), $_POST);
                break;
            default:
                Show(currentPath(1),currentPath(2));
                break;
        }
    } else {
        header('HTTP/1.0 404 Not Found', true, 404);
        echo "404";
    }
}


// InsertData("categories", [
//     "name" => "Sports",
//     "description" => "local sports news"
// ]);

// UpdateCategory(tableName,id, [
//     "name" => "updated Name",
//     "description" => "updated Description",
// ]);

// DeleteCategory(tablename,id);