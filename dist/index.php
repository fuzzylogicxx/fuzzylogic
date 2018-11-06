<?php $page = ['title' => 'Homepage']; ?>
<?php require_once($_SERVER['DOCUMENT_ROOT'].'/inc/page_start.php'); ?>

<main>

<!-- <div class="intro">
    <p>Here is some chat lorem ipsum dolor sit amet consectuer ad piscing nonummy sed diam blah blah blah lorem ipsum dolor sit amet.</p>
    <p>You’ll find me tweeting on <a rel="me" href="https://twitter.com/fuzzylogicx">Twitter</a>; posting photos on <a rel="me" href="https://www.instagram.com/fuzzylogicx/">Instagram</a>; on Soundcloud sharing <a rel="me" href="https://soundcloud.com/the_nuclear_family">music</a> and <a rel="me" href="https://soundcloud.com/fuzzylogicx">mixes</a>; collecting, buying and selling records on <a rel="me" href="https://www.discogs.com/user/laurence">Discogs</a>; and coding on <a rel="me" href="https://github.com/fuzzylogicxx">Github</a> and <a rel="me" href="https://codepen.io/fuzzylogicx/">CodePen</a>.</p>
</div> -->

<div class="intro">
    <h1>Hello<span class="intro-last-full-stop">.</span></h1>
    <!-- <p>I’m Laurence Hughes, a web developer at <a href="http://www.greenhilldigital.com/">Greenhill</a>, music maker in <a href="http://nuclearfami.ly/">The Nuclear Family</a>, player of records and pinger of pongs. <a href="https://fuzzylogic.me/" rel="me">Fuzzy Logic</a> is my online home, where I try out web stuff and ramble about code, music and more.</p>
    --> <p>I’m Laurence Hughes — a Glaswegian web developer, music maker, player of records and pinger of pongs. <a href="https://fuzzylogic.me/" rel="me">Fuzzy Logic</a> is my online home, where I try out web stuff and ramble about code, music and more.</p>
    <!-- at <a href="http://www.greenhilldigital.com/">Greenhill</a> |  in <a href="http://nuclearfami.ly/">The Nuclear Family</a> -->
</div>


<?php //perch_content('Intro'); ?>

<!-- <h2>Latest Posts</h2> -->

<?php
    perch_blog_recent_posts(10);
?>
<a class="more-posts" href="/thoughts/">Browse older posts</a>

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
