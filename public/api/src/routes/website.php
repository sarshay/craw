<?php
require_once __DIR__ . '/../auth/auth.php';
require_once __DIR__ . '/../models/model.php';
require_once __DIR__ . '/../models/website.php';
require_once __DIR__ . '/../models/categoryMap.php';

$table = 'website';
$id = isset($param[2]) ? $param[2] : null;

$cols = [[], ["id", 'name', 'description', 'url', 'site_icon_url', 'color_hue', 'keywords', 'api_base_path', 'updated_time', 'created_time', 'status', 'last_scan_time', 'error_code', 'scan_by', 'category_ids', 'is18Plus']];
$schema = [
    "GET" => [[], ["id", 'keywords', 'status']],
    "POST" => [['name', 'description', 'url'], ['site_icon_url', 'color_hue', 'keywords', 'api_base_path', 'category_ids', 'is18Plus']],
    "PUT" => [["id"], ['name', 'description', 'url', 'site_icon_url', 'color_hue', 'keywords', 'api_base_path', 'status', 'error_code', 'is18Plus']],
    "DELETE" => [["ids"], []],
];
switch ($method) {
    case 'GET':
        $_GET['id'] = $id;
        $body = makeUp($_GET, $schema[$method], true);
        // logger('some one');
        if (!theUser()) {
            $body['status'] = isset($body["status"]) ? $body["status"] : 'active';
        }
        $res = GetWebsite($body);
        if ($res) {
            // logger($res);
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
            $categories = isset($_PUT["category_ids"]) ? $_PUT["category_ids"] : null;

            $body = makeUp($_PUT, $schema[$method], true);
            $body['error_code'] = isset($body["error_code"]) ? $body["error_code"] : null;
            logger($body);
            $res = UpdateData($table, $body);
            if ($res) {
                if ($categories) {
                    $isRemap = reMapCategoryWebsite($categories, $body['id']);
                    if ($isRemap) {
                        jsonResponse(202, makeUp(GetWebsite($body), $cols));
                    } else {
                        httpStatus(500);
                    }
                } else {
                    jsonResponse(202, makeUp(GetWebsite($body), $cols));
                }
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
