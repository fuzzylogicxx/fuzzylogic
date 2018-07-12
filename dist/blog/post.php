<?php include($_SERVER['DOCUMENT_ROOT'].'/console/runtime.php'); ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<?php perch_blog_post_meta(perch_get('s')); ?>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="alternate" type="application/rss+xml" title="RSS" href="rss.php" />
	<?php //perch_get_css(); ?>
	<link rel="stylesheet" href="/blog/blog.css" type="text/css" />
	<?php perch_blog_post_webmention_endpoint(perch_get('s')); ?>
	<meta name="robots" content="noindex">
</head>
<body>

    <div class="post">
    	<?php perch_blog_post(perch_get('s')); ?>

    	<?php perch_blog_author_for_post(perch_get('s')); ?>

    	<div class="meta">
            <div class="cats">
                <?php perch_blog_post_categories(perch_get('s')); ?>
            </div>
            <div class="tags">
                <?php perch_blog_post_tags(perch_get('s')); ?>
            </div>
        </div>

    	<?php perch_blog_post_comments(perch_get('s')); ?>

    	<?php perch_blog_post_comment_form(perch_get('s')); ?>

    </div>

	<nav class="sidebar">
	    <h2>Archive</h2>
	    <!-- The following functions are different ways to display archives. You can use any or all of these.

	    All of these functions can take a parameter of a template to overwrite the default template, for example:

	    perch_blog_categories('my_template.html');

	    -->
	    <!--  By category listing -->
	    <?php perch_blog_categories(); ?>
	    <!--  By tag -->
	    <?php perch_blog_tags(); ?>
	    <!--  By year -->
	    <?php perch_blog_date_archive_years(); ?>
	    <!--  By year and then month - can take parameters for two templates. The first displays the years and the second the months see the default templates for examples -->
	    <?php perch_blog_date_archive_months(); ?>
	</nav>


	<footer class="layout-footer">
	<div class="wrapper">
		<ul class="social-links">
			<li class="twitter"><a href="#" rel="me">Twitter</a></li>
			<li class="facebook"><a href="#" rel="me">Facebook</a></li>
			<li class="flickr"><a href="#" rel="me">Flickr</a></li>
			<li class="linkedin"><a href="#" rel="me">LinkedIn</a></li>
			<li class="rss"><a href="#">RSS</a></li>
		</ul>
		<small>Copyright &copy; <?php echo date('Y'); ?></small>
	</div>
	</footer>
	<?php //perch_get_javascript(); ?>
</body>
</html>
