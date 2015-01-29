<?php
	
	namespace Doublefou\Components;
	use Doublefou\Core\Singleton;

	/**
	 * Gestion du fil d'ariane
	 * @author Clément Biron
	 * @todo A FINIR
	 */
	Class Breadcrumb extends Singleton
	{

		/**
		 * Récupérer le fil d'ariane
		 * @return [type] [description]
		 * @todo A FINIR
		 */
		public static function getBreadCrumb()
		{
			//Pour stocker tous les liens
			$breadCrumbLinks = Array();
			
			//Le lien de la home page
			$homeLink = new BreadcrumbLink(get_bloginfo('url'), 'Accueil');
			array_push($breadCrumbLinks, $homeLink);
			
			//Si on est pas en page d'accueil
			if (!is_front_page()) {
				
				//Global wordpress vars
				global $post, $cat;
				
				//Single
				if (is_single()) { 
					$category = get_the_category();
					$num_cat = count($category);
					
					if($num_cat > 1){
						
					}else{
						
					}
				}
			}
		}
	}
?>