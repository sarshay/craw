<?php

function GetData($table, $id = null)
{
    require_once __DIR__ . "/../helper/connection.php";
    if ($id != null) {
        $sql = "SELECT * FROM `$table` WHERE `$table`.`id` = $id";
        $result = $conn->query($sql);
        if ($result) {
            return $result->fetch_assoc();
        } else {
            httpStatus(500);
            logger($conn->error);
        }
    } else {
        $sql = "SELECT * FROM `$table` ORDER BY id DESC LIMIT 100 ";
        $result = $conn->query($sql);
        if ($result) {
            return $result->fetch_all(MYSQLI_ASSOC);
        } else {
            httpStatus(500);
            logger($conn->error);
        }
    }
    $conn->close();
}
function InsertData($table, $d)
{
    require_once __DIR__ . "/../helper/connection.php";

    $columArr = [];
    $dataArr = [];

    foreach ($d as $i => $i_value) {
        $columArr[] = $i;
        $dataArr[] = is_array($i_value) ? "'" . json_encode($i_value) . "'" : "'" . $i_value  . "'";
    }

    $colum = implode(", ", $columArr);
    $data = implode(", ", $dataArr);
    // return $d;
    $sql = "INSERT INTO $table ($colum) VALUES ($data)";

    if ($conn->query($sql) === TRUE) {
        $lastId = $conn->insert_id;
        return $conn->query("SELECT * FROM `$table` WHERE `$table`.`id` = $lastId")->fetch_assoc();
    } else {
        return $conn->error;
    }

    $conn->close();
};

function UpdateData($table, $updataData)
{
    $id= $updataData['id'];
    require_once __DIR__ . "/../helper/connection.php";
    $arr = [];

    foreach ($updataData as $i => $i_value) {
        $val = is_array($i_value) ? json_encode($i_value) : $i_value;
        $arr[] = "`" . $i . "` = '" . $val  . "'";
    }

    $readyToSQL = implode(", ", $arr);

    $sql = "UPDATE `$table` SET  $readyToSQL WHERE `$table`.`id` = $id";
    // echo $sql;
    if ($conn->query($sql) === TRUE) {
        return $conn->query("SELECT * FROM `$table` WHERE `$table`.`id` = $id")->fetch_assoc();
    } else {
        return $conn->error;
    }

    $conn->close();
}

function DeleteData($table, $data)
{
    $ids = $data['ids'];
    require_once __DIR__ . "/../helper/connection.php";
    $sql = "DELETE FROM `$table` WHERE `$table`.`id` in ($ids)";
    if ($conn->query($sql) === TRUE) {
        return true;
    } else {
        return $conn->error;
    }
    $conn->close();
}

// InsertData("$table", [
//     "name" => "Sports",
//     "description" => "local sports news"
// ]);

// UpdateCategory(tableName,id, [
//     "name" => "updated Name",
//     "description" => "updated Description",
// ]);

// DeleteCategory(tablename,id);
