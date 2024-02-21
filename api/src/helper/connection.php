<?php

// Create connection
// function conn()
// {
  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbname = "wp_dir";

  // 
  $conn = new mysqli($servername, $username, $password, $dbname);
  // return $conn;

  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
// }
