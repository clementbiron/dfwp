<?php
  use \php_error;

  /**
   * Outil de debug à utiliser dans wordpress
   */
  Class Debug extends Singleton
  {
	
  	/**
  	 * add
  	 * output debug print
  	 * @param * $pToDebug
  	 */
  	public static function add($pToDebug)
  	{
  		//Vars
  		$output = '';
		$l =  count($pToDebug);
		$i = 0;
		
		//Si on veut débugger un array
  		if(is_array($pToDebug) && $l > 0){
  			
            //On le parcoure
  			foreach($pToDebug as $key => $val){
  
				//On préapare la chaine de sortie type key : val
  				$output.= $key.' : '.json_encode($val);
				
				//On replace certains caractère dans l'encodage json pour la sortie
				$output = str_replace('&nbsp;', '', $output );
				
				//Si c'est pas le dernière item on rajoute un saut de ligne
				if($i < $l - 1){
					$output.= '\n';
				}
				
				//Et on incrémente
				$i++;
  			}
  		}
		
		//Sinon debug simple valeur
  		else{
  			$output = json_encode($pToDebug);
  		}

  		if(is_admin()){
  			add_action('admin_footer', function() use ($output){
  				?>
  			  		<script type="text/javascript">
  			  			console.warn('**** PHP DEBUG ****\n<?php echo $output;?>\n****');			
  			  		</script>
  			  	<?php 
	  		});
  		}else{
  			add_action('wp_footer', function() use ($output){
  				?>
  			  		<script type="text/javascript">
  						console.warn('**** PHP DEBUG ****\n<?php echo $output;?>\n****');		
  			  		</script>
  			  	<?php 
	  		});
  		}
  		
  	}
  	
  	/**
  	 * Init php errors
  	 */
  	public static function showErrors()
  	{
  		//On inclus la lib 
  		require(DF_WP_ROOT_PATH.'/libs/php_error.class.php');
  		
  		//Si c'est ok
  		if ( function_exists('\php_error\reportErrors') ) {
  			
  			//On init les php erros customs en n'afichant pas les erreurs de wordpress core
		  	\php_error\reportErrors(array(
		  		'wordpress' => true
		  	));
		}
  	}
  		
  
  	/** 
  	 * Retrouver le nom d'une varaible
  	 * @param unknown_type $var
  	 */
	public static function varName($var)
    {
		foreach($GLOBALS as $var_name => $value) {
	        if ($value === $var) {
	            return $var_name;
	        }
	    }	
	    return false;
    }
	
	/**
	 * Afficher des infos de debug de Wordpress
	 */
	public static function getWpInfo()
	{
		//Retourner le nom du template courant
		function define_current_theme_file( $template ) 
		{
			//On garde en config le nom du template courant
			Config::set('CURRENT_THEME_TEMPLATE',basename($template));
			
			global $template;
			
			//Et on affiche les valeurs qui sont bien
			Debug::add(array('Current theme template' => Config::get('CURRENT_THEME_TEMPLATE'),
				 			 'Permalink structure' => get_settings('permalink_structure'),
				 			 'File' => basename( $template),
				 			 'Number of database queries' => get_num_queries(),
				 			 'Memory (mb)' => round( memory_get_peak_usage()/( 1024*1024 ), 3 ),
				 			 'Queries time (seconds)' => timer_stop(0)
				)
			);
			
			//On retourne le template courant
		 	return $template;
	 	}
		add_action('template_include', 'define_current_theme_file', 1000);
	}
  }

?>