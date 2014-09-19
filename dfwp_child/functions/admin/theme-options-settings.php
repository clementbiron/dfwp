<?php

/**
 * Theme option settings
 */

//On désactive l'éditeur pour certains templates de pages
/*Admin::hideEditorForPagesTemplates(array('page-templates/histoire.php',
										'page-templates/activites.php',
										'page-templates/accueil.php',	
										'page-templates/cafe.php',						
										'page-templates/hotel.php',
										'page-templates/restaurant.php',
										'page-templates/contact.php',

));*/

add_action( 'customize_register', 'themeCustomizeRegister' );
function themeCustomizeRegister( $wp_customize ) 
{
	//Ajout de la section pour les actalités
   /*	$wp_customize->add_section( 'theme_section_actus' , array(
	    'title'      => __( 'Actualités', 'cafebrochier' ),
	    'priority'   => 30,
	    'capability' => 'edit_theme_options', //Capability needed to tweak,
	    'description' => __('Activer ou désactiver les actualités en page d\'accueil.', 'cafebrochier'),
	) );	

	//Définition du setting pour les actualités
   	$wp_customize->add_setting( 'theme_options[actus]' , array(
	    //'default'     => 'activer'
	    'type'       => 'option',
	) );
	
   	//Ajout du control pour le setting dans la section
	$wp_customize->add_control(
		new WP_Customize_Control(
	        $wp_customize,
	        'theme_options[actus]',
	        array(
	            'section'        => 'theme_section_actus',
	            'settings'       => 'theme_options[actus]',
	            'type'           => 'radio',
	            'choices'        => array(
	                'activer'   => __( 'Activer' ),
	                'désactiver'  => __( 'Désactiver' )
	            )
	        )
    	)
	);

	//Ajout de la section pour le footer
	$wp_customize->add_section( 'theme_section_footer' , array(
	    'title'      => __( 'Pied de page', 'cafebrochier' ),
	    'priority'   => 30,
	    'capability' => 'edit_theme_options', //Capability needed to tweak,
	    'description' => __('Modifier le texte en pied de page', 'cafebrochier'),
	) );

	//Définition du setting pour le footer
   	$wp_customize->add_setting( 'theme_options[footer]' , array(
	    //'default'     => 'activer'
	    'type'       => 'option',
	) );

	//Ajout du control tinymce pour le setting dans la section
	$wp_customize->add_control(
		new CustomizeTinyMCEControl(
	        $wp_customize,
	        'theme_options[footer]',
	        array(
	            'section'        => 'theme_section_footer',
	            'settings'       => 'theme_options[footer]'
	        )
    	)
	);*/
}

?>