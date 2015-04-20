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
		 * Compiler les fichiers less dans un fichier css 
		 * @param string $pLessFiles Dossier des fichiers less
		 * @param string $pCssFile Fichier css de destination
		 * @deprecated N'est plus utilisé depuis la mise en place de grunt
		 */
		public static function compileLess($pLessDirectory,$pCssFile)
		{
			//Init var
			$content = '';
			
			//Récupérer tous les fichiers less
			$lessFiles = glob($pLessDirectory.'*.less');

			//Trier les fichiers par ordre alphabétique
			usort($lessFiles, "strcasecmp");

			//Less object
			$less = new lessc;
			
			//Si on veut du compréssé
			if(get_option('debug_mode') == 'prod'){
				$less->setFormatter("compressed");
			}
			
			//Sinon on préserve les commentaires
			else{
				$less->setPreserveComments(true);
			}
			
			//Variables de stockage
			$tempString = '';
			
			//On parcoure tous les fichiers less
			for($i = 0; $i < count($lessFiles); $i++)
			{
				//Et on les assemble dans une chaine
				$tempContent = file_get_contents($lessFiles[$i]);
				$tempString .= $tempContent;
			}
		
			//Maintenant on tente la comilation
			try {
			    $content .= $less->compile($tempString);
			} catch (Exception $ex) {
			    echo "lessphp fatal error: ".$ex->getMessage();
			}
			
			//Si on veut du minifié
			if(get_option('debug_mode') == 'prod'){
				$content = CssMinifer::min($content);
			}
			
			//Et on écrit le contenu
			file_put_contents($pCssFile,$content);
		}
		
		/**
		 * Combiner et minifier les fichiers js
		 * @param string $pJsDirectory Dossier des fichier javascript
		 * @param string $pJsFile Fichier js de destination
		 * @deprecated N'est plus utilisé depuis la mise en place de grunt
		 */
		public static function compileJs($pJsDirectory,$pJsFile)
		{
			//Init var
			$content = "";
			
			//Récupérer tous les fichiers js
			$jsFiles = glob($pJsDirectory.'*.js');
			
			//Trier les fichiers par ordre alphabétique
			usort($jsFiles, "strcasecmp");

			//On parcoure tous les fichiers js
			for($i = 0; $i < count($jsFiles); $i++)
			{
				//On compile
				if(get_option('debug_mode') == 'prod'){
					$content .=  JSMIN::minify(file_get_contents($jsFiles[$i]));
				}else{
					$content .=  file_get_contents($jsFiles[$i]);
				}
						
			}
			
			//Et on écrit le contenu
			file_put_contents($pJsFile,$content);
		}
		
		
	}
?>