<?php 

	//Exit si accès direct
	if (!defined('ABSPATH')) exit; 

	/*******************************
	 * GESTION DE LA CONFIGURATION DE L'ADMINISTRATION
	 */	
	use Doublefou\Helper\Admin;
	use Doublefou\Core\Debug;
	use Doublefou\Helper\Page;
	use Doublefou\Helper\Yoast;

	//Modifier les formats authorisés dans tinymce
	Admin::modifyTinyMceBlockFormat('Paragraph=p;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5');

	//On configure les outils tinyce
	//On les mets tous sur la même toolbar
	//Et on onlève les outil de la deuxieme toolbar
	Admin::modifyTinyMceToolbar(1,"formatselect,bold,italic,underline,strikethrough,bullist,link,unlink,pastetext,removeformat,charmap,undo,redo,fullscreen");
	Admin::modifyTinyMceToolbar(2,"");

	//Supprimer le bouton pour obtenir le lien court
	Admin::deleteShortLinkBtn();	

	//On supprime la compression des jpeg par défaut
	Admin::disableJPEGCompression();
	
	//Cacher certains menus de gauche pour l'éditeur
	Admin::hideMenu(
		'install_plugins',
		array(
			'tools.php',
			'edit-comments.php',
			'upload.php',
			'edit.php'
		)
	);

	//Cacher certaines élements du menu du haut pour l'éditeur
	Admin::hideMenuTop(
		'install_plugins',
		array(
			'wp-logo',
			'about',
			'new-content',
			'comments'
		)
	);

	//Supprimer des widget du dashboard pour l'éditeur
	Admin::removeDashboardWidgets(
		'install_plugins',
		array(
			'dashboard_plugins' => 'normal',
			'dashboard_recent_comments' => 'normal',
			'dashboard_right_now' => 'normal',
			'dashboard_quick_press' => 'side',
			'dashboard_primary' => 'side',
			'dashboard_secondary' => 'side',
		)
	);

	//On masque le styleguide pour les roles à partir de editor
	Page::hideInAdminByPageTemplate('page-styleguide.php','install_plugins');

	// use Doublefou\Helper\CustomPostColumnsManager;
	// $test = new CustomPostColumnsManager('recette');
	// $test->addACFColumn('Type','taxonomy','recette_type',true,'15%');
	// $test->addACFColumn('Note','select','recette_stars',true,'10%');
	// $test->addACFColumn('Date de parution','default','recette_date',true,'10%');
	// $test->addACFColumn('Miniature','image','recette_miniature',false,'15%');
    // $test->removeColumn('date');

    //Disable “Create Audio Playlist” and “Create Video Playlist” in Add Media
    add_filter( 'media_library_show_audio_playlist', function() { return false; });
    add_filter( 'media_library_show_video_playlist', function() { return false; });
?>