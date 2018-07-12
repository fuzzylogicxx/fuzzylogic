<?php
	$current_step = 'license';
	include(__DIR__.'/../env.php');

	if (!PerchSession::get('db')) {
		PerchUtil::redirect('../');
	}

	$Form = $API->get('Form');
    $Template = $API->get('Template');

    $details = [];

$form = <<<'EOD'
<perch:content id="licenseMode" type="radio" options="Enter a license key|licensed, Try out locally first|ltm" label="How would you like to use Perch?" default="licensed" data-when-value="ltm" data-then-disable="licenseKey" />
<perch:help for="licenseMode">
    If you have a license key, you can set the software up fully licensed and ready to go live. If you'd like to test things out locally first, you can do that without a license. You'll need to get a license before your site goes live.
</perch:help>

<perch:content id="licenseKey" type="text" label="Your license key" default="" />
<perch:help for="licenseKey">
	You can find your license key in the <a href="https://account.perchcms.com/">account section</a> of the Perch website as well as in the email you received after purchasing. License keys are made up of five sets of six, like <code>P31234-ABC123-ABC123-ABC123-ABC123</code>
</perch:help>



EOD;

	$Template->set_from_string($form, 'content');

	$Form->handle_empty_block_generation($Template);
    $Form->set_required_fields_from_template($Template, $details);

    $key_error = false;

	if ($Form->submitted()) {
    	$data = $Form->get_posted_content($Template, $Installations, $Installation, false, false);

        if (isset($data['licenseKey'])) {
            $data['licenseKey'] = strtoupper($data['licenseKey']);
        }

        PerchSession::set('licenseMode', $data['licenseMode']);

        try {
            if ($Installation->test_license_key($data['licenseKey'])) {

            	PerchSession::set('licenseKey', $data['licenseKey']);

                PerchUtil::redirect('../account/');

            }
        } catch (Exception $e) {
            $key_error = $e->getMessage();
        }

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
