<?php 

Class Theme extends Singleton
{
	/**
	 * addPostThumbnails
	 * Ajouter la gestion des miniatures de posts
	 */
	public static function addPostThumbnails()
	{
		if(function_exists('add_theme_support')){ 
			add_theme_support('post-thumbnails'); 
		}
	}
	
	/**
	 * compileLess
	 * Compiler les fichiers less dans un fichier css 
	 * @param String $pLessFiles
	 * @param String $pCssFile
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
	 * 
	 * Combiner et minifier les fichiers js
	 * @param String $pJsDirectory
	 * @param String $pJsFile
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
	
	/**
	 * A vérifier
	 * Retourne la version du thème extraite depuis l'en-tête de la feuille de style
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
}
?>