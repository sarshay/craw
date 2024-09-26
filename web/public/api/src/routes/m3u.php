<?php
$m3u_json = [];
$m3u_file = file_get_contents(__DIR__ . '/playlist.m3u');
$lines = explode("\n", $m3u_file);

foreach ($lines as $line) {
    if (strpos($line, "#EXTINF:") === 0) {
        $channelInfo = [];

        // Extract tvg-logo if present
        $logoStartIndex = strpos($line, "tvg-logo=\"");
        if ($logoStartIndex !== false) {
            $logoStartIndex += 10;
            $logoEndIndex = strpos($line, "\"", $logoStartIndex);
            $logoUrl = substr($line, $logoStartIndex, $logoEndIndex - $logoStartIndex);
        } else {
            $logoUrl = null; // Handle missing logo case
        }

        // Extract group-title if present
        $groupTitleStartIndex = strpos($line, "group-title=\"");
        if ($groupTitleStartIndex !== false) {
            $groupTitleStartIndex += 13;
            $groupTitleEndIndex = strpos($line, "\"", $groupTitleStartIndex);
            $groupTitle = substr($line, $groupTitleStartIndex, $groupTitleEndIndex - $groupTitleStartIndex);
        } else {
            $groupTitle = null; // Handle missing group title case
        }

        // Extract title
        $titleStartIndex = strrpos($line, ",") + 1;
        $title = trim(substr($line, $titleStartIndex));

        // Extract the link from the next line
        $currentLineIndex = array_search($line, $lines);
        $link = isset($lines[$currentLineIndex + 1]) ? trim($lines[$currentLineIndex + 1]) : null;

        // Assign extracted info
        $channelInfo["tvg-logo"] = $logoUrl;
        $channelInfo["group-title"] = $groupTitle;
        $channelInfo["title"] = $title;
        $channelInfo["link"] = $link;

        $m3u_json[] = $channelInfo;
    }
}

// Recursively ensure all strings are UTF-8 encoded
function utf8ize($data) {
    if (is_array($data)) {
        foreach ($data as $key => $value) {
            $data[$key] = utf8ize($value);
        }
    } else if (is_string($data)) {
        // Detect if the string is not UTF-8 and convert it
        if (!mb_detect_encoding($data, 'UTF-8', true)) {
            return mb_convert_encoding($data, 'UTF-8', 'auto');
        }
    }
    return $data;
}

$m3u_json = utf8ize($m3u_json);

// Output JSON-encoded data
echo json_encode($m3u_json, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
