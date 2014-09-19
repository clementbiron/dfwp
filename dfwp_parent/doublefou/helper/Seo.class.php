<?php
/*
 * 
 */
abstract Class Seo extends Singleton
{
	/**
	 * getTitle
	 * get the title
	 */
	public static function getTitle()
	{
		if(is_home()){
			if(is_paged()){
				$paged = (get_query_var('paged')) ? get_query_var('paged') : 1; 
				return strip_tags(get_bloginfo('name')).' / page '.$paged;
			}else{
				return strip_tags(get_bloginfo('name'));
			}
		}
		
		if(is_single()){
			$cat = get_the_category();
			if($cat[0] != null){
				return strip_tags($cat[0]->name.' - '.get_the_title());	
			}else{
				return strip_tags(get_the_title());
			}			
		}
		
		if(is_category()){						
			$currentCat = Category::getCurrentCategory();
			if($currentCat != false){
				return strip_tags($currentCat->name);
			}else{
				return "";
			}
		}
	
		if(is_tax() || is_tag()){
			global $wp_query;
		    $term = $wp_query->get_queried_object();
			
			if(is_paged()){
				$paged = (get_query_var('paged')) ? get_query_var('paged') : 1; 
				return $term->name.' / page '.$paged;
			}else{
				 return $term->name;
			}
		}
		
		if(is_page()){			
			return strip_tags(get_the_title());
		}
				
		if(Post::isCustomPostType()){
			global $wp;
			return ucfirst($wp->request);
		}
	}
	
	/**
	 * getDescription
	 * get the description
	 * si Yoast installé, ne pas utiliser dans le head
	 */
	public static function getDescription()
	{
		if(is_single() || is_page()){
			global $post;
			$return = StringTool::cutByWords(apply_filters('the_excerpt_rss', str_replace("\n","",htmlentities(strip_tags($post->post_content),ENT_QUOTES,'UTF-8'))), 30,'...');
			if(empty($return)){
				$return = strip_tags(get_the_title());
			}
    		return $return;		
		}
		
		if(is_category()){
			$currentCatDesc = Category::getCurrentDescription();
			if($currentCatDesc != false){
				return str_replace("\n","",htmlentities(strip_tags($currentCatDesc),ENT_QUOTES,'UTF-8'));
			}
		}
		
		if(is_home()){
			if(is_paged()){
				$paged = (get_query_var('paged')) ? get_query_var('paged') : 1; 
				return get_bloginfo('description').' / page '.$paged;
			}else{
				return get_bloginfo('description');
			}
		}
		
		if(is_tag()){
			global $wp_query;
		    $term = $wp_query->get_queried_object();
			
			if(is_paged()){
				$paged = (get_query_var('paged')) ? get_query_var('paged') : 1; 
				return $term->name.' / page '.$paged;
			}else{
				return $term->name;
			}
		}
	}
	
	/**
	 * getKeywords
	 * get keywords
	 */
	public static function getKeywords()
	{
		
	}
}
?>