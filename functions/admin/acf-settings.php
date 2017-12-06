<?php
    //Exit si accès direct
	if (!defined('ABSPATH')) exit; 

    /* ACF Google Maps API KEY */
	/*add_action('acf/init', 'dfwp_acf_init');
	function dfwp_acf_init() {
		acf_update_setting('google_api_key', 'APIKEY');
	}*/

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

	//Path d'enregistrement des fichiers acf json
	add_filter('acf/settings/save_json', 'my_acf_json_save_point');
	function my_acf_json_save_point( $path ) {
		$path = get_stylesheet_directory() . '/functions/admin/acf-json';
		return $path;
	}
	
	//Path de chargement des fichiers acf json
	/*add_filter('acf/settings/load_json', 'my_acf_json_load_point');
	function my_acf_json_load_point( $paths ) {
		unset($paths[0]);
		$paths[] = get_stylesheet_directory() . '/functions/admin/acf-json';
		return $paths;
	}*/

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

	//On charge les champs ACF pour la page DFWP options
	if( function_exists('acf_add_local_field_group') ):
		acf_add_local_field_group(array(
			'key' => 'group_5a02d406be44e',
			'title' => 'DFWP options',
			'fields' => array(
				array(
					'key' => 'field_5a02d42e8ad35',
					'label' => 'Activer le mode debug',
					'name' => 'dfwp_options_is_debug',
					'type' => 'true_false',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array(
						'width' => '33',
						'class' => '',
						'id' => '',
					),
					'message' => '',
					'default_value' => 0,
					'ui' => 1,
					'ui_on_text' => '',
					'ui_off_text' => '',
				),
				array(
					'key' => 'field_5a02d4848ad36',
					'label' => 'Activer la maintenance',
					'name' => 'dfwp_options_is_maintenance',
					'type' => 'true_false',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array(
						'width' => '33',
						'class' => '',
						'id' => '',
					),
					'message' => '',
					'default_value' => 0,
					'ui' => 1,
					'ui_on_text' => '',
					'ui_off_text' => '',
				),
			),
			'location' => array(
				array(
					array(
						'param' => 'options_page',
						'operator' => '==',
						'value' => 'acf-options-dfwp-options',
					),
				),
			),
			'menu_order' => 0,
			'position' => 'normal',
			'style' => 'default',
			'label_placement' => 'top',
			'instruction_placement' => 'label',
			'hide_on_screen' => '',
			'active' => 1,
			'description' => '',
		));
	endif;

	
?>