<?php
	use \DrewM\Morse\Morse;

	$current_step = 'server';
	include(__DIR__.'/../env.php');
	
    PerchSession::set('setup', '__PERCH__');

	$fail = false;
	$results = [];

	// Check PHP version
    if (version_compare(PHP_VERSION, '5.4.0', '<')) {
        $fail = true;
        $results[] = [
        				'status'   => 'failure',
        				'message' => "Perch requires PHP 5.4 or greater. You have PHP ".PHP_VERSION
        			];
    } else {
    	$results[] = [
        				'status'   => 'success',
        				'message' => "PHP ".PHP_VERSION
        			];
    }

    // Check image libraries
    if (Morse::featureExists('image/gd') || Morse::featureExists('image/imagick')) {
        
        if (Morse::featureExists('image/gd')) {
            $lib = 'GD';
        } else {
            $lib = 'ImageMagick';
        }

        $results[] = [
                        'status'   => 'success',
                        'message' => "Image processing available ($lib)",
                    ];

    } else {

        $fail = true;
        $results[] = [
                        'status'   => 'failure',
                        'message' => "Your server has no capability for resizing images. You need to enable <strong>GD</strong> or <strong>ImageMagick</strong> to resize images"
                    ];
    }

    // JSON
    if (!Morse::featureExists('data/json')) {
        $fail = true;
        $results[] = [
        				'status'   => 'failure',
        				'message' => 'Your server does not have <a href="http://php.net/manual/en/book.json.php">JSON</a> enabled'
        			];
    } else {
    	$results[] = [
        				'status'   => 'success',
        				'message' => "JSON libraries available",
        			];
    }

    // Filter    
    if (!Morse::featureExists('http/filter')) { 
        $fail = true;
        $results[] = [
        				'status'   => 'failure',
        				'message' => 'Your server does not have <a href="http://php.net/manual/en/book.filter.php">Filter</a> enabled'
        			];
    } else {
    	$results[] = [
        				'status'   => 'success',
        				'message' => "Input filtering available",
        			];
    }

    // PDO
    if (!Morse::featureExists('db/pdo') || !Morse::featureExists('db/pdo-mysql')) { 
        $fail = true;
        $results[] = [
        				'status'   => 'failure',
        				'message' => 'Your server does not have PDO enabled'
        			];
    } else {
    	$results[] = [
        				'status'   => 'success',
        				'message' => "MySQL with PDO available",
        			];
    }

    // Curl
    if (!Morse::featureExists('http/curl')) { 
        $fail = true;
        $results[] = [
        				'status'   => 'failure',
        				'message' => 'Your server does not have <a href="http://php.net/manual/en/book.curl.php">cURL</a> enabled'
        			];
    } else {
    	$results[] = [
        				'status'   => 'success',
        				'message' => "cURL available",
        			];

        if (PerchUtil::http_get_request('http://', 'activation.grabaperch.com', '/activate/v3/ping/', true)=='pong') {
        	$results[] = [
        				'status'   => 'success',
        				'message' => "Able to communicate with Perch servers",
        			];
        } else {
        	$results[] = [
        				'status'   => 'failure',
        				'message' => 'Your server cannot successfully connect to the Perch servers'
        			];
        }
    }

    // Runway: Config folder writable
    if (PERCH_RUNWAY) {
        $config_folder = realpath(PerchUtil::strip_file_name($config_file));
        
        if (!file_exists($config_folder) || !is_writable($config_folder)) {
            $fail = true;
            $results[] = [
                            'status'   => 'failure',
                            'message' => "Configuration folder is not writable by PHP. Make <code>$config_folder</code> writable.",
                        ];
        }
    } 

    // Config file writable
    if (file_exists($config_file) && is_writable($config_file)) {
        $results[] = [
                        'status'   => 'success',
                        'message' => "Configuration file exists and is writable",
                    ];
    } else {
        $fail = true;
        $results[] = [
                        'status'   => 'failure',
                        'message' => "Configuration file is missing or PHP does not have permission to write to it. Make <code>$config_file</code> writable.",
                    ];
    }
 

   
    if (!$fail) {
    	PerchUtil::redirect('../database/');
    }


    include(PERCH_CORE.'/templates/setup/top.php');

    

   	$heading  = $HTML->wrap('h3', PerchUI::icon('core/alert').' Sorry');
   	$body  = $HTML->wrap('p', "Your server does not meet the basic requirements to run this version of Perch".(PERCH_RUNWAY ? ' Runway' : '').' at the moment. Please see below for the changes needed for a successful installation.');
   	echo $HTML->wrap('div.notification-block.notification-warning', $heading.$body);


    echo $Installation->process_error_list($HTML, $results);
   	

	include(PERCH_CORE.'/templates/setup/btm.php');