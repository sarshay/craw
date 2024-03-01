<?php 
function jsonResponse($statusCode,$data){
    header('Content-Type: application/json; charset=utf-8');
    header("HTTP/1.1 $statusCode");
    echo json_encode($data);
    exit;
}
