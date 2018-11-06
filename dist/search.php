<?php $page = ['title' => 'Search']; ?>
<?php require_once($_SERVER['DOCUMENT_ROOT'].'/inc/page_start.php'); ?>

<main>

<?php 
	$query = perch_get('q');  // 'q' query string argument e.g. search.php?q=apples
	perch_content_search($query);
?>

</main>

<?php require_once($_SERVER['DOCUMENT_ROOT'].'/inc/sidebar.php'); ?>

<?php require_once($_SERVER['DOCUMENT_ROOT'].'/inc/page_end.php'); ?>
