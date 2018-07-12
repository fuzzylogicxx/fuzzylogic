<?php
	if ($CurrentUser->logged_in() && $CurrentUser->has_priv('perch_blog')) {
	    $this->register_app('perch_blog', 'Blog', 1, 'A simple blog', '5.6.1');
	    $this->require_version('perch_blog', '3.0');
	    $this->add_setting('perch_blog_site_name', 'Site name', 'text', '');
	    $this->add_setting('perch_blog_post_url', 'Blog post page path', 'text', '/blog/post.php?s={postSlug}');
	    $this->add_setting('perch_blog_slug_format', 'Slug format', 'text', '%Y-%m-%d-{postTitle}');
	    $this->add_setting('perch_blog_akismet_key', 'Akismet API key', 'text', '');
	    $this->add_setting('perch_blog_comment_notify', 'Notify author of new comments', 'checkbox', '0');
	    $this->add_setting('perch_blog_max_spam_days', 'Delete spam comments', 'select', '0', array(
	    		array('label'=>'Never', 'value'=>'0'),
	    		array('label'=>'After 1 day', 'value'=>'1'),
	    		array('label'=>'After 7 days', 'value'=>'7'),
	    		array('label'=>'After 14 days', 'value'=>'14'),
	    		array('label'=>'After 30 days', 'value'=>'30'),
	    		array('label'=>'After 60 days', 'value'=>'60'),
	    		array('label'=>'After 90 days', 'value'=>'90'),
	    	));
	    $this->add_create_page('perch_blog', 'edit');
	    $this->add_setting('perch_blog_webmention_tx', 'Send webmentions', 'checkbox', '0');
	    $this->add_setting('perch_blog_webmention_rx', 'Receive webmentions', 'checkbox', '0');

	    PerchSystem::register_admin_search_handler('PerchBlog_SearchHandler');

	    include(__DIR__.'/vendor/autoload.php');
	}

	spl_autoload_register(function($class_name){
    	if (strpos($class_name, 'PerchBlog')===0) {
    		include(PERCH_PATH.'/addons/apps/perch_blog/lib/'.$class_name.'.class.php');
    		return true;
    	}
    	if (strpos($class_name, 'API_PerchBlog')>0) {
    		include(PERCH_PATH.'/addons/apps/perch_blog/lib/api/'.$class_name.'.class.php');
    		return true;
    	}
    	return false;
    });