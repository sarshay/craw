<?php
if (isLogIn()) {
    header('Location: /admin');
}else{
    $username = @$_POST['username'];
    $password = @$_POST['password'];
    require_once __DIR__ . '/../../auth/auth.php';
    $token = signIn($username, $password);
    if ($token) {
        $_SESSION['bearer'] = $token;
        header('Location: /admin');
        exit();
    };
}
?>
<!DOCTYPE html>
<html>

<head>
    <title>Login</title>


    <link rel="stylesheet" href="/assets/bootstrap/css/bootstrap.min.css">
    <script src="/assets/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- Custom CSS -->
    <style type="text/css">
        body {
            background-color: #f9f9f9;
        }

        .login-form {
            width: 340px;
            margin: 50px auto;
            font-size: 15px;
        }

        .login-form form {
            box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
            background-color: #ffffff;
        }

        .login-form form>* {
            margin: 10px;
        }
    </style>
</head>

<body>
    <div class="login-form">
        <form action="/login" method="post" class="p-3">
            <h2 class="text-center">Log in</h2>
            <div class="form-group">
                <input type="username" name="username" class="form-control" placeholder="Usernsme" required="required" value="<?php echo $username; ?>">
            </div>
            <div class="form-group">
                <input type="password" name="password" class="form-control" placeholder="Password" required="required" value="<?php echo $password; ?>">
            </div>
            <div class="form-group">
                <button type="submit" class="form-control btn btn-primary btn-block">Log in</button>
            </div>
        </form>
    </div>
</body>

</html>