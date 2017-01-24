<?php
	/**
	 * Autoloader
	 */
	$loader = require __DIR__ . '/vendor/autoload.php';

	/**
	 * Configuration
	 */
	use Doublefou\Core\Config;		
	Config::set('DF_WP_ROOT_PATH',__DIR__);
	Config::set('DF_WP_CHILD_PATH',get_stylesheet_directory());

	/**
	 * Stocker en global le template courant
	 * permet de le récupérer par la suite avec Template::getCurrentTemplate()
	 */
	use Doublefou\Helper\Template;
	Template::defineCurrentTemplate();
?>