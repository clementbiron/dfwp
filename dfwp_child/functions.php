<?php
	/**
	 * Initialisation et configuration du thème enfant
	 * 
	 */

	//Lorsque le parent est installé on peut utiliser le framework
	function after_setup_theme()
	{
		//Inclure les fichier de gestion du thème
		foreach (glob(__DIR__."/functions/theme/*.php") as $filename){
		    include $filename;
		}	
		
		//Inclure les fichier d'options core
		foreach (glob(__DIR__."/functions/core/*.php") as $filename){
		    include $filename;
		}
		
		//Inclure les fichier de gestion de l'administration
		foreach (glob(__DIR__."/functions/admin/*.php") as $filename){
		    include $filename;
		}	
	}
	
	//Attendre l'installation du thème parent
	add_action('after_setup_theme',after_setup_theme);
?>