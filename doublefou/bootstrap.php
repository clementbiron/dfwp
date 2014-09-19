<?php
	//Le root path 
	define(DF_WP_ROOT_PATH, __DIR__);
	define(DF_WP_CHILD_PATH, dirname( get_bloginfo('stylesheet_url')) );
	
	/**
	 * On charge l'autoloader et on le configure
	 */
	require_once 'Autoloader.class.php';
	
	//Les classes du framework
	Autoloader::addClassPath(__DIR__.'/core/');
	Autoloader::addClassPath(__DIR__.'/libs/');
	Autoloader::addClassPath(__DIR__.'/tools/');
	Autoloader::addClassPath(__DIR__.'/helper/');
	Autoloader::addClassPath(__DIR__.'/components/');
	Autoloader::addClassPath(__DIR__.'/minifer/');
	spl_autoload_register(array('Autoloader', 'loadClass'));
?>