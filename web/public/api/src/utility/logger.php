<?php
function logger($log)
{
    if (is_object($log) || is_array($log)) {
        $log = print_r($log, true);
    }
    error_log($log);
}
