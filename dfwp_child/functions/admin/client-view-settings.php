<?php 

	/*******************************
	 * GESTION DE LA CONFIGURATION DE LA VUE EN ADMINISTRATION POUR LE CLIENT
	 */
	
	//On récupère le role éditeur
	$editor = get_role('editor');

	//Et on lui rajoute le menu d'apparance
	$editor->add_cap('edit_theme_options');
	
	//Les menus de gauche
	add_action( 'admin_init', 'removeMenusLeft' );
	function removeMenusLeft() 
	{
		// Editeur
		if(!current_user_can('install_plugins')) 
		{
			//Menus principaux
			remove_menu_page('tools.php');
			remove_menu_page('edit-comments.php');
			remove_menu_page('upload.php');
			remove_menu_page('edit.php');
			
			//Sous menus
			//remove_submenu_page('edit.php?post_type=etablissement','edit-tags.php?taxonomy=genre&amp;post_type=etablissement');
			//remove_submenu_page('edit.php?post_type=etablissement','post-new.php?post_type=etablissement');
		}
	}

	//Les menus du haut
	function removeMenusTop() {
   		global $wp_admin_bar;
	   /* $wp_admin_bar->remove_node('wp-logo'); //Logo WP
	    $wp_admin_bar->remove_node('about'); //Et lien vers about
	  	$wp_admin_bar->remove_menu('new-content'); //Racourci d'ajout de contenu rapide
	  	$wp_admin_bar->remove_menu('comments'); //Commentaires*/
	}
	add_action( 'wp_before_admin_bar_render', 'removeMenusTop' );
	
	//Les widget du dashboard
	add_action('wp_dashboard_setup', 'removeDashboarWidgets');
	function removeDashboarWidgets()
	{
		// Editeur
		if(!current_user_can('install_plugins')) 
		{
			/*global$wp_meta_boxes;
			
			//Plugins
			unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_plugins']);
			
			//Commentaires récents
			unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_recent_comments']);
			
			//Actu Wordpress
			unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_primary']);
			
			//Bloc 'aujourd'hui'
			unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_right_now']);
			
			//Autre actu wordpress en fr
			unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_secondary']);
			
			//Ajout rapide de billet
			unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_quick_press']);	*/		
		} 
	}
	
		

?>