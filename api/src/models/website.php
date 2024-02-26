<?php
// GetWebsite
function GetWebsite($filter = null)
{
    global $conn;



    if (isset($filter['id'])) {

        $id = $filter['id'];
        $sql = "SELECT  website.*,
        GROUP_CONCAT(mcw.category_id) AS category_ids FROM `website` 
        LEFT JOIN 
        map_category_website AS mcw ON website.id = mcw.website_id WHERE `website`.`id` = $id  
        GROUP BY  website.id";
        $result = $conn->query($sql);
        if ($result) {
            return $result->fetch_assoc();
        } else {
            logger($conn->error);
            httpStatus(500);
        }
    } else {
        $filter_ = [];
        if ($filter) {
            foreach ($filter as $i => $i_value) {
                if ($i !== 'id') {
                    $val = is_array($i_value) ? json_encode($i_value) : $i_value;
                    $filter_[] = "`" . $i . "` = '" . $val  . "'";
                }
            }
        }

        // logger( $filter_);
        $where = implode(" AND ", $filter_);
        $whereString = count($filter_) > 0 ? "WHERE $where" : "";
        $sql = "SELECT website.*,
        GROUP_CONCAT(mcw.category_id) AS category_ids FROM `website`
        LEFT JOIN 
        map_category_website AS mcw ON website.id = mcw.website_id  $whereString  
        GROUP BY website.id ORDER BY id DESC LIMIT 100 ";
        logger($sql);
        $result = $conn->query($sql);
        if ($result) {
            return $result->fetch_all(MYSQLI_ASSOC);
        } else {
            logger($conn->error);
            httpStatus(500);
        }
    }
    $conn->close();
};
