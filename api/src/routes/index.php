<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php include_once __DIR__ . '/../helper/seo.php' ?>
    <style>
        body {
            padding: 0.6em;
        }

        img {
            max-width: 100%;
            height: auto;
            object-fit: contain;
        }

        figure {
            display: block;
            margin-block-start: 0em;
            margin-block-end: 0em;
            margin-inline-start: 0px;
            margin-inline-end: 0px;
        }
    </style>
</head>

<body>
    <h1><?= $contentData->title->rendered; ?></h1>
    <script type="text/javascript">
        atOptions = {
            'key': 'f2ac0de11bd26e71eb191826242bfceb',
            'format': 'iframe',
            'height': 250,
            'width': 300,
            'params': {}
        };
        document.write('<scr' + 'ipt type="text/javascript" src="//www.topcreativeformat.com/f2ac0de11bd26e71eb191826242bfceb/invoke.js"></scr' + 'ipt>');
    </script>
    <?= $contentData->content->rendered; ?>
</body>

</html>