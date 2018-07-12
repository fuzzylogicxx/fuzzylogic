<?php
    switch($_SERVER['SERVER_NAME']) {

        case '$current_host':
            include(__DIR__.'/config.$host_filename.php');
            break;

        default:
            include('config.production.php');
            break;
    }

    define('PERCH_LICENSE_KEY', '$licenseKey');
    define('PERCH_EMAIL_FROM', '$userEmail');
    define('PERCH_EMAIL_FROM_NAME', '$userGivenName $userFamilyName');

    define('PERCH_LOGINPATH', '$loginpath');
    define('PERCH_PATH', str_replace(DIRECTORY_SEPARATOR.'config', '', __DIR__));
    define('PERCH_CORE', PERCH_PATH.DIRECTORY_SEPARATOR.'core');

    define('PERCH_RESFILEPATH', PERCH_PATH . DIRECTORY_SEPARATOR . 'resources');
    define('PERCH_RESPATH', PERCH_LOGINPATH . '/resources');
    
    define('PERCH_HTML5', true);
    define('PERCH_TZ', '$tz');