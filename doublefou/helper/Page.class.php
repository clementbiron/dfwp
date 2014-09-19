<?php

	Class Page extends Singleton
	{
		/**
		 * getLinkBySlug
		 * get a link page with a slug
		 * @param String $pPageSlug
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
		 * getPageBySlug
		 * get a page by slug
		 * @param unknown_type $pPageSlug
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
		 * getCurrentPage
		 * Get the current page
		 */
		public static function getCurrentPage(){
			return  get_page(get_query_var('page'));
		}
		
		/**
		 * getCurrentPageDescription
		 * Get current page description with max numbers of words
		 * @param Number $pNbWords
		 */
		public static function getCurrentPageDescription($pNbWords){
			$currentPage = getCurrentPage();
			return StringTool::cut(strip_tags($currentPage->post_content),$pNbWords);
		}
		
		/**
		 * isPageChildBySlug
		 * Knwo is page is on the tree of another
		 * @param String $pSlug
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