<?php 

	/*******************************
	 * ADMIN OPTION PAGE
	 */
	
	//A l'initialisation de l'administration
	add_action('admin_init', 'dfRegisterSettings');
	
	//On enregistre les settings du theme
	function dfRegisterSettings()
	{
		//On enregistre le debug mode
		register_setting('df_wp', 'debug_mode', 'validDebugMode');

		//Maintenance mode
		register_setting('df_wp', 'maintenance_mode', 'validMaintenanceMode');
		
		//Validation du debug mode
		function validDebugMode($input){
			if(empty($input)){
				return 'prod';
			}
			if(!empty($input)){
				if($input != "prod" && $input != "debug"){
					return 'prod';
				}else{
					return $input;
				}
			}
		}

		//Validation du mode de maintenance
		function validMaintenanceMode($input){
			if(empty($input)){
				return 'false';
			}
			else if(!empty($input)){
				if($input != "true"){
					return 'false';
				}else{
					return $input;
				}	
			}
		}
	}
	
	//Lors de la construction du menu d'administration
	add_action( 'admin_menu', 'dfAdminMenu' );
	
	//On ajoute une page pour la gestion des settings du theme
	function dfAdminMenu()
	{
		add_menu_page(
	      'All Options', // le titre de la page
	      'All Options',            // le nom de la page dans le menu d'admin
	      'administrator',        // le rôle d'utilisateur requis pour voir cette page
	      'options.php'        // un identifiant unique de la page
		); 
		add_menu_page(
	      'DF WP Options', // le titre de la page
	      'DF WP Options',            // le nom de la page dans le menu d'admin
	      'administrator',        // le rôle d'utilisateur requis pour voir cette page
	      'df-wp-options',        // un identifiant unique de la page
	      'dfSettingsPage'   // le nom d'une fonction qui affichera la page
	   );
		
	}
	
	//La gestion de cette page de settings
	function dfSettingsPage()
	{
		?>
	   <div class="wrap">
	      <h2>DF WP Options</h2>
	 
	      <form method="post" action="options.php">
	         <?php
	            // cette fonction ajoute plusieurs champs cachés au formulaire
	            // pour vous faciliter le travail.
	            // elle prend en paramètre le nom du groupe d'options
	            // que nous avons défini plus haut.
	            settings_fields( 'df_wp' );
	         ?>
	 
	         <table class="form-table">
	            <tr valign="top">
			      <th scope="row"><label for="debug_mode">Debug mode</label></th>
			      <td>
			      	<input type="text" id="debug_mode" name="debug_mode"  value="<?php echo get_option( 'debug_mode' ); ?>" />
			      	<span class="description">var name : debug_mode | value : 'debug' or 'prod'</span>
			      </td>
			   </tr>
			   <tr valign="top">
			      <th scope="row"><label for="maitenance_mode">Maintenance mode</label></th>
			      <td>
			      	<input type="text" id="maintenance_mode" name="maintenance_mode"  value="<?php echo get_option( 'maintenance_mode' ); ?>" />
			      	<span class="description">var name : maintenance_mode | value : 'false' or 'true'</span>
			      </td>
			   </tr>
	         </table>
	 
	         <p class="submit">
	            <input type="submit" class="button-primary" value="Mettre à jour" />
	         </p>
	      </form>
	   </div>
	<?php
	}
?>