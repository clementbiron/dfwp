<?php
	/**
	 * Autoloader
	 */
	$loader = require __DIR__ . '/vendor/autoload.php';

	//Inclure les fichier d'options core
	foreach (glob(__DIR__."/functions/core/*.php") as $filename){
		include $filename;
	}

	//Inclure les fichier de gestion du thème
	foreach (glob(__DIR__."/functions/theme/*.php") as $filename){
		include $filename;
	}	

	//Inclure les fichier de gestion de l'administration
	foreach (glob(__DIR__."/functions/admin/*.php") as $filename){
		include $filename;
	}
	
?>