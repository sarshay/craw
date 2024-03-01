<?php


function makeUp($data, $schema, $required = false)
{
    $isArray = isset($data[0]);
    if (!$isArray) {
        $data = [$data];
    }

    $ready = [];
    $requiredList = [];
    // var_dump($data);
    foreach ($data as $item) {
        $temp = [];
        // var_dump($schema);
        foreach ($schema[0] as $index) {
            if (isset($item[$index])) {
                $temp[$index] = $item[$index];
            } else {
                $requiredList[] = $index;
            }
        }
        foreach ($schema[1] as $index) {
            if (isset($item[$index])) {
                $temp[$index] = $item[$index];
            }
        }
        if (count($requiredList) > 0 && $required) {
            jsonResponse(400, ['required' => $requiredList]);
            exit;
        } else {
            $ready[] = $temp;
        }
    }
    if ($isArray) {
        return $ready;
    } else {
        return $ready[0];
    }
}
