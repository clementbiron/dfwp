<?php
	
Class Admin extends Singleton
{

	/**
	 * Désactiver la barre d'administration sur le front pour tous les users
	 */
	public static function hideAdminBar($pNotForRole = '')
	{
		if(!empty($pNotForRole)){
			if(!current_user_can($pNotForRole)){
				add_filter('show_admin_bar','hideAdminBarFilter');
				function hideAdminBarFilter(){
					return false;
				}
			}
		}else{
			add_filter('show_admin_bar','hideAdminBarFilter');
			function hideAdminBarFilter(){
				return false;
			}
		}
	}
	
	/**
	 * Cacher des menu de l'administration
	 * @param array $pArray
	 * index.php //Dashboard
	 * edit.php //Posts
	 * upload.php //Media
	 * edit.php?post_type=page //Pages
	 * edit-comments.php //Comments
	 * themes.php  //Appearance
	 * plugins.php //Plugins
	 * users.php //Users
	 * tools.php  //Tools
	 * options-general.php //Options
	 */
	public static function hideMenu($pArray)
	{
		add_action('admin_menu', function() use ($pArray)
		{
			$l = count($pArray);
			for($i = 0; $i < $l ; $i++){				
				remove_menu_page($pArray[$i]);
			}			
		});
	}
	
	/**
	 * Cacher l'éditeur de contenu principale pour des templates de page spécifiques
	 * @$pagesTemplates : Array
	 */
	public static function hideEditorForPagesTemplates($pagesTemplates)
	{
		add_action('admin_init', function() use ($pagesTemplates)
		{
		    // Get the Post ID.
			$postId = $_GET['post'] ? $_GET['post'] : $_POST['post_ID'] ;
			if( !isset( $postId ) ) return;
			 
			//On récupere le nom du template courant
			$templateFile = get_post_meta($postId, '_wp_page_template', true);
			Debug::add($templateFile);
			
			//Si c'est un array pas vide
			if(is_array($pagesTemplates) && !empty($pagesTemplates))
			{
				//Et que le nom du template de la page courante est dans l'array
				if(in_array($templateFile, $pagesTemplates)){
					
					//Alors on supprime l'éditeur
					remove_post_type_support('page', 'editor');
				}
			}
		});
	}
}

?>