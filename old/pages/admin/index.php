<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My countroller</title>
    <link rel="stylesheet" href="/assets/bootstrap/css/bootstrap.min.css">

    <link rel="stylesheet" href="/assets/plugins/datatable/datatables.css">
    <link rel="stylesheet" href="/assets/plugins/datatable/datatables.min.css">
    <link rel="stylesheet" href="/assets/plugins/datatable/AutoFill-2.4.0/css/autoFill.bootstrap.min.css">
    <link rel="stylesheet" href="/assets/plugins/datatable/Buttons-2.2.3/css/buttons.bootstrap.min.css">
    <link rel="stylesheet" href="/assets/plugins/datatable/Responsive-2.3.0/css/responsive.bootstrap.min.css">

    <script src="/assets/jquery/jquery-3.6.1.min.js"></script>

    <script src="/assets/plugins/datatable/jquery.dataTables.min.js"></script>
    <script src="/assets/plugins/datatable/dataTables.colReorder.min.js"></script>

    <script src="/assets/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="/assets/js/index.js"></script>
    <style>
        .change {
            animation-name: bgChange;
            animation-duration: 2s;
        }

        ._nowrap {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        @keyframes bgChange {
            from {
                background-color: #99FF99;
            }

            to {
                background-color: "";
            }
        }
    </style>
</head>

<body>
    <?php include __DIR__ . '/components/wp/allWp.php'; ?>
    <?php include __DIR__ . '/components/category/allCategories.php';
    ?>
</body>

<script src="/assets/plugins/datatable/datatables.js"></script>
<script src="/assets/plugins/datatable/datatables.min.js"></script>
<script src="/assets/plugins/datatable/Responsive-2.3.0/js/dataTables.responsive.min.js"></script>
<script src="/assets/plugins/datatable/AutoFill-2.4.0/js/autoFill.bootstrap.min.js"></script>
<script src="/assets/plugins/datatable/Buttons-2.2.3/js/buttons.bootstrap.min.js"></script>

</html>