<?php

// Create connection
// function conn()
// {
  $servername = "localhost";
  $username = "heinajak_heinsoe";
  $password = "Zg^YOyat!jDD";
  $dbname = "heinajak_ssWp";

  // 
  $conn = new mysqli($servername, $username, $password, $dbname);
  // return $conn;

  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
// }
