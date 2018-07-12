<?php
	$current_step = 'rewrites';
	include(__DIR__.'/../env.php');

    $Form = $API->get('Form');

    if ($Form->submitted()) {
        PerchUtil::redirect('../done/');
    }


    include(PERCH_CORE.'/templates/setup/top.php');


    echo $Form->form_start(false, 'form-setup');
    
    
?>
    <div class="help">

    <h1>Setting up URL rewriting</h1>


    <p>Perch Runway uses your web server's URL rewriting capability to manage incoming page requests. 
        Different types of web servers need configuring differently.</p>
    
    <h2>Apache (most common)</h2>

    <p>For Apache with mod_rewrite, add the following rules to your web server configuration.
        If you can't access the server config, a simple <code>.htaccess</code> file in your site root is a workaround.</p>

    <div>
        <textarea rows="6" cols="80"># Perch Runway
RewriteEngine On
RewriteCond %{REQUEST_URI} !^<?php echo PERCH_LOGINPATH; ?> 
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule .* <?php echo PERCH_LOGINPATH; ?>/core/runway/start.php [L] </textarea>
    </div>
    
    <h2>Nginx</h2>

    <p>If you're using nginx, add the following <code>location</code> to your server configuration:</p>

        <div>
            <textarea rows="6" cols="80"># Perch Runway
location / {
    if (!-e $request_filename){
        rewrite ^(.*)$ <?php echo PERCH_LOGINPATH; ?>/core/runway/start.php break;
    }
}</textarea>
        </div>
    
    <h2>Something else</h2>

    <p>If you're using a server other than those listed above, you need to configure rewriting to do the following:</p>

    <ol class="importables">
        <li>Ideally, ignore the <code><?php echo PERCH_LOGINPATH; ?></code> folder</li>
        <li>If the requested file doesn't exist, route the request to <code><?php echo PERCH_LOGINPATH; ?>/core/runway/start.php</code></li>
    </ol>

    </div>
<?php
    echo $Form->submit_field($id='btnSubmit', $value="Continue", $cancel_url=false, $class='button', $misc_action=null);
    echo $Form->form_end();


    include(PERCH_CORE.'/templates/setup/btm.php');
