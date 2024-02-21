<?php
function currentPath($i)
{
    if (!isset($_SERVER['REQUEST_URI']) || $_SERVER['REQUEST_URI'] == '' || $_SERVER['REQUEST_URI'] == '/') {
        return "home";
    } else {
        $path =  parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        return @explode("/", $path)[$i];
    }
}
