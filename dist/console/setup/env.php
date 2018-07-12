<?php
	/**
		Mock up a bunch of environment and autoloading stuff so setup can run without being configured.
	**/

	include(__DIR__.'/../core/inc/pre_config.php');
	$config_file = realpath(__DIR__.'/../config/config.php');
	if (file_exists($config_file)) {
		include($config_file);
	}

	function perch_set($const, $val) {
		if (!defined($const)) {
			define($const, $val);
		}
	}

	perch_set('PERCH_DEBUG', 1);
	perch_set('PERCH_PRODUCTION', 1);
	perch_set('PERCH_LICENSE_KEY', 1);
	perch_set('PERCH_DB_PREFIX', 'perch3_');

	$path = $_SERVER['REQUEST_URI'];
	$url = parse_url($path);
	if ($url['path']) {
		$parts = explode('/', $url['path']);
		$path = [];
		foreach($parts as $part) {
			if ($part == 'setup') break;
			$path[] = $part;
		}
		$path = implode('/', $path);
	}

	perch_set('PERCH_CORE', __DIR__.'/../core/');
	perch_set('PERCH_LOGINPATH', $path);
	perch_set('PERCH_PATH', realpath(__DIR__.'/../'));

	function perch_autoload($class_name) {
        if (strpos($class_name, 'PerchAPI')!==false) {
            $file = PERCH_CORE . '/lib/api/' . $class_name . '.class.php';
        }else if (strpos($class_name, 'PerchFieldType_')!==false) {
            $file = PERCH_CORE . '/lib/PerchFieldTypes.class.php';
        }else{
            $file = PERCH_CORE . '/lib/' . $class_name . '.class.php';
        }   
        
        if (is_readable($file)) {
            require $file;
            return true;
        }
        return false;
    }

    spl_autoload_register('perch_autoload');

    spl_autoload_register(function($class_name){
        if (strpos($class_name, 'PerchContent')===0) {
            include(PERCH_CORE.'/apps/content/'.$class_name.'.class.php');
            return true;
        }
        return false;
    });

    include(__DIR__.'/../core/lib/vendor/autoload.php');


	if (file_exists(__DIR__.'/../core/runway/start.php')) {
		perch_set('PERCH_RUNWAY', true);
	} else {
		perch_set('PERCH_RUNWAY', false);
	}

	if (PERCH_RUNWAY) {
		include(PERCH_CORE.'/runway/inc/loader.php');
	}

	$Perch = PerchAdmin::fetch();

	$API = new PerchAPI(1.0, 'core');
	$HTML = $API->get('HTML');

	include('PerchSetup_Installations.class.php');
	include('PerchSetup_Installation.class.php');

	$Installations = new PerchSetup_Installations;
	$Installation = $Installations->find(1);