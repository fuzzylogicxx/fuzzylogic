<?php 
    include('../perch/runtime.php'); 
    $site_url = 'http://'.$_SERVER['HTTP_HOST'];
    

    $feed = [
        'version'       => 'https://jsonfeed.org/version/1',
        'title'         => 'My awesome website',
        'home_page_url' => $site_url,
        'feed_url'      => $site_url.'/blog/jsonfeed.php',
        'items'         => [],
    ];

    $items = perch_blog_custom([
                'count'         => 10,
                'sort'          => 'postDateTime',
                'sort-order'    => 'DESC',
                'skip-template' => true,
                ]);

    if (count($items)) {
        foreach($items as $item) {
            $feed['items'][] = [
                'id'             => $item['postID'],
                'date_published' => date('c', strtotime($item['postDateTime'])),
                'title'          => $item['postTitle'],
                'content_html'   => $item['postDescHTML'],
                'url'            => $site_url.'/blog/post.php?s='.$item['postSlug'],
            ];
        }
    }

    header('Content-Type: application/json');
    echo json_encode($feed);