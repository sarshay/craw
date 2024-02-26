<?php

require_once __DIR__ . "/../helper/connection.php";
function GetData($table, $id = null, $filter = null)
{
    global $conn;
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
        $filter_ = [];
        if ($filter) {
            foreach ($filter as $i => $i_value) {
                $val = is_array($i_value) ? json_encode($i_value) : $i_value;
                $filter_[] = "`" . $i . "` = '" . $val  . "'";
            }
        }

        // logger( $filter_);
        $where = implode(" AND ", $filter_);
        $whereString = count($filter_) > 0 ? "WHERE $where" : "";
        $sql = "SELECT * FROM `$table` $whereString ORDER BY id DESC LIMIT 100 ";
        // logger($sql);
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
    global $conn;

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
    // var_dump($sql);
    if ($conn->query($sql) === TRUE) {
        $lastId = $conn->insert_id;
        return $conn->query("SELECT * FROM `$table` WHERE `$table`.`id` = $lastId")->fetch_assoc();
    } else {
        return $conn->error;
    }

    $conn->close();
};

function InsertMultiData($table, $data)
{
    global $conn;

    $columns = [];
    $values = [];

    foreach ($data as $row) {
        $columnArr = [];
        $valueArr = [];
        foreach ($row as $column => $value) {
            $columnArr[] = $column;
            $valueArr[] = is_array($value) ? "'" . json_encode($value) . "'" : "'" . $value  . "'";
        }
        $columns[] = '(' . implode(", ", $columnArr) . ')';
        $values[] = '(' . implode(", ", $valueArr) . ')';
    }

    $columnsString = implode(", ", array_unique($columns));
    $valuesString = implode(", ", $values);

    $sql = "INSERT INTO $table $columnsString VALUES $valuesString";

    if ($conn->query($sql) === TRUE) {
        // $lastId = $conn->insert_id;
        return true;
    } else {
        logger($sql);
        logger($conn->error);
    }

    $conn->close();
    exit;
}

function UpdateData($table, $updataData)
{
    // var_dump($updataData);
    $id = $updataData['id'];
    global $conn;
    $arr = [];

    foreach ($updataData as $i => $i_value) {
        $val = is_array($i_value) ? json_encode($i_value) : $i_value;
        $arr[] = "`" . $i . "` = '" . $val  . "'";
    }

    $readyToSQL = implode(", ", $arr);

    $sql = "UPDATE `$table` SET  $readyToSQL WHERE `$table`.`id` = $id";
    if ($conn->query($sql) === TRUE) {
        return true;
    } else {
        logger($sql);
        logger($conn->error);
        httpStatus(500);
    }

    $conn->close();
}

function DeleteData($table, $data)
{
    $ids = $data['ids'];
    global $conn;
    $sql = "DELETE FROM `$table` WHERE `$table`.`id` in ($ids)";
    if ($conn->query($sql) === TRUE) {
        return true;
    } else {
        logger($sql);
        httpStatus(500);
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
