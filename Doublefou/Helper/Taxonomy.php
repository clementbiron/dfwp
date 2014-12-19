<?php
	/**
	 * Taxonomy
	 */
	namespace Doublefou\Helper;
	use Doublefou\Core\Singleton;
	Class Taxonomy extends Singleton
	{
		/**
		 * Desactivate a taxonomie
		 * @param string $taxonomie
		 */
		public static function desactivateTaxonomy($pTax)
		{
			add_action('init', function() use ($pTax){
				global $wp_taxonomies;
				if ( taxonomy_exists( $pTax))
					unset( $wp_taxonomies[$pTax]);
			});
		}
		
		/**
		 * Récupérer les taxnomy courantes passées en url
		 * @param string $pName
		 */
		public static function getCurrentTaxonomyByName($pName)
		{
			return wp_get_object_terms(get_the_ID(),$pName);
		}
	}
?>