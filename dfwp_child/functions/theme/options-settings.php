<?php
	/*******************************
	 * CUSTOM POST TYPE AND TAXONOMY
	 */

	/*******************************
	 * REWRITE RULES
	 */
	
	/********************************
	 * CUSTOM MENUS
	 */
/*	register_nav_menus( array(
        'menu-header' => 'Navigation principale',
        'menu-footer' => 'Navigation en pied de page'
    ) );
	*/
	
	/********************************
	 * THEME OPTIONS PAGE
	 */
	
	/************************
	 * CUSTOM MAIN QUERY 
	 */
	 add_action('pre_get_posts', 'customMainQuery',5 );
	 function customMainQuery($pQuery)
	 {
	 	//Sur la page d'accueil
	 	if(is_home() && $pQuery->is_main_query() ){
	 		
			//On récupere uniquement les établissements
			//$pQuery->set( 'post_type', array( 'etablissement') );
	 	}
		
		return $pQuery;
	 }
	
	/********************************
	 * Divers
	 */

	//On cache l'admin bar sur le front
	Admin::hideAdminBar();

	//On supprime le lien rss dans le header
	remove_action( 'wp_head', 'feed_links_extra', 3 );

	//Et le shortlink
	remove_action( 'wp_head', 'wp_shortlink_wp_head', 10, 0 );
	
	/**
	 * wp_title action
	 */
	function wpTitleAction($title){
		
		///Si Yoast n'est pas activé, on utilise Seocustom
		if (!class_exists('WPSEO_Frontend')){
			echo SeoCustom::getTitle();
		}
		
		//Sinon on utilise le titre généré par Yoast
		else{
			global $wpseo_front;
			$title = $wpseo_front->title('');
		}
	
	}
	add_action('wp_title','wpTitleAction');

	/**
	 * Gestion de wp_head()
	 * SEO : gestion de la meta description
	 */
	function wpHeadAction(){
	
		///Si Yoast n'est pas activé, on utilise Seocustom
		if (!class_exists('WPSEO_Frontend')){
			echo '<meta name="description" content="'.SeoCustom::getDescription().'" />';
		}
		
		//Sinon si Yoast est actif
		else{
			
			//Si la description n'est pas remplie en administration, on utilise Seocustom
			if(wpseo_get_value('metadesc') == false){
				echo '<meta name="description" content="'.SeoCustom::getDescription().'" />';
			}			
		}
	}
	add_action('wp_head', 'wpHeadAction');

	
	add_action('wp_head', 'wpHeadAction');

	/**
	 * Remove YOAST footer
	 */
	add_action('get_header', 'ad_ob_start');
	add_action('wp_head', 'ad_ob_end_flush', 100);
	function ad_ob_start() {
	    ob_start('ad_filter_wp_head_output');
	}
	function ad_ob_end_flush() {
	    ob_end_flush();
	}
	function ad_filter_wp_head_output($output) {
	    if (defined('WPSEO_VERSION')) {
	        $output = str_ireplace('<!-- This site is optimized with the Yoast WordPress SEO plugin v' . WPSEO_VERSION . ' - https://yoast.com/wordpress/plugins/seo/ -->', '', $output);
	        $output = str_ireplace('<!-- Avis pour l\'administrateur&nbsp;: cette page n\'affiche pas de méta description car elle n\'en a pas. Vous pouvez donc soit l\'ajouter spécifiquement pour cette page soit aller dans vos réglages (SEO -> Titres) pour configurer un modèle. -->', '', $output);
	        $output = str_ireplace('<!-- / Yoast WordPress SEO plugin. -->', '', $output);
	    }
	    return $output;
	}
?>