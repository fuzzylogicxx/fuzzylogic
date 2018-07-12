<?php include('console/runtime.php'); ?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8" />
	<title>Perch Example Search Page</title>
	<?php perch_get_css(); ?>
	<meta name="robots" content="noindex">
</head>
<body>
	<div class="wrapper cols2-nav-right">
		<div class="primary-content">
		    <?php 
				$query = perch_get('q');  // 'q' query string argument e.g. search.php?q=apples
			    perch_content_search($query);
			?>
		</div>
		<nav class="sidebar">
		   <?php perch_search_form(); ?>
    	</nav>
	</div>
    <?php perch_get_javascript(); ?>
</body>
</html>