<?php
	
	//Exit si accès direct
	if (!defined('ABSPATH')) exit; 

	/*******************************
	 * GESTION CORE
	 */

	use Doublefou\Core\Debug;
	use Doublefou\Core\Config;
	use Doublefou\Helper\Login;

	if(!function_exists('get_field')) return;

    //Ini de la configuration
    Config::init();
?>