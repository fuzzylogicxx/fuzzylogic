<?php

class PerchSetup_Installations extends PerchFactory
{
	protected $singular_classname = 'PerchSetup_Installation';
	protected $table              = 'setup';
	protected $pk                 = 'setupID';

	public $static_fields   = ['setupTitle'];

	public function find($id)
	{
		return $this->return_instance(['setupID'=>'bingo']);
	}
}