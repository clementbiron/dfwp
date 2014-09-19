<?php	
	/**
	 * En mode debug
	 */
	if(get_option('debug_mode') == 'debug' || get_option('debug_mode') == false){

		//On initialise l'affichage des erreurs php
		Debug::showErrors();
		
		//Affichage d'infos WP
		Debug::getWpInfo();
	}

	/**
	 * Activation du mode de maintenance
	 */
	if(get_option('maintenance_mode') == 'true'){
		
		//Si on est pas sur l'admin, qu'on est pas un utilisateur connecté ou que l'on est pas sur la page de login
		if(!is_admin() && !is_user_logged_in() && (Login::isLoginPage() == false)){

			global $wp;

			//On redirige vers la page de maintenance
			require_once(get_stylesheet_directory().'/maintenance.php');
			die();
		}
	}
?>
