<?php
$m3u_json = [];
$m3u_file = file_get_contents(__DIR__ . '/_.m3u');
$lines = explode("\n", $m3u_file);
foreach ($lines as $line) {
    if (strpos($line, "#EXTINF:") === 0) {
        $channelInfo = [];
        $logoStartIndex = strpos($line, "tvg-logo=\"") + 10;
        $logoEndIndex = strpos($line, "\"", $logoStartIndex);
        $logoUrl = substr($line, $logoStartIndex, $logoEndIndex - $logoStartIndex);
        $groupTitleStartIndex = strpos($line, "group-title=\"") + 13;
        $groupTitleEndIndex = strpos($line, "\"", $groupTitleStartIndex);
        $groupTitle = substr($line, $groupTitleStartIndex, $groupTitleEndIndex - $groupTitleStartIndex);
        $titleStartIndex = strrpos($line, ",") + 1;
        $title = trim(substr($line, $titleStartIndex));
        $link = $lines[array_search($line, $lines) + 1];
        $channelInfo["tvg-logo"] = $logoUrl;
        $channelInfo["group-title"] = $groupTitle;
        $channelInfo["title"] = $title;
        $channelInfo["link"] = $link;
        $m3u_json[] = $channelInfo;
    }
}
$result = json_encode($m3u_json);
echo $result;
