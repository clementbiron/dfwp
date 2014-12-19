<?php
	/**
	 * Autoloader
	 */
	require_once('autoload.php');
	$dfwpAutoloader = new Autoloader();	
	
	/**
	 * Configuration
	 */
	use Doublefou\Core\Config;		
	Config::set('DF_WP_ROOT_PATH',__DIR__);
	Config::set('DF_WP_CHILD_PATH',get_stylesheet_directory());
?>