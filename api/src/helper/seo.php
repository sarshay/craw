<?php
$defalutTitle =  "ကျီကန်း";
$color = "#222222";
$title = "ကျီကန်း";
$description = "အကုန်သိ";
$imageUrl =  "http://" . $_SERVER['SERVER_NAME'] . "/issets/crow.jpg";
$keyWords = "စာချေ, sarshay, crow, ကျီးကန်း, ဂျကန်း, ဂျဂန်း";
$canonical = "http://" . $_SERVER['SERVER_NAME'];

$mybackendApiUrl = "/";

include_once __DIR__ . '/connection.php';
include_once __DIR__ . '/../models/website.php';
if (isset($param[1])) {
    $channel_id = $param[0]; //explode("_", $_GET['ids'])[0];
    $post_id = $param[1]; //explode("_", $_GET['ids'])[1];
    // $path =  parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    // $paths = (explode("/", $path));
    if (isset($channel_id)) {
        //$channel_id; wp_channel Id 
        $url = $mybackendApiUrl . "/website/" . $channel_id . "/";
        // echo $url;
        // exit;
        $data = GetWebsite(['id' => $channel_id]);
        // $data = json_decode(GetWebsite(['id' => $channel_id]));

        // var_dump($data);
        // exit;
        // $color = $data->color_hue;
        $title = $data['name'];
        $description = $data['description'];
        $imageUrl = $data['site_icon_url'];
        $canonical = "http://" . $_SERVER['SERVER_NAME'] . "/" . $channel_id;
        $keyWords = $data['name'];
        if ($data && isset($post_id)) {
            $contentData = json_decode(myCurl($data['url'] . "/?rest_route=/wp/v2/posts/" . $post_id . "&_fields=title,content,excerpt,_links&_embed=wp:featuredmedia"));
            $title = strip_tags($contentData->title->rendered);
            $description = strip_tags(@$contentData->excerpt->rendered ? @$contentData->excerpt->rendered : @$contentData->content->rendered);

            $thumbnail = isset($contentData->_embedded)
                ? (
                    isset($contentData->_embedded->{'wp:featuredmedia'}[0]->media_details->sizes->full->source_url)
                    ? $contentData->_embedded->{'wp:featuredmedia'}[0]->media_details->sizes->full->source_url
                    : (
                        isset($contentData->_embedded->{'wp:featuredmedia'}[0]->source_url)
                        ? $contentData->_embedded->{'wp:featuredmedia'}[0]->source_url
                        : findAPhoto($contentData->content->rendered)
                    )
                )
                : false;

            // $headers = @get_headers($thumbnail);
            if (strpos($thumbnail, 'http') === false && $thumbnail) {
                $thumbnail_url = $data['url'] . $thumbnail;
            } else {
                $thumbnail_url = $thumbnail;
            }

            if ($thumbnail_url) {
                $imageUrl = $thumbnail_url;
            }
            $canonical = "http://" . $_SERVER['SERVER_NAME'] . "/" . $channel_id . "/" . $post_id;
            // $keyWords = strip_tags($data->title);
        }
    }
}
else{
    httpStatus(404);
}


function findAPhoto($thecontent)
{
    $doc = new DOMDocument('1.0');
    libxml_use_internal_errors(true);
    $doc->loadHTML($thecontent);
    libxml_clear_errors();
    $selector = new DOMXPath($doc);

    // way 1
    if (count($selector->query("//img[@src]")) > 0) {
        $result = $selector->query("//img[@src]");
        // foreach ($result as $node) {
        //     $link = $node->getAttribute('src');
        // }
        return $result[0]->getAttribute('src');
    } else {
        return false;
    }
}
function myCurl($url)
{
    $ch = curl_init($url);
    if (!$ch) {
        die("Failed to initialize cURL");
    }


    $headers = array('Content-Type: application/json');
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
    // curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // You may want to remove this in production
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $result = curl_exec($ch);
    $j = json_decode($result);
    if (isset($j->code)) {
        httpStatus(404);
        curl_close($ch);
        exit;
    }
    curl_close($ch);

    return $result;
}

?>
<meta name=”robots” content="index, follow">
<title><?= $title; ?></title>
<!-- <meta name="theme-color" content="<?= $color; ?>" /> -->
<link rel="canonical" href="<?= $canonical; ?>" />

<!-- meta data -->
<meta name="description" content='<?= $description; ?>' />
<meta name="keywords" content="<?= $keyWords; ?>" />

<!-- open graph -->
<meta property="og:image" content="<?= $imageUrl; ?>" />
<meta property="og:image:type" content="image/jpg" />
<meta property="og:image:width" content="400" />
<meta property="og:image:height" content="300" />
<meta property="og:description" content="<?= $description; ?>" />
<meta property="og:title" content="<?= $title; ?>" />
<meta property="og:url" content="<?= $canonical; ?>" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="<?= $defalutTitle; ?>" />

<!-- twitter -->
<meta name="twitter:title" content="<?= $title; ?>" />
<meta name="twitter:description" content="<?= $description; ?>" />
<meta name="twitter:url" content="<?= $canonical; ?>" />
<meta name="twitter:image" content="<?= $imageUrl; ?>" />
<meta name="twitter:card" content="summary_large_image" />