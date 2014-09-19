<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr" lang="fr">
<head>
	<title><?php wp_title( '-', true, 'right' ); ?></title>
	
	<link rel="shortcut icon" href="<?php bloginfo('stylesheet_directory'); ?>/static/img/favicon.ico" type="image/x-icon" />
	<link rel="icon" href="<?php bloginfo('stylesheet_directory'); ?>/static/img/favicon.gif"  type="image/gif" />
	<link rel="icon" href="<?php bloginfo('stylesheet_directory'); ?>/static/img/favicon.png"   type="image/png" />
	
	<link rel="stylesheet" type="text/css" href="<?php echo get_stylesheet_directory_uri(); ?>/tmp/style.css" />			
	<!--[if IE]><script src="<?php echo get_stylesheet_directory_uri() ?>/out/ie-html5.js" type="text/javascript"></script><![endif]-->
	
	<meta name="Author" content="" />
	<meta name="Robots" content="all" />
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
	
	<?php 
		// For plugins 
		wp_head();
	 ?>
</head>

<!--[if lt IE 7 ]>
   <body class="no-js ie6 <?php echo join(' ', get_body_class()); ?>">
<![endif]-->	
<!--[if IE 7 ]>
   <body class="no-js ie7 <?php echo join(' ', get_body_class()); ?>">
<![endif]-->
<!--[if IE 8 ]>
   <body class="no-js ie8 <?php echo join(' ', get_body_class()); ?>">
<![endif]-->
<!--[if IE 9 ]>
   <body class="no-js ie9 <?php echo join(' ', get_body_class()); ?>">
<![endif]-->
<!--[if (gt IE 9)|!(IE)]>
	<body class="no-js no-ie <?php echo join(' ', get_body_class()); ?>">
<![endif]-->

<?php 
	//IE 6, 7 message
	if((strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE 6.') !== FALSE) ||  (strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE 7.') !== FALSE)){
		echo '<div id="warningIe">';
			echo '<h2>Votre navigateur est obsolète</h2>';
			echo '<p>Vous risquez de ne pas pouvoir profiter pleinement de la navigation sur ce site.</p>';
			echo '<p>Procédez à une mise à jour de votre <a href="http://www.microsoft.com/windows/internet-explorer/default.aspx"><u>nagivateur</u></a> ou <a href="http://www.google.com/chrome?hl=fr"><u>changez en</u></a>.</p>';
		echo '</div>';
	}
?>