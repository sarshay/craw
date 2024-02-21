<?php
require_once __DIR__ . '/../models/model.php';
function InsertWP($d)
{
    if (isset($d['name']) && isset($d['description'])) {
        $data = [
            'name' => $d['name'],
            'description' => $d['description']
        ];
        echo json_encode(InsertData("wp", $data));
    } else {
        return "invilid data";
    }
}
function UpdateWP($d)
{
    echo json_encode(UpdateData("wp", $d['id'], [
        "name" => $d['name'],
        "description" => $d['description'],
    ]));
}
function DeleteWP($d)
{
    if (isset($d['id'])) {
        echo json_encode(DeleteData("wp", $d['id']));
    }
}
function ShowWP()
{
    echo json_encode(GetData("wp"));
}
