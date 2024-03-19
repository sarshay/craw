
<?php

require_once __DIR__ . '/src/models/model.php';
$wpList = file_get_contents('https://api.himyanmar.online/wp');
$safeCols = [['name', 'description', 'url'], ['site_icon_url', 'color_hue', 'keywords']];
$safeData =  makeUp(json_decode($wpList, true), $safeCols);
InsertMultiData('website', $safeData);
// InsertMultiData