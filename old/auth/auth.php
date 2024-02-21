<?php
function token()
{
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImJhZGd1eWd1aXRhIiwic3RhbXAiOiIyMDIwLTAxLTAyVDIyOjAwOjAwKzAwOjAwIn0.VeVcjGfh3c2b4f50i1JEz57PeTe_P7ajYBcgooazGIo";
}
function IsAuth()
{
  if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    $authorizationHeader = $_SERVER['HTTP_AUTHORIZATION'];
    // check if the Authorization header is present and starts with "Bearer "
    if ($authorizationHeader && strpos($authorizationHeader, 'Bearer ') === 0) {
      // extract the token from the Authorization header
      return token() == substr($authorizationHeader, 7);
      // do something with the token, such as validate it or use it to authenticate the user
    } else {
      return false;
    }
  };
};

function signIn($u, $p)
{
  // return false;
  if ($u === "heinsoe" && $p === "badguyguita") {
    return token();
  } else {
    return false;
  }
}

function isLogIn()
{
  if (isset($_SESSION['bearer'])) {
    return  token() == $_SESSION['bearer'];
  } else {
    return false;
  }
}
