<?php
require_once __DIR__ . '/../auth/auth.php';
require_once __DIR__ . '/../models/model.php';

$table = 'website';
$id = isset($param[1]) ? $param[1] : null;

$cols = [[], ["id", 'name', 'description', 'url', 'site_icon_url', 'color_hue', 'keywords', 'updated_time', 'created_time', 'status']];
$schema = [
    "GET" => [[], ["id", 'name', 'description', 'url', 'keywords']],
    "POST" => [['name', 'description', 'url'], ['site_icon_url', 'color_hue', 'keywords']],
    "PUT" => [["id"], ['name', 'description', 'url', 'site_icon_url', 'color_hue', 'keywords', 'status']],
    "DELETE" => [["ids"], []],
];
switch ($method) {
    case 'GET':
        $res = GetData($table, $id);
        if ($res) {
            jsonResponse(200, makeUp($res, $cols));
            // jsonResponse(200, $res);
        } else {
            httpStatus(404);
        }
        break;
    case 'POST':
        if (theUser()) {
            $body = makeUp($_POST, $schema[$method], true);
            $res = InsertData($table, $body);
            jsonResponse(201, makeUp($res, $cols));
        } else {
            httpStatus(403);
        }
        break;

    case 'PUT':
        if (theUser()) {
            // var_dump($_PUT);
            $body = makeUp($_PUT, $schema[$method], true);
            $res = UpdateData($table, $body);
            if ($res) {
                jsonResponse(202, makeUp($res, $cols));
            } else {
                httpStatus(204);
            }
        } else {
            httpStatus(403);
        }
        break;
    case 'DELETE':
        if (theUser()) {
            $body = makeUp($_DELETE, $schema[$method], true);
            $res = DeleteData($table, $body);
            jsonResponse(202, $res);
        } else {
            httpStatus(403);
        }
        break;
    default:
        httpStatus(405);
        break;
}
