<?php $page = ['title' => 'Homepage']; ?>
<?php require_once($_SERVER['DOCUMENT_ROOT'].'/inc/page_start.php'); ?>

<main>

<div class="intro">
    <h1>Hello<span class="intro-last-full-stop">.</span></h1>
    <p>I’m Laurence Hughes, a web developer at <a href="http://www.greenhilldigital.com/">Greenhill</a>, producer in <a href="http://nuclearfami.ly/">The Nuclear Family</a>, player of records and pinger of pongs. <a href="https://fuzzylogic.me/" rel="me">Fuzzy Logic</a> is my online home, where I try out web stuff and ramble about code, music and more.</p>
    <!-- <p>I’m Laurence Hughes — a Glasgwegian web developer, maker of music, player of records and pinger of pongs. <a href="https://fuzzylogic.me/" rel="me">Fuzzy Logic</a> is my online home, where I try out web stuff and ramble about code, music and more.</p> -->
    <!-- at <a href="http://www.greenhilldigital.com/">Greenhill</a> |  in <a href="http://nuclearfami.ly/">The Nuclear Family</a> -->
</div>


<?php //perch_content('Intro'); ?>

<!-- <h2>Latest Posts</h2> -->

<?php
    perch_blog_recent_posts(10);
?>
<p><a href="/blog/archive.php">More posts</a></p>

<?php /*
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
*/
?>

</main>

<?php require_once($_SERVER['DOCUMENT_ROOT'].'/inc/sidebar.php'); ?>

<?php require_once($_SERVER['DOCUMENT_ROOT'].'/inc/page_end.php'); ?>
