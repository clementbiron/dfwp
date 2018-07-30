<!DOCTYPE html>
<html <?php language_attributes(); ?>>
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
	//Chargement du header
	get_template_part('src/components/header/header');
?>