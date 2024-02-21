<?php
require_once __DIR__ . '/../auth/auth.php';

if (isset($param[1]) && $param[1] !== "") {

    switch ($method) {
        case 'POST':
            switch ($param[1]) {
                case 'signin':
                    $body = makeUp($_POST, [['username', 'password'], []], true);
                    $token = signIn($body['username'], $body['password']);
                    jsonResponse(200, ["token" => $token]);
                    break;

                default:
                    httpStatus(404);
                    break;
            }
            break;

        case 'GET':
            switch ($param[1]) {
                case 'me':
                    jsonResponse(200, theUser());
                    break;

                default:
                    # code...
                    break;
            }
            break;
        default:
            httpStatus(405);
            break;
    }
} else {
    httpStatus(404);
}
