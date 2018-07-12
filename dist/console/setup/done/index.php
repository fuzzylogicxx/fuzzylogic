<?php
	$current_step = 'done';
	include(__DIR__.'/../env.php');

    

    $tasks = [
        [
            'status' => 'success',
            'message' => 'Server compatibility checked',
        ],
        [
            'status' => 'success',
            'message' => 'Database configured',
        ],
        [
            'status' => 'success',
            'message' => 'License key entered',
        ],
        [
            'status' => 'success',
            'message' => 'User account created',
        ],

    ];

    include(PERCH_CORE.'/templates/setup/top.php');

    $s = '';

    $s .= $HTML->wrap('div.help h1', 'Congratulations!');

    $s .= $Installation->process_error_list($HTML, $tasks);

    $s .= $HTML->wrap('div.help p', '<a href="'.PERCH_LOGINPATH.'" class="button button-simple action-success">Log in</a>');

    echo $s;


    include(PERCH_CORE.'/templates/setup/btm.php');
