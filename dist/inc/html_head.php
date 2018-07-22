<head>
	<meta charset="utf-8">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<?php
	$is_blog_article = (strpos($_SERVER['REQUEST_URI'], 'posts') !== false); 
	if ($is_blog_article) {
		perch_blog_post_meta(perch_get('s'));
		perch_blog_post_webmention_endpoint(perch_get('s'));
	} else { ?>
	<title><?php echo $page['title']; ?> | Fuzzy Logic</title>
	<meta name="description" content="">
	<?php } ?>

	<link rel="alternate" type="application/rss+xml" title="RSS" href="rss.php" />
	
	<meta name="robots" content="noindex">

	<link rel="manifest" href="site.webmanifest">
	<link rel="apple-touch-icon" href="icon.png">
	<!-- Place favicon.ico in the root directory -->

	<?php //perch_get_css(); ?>
	<link rel="stylesheet" href="/css/normalize.css">
	<link rel="stylesheet" href="/css/main.css">

	<style>
		body {
			margin: 0;
			padding: 0;
		}
		header, .container {
			margin: 0 2%;
		}
		@media only screen and (min-width: 40em)  { 
			header,  .container {
				margin: 0 20%;
			}
		}
	</style>

</head>
