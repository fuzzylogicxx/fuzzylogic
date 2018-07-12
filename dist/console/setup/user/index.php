<?php
	include(__DIR__.'/../env.php');

	$Installation->create_user_account(PerchSession::get_all());

	if (PERCH_RUNWAY) {
        PerchUtil::redirect('../rewrites/');
    } else {
        PerchUtil::redirect('../done/');
    }