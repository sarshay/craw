<?php
function token()
{
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImJhZGd1eWd1aXRhIiwic3RhbXAiOiIyMDIwLTAxLTAyVDIyOjAwOjAwKzAwOjAwIn0.VeVcjGfh3c2b4f50i1JEz57PeTe_P7ajYBcgooazGIo";
}

function signIn($u, $p)
{
  // return false;
  if ($u === "heinsoe" && $p === "password") {
    return token();
  } else {
    jsonResponse(403, ["message" => 'wrong username or password']);
  }
}

function theUser()
{
  if (isset($_COOKIE['user_token'])) {
    $user_token = $_COOKIE['user_token'];
    $user = validateToken($user_token);
    if ($user !== null) {
      return $user;
    }
  } else {
    httpStatus(401);
  }
}

function validateToken($token)
{
  if ($token == token()) {
    $user = [
      'id' => 1,
      'username' => 'Hein Soe',
      'role' => 'admin',
      'token' => $token
    ];
    return $user;
  } else {
    return null;
  }
}
