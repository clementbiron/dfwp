<?php
	//Inclure le framework
	require_once('doublefou/bootstrap.php');
	
	//On clean le head
	remove_action('wp_head', 'rsd_link');
	remove_action('wp_head', 'wlwmanifest_link');
	remove_action('wp_head', 'index_rel_link');
	remove_action('wp_head', 'wp_generator');
?>