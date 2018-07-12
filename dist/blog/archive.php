<?php include($_SERVER['DOCUMENT_ROOT'].'/console/runtime.php'); ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Perch Blog Example Archive Page</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="alternate" type="application/rss+xml" title="RSS" href="rss.php" />
	<?php perch_get_css(); ?>
	<link rel="stylesheet" href="/blog/blog.css" type="text/css" />
	<meta name="robots" content="noindex">
</head>
<body>
	<header class="layout-header">
		<div class="wrapper">
			<div class="company-name">Perch Blog App - Company Name</div>
			<img src="<?php perch_path('feathers/quill/img/logo.gif'); ?>" alt="Your Logo Here" class="logo" />
		</div>
		<nav class="main-nav">
			<?php perch_pages_navigation([
					'levels'=>1
				]);
			?>
		</nav>
	</header>

	<!--  change cols2-nav-right to cols2-nav-left if you want the sidebar on the left -->
	<div class="wrapper cols2-nav-right">

		<div class="primary-content">

		    <?php
		        // defaults for all modes
		        $posts_per_page = 10;
		        $template 		= 'post_in_list.html';
		        $sort_order		= 'DESC';
		        $sort_by		= 'postDateTime';

		        // Have we displayed any posts yet?
		        $posts_displayed = false;

		        /*
		        	perch_get() is used to get options from the URL.

					e.g. for the URL
						/blog/archive.php?cat=news

					perch_get('cat') would return 'news' because cat=news.


					The code below looks for different options in the URL, and then displays different types of listings based on it.
		        */


		        /* --------------------------- POSTS BY CATEGORY --------------------------- */
		        if (perch_get('cat')) {
		            echo '<h1>Archive of: '.perch_blog_category(perch_get('cat'), true).'</h1>';

		            perch_blog_custom([
							'category'   => perch_get('cat'),
							'template'   => $template,
							'count'      => $posts_per_page,
							'sort'       => $sort_by,
							'sort-order' => $sort_order,
		                    ]);

		            $posts_displayed = true;
		        }


		        /* --------------------------- POSTS BY TAG --------------------------- */
		        if (perch_get('tag')) {
		            echo '<h1>Archive of: '.perch_blog_tag(perch_get('tag'), true).'</h1>';

		            perch_blog_custom([
							'tag'   	 => perch_get('tag'),
							'template'   => $template,
							'count'      => $posts_per_page,
							'sort'       => $sort_by,
							'sort-order' => $sort_order,
		                    ]);

		            $posts_displayed = true;
		        }



		        /* --------------------------- POSTS BY DATE RANGE --------------------------- */
		        if (perch_get('year')) {

					$year              = intval(perch_get('year'));
					$date_from         = $year.'-01-01 00:00:00';
					$date_to           = $year.'-12-31 23:59:59';
					$title_date_format = '%Y';


		            // Month and Year?
		            if (perch_get('month')) {
						$month             = intval(perch_get('month'));
						$date_from         = $year.'-'.str_pad($month, 2, '0', STR_PAD_LEFT).'-01 00:00:00';
						$date_to           = $year.'-'.str_pad($month, 2, '0', STR_PAD_LEFT).'-31 23:59:59';
						$title_date_format = '%B, %Y';
		            }

		            echo '<h1>Archive of: '.strftime($title_date_format, strtotime($date_from)).'</h1>';

		            perch_blog_custom([
							'filter'     => 'postDateTime',
							'match'      => 'eqbetween',
							'value'      => $date_from.','.$date_to,
							'template'   => $template,
							'count'      => $posts_per_page,
							'sort'       => $sort_by,
							'sort-order' => $sort_order,
		                    ]);

		            $posts_displayed = true;
		        }



		        /* --------------------------- POSTS BY AUTHOR --------------------------- */
		        if (perch_get('author')) {

		        	echo '<h1>Posts by '.perch_blog_author(perch_get('author'), [
		        											'template' => 'author_name.html',
		        											], true).'</h1>';


		        	perch_blog_custom([
							'author'   	 => perch_get('author'),
							'template'   => $template,
							'count'      => $posts_per_page,
							'sort'       => $sort_by,
							'sort-order' => $sort_order,
		                    ]);

		            $posts_displayed = true;
		        }


		      	/* --------------------------- DEFAULT: ALL POSTS --------------------------- */

		      	if ($posts_displayed == false) {

		      		// No other options have been used; no posts have been displayed yet.
		      		// So display all posts.

		      		echo '<h1>Archive</h1>';

		      		perch_blog_custom([
							'template'   => $template,
							'count'      => $posts_per_page,
							'sort'       => $sort_by,
							'sort-order' => $sort_order,
		                    ]);

		      	}

		    ?>
	    </div>
		<nav class="sidebar">
		    <h2>Filter archive</h2>
		    <!--  By category listing -->
		    <?php perch_blog_categories(); ?>
		    <!--  By tag -->
		    <?php perch_blog_tags(); ?>
		    <!--  By year -->
		    <?php perch_blog_date_archive_years(); ?>
		    <!--  By year and then month - can take parameters for two templates. The first displays the years and the second the months see the default templates for examples -->
		    <?php perch_blog_date_archive_months(); ?>
    	</nav>
	</div>

	<footer class="layout-footer">
		<div class="wrapper">
			<ul class="social-links">
				<li class="twitter"><a href="#" rel="me">Twitter</a></li>
				<li class="facebook"><a href="#" rel="me">Facebook</a></li>
				<li class="flickr"><a href="#" rel="me">Flickr</a></li>
				<li class="linkedin"><a href="#" rel="me">LinkedIn</a></li>
				<li class="rss"><a href="rss.php">RSS</a></li>
			</ul>
			<small>Copyright &copy; <?php echo date('Y'); ?></small>
		</div>
	</footer>
	<?php perch_get_javascript(); ?>
</body>
</html>