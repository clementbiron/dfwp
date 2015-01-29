<?php
	
	namespace Doublefou\Helper;
	use Doublefou\Core\Singleton;

	/**
	 * Configuration de l'administration
	 * @author Clément Biron
	 */
	Class Admin extends Singleton
	{

		/**
		 * Cacher des menu de l'administration pour une capacité d'utilisateur
		 * @paraml string $pCapability Capacité d'un rôle utilisateur
		 * @param array $pArray Liste des menus
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
		public static function hideMenu($pCapability,$pArray)
		{
			if(!current_user_can($pCapability)){
				add_action('admin_menu', function() use ($pArray)
				{
					$l = count($pArray);
					for($i = 0; $i < $l ; $i++){				
						remove_menu_page($pArray[$i]);
					}										
				});
			}
		}

		/**
		 * Cacher des élements du menu du haut dans l'administration
		 * @param  string $pCapability Capacité d'un rôle utilisateur
		 * @param  array $pArray Liste des élements à masquer
		 * wp-logo : Logo WP
		 * about : Lien vers about
		 * new-content : Racourci d'ajout de contenu rapide
		 * comments : Commentaires
		 */
		public static function hideMenuTop($pCapability,$pArray)
		{
			if(!current_user_can($pCapability)){
				add_action('wp_before_admin_bar_render', function() use ($pArray)
				{
					global $wp_admin_bar;
					$l = count($pArray);
					for($i = 0; $i < $l ; $i++){				
						remove_menu_page($pArray[$i]);
						$wp_admin_bar->remove_node($pArray[$i]);
					}							
				});
			}
		}

		/**
		 * Supprimer des widgets du dashboard pour un rôle utilisateur donée
		 * @param  string $pCapability Capacité d'un rôle utilisateur
		 * @param  array $pArray Liste des widgets à supprimer id => context
		 * http://codex.wordpress.org/Function_Reference/remove_meta_box#Parameters
		 */
		public static function removeDashboardWidgets($pCapability,$pArray)
		{
			if(!current_user_can($pCapability)){
				add_action('wp_dashboard_setup', function() use ($pArray)
				{
					foreach ($pArray as $key => $value) {
						remove_meta_box($key,'dashboard',$value);
					}	
				});					
			}
		}

		/**
		 * Ajouter le menu de personnalisation de thème pour un rôle utilisateur donné
		 * @param string $pRole Nom du rôle utilisateur
		 */
		public static function addThemeOptions($pRole)
		{
			//On récupère le role demandé
			$role = get_role($pRole);

			//Et on lui rajoute le menu d'apparance
			$role->add_cap('edit_theme_options');
		}
		
		/**
		 * Cacher l'éditeur de contenu principale pour des templates de page spécifiques
		 * @param  array $pagesTemplates Pages templates
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

		/**
		 * Retirer les accents des fichiers uploadés
		 */
		public static function removeAccentsToUploadFiles()
		{
			add_filter('sanitize_file_name', 'remove_accents');
		}

		/**
		 * Supprimer la poncutation française des fichiers uploadés
		 */
		public static function removeFrenchPonctuationToUploadFiles()
		{
			add_filter( 'sanitize_file_name_chars', function ($special_chars = array()){
				$special_chars = array_merge( array( '’', '‘', '“', '”', '«', '»', '‹', '›', '—', 'æ', 'œ', '€' ), $special_chars );
				return $special_chars;
			} ,10, 1);
		}

		/**
		 * Ajouter des types de fichiers authoriser à l'upload
		 * @param array $pArray Liste des types : id => mimetype
		 */
		public static function addAllowedUploadFileType($pArray)
		{
			add_filter('upload_mimes', function() use ($pArray) {
				foreach($pArray as $key => $value){
					$mimes[$key] = $value;
				}
				return $mimes;
			});
		}

		/**
		 * Modifier les format de texte disponible dans TinyMce
		 * @param  string $pBlockFormat La chaîne des formats authorisés
		 */
		public static function modifyTinyMceBlockFormat($pBlockFormat)
		{
			add_filter('tiny_mce_before_init', function($settings) use ($pBlockFormat)
			{
				//On enlève le h1	
				$settings['block_formats'] = $pBlockFormat;
				return $settings;
			});
		}

		/**
		 * Passer TinyMce sur 2 lignes
		 */
		public static function makeTinyMceTwoLines()
		{
			//Afficher par défauts les 2 lignes de tinymce
			add_filter('tiny_mce_before_init',  function($settings){
				$settings['wordpress_adv_hidden'] = FALSE;
				return $settings;
			});
		}

		/**
		 * Supprimer le bouton pour obtenir le lien court
		 */
		public static function deleteShortLinkBtn()
		{
			add_filter('pre_get_shortlink','__return_empty_string');
		}
	}

?>