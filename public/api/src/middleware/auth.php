<?php


class AuthMiddleware
{
    public function who($request, $next)
    {
        if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
            // Extract the bearer token
            $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
            if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
                $token = $matches[1];
                // Now you have the token, implement your authentication logic
                // For example, validate the token against your authentication system
                $user = $this->validateToken($token);
                // if ($user !== null) {
                // User authenticated, pass the user information to the next middleware or route file
                return $next($user);
                // }
            }
        } else {
            // Not authenticated, return 403 Forbidden response
            http_response_code(403);
            echo "403 Forbidden - Not Authenticated";
            exit();
        }
    }
    private function validateToken($token)
    {
        $user = [
            'id' => 1,
            'username' => 'john_doe',
            'role' => 'admin',
            'token' => $token
        ];
        return $user;
    }
}
