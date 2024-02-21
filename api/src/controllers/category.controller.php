<?php
require_once __DIR__ . '/../models/model.php';
require_once __DIR__ . '/../auth/auth.php';
require_once __DIR__ . '/../helper/httpStatus.php';
function Insert($table, $d)
{
    $data = validNClean($table, $d);
    if (!$data['error']) {
        echo json_encode(InsertData($table, $data['data']));
    } else {
        httpStatus(422);
        echo json_encode($data['error']);
    }
}
function Update($table, $d)
{
    if (IsAuth()) {
        $data = validNClean($table, $d);
        if (!$data['error']) {
            echo json_encode(UpdateData($table, $d['id'], $data['data']));
        } else {
            httpStatus(422);
            echo json_encode($data['error']);
        }
    } else {
        httpStatus(401);
    }
}
function Delete($table, $d)
{
    if (IsAuth()) {
        if (isset($d['id'])) {
            echo json_encode(DeleteData($table, $d['id']));
        }
    } else {
        httpStatus(401);
    }
}
function Show($table, $id = null)
{
    echo json_encode(GetData($table, $id));
}


function validNClean($table, $data)
{
    $cols = array(
        'wp' => ['name', 'color_hue', 'description', 'url', 'site_icon_url', 'categories_ids', 'keywords'],
        'categories' => ['name', 'description']
    );
    if (isset($cols[$table])) {
        $ready = array();
        $need = [];
        foreach ($cols[$table] as $index) {
            if (isset($data[$index])) {
                $ready = $ready + array($index => $data[$index]);
            } else {
                $need[] = $index;
            }
        }
        return array(
            'error' => count($need) > 0
                ? array(
                    'need' => $need
                )
                : false,
            'data' => $ready
        );
    } else {
        return array(
            'error' => true
        );
    }
}
