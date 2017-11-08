<?php
	
	//Exit si accès direct
	if (!defined('ABSPATH')) exit; 

	/*******************************
	 * GESTION CORE
	 */

	use Doublefou\Core\Debug;
	use Doublefou\Core\Config;
	use Doublefou\Helper\Login;

	//Et on configure le debug
	Config::setDebug(get_field('dfwp_options_is_debug','option'));

	//Template include filter
	add_filter( 'template_include', 'dfwp_pageTemplateMaintenance', 99 );
	function dfwp_pageTemplateMaintenance( $template ) 
	{
		//Si on a activé la maintenance
		if(get_field('dfwp_options_is_maintenance','option') === true)
		{
			//Si on est pas sur l'admin, qu'on est pas un utilisateur connecté ou que l'on est pas sur la page de login
			if(!is_admin() && !is_user_logged_in() && (Login::isLoginPage() == false))
			{
				//On charge le template correspondant
				$maintenanceTemplate = locate_template( array( 'page-maintenance.php' ) );
				if ($maintenanceTemplate != '')
				{
					return $maintenanceTemplate;
				}	
			}
		}

		return $template;
	}
	
?>