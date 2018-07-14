<?php
    define('PERCH_LICENSE_KEY', 'P31807-TSK957-BPX059-ADC661-SNL011');

    define("PERCH_DB_USERNAME", 'root');
    define("PERCH_DB_PASSWORD", 'docker');
    define("PERCH_DB_SERVER", "db");
    define("PERCH_DB_DATABASE", "db_fuzzylogic");
    define("PERCH_DB_PREFIX", "perch3_");
    
    define('PERCH_TZ', 'UTC');

    define('PERCH_EMAIL_FROM', 'laurence@fuzzylogicdigital.com');
    define('PERCH_EMAIL_FROM_NAME', 'Laurence Hughes');

    define('PERCH_LOGINPATH', '/console');
    define('PERCH_PATH', str_replace(DIRECTORY_SEPARATOR.'config', '', __DIR__));
    define('PERCH_CORE', PERCH_PATH.DIRECTORY_SEPARATOR.'core');

    define('PERCH_RESFILEPATH', PERCH_PATH . DIRECTORY_SEPARATOR . 'resources');
    define('PERCH_RESPATH', PERCH_LOGINPATH . '/resources');
    
    define('PERCH_HTML5', true);

    define('PERCH_DEBUG', true);
