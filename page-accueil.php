<?php
	/*
	Template Name: Accueil template
	*/
	
	get_header();
?>
	
	Accueil

<?php 

	if ( have_posts() ) : 
		while ( have_posts() ) : the_post();
			the_content();
		endwhile;  
	endif; 
?>

<?php
	get_footer();
?>