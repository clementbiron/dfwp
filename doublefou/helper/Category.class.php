<?php

	Class Category extends Singleton
	{
		/**
		 * getLinkBySlug
		 * Get a category link by slug
		 * @param unknown_type $pCategorySlug
		 */
		public static function getCategoryLinkBySlug($pCategorySlug){
			$cat = get_category_by_slug($pCategorySlug);
			if($cat){
				return get_category_link($cat->term_id);
			}
		}
		
		/**
		 * getCurrentDescription
		 * Get the current category description
		 */
		public static function getCurrentDescription(){
			$currentCategory = Category::getCurrentCategory();
			if($currentCategory !=  false){
				return $currentCategory->category_description;
			}else{
				return false;
			}
		}
		
		/**
		 * getCurrentCategory
		 * Get the current category
		 */
		public static function getCurrentCategory(){
			$queryvar = get_query_var('cat');
			if(!empty($queryvar)){
				return get_category(get_query_var('cat'));
			}else{
				return false;
			}
		}
		
		/**
		 * getCategoryLink by category object
		 * @param Category $pCategory
		 */
		public static function getCategoryLink($pCategory){
			return get_category_link($pCategory->term_id);
		}
	}

?>