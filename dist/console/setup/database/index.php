<?php

	$current_step = 'db';
	include(__DIR__.'/../env.php');

    $Form = $API->get('Form');
    $Template = $API->get('Template');

    $details = [];

$form = <<<'EOD'
<perch:content id="db_host" type="text" label="Database Server host name or IP address" default="localhost" required="true" />
<perch:help for="db_host">
	This is often <code>localhost</code> but can be a host name or IP address. Your server admin or hosting company will have this information available.
</perch:help>
<perch:content id="db_name" type="text" label="Name of database" required="true" />
<perch:help for="db_name">
	The name of your database might be similar to your website name. Again, check with your host.
</perch:help>
<perch:content id="db_user" type="text" label="Username to connect with" required="true" autocomplete="off" />
<perch:help for="db_user">
	A database username and password might not be the same as your account username and password.
</perch:help>
<perch:content id="db_pass" type="password" label="Password" autocomplete="new-password" />
<perch:help for="db_pass">
	Password can be blank for development environments, but should always be completed for production servers.
</perch:help>
<perch:content id="db_prefix" type="text" label="Table prefix" default="perch3_" runway="true" divider-before="Options" />
<perch:help for="db_prefix">
	Table names are prefixed so as not to collide with existing tables. If unsure, stick with the default.
</perch:help>
<perch:content id="db_port" type="number" min="0" step="1" label="Server port" default="" help="Leave blank for default port" runway="true" size="s" />
<perch:help for="db_port">
	If your server runs on a custom port number, you can enter that here.
</perch:help>
EOD;

	$Template->set_from_string($form, 'content');

	$Form->handle_empty_block_generation($Template);
    $Form->set_required_fields_from_template($Template, $details);

    $connection_error = false;
    $install_error = false;

    if ($Form->submitted()) {
    	$data = $Form->get_posted_content($Template, $Installations, $Installation, false, false);

        try {
            if ($Installation->test_db($data)) {

                if (!isset($data['db_prefix'])) {
                    $data['db_prefix'] = 'perch3_';
                }

                if (!isset($data['db_port'])) {
                    $data['db_port'] = '';
                }

                PerchSession::set('db', $data);

                list($success, $install_error_messages) = $Installation->create_db_tables($data);

                if ($success) {
                    PerchUtil::redirect('../license/');
                }

                $install_error = true;


            }
        } catch (Exception $e) {
            $connection_error = $e->getMessage();
        }

        $details = $data;
    }

    include(PERCH_CORE.'/templates/setup/top.php');

    if (PerchSession::get('setup') != '__PERCH__') {
        $heading  = $HTML->wrap('h3', PerchUI::icon('core/alert').' PHP Session problem');
        $body  = $HTML->wrap('p', 'Sessions are used to maintain logged in users from page to page. From our tests, it looks like sessions aren’t working as expected - they may just need to be enabled or configured. Please ask your server admin or hosting company how to enable PHP sessions for this website.');
        $body  .= $HTML->wrap('p', 'This could also happen if you’ve been on this page for a long time - if that’s the case try going <a href="../" class="notification-link">back to the start</a>.');
        echo $HTML->wrap('div.notification-block.notification-warning', $heading.$body);
    }

    if ($connection_error) {
        $heading  = $HTML->wrap('h3', PerchUI::icon('core/alert').' Connection error');
        $body  = $HTML->wrap('p', 'Those connection details resulted in the following error message:');
        $body  .= $HTML->wrap('p code', $connection_error);

        echo $HTML->wrap('div.notification-block.notification-warning', $heading.$body);
    }    



    if ($install_error) {
        $heading  = $HTML->wrap('h3', PerchUI::icon('core/alert').' Problem creating tables');
        $body  = $HTML->wrap('p', 'The following problems were encountered when trying to create the database tables:');
        echo $HTML->wrap('div.notification-block.notification-warning', $heading.$body);

        echo $Installation->process_error_list($HTML, $install_error_messages);
    }

    echo $Form->form_start(false, 'form-setup');

    $template_help_html = $Template->find_help();
    if ($template_help_html) {
        echo '<div class="instructions">' . $template_help_html . '</div>';
    }
    echo $Form->fields_from_template($Template, $details);
    echo $Form->submit_field($id='btnSubmit', $value="Test Settings", $cancel_url=false, $class='button', $misc_action=null);
    echo $Form->form_end();

	include(PERCH_CORE.'/templates/setup/btm.php');

	PerchUtil::output_debug();