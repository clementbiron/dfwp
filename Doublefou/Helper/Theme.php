<?php 
	
	namespace Doublefou\Helper;
	use Doublefou\Core\Singleton;

	//Exit si accès direct
	if (!defined('ABSPATH')) exit; 

	/**
	 * Theme
	 * @author Clément Biron
	 */
	Class Theme extends Singleton
	{
		/**
		 * Ajouter la gestion des miniatures de posts
		 */
		public static function addPostThumbnails()
		{
			if(function_exists('add_theme_support')){ 
				add_theme_support('post-thumbnails'); 
			}
		}

		/**
		 * Nétoyer le header html
		 */
		public static function cleanHeader(){
			remove_action('wp_head', 'rsd_link');
			remove_action('wp_head', 'wlwmanifest_link');
			remove_action('wp_head', 'index_rel_link');
			remove_action('wp_head', 'wp_generator');
		}

		/**
		 * Désactiver la barre d'administration sur le front pour tous les users
		 * @param  string $pNotForRole Rôle d'utilisateur en exception
		 */
		public static function hideAdminBar($pNotForRole = '')
		{
			if(!empty($pNotForRole)){
				if(!current_user_can($pNotForRole)){
					add_filter('show_admin_bar',function() {
						return false;
					});
				}
			}else{
				add_filter('show_admin_bar',function() {
					return false;
				});
			}
		}

		/**
		 * Retourne la version du thème extraite depuis l'en-tête de la feuille de style
		 * @todo A vérifier
		 * @return string|null
		 */
		public static function getThemeVersion()
		{
			if (function_exists('wp_get_theme'))
				$current_theme = wp_get_theme();
			elseif (function_exists('get_theme_data'))
				$current_theme = get_theme_data( get_stylesheet_directory_uri() .'/style.css' );
			else
				return null;
			
			return ($current_theme && isset($current_theme['Version'])) ? $current_theme['Version'] : null;
		}

		/**
		 * Supprimer le lien vers le flux rss dans le header
		 */
		public static function removeHeaderRssLink()
		{
			remove_action( 'wp_head', 'feed_links_extra', 3 );
		}

		/**
		 * Supprimer le lien court dans le header
		 */
		public static function removeHeaderShortLink()
		{
			remove_action( 'wp_head', 'wp_shortlink_wp_head', 10, 0 );
		}

		/**
		 * Buffer pour la fonction language_attributes()
		 * @param  string $doctype
		 * @return string
		 */
		public static function getLanguageAttributes($doctype='html'){
			ob_start();
			language_attributes($doctype);
			return ob_get_clean();
		}
	}
?>