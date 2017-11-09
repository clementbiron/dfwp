<?php
	//On récupère les languages attributes
	use Doublefou\Helper\Theme;
	$languagesAttributes = Theme::getLanguageAttributes();
?>
<!DOCTYPE html>
<html <?php echo $languagesAttributes; ?>>
<head>
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

<?php
	//Chargement du svg
	include(__DIR__.'/src/assets/svg/generated/sprite.svg');
	
	//Chargement du header
	get_template_part('src/components/header/header');
?>