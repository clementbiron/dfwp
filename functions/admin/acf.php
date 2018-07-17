<?php
    //Exit si accès direct
	if (!defined('ABSPATH')) exit; 

    /* ACF Google Maps API KEY */
	function dfwp_acf_init( $api ){
        $api['key'] = 'xxx';
        return $api;
    }
    add_filter('acf/fields/google_map/api', 'dfwp_acf_init');

	//On ajoute une configuration Tinymce pour ACF
	add_filter('acf/fields/wysiwyg/toolbars','dfwp_acfToolbars' );
	function dfwp_acfToolbars($toolbars){
		// Add a new toolbar called "Very Simple"
		// - this toolbar has only 1 row of buttons
		$toolbars['DFWP Tools' ] = array();
		$toolbars['DFWP Tools' ][1] = array(
			'bold', 
			'italic', 
			'underline',
			'strikethrough',
			'bullist',
			'formatselect',
			'link',
			'unlink',
			'pastetext',
			'removeformat',
			'charmap',
			'fullscreen',
		);

		// return $toolbars - IMPORTANT!
		return $toolbars;
	}

	//Path d'enregistrement des fichiers acf json
	add_filter('acf/settings/save_json', 'dfwp_acf_json_save_point');
	function dfwp_acf_json_save_point( $path ) {
		$path = get_stylesheet_directory() . '/functions/admin/acf-json';
		return $path;
	}
	
	//Path de chargement des fichiers acf json
	add_filter('acf/settings/load_json', 'dfwp_acf_json_load_point');
	function dfwp_acf_json_load_point( $paths ) {
		unset($paths[0]);
		$paths[] = get_stylesheet_directory() . '/functions/admin/acf-json';
		return $paths;
	}

	//Ajouter la gestion des pages d'options pour ACF
	if( function_exists('acf_add_options_page') ) {

        //DFWP options
		acf_add_options_page(array(
			'page_title' => 'DFWP options',
			'capability' => 'activate_plugins',
			'icon_url' => 'dashicons-admin-generic',
        ));

        //Configuration client
        acf_add_options_page(array(
			'page_title' => 'Configuration',
			'capability' => 'delete_others_pages',
        ));
	}
?>