<?php
	Class Post extends Singleton
	{
		
		/**
		 * getPostLinkBySlug
		 * Récupérer le permalink d'un post avec son slug
		 * @param String $pSlug
		 */
		public static function getPostLinkBySlug($pSlug)
		{
			$query = self::getPostBySlug($pSlug);
			return get_permalink($query->post->ID);
		}
		
		/**
		 * getPostBySlug
		 * Récupérer un post avec son permalink
		 * @param unknown_type $pSlug
		 */
		public static function getPostBySlug($pSlug)
		{
			return new WP_Query("name=$pSlug");
		}
		
		/**
		 * getPostByTitle
		 * Récupérer un post par son titre
		 * @param String $pTitle
		 */
		public static function getPostByTitle($pTitle, $output = OBJECT)
		{
			global $wpdb;
		    $post = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM $wpdb->posts WHERE post_title = %s AND post_type='post'", $page_title ), $output);
		    
		    if ( $post )
		        return $post;
		 
		    return null;
		}
		
		/**
		 * Récupérer le slug d'un post dans la loop
		 * 
		 */
		public static function getPostSlug()
		{
			return basename(get_permalink());
		}
		
		/**
		 * isCustomPostType
		 * Déterminer si il sagit d'un custom post type
		 * @param unknown_type $type
		 */
		public static function isCustomPostType($type = '') 
		{
			global $post;
			$post_type = get_post_type($post);
			$types = array("post", "page", "revision", "attachment");
			if ($type == '' && !in_array($type, $types)) {
				return true;
			}else if ($type == $post_type) {
				return true;
			}else {
				return false;
			}
		}
		
		/**
		 * filterPTagsOnImages
		 * remove <p> tag from images in the_content()
		 */
		public static function filterPTagsOnImages()
		{
			function filter_ptags_on_images($content){
				return preg_replace('/<p>\s*(<a .*>)?\s*(<img .* \/>)\s*(\/a>)?\s*<\/p>/iU', '\1\2\3', $content);
				add_filter('the_content', 'filter_ptags_on_images');
			}
		}
		
	}
?>