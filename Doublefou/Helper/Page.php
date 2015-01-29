<?php
	
	namespace Doublefou\Helper;
	use Doublefou\Core\Singleton;
	use Doublefou\Tools\StringTool as StringTool;

	/**
	 * Page
	 * @author Clément Biron
	 */
	Class Page extends Singleton
	{
		/**
		 * Récupérer le lien d'une page à partir de son slug
		 * @param string $pPageSlug Slug
		 * @return string
		 */
		public static function getPageLinkBySlug($pPageSlug) {
			$page = get_page_by_path($pPageSlug);
	  		if ($page) :
		    	return get_permalink( $page->ID );
		  	else :
		    	return "#";
		  	endif;
		}
		
		/**
		 * Récupérer une page par son slug
		 * @param string $pPageSlug Slug de la page
		 * @return object|false
		 */
		public static function getPageBySlug($pPageSlug){
			$page = get_page_by_path($pPageSlug);
			if ($page) :
		    	return $page;
		  	else :
		  		return false;
		  	endif;
		}
		
		/**
		 * Récupérer la page courante
		 * @return object
		 */
		public static function getCurrentPage(){
			return  get_page(get_query_var('page'));
		}
		
		/**
		 * Récupérer la description de la page courante
		 * @param interger $pNbWords Nombre de mots de la description
		 * @return string|null
		 */
		public static function getCurrentPageDescription($pNbWords){		
			$currentPage = Page::getCurrentPage();
			if($currentPage){
				return StringTool::cutByWords(strip_tags($currentPage->post_content),$pNbWords);
			}
			return null;
		}
		
		/**
		 * Savoir si la page courante est l'enfant d'une autre
		 * @return Boolean
		 */
		public static function isPageChild()
		{
			global $post;      
			$parentPage = get_page($post->post_parent);		
			if(is_page() && ($parentPage->ID == $post->post_parent))
	           return true;
			else
	           return false; 
		}
		
		/**
		 * Ajouter la gestion de l'excerpt pour les page
		 */
		public static function addExcerpt()
		{
			add_post_type_support( 'page', 'excerpt' );
		}
	}

?>