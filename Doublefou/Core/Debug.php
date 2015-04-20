<?php
	
	namespace Doublefou\Core;
	use Doublefou\Core\Singleton;
	use Doublefou\Core\Config;

	//Exit si accès direct
	if (!defined('ABSPATH')) exit; 

	/**
	* Outil de debug
	* @author Clément Biron
	* @todo finir l'affichag en console : passage en json
	*/
	class Debug extends Singleton
	{
		/**
		 * Error handler
		 * @var null
		 */
		private static $_errorHandler = null;

		/**
		 * Afficher la valeur d'une variable dans la console de debuggage
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
					$output.= $key.' : '.json_encode((array)$val, JSON_HEX_APOS | JSON_HEX_QUOT );
				
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
				$output = json_encode($pToDebug, JSON_HEX_APOS | JSON_HEX_QUOT );
			}

			//En administration
			if(is_admin()){
				add_action('admin_footer', function() use ($output){
					?>
						<script type="text/javascript">
							console.warn('**** PHP DEBUG ****\n<?php echo $output;?>\n****');			
						</script>
					<?php 
				});
			}

			//En front
			else{
				add_action('wp_footer', function() use ($output){

					/*echo '<script type="text/javascript">';
						echo 'var temp = JSON.parse('.$output.');';
						echo 'console.log(temp);';
					echo '</script>';*/

					?>
						<script type="text/javascript">
							console.warn('**** PHP DEBUG ****\n<?php echo $output;?>\n****');		
						</script>
					<?php 
				});
			}  		
		}
		
		/**
		 * Initialiser l'affichage des erreurs php
		 */
		public static function showErrors()
		{
			//On affiche les erreurs
			error_reporting(E_ALL);
			ini_set('display_errors', 1);

			//Pour le front uniquement
			if(!is_admin()){

				//On inclus la librairie d'affichage d'erreur
				require(Config::get('DF_WP_ROOT_PATH').'/Doublefou/libs/php_error.class.php');

				//Si on a pas configuré le error handler
				if(self::$_errorHandler == null){

					//We do it
					self::$_errorHandler = new \php_error\ErrorHandler(array(
						'wordpress' => true,
						'enable_saving' => false
					));
					self::$_errorHandler->turnOn();
				}
			}
		}

		/**
		 * Cacher les erreurs php
		 */
		public static function hideErrors()
		{
			//On masque les erreurs
			error_reporting(0);
			ini_set("display_errors",0);

			//Si on a un error handler configuré
			if(self::$_errorHandler !== null){

				//On le turn off
				self::$_errorHandler->turnOff();
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
		 * Afficher des infos de debug de Wordpress dans la console
		 */
		public static function getWpInfo()
		{	
			Debug::add(array(
					'Permalink structure' => get_option('permalink_structure'),
					'ABSPATH' => ABSPATH,
					//'File' => basename($template),
					'Number of database queries' => get_num_queries(),
					'Memory (mb)' => round( memory_get_peak_usage()/( 1024*1024 ), 3 ),
					'Queries time (seconds)' => timer_stop(0)
				)
			);
		}
	}

?>