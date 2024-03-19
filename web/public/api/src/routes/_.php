<?php
require_once __DIR__ . '/../auth/auth.php';
require_once __DIR__ . '/../models/model.php';

$table = 'visitor_record';
$userIP = $_SERVER['REMOTE_ADDR'];

$cols = [[], [
    "id",
    "tag",
    "userId",
    "isNewUser",
    "linkId",
    "ip",
    "screenResolution",
    "fullUrl",
    "timeZone",
    'create_time',
    "lla"
]];
$schema = [
    "GET" => [[], ["id", 'name', 'description']],
    "POST" => [['userId'], [
        'tag', 'isNewUser', "linkId", "ip",
        "screenResolution",
        "fullUrl",
        "timeZone",
        "lla"
    ]]
];
$userIP = '';
if (isset($_SERVER['HTTP_CLIENT_IP'])) {
    $userIP = $_SERVER['HTTP_CLIENT_IP'];
} else if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $userIP = $_SERVER['HTTP_X_FORWARDED_FOR'];
} else if (isset($_SERVER['HTTP_X_FORWARDED'])) {
    $userIP = $_SERVER['HTTP_X_FORWARDED'];
} else if (isset($_SERVER['HTTP_FORWARDED_FOR'])) {
    $userIP = $_SERVER['HTTP_FORWARDED_FOR'];
} else if (isset($_SERVER['HTTP_FORWARDED'])) {
    $userIP = $_SERVER['HTTP_FORWARDED'];
} else if (isset($_SERVER['REMOTE_ADDR'])) {
    $userIP = $_SERVER['REMOTE_ADDR'];
} else {
    $userIP = null;
}
$id = null;
switch ($method) {
    case 'GET':
        if (theUser()) {
            $res = GetData($table, $id);
            if ($res) {

                jsonResponse(200, makeUp($res, $cols));
                // jsonResponse(200, $res);
            } else {
                httpStatus(404);
            }
        } else {
            httpStatus(403);
        }
        break;
    case 'POST':
        if (!theUser()) {
            $_POST['ip'] = $userIP;
            $body = makeUp($_POST, $schema[$method], true);
            InsertData($table, $body);
            $res = GetData('link', $body['linkId']);
            if ($res) {
                jsonResponse(201, makeUp($res, [["trueUrl"], []]));
            }
        }
        break;
    default:
        httpStatus(405);
        break;
}
