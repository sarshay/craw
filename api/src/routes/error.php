<?php
require_once __DIR__ . '/../auth/auth.php';
require_once __DIR__ . '/../models/model.php';

$table = 'website';
$id = isset($param[1]) ? $param[1] : null;

$cols = [[], ["error_code", "url", "scan_by"]];
$schema = [
    "POST" => [['error_code', "url"], ["scan_by"]],
];
switch ($method) {
    case 'POST':
        require_once __DIR__ . "/../helper/connection.php";
        if (theUser()) {
            $_POST['scan_by'] = theUser()['name'];
        } else {
            $_POST['scan_by'] = "CLIENT";
        }
        $body = makeUp($_POST, $schema[$method], true);

        $url = $body["url"];
        $scan_by = $body["scan_by"];
        $error_code = $body["error_code"];

        $sql = "UPDATE `$table` SET error_code='$error_code', scan_by='$scan_by', last_scan_time = NOW() WHERE `$table`.`url` = '$url' ";
        // echo $sql;
        if ($conn->query($sql) === TRUE) {
            logger($url . ' id ' . $error_code);
        } else {
            logger($conn->error);
        }


        break;
    default:
        httpStatus(405);
        break;
}
