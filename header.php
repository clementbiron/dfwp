<?php
	//On récupère les languages attributes
	use Doublefou\Helper\Theme;
	$languagesAttributes = Theme::getLanguageAttributes();
?>
<!DOCTYPE html>
<html <?php echo $languagesAttributes; ?>>
<head>
	<title><?php wp_title( '-', true, 'right' ); ?></title>
	<link rel="shortcut icon" href="<?php bloginfo('stylesheet_directory'); ?>/static/favicon/favicon.ico" type="image/x-icon" />
	<link rel="icon" href="<?php bloginfo('stylesheet_directory'); ?>/static/favicon/favicon.gif"  type="image/gif" />
	<link rel="icon" href="<?php bloginfo('stylesheet_directory'); ?>/static/favicon/favicon.png"   type="image/png" />
	<meta name="Author" content="Clément Biron" />
	<meta name="Robots" content="all" />
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<?php
		// For plugins
		wp_head();
	?>
</head>
<body class="<?php echo join(' ', get_body_class()); ?>">