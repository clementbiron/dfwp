<?php
	Class Taxonomy extends Singleton
	{
		/**
		 * desactivateTaxonomy
		 * desactivate a taxonomie
		 * @param String $taxonomie
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
		 * getCurrentTaxonomyByName
		 * retourne les taxnomy courantes passées en url
		 */
		public static function getCurrentTaxonomyByName($pname)
		{
			return wp_get_object_terms(get_the_ID(),$pname);
		}
	}
?>