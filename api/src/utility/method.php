<?php
if ($_SERVER['REQUEST_METHOD'] == "PUT" || $_SERVER['REQUEST_METHOD'] == "DELETE") {
    $put_data = file_get_contents("php://input");
    parse_str($put_data, $parsed_vars);
    // Remove leading/trailing boundaries and split into individual parts
    // $parts = explode('----------------------------', $put_data);

    // Initialize an array to store the parsed variables
    // $parsed_vars = array();

    // Loop through each part and extract name-value pairs
    // foreach ($parts as $part) {
    //     // Check if the part contains content
    //     if (strlen(trim($part)) > 0) {
    //         // Extract the name-value pair using regular expression
    //         preg_match('/Content-Disposition: form-data; name="([^"]+)"\s*(.*)$/m', $part, $matches);
    //         if (count($matches) === 3) {
    //             // Store the name-value pair in the parsed_vars array
    //             $parsed_vars[$matches[1]] = trim($matches[2]);
    //         }
    //     }
    // }
    if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
        $_PUT = $parsed_vars;
    }
    if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
        $_DELETE = $parsed_vars;
    }
}
