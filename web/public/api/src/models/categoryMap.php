<?php
function reMapCategoryWebsite($category_ids, $websiteId)
{
    global $conn;
    $del = "DELETE FROM `map_category_website` as mcw WHERE `mcw`.`website_id` = $websiteId";
    if ($conn->query($del)) {
        $cat = [];
        foreach (explode(',', $category_ids) as $category_id) {
            $cat[] = array(
                'website_id' => $websiteId,
                'category_id' => $category_id
            );
        }
        if (InsertMultiData("map_category_website", $cat)) {
            return true;
        } else {
            // logger($sql);
            logger($conn->error);
        };
    } else {

        return $conn->error;
    }
    $conn->close();
    // return $d;

};
