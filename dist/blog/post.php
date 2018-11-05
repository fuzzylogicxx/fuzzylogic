<?php $page = ['title' => 'Homepage | Fuzzy Logic']; ?>
<?php require_once($_SERVER['DOCUMENT_ROOT'].'/inc/page_start.php'); ?>

<main>

<?php perch_blog_post(perch_get('s')); ?>

<div class="meta">
    <!-- <div class="cats">
        <?php //perch_blog_post_categories(perch_get('s')); ?>
    </div> -->
    <?php perch_blog_post_tags(perch_get('s')); ?>
</div>

<?php perch_blog_post_ping_form(perch_get('s')); ?>

<?php perch_blog_post_comments(perch_get('s')); ?>



<?php 
/*
<?php perch_blog_author_for_post(perch_get('s')); ?>

<div class="meta">
    <div class="cats">
        <?php perch_blog_post_categories(perch_get('s')); ?>
    </div>
    <div class="tags">
        <?php perch_blog_post_tags(perch_get('s')); ?>
    </div>
</div>



<?php //perch_blog_post_comment_form(perch_get('s')); ?>
*/
?>
    
</main>

<?php require_once($_SERVER['DOCUMENT_ROOT'].'/inc/sidebar.php'); ?>

<?php require_once($_SERVER['DOCUMENT_ROOT'].'/inc/page_end.php'); ?>
