<?php
    //Exit si accès direct
	if (!defined('ABSPATH')) exit; 

    /* ACF Google Maps API KEY */
	add_action('acf/init', 'dfwp_acf_init');
	function dfwp_acf_init() {
		acf_update_setting('google_api_key', 'APIKEY');
	}

	//On ajoute une configuration Tinymce pour ACF
	add_filter('acf/fields/wysiwyg/toolbars','dfwp_acfToolbars' );
	function dfwp_acfToolbars($toolbars)
	{
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

	//Ajouter la gestion des pages d'options pour ACF
	if( function_exists('acf_add_options_page') ) 
	{
		$dfwpPageOptions = array(
			'page_title' => 'DFWP options',
			'capability' => 'activate_plugins',
			'icon_url' => 'dashicons-admin-generic',
		);
		acf_add_options_page($dfwpPageOptions);	
	}

	//Path d'enregistrement des fichiers acf json
	add_filter('acf/settings/save_json', 'my_acf_json_save_point');
	function my_acf_json_save_point( $path ) {
		$path = get_stylesheet_directory() . '/functions/admin/acf-json';
		return $path;
	}

	//Path de chargement des fichiers acf json
	add_filter('acf/settings/load_json', 'my_acf_json_load_point');
	function my_acf_json_load_point( $paths ) {
		unset($paths[0]);
		$paths[] = get_stylesheet_directory() . '/functions/admin/acf-json';
		return $paths;
	}

	
?>