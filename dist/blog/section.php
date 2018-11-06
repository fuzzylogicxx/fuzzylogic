<?php $page = ['title' => 'Section']; ?>
<?php require_once($_SERVER['DOCUMENT_ROOT'].'/inc/page_start.php'); ?>

<main>

<?php perch_blog_section(perch_get('s')); ?>

<?php 
$posts_per_page = 10;
    $template       = 'post_in_list.html';
    $sort_order     = 'DESC';
    $sort_by        = 'postDateTime';

    // Have we displayed any posts yet?
    $posts_displayed = false;
?>

<?php
perch_blog_custom([
                'section'=>perch_get('s'),
                'template'   => $template,
                'count'      => $posts_per_page,
                'sort'       => $sort_by,
                'sort-order' => $sort_order,
                ]);
?>
<!-- <p><a href="/blog/archive.php">More posts</a></p> -->

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
<!-- <h2>Filter archive</h2> -->
<!--  By category listing -->
<?php //perch_blog_categories(array('section'=>perch_get('s'))); ?>
<!-- <?php perch_blog_categories(); ?> -->
<!--  By tag -->
<!-- <?php perch_blog_tags(array('section'=>perch_get('s'))); ?> -->
<!--  By year -->
<!-- <?php perch_blog_date_archive_years(array('section'=>perch_get('s'))); ?> -->

<?php require_once($_SERVER['DOCUMENT_ROOT'].'/inc/page_end.php'); ?>
