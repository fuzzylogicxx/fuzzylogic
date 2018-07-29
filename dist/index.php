<?php $page = ['title' => 'Homepage']; ?>
<?php require_once($_SERVER['DOCUMENT_ROOT'].'/inc/page_start.php'); ?>

<div class="container">

<p class="intro">Hi &ndash; I’m Laurence Hughes, a web developer and director at <a href="http://www.greenhilldigital.com/">Greenhill</a>, music maker in <a href="http://nuclearfami.ly/">The Nuclear Family</a>, player of records and pinger of pongs. This is my online home, where I test-drive web <em>stuff</em> and share my thoughts on code, music and more. Thanks for stopping by.</p>

<?php //perch_content('Intro'); ?>

<!-- this is an example blog homepage showing a simple call to perch_blog_recent_posts()

Posts are displayed using the templates stored in perch/apps/perch_blog/templates/blog you can edit these as you wish, making sure that the
paths used in these templates are correct for your installation.
 -->
<?php
    perch_blog_recent_posts(10);
?>

<p><a href="/blog/archive.php">More posts</a></p>

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

<?php require_once($_SERVER['DOCUMENT_ROOT'].'/inc/page_end.php'); ?>
