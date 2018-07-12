<?php

class PerchSetup_Installation extends PerchAPI_Base
{
    protected $table        = 'setup';
    protected $pk           = 'setupID';

    public function test_db($settings)
    {

    	$DB = $this->get_db($settings);

        if ($DB->test_connection()) {
        	return true;
        } else {
        	throw new Exception($DB->error_msg);

        }

    	return false;
    }

    public function create_db_tables($settings)
    {
        $DB = $this->get_db($settings);

        $Perch = Perch::fetch();

        $sql = file_get_contents(__DIR__.'/sql/perch.sql');
        if (PERCH_RUNWAY) {
            $sql .= file_get_contents(__DIR__.'/sql/runway.sql');
        }

        $sql = str_replace('__PREFIX__', $settings['db_prefix'], $sql);
        $sql = str_replace('__PERCH_VERSION__', $Perch->version, $sql);
        $queries = explode(';', $sql);

        $msgs = [];

        $ignore_codes = ['1062'];

        if (PerchUtil::count($queries) > 0) {
            foreach($queries as $query) {
                $query = trim($query);
                if ($query != '') {
                    if (!$DB->execute($query)){
                        if ($DB->error_msg!='') {
                            if ($DB->error_code && in_array($DB->error_code, $ignore_codes)) {
                                // do nothing
                            } else {
                                $msgs[] = [
                                        'status'  => 'failure',
                                        'message' => $DB->error_msg,
                                        ];
                                $DB->error_msg = false;    
                            }
                            
                        }
                    }
                }
            }

            // test that it worked
            $tables = $DB->get_rows('SHOW TABLES');
            $db_fail = true;
            if (PerchUtil::count($tables)) {
                foreach($tables as $key=>$val) {
                    foreach($val as $key2=>$val2) {
                        if ($val2 == $settings['db_prefix'].'users') {
                            $db_fail = false;
                        }
                    }
                }
            }
        }

        return [!$db_fail, $msgs];
    }


    public function process_error_list($HTML, $results) 
    {
        if (!PerchUtil::count($results)) return '';


        $items = [];
        foreach($results as $result) {
            switch($result['status']) {
                case 'failure':
                    $icon  = PerchUI::icon('core/face-pain');
                    $class = '.progress-alert';
                    break;

                default:
                    $icon  = PerchUI::icon('core/circle-check');
                    $class = '.progress-success';
                    break;
            }
            $items[] = $HTML->wrap('li.progress-item'.$class, $icon . ' ' .$result['message']);
        }
        return $HTML->wrap('ul.progress-list', implode('', $items));
    }

    public function test_license_key($key)
    {
        return true;
    }

    public function write_config_file($data)
    {
        $host_filename = $this->host_filename($_SERVER['SERVER_NAME']);

        $vars = [
            'licenseKey'     => $data['licenseKey'],
            'db_username'    => $data['db']['db_user'],
            'db_password'    => $data['db']['db_pass'],
            'db_server'      => $data['db']['db_host'],
            'db_database'    => $data['db']['db_name'],
            'tz'             => 'UTC',
            'userEmail'      => $data['user']['email'],
            'userGivenName'  => $data['user']['first_name'],
            'userFamilyName' => $data['user']['last_name'],
            'loginpath'      => $data['login_path'],
            'sitepath'       => $data['site_path'],
            'secret'         => PerchUser::generate_password(16),
            'db_prefix'      => $data['db']['db_prefix'],
            'current_host'   => $_SERVER['SERVER_NAME'],
            'host_filename'  => $host_filename,
        ];  


        if (PERCH_RUNWAY) {
            $config_file = file_get_contents(__DIR__.'/config/runway.sample.php');
        } else {
            $config_file = file_get_contents(__DIR__.'/config/perch.sample.php');    
        }

        $config_file = preg_replace_callback('/\$(\w+)/', function($matches) use ($vars) {
            if (isset($vars[$matches[1]])) return addslashes($vars[$matches[1]]);
            return '$'.$matches[1];
        }, $config_file);

        $config_file_path = PerchUtil::file_path(__DIR__.'/../config/config.php');
        file_put_contents($config_file_path, $config_file);
        PerchUtil::invalidate_opcache($config_file_path, 10000);


        if (PERCH_RUNWAY) {

            $host_file = file_get_contents(__DIR__.'/config/host.sample.php');

            $host_file = preg_replace_callback('/\$(\w+)/', function($matches) use ($vars) {
                if (isset($vars[$matches[1]])) return $vars[$matches[1]];
                return '$'.$matches[1];
            }, $host_file);

            $host_file_path = PerchUtil::file_path(__DIR__.'/../config/config.'.$host_filename.'.php');
            file_put_contents($host_file_path, $host_file);
            PerchUtil::invalidate_opcache($host_file_path, 10000);

            $runway_file = file_get_contents(__DIR__.'/config/runway.php');
            $runway_file_path = PerchUtil::file_path(__DIR__.'/../config/runway.php');

            file_put_contents($runway_file_path, $runway_file);
            PerchUtil::invalidate_opcache($runway_file_path, 10000);
        }

        return $data['licenseKey'];
        
    }

    public function create_user_account($data)
    {
        $Users = new PerchUsers;

        $account = [
            'userUsername'    => $data['user']['username'],
            'userPassword'    => $data['user']['password'],
            'userCreated'     => date('Y-m-d H:i:s'),
            'userGivenName'   => $data['user']['first_name'],
            'userFamilyName'  => $data['user']['last_name'],
            'userEmail'       => $data['user']['email'],
            'userEnabled'     => '1',
            'roleID'          => '2',
            'userMasterAdmin' => '1',
        ];

        if ($Users->no_master_admin_exists()) {
            $Users->create($account, false);   
        }
    }

    public function get_local_license_key($email)
    {
        $data = [
            'product' => (PERCH_RUNWAY ? 'R3' : 'P3'),
            'email'   => $email,
        ];
        
        return PerchUtil::http_post_request('http://activation.grabaperch.com/activate/v3/license-key/', $data);
    }

    private function get_db($settings)
    {
        if (defined('PDO::MYSQL_ATTR_LOCAL_INFILE')) {
            $c = 'PerchDB_MySQL';
        }else{
            $c = 'PerchDB_MySQLi';
        }

        $config = [
                'PERCH_ERROR_MODE'  => 'SILENT',
                'PERCH_DB_SERVER'   => $settings['db_host'],
                'PERCH_DB_DATABASE' => $settings['db_name'],
                'PERCH_DB_USERNAME' => $settings['db_user'],
                'PERCH_DB_PASSWORD' => $settings['db_pass'],
                'PERCH_DB_PREFIX'   => $settings['db_prefix'],
                'PERCH_DB_PORT'     => $settings['db_port'],
            ];

        $DB  = new $c($config);

        return $DB;
    }

    private function host_filename($host)
    {
        $host = strtolower($host);
        $host = str_replace('.', '-', $host);
        $host = PerchUtil::urlify($host);
        return $host;
    }


}