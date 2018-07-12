<?php
	$current_step = 'account';
	include(__DIR__.'/../env.php');

	if (!PerchSession::get('db') || !PerchSession::get('licenseMode')) {
		PerchUtil::redirect('../');
	}

	$Form = $API->get('Form');
    $Template = $API->get('Template');

    $details = [];

    if (PerchSession::get('licenseMode') == 'ltm') {
        $details['ltm'] = 1;
    }

$form = <<<'EOD'
<perch:content id="first_name" type="text" label="First name" default="" required="true" divider-before="Your admin user details" />
<perch:help for="first_name">
    These details are used to set up the initial user account for logging into the CMS.
</perch:help>
<perch:content id="last_name" type="text" label="Last name" default="" required="true" />
<perch:content id="email" type="email" label="Email" default="" required="true" />

<perch:help for="email">
    Make sure your email address is valid, as it's used for password recovery if you forget your password. When using for local testing, your email address will be used to contact you regarding your trial of the software. See our <a href="https://grabaperch.com/privacy">Privacy Policy</a> for more.
</perch:help>

<perch:content id="username" type="text" label="Username" required="true" divider-before="Login credentials" />
<perch:help for="username">
    These will be your login details to access the control panel as an admin user.
</perch:help>
<perch:content id="password" type="password" label="Password" required="true" autocomplete="new-password" />
<perch:content id="password2" type="password" label="Repeat the password" required="true" autocomplete="new-password" />

EOD;

	$Template->set_from_string($form, 'content');

	$Form->handle_empty_block_generation($Template);
    $Form->set_required_fields_from_template($Template, $details);

    $validation = array();
    $validation['perch_password'] = array("password", "Your passwords must match");
    $Form->set_validation($validation);

    $key_error = false;

	if ($Form->submitted()) {
    	$data = $Form->get_posted_content($Template, $Installations, $Installation, false, false);
        unset($data['password2']);
        PerchSession::set('user', $data);

        $session = PerchSession::get_all();
        $session['user'] = $data;

        $session['login_path'] = str_replace('/setup/account/index.php', '', $_SERVER['PHP_SELF']);
        $session['site_path']  = str_replace($session['login_path'].'/setup/account', '', realpath(__DIR__));


        if ($session['licenseMode'] == 'ltm') {
            if (!isset($session['licenseKey']) || $session['licenseKey']=='')  {
                $licenseKey = $Installation->get_local_license_key($session['user']['email']);
                $session['licenseKey'] = $licenseKey;
                PerchSession::set('licenseKey', $licenseKey);
            }
        }

        $licenseKey = $Installation->write_config_file($session);

        PerchUtil::redirect('../user/');

        $details = $data;
    }


    include(PERCH_CORE.'/templates/setup/top.php');


    echo $Form->form_start(false, 'form-setup');
    $template_help_html = $Template->find_help();
    if ($template_help_html) {
        echo '<div class="instructions">' . $template_help_html . '</div>';
    }
    echo $Form->fields_from_template($Template, $details);
    echo $Form->submit_field($id='btnSubmit', $value="Continue", $cancel_url=false, $class='button', $misc_action=null);
    echo $Form->form_end();

    include(PERCH_CORE.'/templates/setup/btm.php');


    PerchUtil::output_debug();