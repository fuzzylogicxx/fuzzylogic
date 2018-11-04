<head>

	<meta charset="utf-8">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<?php
	$is_blog_article = (
		((strpos($_SERVER['REQUEST_URI'], 'thoughts') !== false) || (strpos($_SERVER['REQUEST_URI'], 'sounds') !== false) || (strpos($_SERVER['REQUEST_URI'], 'links') !== false))
		&& 
		( ($_SERVER['REQUEST_URI'] !== "/thoughts/") && ($_SERVER['REQUEST_URI'] !== "/sounds/") && ($_SERVER['REQUEST_URI'] !== "/links/") )
	); 
	if ($is_blog_article) {
		perch_blog_post_meta(perch_get('s'));
		perch_blog_post_webmention_endpoint(perch_get('s'));
	} else { ?>
	<title><?php echo $page['title']; ?> | Fuzzy Logic</title>
	<meta name="description" content="">
	<?php } ?>

	<link rel="authorization_endpoint" href="https://indieauth.com/auth">
	<link rel="token_endpoint" href="https://tokens.indieauth.com/token">

	<link rel="alternate" type="application/rss+xml" title="RSS" href="rss.php" />

	<meta name="robots" content="noindex">

	<link rel="manifest" href="site.webmanifest">
	<link rel="apple-touch-icon" href="icon.png">
	<!-- Place favicon.ico in the root directory -->

	<link rel="stylesheet" href="/css/screen_v2.css"> <?php //perch_get_css(); ?>


</head>
