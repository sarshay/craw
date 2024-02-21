<?php
function httpStatus($code)
{
    switch ($code) {
        case '401':
            header("HTTP/1.1 401 Unauthorized");
            break;

        case '422':
            header("HTTP/1.1 422 Unprocessable Entity");
            break;

        default:
            # code...
            break;
    }
}
